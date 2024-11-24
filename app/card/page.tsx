"use client";
import React, { ChangeEvent, useState } from "react";
import CardItem from "@/components/CardItem";
import { useBookContext } from "@/context/BookContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "@/hooks/useLocaleStorage";

export default function Card() {
  const { cartItems, cartItemsQuantity, TotalCartPrice, books, setCartItems } =
    useBookContext();
  console.log("books in card", books);
  const [storedCartItems, setStoredCartItems, clearCartItems] = useLocalStorage(
    "shopping-cart",
    []
  );
  const [oredrMessage, setOrderMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
  });
  const [status, setStatus] = useState("Envoyer");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    try {
      const payload = {
        formData,
        cartItems,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setStatus(result.status);
      toast.success("Envoi réussi");
      clearCartItems();
      setCartItems([]);
      setOrderMessage(true);
    } catch (error) {
      setStatus("Submission failed");
      toast.error("Erreur lors de l'envoi de l'e-mail !");
    } finally {
      setStatus("Envoyer");

      setFormData({
        name: "",
        email: "",
        adress: "",
        phone: "",
      });
    }
  };
  return (
    <div className="min-h-[100vh] mt-[120px] w-[90%] m-auto mb-24">
      <h1 className="text-orange-600 text-3xl text-center mb-8">
        Livres dans votre panier
      </h1>
      {cartItemsQuantity > 0 ? (
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between w-[100%] md:gap-5">
          <div className="w-[100%] md:w-[70%]">
            <div>
              {cartItems.map((item, i) => (
                <CardItem key={i} item={item} />
              ))}
            </div>
            <p className="text-accent text-2xl my-6">
              `Pour procéder à votre commande, veuillez remplir le formulaire
              avec vos informations. Une fois que nous aurons vos coordonnées,
              nous vous contacterons par téléphone pour discuter des options de
              paiement et de la manière dont vous souhaitez recevoir votre
              commande, que ce soit par livraison ou un autre moyen.`
            </p>
          </div>
          <div className=" w-[100%] md:w-[30%] ">
            <div
              className={`bg-primary py-5   flex justify-between mb-4  h-fit mr-auto rounded-2xl  `}
            >
              <div className="px-4 py-1 text-accent my-auto">
                <h3 className=" text-orange-500 mb-3">Quantité totale:</h3>
                <p>{cartItemsQuantity}</p>
              </div>
              <div className="px-4 py-1 text-accent my-auto">
                <h3 className=" text-orange-500 mb-3">Prix total:</h3>
                <p>{TotalCartPrice} DA</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className=" border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4   shadow-md self-end"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-accent">
                  Nom:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent focus:outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Téléphone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className=" p-1 rounded bg-[#222] text-accent outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="adress">Adresse:</label>
                <input
                  id="adress"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent "
                />
              </div>
              <button
                className="bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 focus:outline-none w-full md:w-auto"
                type="submit"
              >
                {status}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-3xl mt-10">Votre panier est vide!</h2>
          {oredrMessage ? (
            <p className="text-orange-600 text-3xl text-center mt-8">
              `Merci de nous avoir choisis ! Nous avons bien reçu votre commande
              et nous vous contacterons sous peu pour plus de détails concernant
              l`expédition et les options de paiement.`
            </p>
          ) : null}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
