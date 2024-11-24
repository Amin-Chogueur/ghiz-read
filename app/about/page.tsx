"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { useBookContext } from "@/context/BookContextProvider";

export default function About() {
  // Use two different refs for the image and text
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Triggers when element is about to enter the viewport
  const { isMusicPlayed } = useBookContext();

  return (
    <div className="my-28 ">
      <h1 className="text-orange-500 text-4xl text-center mb-5">
        À Propos de Nous
      </h1>
      <div
        ref={ref}
        className="flex-col lg:flex-row flex justify-between gap-10 w-[90%] mx-auto mb-6 "
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Start off-screen (left)
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Animate in when in view
          transition={{ duration: 1 }}
        >
          <div className="mt-6">
            <Image src={"/about.jpg"} alt="image" width={800} height={800} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Start off-screen (right)
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Animate in when in view
          transition={{ duration: 1 }}
        >
          {" "}
          <div className="text-accent">
            <h3 className="text-orange-500 text-2xl my-4">
              Bienvenue sur Ghiz Read Librairie!
            </h3>
            <p className="text-xl">
              Chez Ghiz Read Store, nous croyons que chaque livre ouvre une
              nouvelle porte vers l’aventure, le savoir et l’inspiration. Notre
              collection soigneusement sélectionnée propose une large gamme de
              genres, des classiques intemporels aux derniers best-sellers,
              garantissant qu’il y a un livre pour chaque lecteur.
            </p>
            <h3 className="text-orange-500 text-2xl my-4">
              Pourquoi Nous Choisir ?
            </h3>
            <ul>
              <li className="text-xl">
                <strong>Large Sélection :</strong> Découvrez notre vaste choix
                de livres pour tous les goûts et tous les âges. Que vous soyez
                fan de fiction, non-fiction, littérature jeunesse, ou
                développement personnel, nous avons le livre parfait qui vous
                attend.
              </li>
              <li className="text-xl">
                <strong>Expérience Personnalisée :</strong> Notre équipe
                passionnée est dédiée à vous aider à trouver votre prochaine
                lecture préférée. Nous sommes toujours là pour vous fournir des
                recommandations adaptées à vos intérêts.
              </li>
              <li className="text-xl">
                <strong>Focalisation sur la Communauté :</strong> Nous sommes
                bien plus qu`une simple librairie ; nous sommes un lieu de
                rencontre pour les amoureux des livres. Rejoignez-nous pour des
                événements passionnants, des séances de dédicaces et des groupes
                de lecture qui favorisent les échanges et enrichissent les
                discussions.
              </li>
            </ul>
            <h3 className="text-orange-500 text-2xl my-4">
              Rejoignez Notre Communauté !
            </h3>
            <p className="text-xl">
              Nous vous invitons à parcourir notre collection en ligne et à
              découvrir le plaisir de la lecture. Si vous avez des questions ou
              besoin d’assistance, n’hésitez pas à nous contacter ! Remplissez
              notre formulaire de contact et connectons-nous. Votre voyage dans
              le monde des livres commence ici, et nous avons hâte d`en faire
              partie.
            </p>
            <p className="text-xl">
              Merci d`avoir choisi Ghiz Read. Bonne lecture !
            </p>
          </div>
        </motion.div>
      </div>
      <div className="text-center">
        <Link
          href={"/contact"}
          className="bg-orange-700 hover:bg-orange-600 p-2 rounded-md"
        >
          Restez en Contact &rarr;
        </Link>
      </div>
    </div>
  );
}
/**  <p className="text-xl">
              {" "}
              At Ghiz Read Store, we believe that every book opens a new door to
              adventure, knowledge, and inspiration. Our carefully curated
              collection features a wide range of genres, from timeless classics
              to the latest bestsell -mers, ensuring that there’s something for
              every reader.
            </p>
            <h3 className="text-orange-500 text-2xl my-4">Why Choose Us?</h3>
            <ul>
              <li className="text-xl">
                Diverse Selection: Explore our vast array of books that cater to
                all tastes and ages. Whether you’re a fan of fiction,
                non-fiction, children’s literature, or self-help, we have the
                perfect book waiting for you.
              </li>
              <li className="text-xl">
                Personalized Experience: Our passionate team is dedicated to
                helping you find your next favorite read. We’re always here to
                provide recommendations tailored to your interests.{" "}
              </li>
              <li className="text-xl">
                {" "}
                Community Focus: We’re more than just a bookstore; we’re a hub
                for book lovers. Join us for exciting events, book signings, and
                reading groups that foster connections and ignite discussions.{" "}
              </li>
            </ul>
            <h3 className="text-orange-500 text-2xl my-4">
              {" "}
              Join Our Community!
            </h3>
            <p className="text-xl">
              {" "}
              We invite you to browse our online collection and discover the joy
              of reading. If you have any questions or need assistance, don’t
              hesitate to reach out! Fill out our contact form, and let’s
              connect. Your journey into the world of books starts here, and we
              can’t wait to be a part of it.
            </p>
            <p className="text-xl">
              {" "}
              Thank you for choosing Book App Store. Happy reading!
            </p>
          </div> */
