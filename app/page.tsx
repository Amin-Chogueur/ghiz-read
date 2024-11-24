"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Book from "@/components/Book";
import Slider from "@/components/slider/Slider";
import { FaSearch } from "react-icons/fa";
import { useBookContext } from "@/context/BookContextProvider";
import Pagination from "@/components/Pagination";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const {
    loading,
    books,
    categories,
    search,
    handleSearch,
    handlePlayMusic,
    showBooks,
    pageToLoad,
    setShowBooks,
    getBooksFromApi,
  } = useBookContext();
  const [searchInput, setSearchInput] = useState<string>(search);
  const [searchCategory, setSearchCategory] = useState<string>("All");
  const section = document.getElementById("next-section");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    handleSearch(searchInput);
    setTimeout(() => {
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }

  function handleScroll() {
    handlePlayMusic();
    setShowBooks(true);
    setTimeout(() => {
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }
  const filteredBooks = books.filter((book) =>
    searchCategory !== "All" ? book.category.name === searchCategory : true
  );

  useEffect(() => {
    getBooksFromApi();
  }, [pageToLoad, search]);

  return (
    <div ref={ref} className="text-accent text-center ">
      <div>
        <Slider />

        <button
          onClick={handleScroll}
          className="absolute bottom-[40px] left-[21%] sm:left-[42%] transform -translate-x-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-[10px]   px-6 py-3  animate-bounce "
        >
          {" "}
          Découvrir Nos Livres!
        </button>
      </div>{" "}
      <div className={!showBooks ? "hidden" : "block"}>
        <div id="next-section" className="mb-[100px]"></div>
        <h1 className="text-orange-600 text-4xl mb-5">Nos livres</h1>
        <form
          onSubmit={handleSearchSubmit}
          className=" mb-6 flex flex-col gap-5 md:flex-row  px-4  justify-center items-center "
        >
          <select
            className="text-primary p-2 my-3 outline-none rounded"
            id="category"
            name="category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="All">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex justify-center ">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Rechercher par titre..."
              className="flex-grow text-primary placeholder:text-primary p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 "
            >
              <FaSearch />
            </button>
          </div>
        </form>
        {loading ? (
          <h3 className="text-accent text-center text-2xl mt-5">
            Chargement...
          </h3>
        ) : filteredBooks.length === 0 && loading === false ? (
          <h3 className="text-accent text-center text-2xl mt-5">
            Aucun livre trouvé
          </h3>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 text-left capitalize py-6 ">
            {filteredBooks.map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} // Initial state
                animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
              >
                <Book book={book} />
              </motion.div>
            ))}
          </div>
        )}
        <Pagination />
      </div>
    </div>
  );
}
