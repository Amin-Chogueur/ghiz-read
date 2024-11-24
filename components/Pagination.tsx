"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useBookContext } from "@/context/BookContextProvider";

export default function Pagination() {
  const route = useRouter();
  const { pageToLoad, setPageToLoad, totalBooks, search, setSearch } =
    useBookContext();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const perPage = 8;
  const totalPages = Math.ceil(totalBooks / perPage);
  const prevPage = Number(pageToLoad) - 1 > 1 ? Number(pageToLoad) - 1 : 1;
  const nextPage = Number(pageToLoad) + 1;

  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const navigateToPage = (toPage: number) => {
    const queryParams = `/?page=${toPage}${
      search ? `&search=${encodeURIComponent(search)}` : ""
    }`;
    route.push(queryParams);
    setSearch("");
  };

  useEffect(() => {
    setPageToLoad(page);
  }, [page]);

  useEffect(() => {
    const section = document.getElementById("next-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [pageToLoad]);
  return (
    <Suspense>
      <div className="flex gap-8 w-fit mx-auto my-[40px] ">
        <button
          disabled={Number(page) === 1 ? true : false}
          onClick={() => navigateToPage(prevPage)}
          className="bg-orange-500 p-1 rounded disabled:bg-accent disabled:text-secondary"
        >
          &lt;
        </button>
        <div className="flex gap-3 w-fit mx-auto">
          {pagesArray.map((ele, i) => (
            <button
              onClick={() => navigateToPage(ele)}
              className={
                Number(page) === ele
                  ? "bg-secondary border p-1 rounded w-[30px] h-[30px] leading-4"
                  : "bg-orange-500 p-1 rounded w-[30px] h-[30px] leading-4"
              }
              key={i}
            >
              {ele}
            </button>
          ))}
        </div>
        <button
          disabled={Number(page) === totalPages ? true : false}
          onClick={() => navigateToPage(nextPage)}
          className="bg-orange-500 p-1 rounded disabled:bg-accent disabled:text-secondary"
        >
          &gt;
        </button>
      </div>
    </Suspense>
  );
}
