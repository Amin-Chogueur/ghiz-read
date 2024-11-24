"use client";
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import axios from "axios";
function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
  });
  const [status, setStatus] = useState("Submit");
  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("Submition...");
    try {
      const res = await axios.post("/api/contact", { formData });
      const result = res.data;
      console.log(formData);
      toast.success(result.message);
    } catch (error) {
      setStatus("Submission failed");
      toast.error("Error sending email!");
    } finally {
      setStatus("Submit");
      setFormData({
        name: "",
        email: "",
        adress: "",
        phone: "",
      });
    }
  };
  return (
    <div className=" w-[90%] mx-auto flex justify-center items-center mb-24 ">
      <div ref={ref}>
        <h2 className="text-orange-500 text-4xl text-center mb-8 mt-[120px]">
          Contactez-nous
        </h2>
        <div className="flex flex-col md:flex-row gap-28 justify-between items-start px-4 md:px-0 w-full  mx-auto mt-6 ">
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Start off-screen (left)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Animate in when in view
            transition={{ duration: 1 }}
            className="w-full"
          >
            <div className="text-accent  text-xl ">
              <p>
                Merci de visiter notre collection de livres ! Nous sommes là
                pour vous aider à découvrir de nouvelles lectures, répondre à
                toutes vos questions et partager ce qui rend notre Librairie
                spéciale.
              </p>
              <hr className="my-5 w-[50%]" />
              <p>
                Vous avez des questions sur notre collection ou besoin d`une
                recommandation de livre ? Nous sommes là pour vous aider ! Que
                vous soyez curieux d`un titre spécifique, d`un genre, ou que
                vous souhaitiez en savoir plus sur notre Librairie, n`hésitez
                pas à nous contacter. Nous serions ravis d`avoir de vos
                nouvelles !
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Start off-screen (right)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Animate in when in view
            transition={{ duration: 1 }}
            className=" w-full"
          >
            <form
              onSubmit={handleSubmit}
              className="border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4 w-full  shadow-md"
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
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
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
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactForm;
{
  /* <p>
Thank you for visiting our book collection! We`re here to help
you discover new reads, answer any questions, and share more
about what makes our library special.
</p>
<hr className="my-5 w-[50%] " />
<p>
Have questions about our collection or need a book
recommendation? We’re here to help! Whether you`re curious about
a specific title, genre, or just want to learn more about our
library, feel free to reach out. We’d love to hear from you!
</p> */
}
