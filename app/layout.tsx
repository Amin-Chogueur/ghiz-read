import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

import dynamic from "next/dynamic";
import MusicPlayer from "@/components/MusicPlayer";
const BookContextProvider = dynamic(
  () => import("@/context/BookContextProvider"),
  { ssr: false }
);
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ghiz Read",
  description:
    "Bienvenue chez Ghiz Read Librairie ! Découvrez notre vaste collection de livres soigneusement sélectionnés, allant des classiques intemporels aux derniers best-sellers. Offrez-vous une expérience personnalisée et rejoignez notre communauté de passionnés de lecture. Explorez, lisez et connectez-vous avec nous !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <BookContextProvider>
          <Header />

          <main className="block static">{children}</main>

          <Footer />
        </BookContextProvider>
      </body>
    </html>
  );
}
