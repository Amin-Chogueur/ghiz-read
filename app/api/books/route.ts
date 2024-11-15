import { connectToDB } from "@/lib/connectToDB";
import Book from "@/lib/models/Book";
import Category from "@/lib/models/Category";

import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || ""; // Get the search query

  const perPage = 8; // Number of books per page
  console.log("API Route - Page:", page, "Search Query:", search); // Log page and search query

  try {
    // Construct the MongoDB query
    const query = search
      ? {
          title: { $regex: search, $options: "i" }, // Case-insensitive search by title
        }
      : {};

    // Count total books based on the search query
    const totalBooks = await Book.countDocuments();
    const categories = await Category.find();
    // Fetch books with aggregation pipeline
    const books = await Book.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: query }, // Apply search filter if present
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          auther: 1,
          image: 1,
          price: 1,
          description: 1,
          quantity: 1,
          numberOfPages: 1,
          categoryName: "$categoryDetails.name",
        },
      },
      { $skip: perPage * (page - 1) }, // Skip documents for pagination
      { $limit: perPage }, // Limit the number of documents per page
    ]);
    if (!books) {
      return NextResponse.json("no Books Found", { status: 400 });
    }
    // Construct the response
    const response = { books, totalBooks, categories };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
