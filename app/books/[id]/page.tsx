"use client";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";

import Link from "next/link";
import { useBookContext } from "@/context/BookContextProvider";

export default function SingleBook({ params }: { params: { id: string } }) {
  const { id } = params;
  const { addItem, cartItems, book, loading, getBookFromApi } =
    useBookContext();
  const isAdded = useMemo(
    () =>
      cartItems.some((item) => item.itemId === book?._id)
        ? "Dans le panier"
        : "Ajouter au panier",
    [cartItems, book]
  );

  useEffect(() => {
    getBookFromApi(id);
  }, [id]);

  function handleScroll() {
    const section = document.getElementById("next-section");
    section?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <div className="relative w-full h-screen">
        <Image
          src="/books7.jpg"
          alt="Book Background"
          layout="fill"
          objectFit="cover"
        />
        <div className="bg-primary p-4 rounded-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-orange-600 text-center text-lg sm:text-3xl lg:text-5xl sm:mb-5">
            {book?.title}
          </h2>
          <p className="text-lg hidden sm:block text-center text-accent">
            Choix fantastique ! 📖 Préparez-vous pour un voyage inoubliable !
          </p>
        </div>
        <button
          onClick={handleScroll}
          className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-700 hover:bg-orange-600 text-white p-2 rounded-[10px]"
        >
          Découvrir plus &darr;
        </button>
      </div>

      <div id="next-section" className="mb-[100px] "></div>
      {loading ? (
        <div className="h-[100vh] flex justify-center items-center">
          <h2 className=" text-2xl">Chargement...</h2>
        </div>
      ) : null}
      {book ? (
        <div>
          {book.quantity <= 0 && (
            <h1 className="text-center text-xl text-orange-500 w-[90%] md:w-[60%] mx-auto mb-6">
              Ce livre est actuellement indisponible. Contactez-nous via le
              formulaire de contact ou par téléphone pour le commander.
            </h1>
          )}
          <Link
            href="/"
            className="block w-[90%] mx-auto text-orange-500 underline"
          >
            &larr; Retour
          </Link>

          <div className="lg:grid lg:grid-cols-2 w-[90%] mx-auto mb-24 mt-4">
            <div className="mx-auto lg:mx-0 w-fit">
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={200}
                className="mx-auto lg:mx-0 mb-5"
              />
            </div>

            <div className="lg:ml-[-80px] text-accent text-xl">
              <h3 className="mb-2">
                <span className="text-orange-600">Auteur :</span> {book.auther}
              </h3>
              <p className="mb-2">
                <span className="text-orange-600">Description :</span>{" "}
                {book.description}
              </p>
              <h3>
                <span className="text-orange-600">Nombre de Pages :</span>{" "}
                {book.numberOfPages}
              </h3>
              <div className="flex justify-between mt-5">
                <h3>
                  <span className="text-orange-600">Catégorie :</span>{" "}
                  {book.category.name}
                </h3>
                <h3>
                  <span className="text-orange-600">Prix :</span> {book.price}{" "}
                  DA
                </h3>
              </div>

              {book.quantity > 0 ? (
                <button
                  disabled={
                    !!cartItems.find((item) => item.itemId === book._id)
                  }
                  onClick={() => addItem(book._id)}
                  className="disabled:bg-accent disabled:text-black bg-orange-700 p-2 rounded-lg mt-8 text-white"
                >
                  {isAdded}
                </button>
              ) : (
                <Link
                  className="block w-fit bg-orange-700 p-2 rounded-lg mt-12 text-white"
                  href={"/contact"}
                >
                  Contactez-nous &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center text-accent text-2xl mt-5">
          Erreur de chargement du livre.
        </h3>
      )}
    </div>
  );
}
