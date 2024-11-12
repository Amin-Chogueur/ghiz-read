import React, { useMemo } from "react";
import Image from "next/image";
import { BookType } from "@/types/interfaceses";
import Link from "next/link";
import { useBookContext } from "@/context/BookContextProvider";

export default function Book({ book }: { book: BookType }) {
  const { cartItems, addItem } = useBookContext();
  const isAdded = useMemo(
    () =>
      cartItems.some((item) => item.itemId === book?._id)
        ? "Dans le panier"
        : "Ajouter au panier",
    [cartItems, book]
  );
  return (
    <div
      className={` relative bg-primary  mt-4 w-[250px] h-[570px] m-auto rounded-2xl overflow-hidden `}
    >
      <Link
        href={`/books/${book._id}`}
        className="relative py-2 px-2 rounded-t-lg  bg-primary"
      >
        <Image
          src={book.image}
          alt="image"
          width={200}
          height={160}
          className="rounded-md m-auto shadow-[-6px_8px_8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="px-4 py-1 text-accent ">
        <h3 className="text-center text-accent mb-2">{book.title}</h3>
        <h3>
          <span className="text-orange-500 ">Auteur :</span> {book.auther}
        </h3>
        <h3>
          <span className="text-orange-500 ">Nombre de Pages :</span>{" "}
          {book.numberOfPages}
        </h3>
        <h3>
          <span className="text-orange-500 ">Prix :</span> {book.price} DA
        </h3>
        {book.quantity > 0 ? (
          <button
            disabled={
              cartItems.find((item) => item.itemId === book._id) ? true : false
            }
            className="disabled:bg-accent disabled:text-black absolute left-[5%] bottom-3  bg-orange-700 p-1 rounded-lg  text-white w-[90%]"
            onClick={() => addItem(book._id)}
          >
            {isAdded}
          </button>
        ) : null}
      </div>
    </div>
  );
}
