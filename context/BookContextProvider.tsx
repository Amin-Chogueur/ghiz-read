"use client";
import React, {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookType, CartItem, Category } from "@/types/interfaceses";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useLocaleStorage";
import { useRouter } from "next/navigation";

export interface BookContextType {
  books: BookType[];
  categories: Category[];
  loading: boolean;
  totalBooks: number;
  search: string;
  isMusicPlayed: boolean;
  showBooks: boolean;
  setShowBooks: React.Dispatch<React.SetStateAction<boolean>>;
  pageToLoad: string;
  handlePlayMusic: () => void;
  setPageToLoad: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (searchTerm: string) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItemsQuantity: number;
  TotalCartPrice: number;
  book: BookType | null;
  getBookFromApi: (id: string) => void;
  getBooksFromApi: () => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  incressQuantity: (id: string) => void;
  decressQuantity: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookContextProvider");
  }
  return context;
}

export default function BookContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const route = useRouter();
  const [pageToLoad, setPageToLoad] = useState("1");
  const [search, setSearch] = useState<string>("");
  const [isMusicPlayed, setIsMusicPlay] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [books, setBooks] = useState<BookType[]>([]);
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  function handlePlayMusic() {
    setIsMusicPlay(true);
  }

  async function getBooksFromApi() {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://ghiz-read-admin.vercel.app/api/books?page=${pageToLoad}${
          search !== "" ? `&search=${search}` : ""
        }`
      );
      const { books, totalBooks, categories } = res.data;
      setBooks(books);
      setCategories(categories);
      setTotalBooks(totalBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getBookFromApi(id: string) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://ghiz-read-admin.vercel.app/api/books/${id}`
      );
      setBook(res.data);
    } catch (error) {
      console.log("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle search submission
  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
    //encodeURIComponent(searchTerm)
    route.push(`/?page=1&search=${searchTerm}`);
  }

  function addItem(id: string) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.itemId === id);
      if (existingItem) {
        return prevItems; // Item already in cart, no need to add again
      } else {
        // Find the full book details
        const newBook = books.find((book) => book._id === id);
        if (!newBook) return prevItems; // If no book found, return previous state

        // Create a new cart item with all book properties and a quantity of 1
        const newCartItem: CartItem = {
          title: newBook.title,
          description: newBook.description,
          price: newBook.price,
          itemId: newBook._id,
          image: newBook.image,
          quantityInStore: newBook.quantity,
          quantityInCart: 1, // Default quantity
          category: newBook.category,
          categoryName: newBook.categoryName,
          auther: newBook.auther,
        };

        return [...prevItems, newCartItem]; // Add the new cart item to the cart
      }
    });
  }

  function removeItem(id: string) {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== id));
  }

  function incressQuantity(id: string) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantityInCart < item.quantityInStore
          ? { ...item, quantityInCart: item.quantityInCart + 1 }
          : item
      )
    );
  }

  function decressQuantity(id: string) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantityInCart > 1
          ? { ...item, quantityInCart: item.quantityInCart - 1 }
          : item
      )
    );
  }

  const cartItemsQuantity = cartItems.reduce(
    (acu, cur) => acu + cur.quantityInCart,
    0
  );

  const TotalCartPrice = cartItems.reduce(
    (acu, item) => acu + Number(item.price) * item.quantityInCart,
    0
  );

  useEffect(() => {
    getBooksFromApi();
  }, [pageToLoad, search]);
  return (
    <BookContext.Provider
      value={{
        books,
        categories,
        totalBooks,
        loading,
        search,
        pageToLoad,
        isMusicPlayed,
        showBooks,
        book,
        getBookFromApi,
        getBooksFromApi,
        setShowBooks,
        handlePlayMusic,
        setSearch,
        setPageToLoad,
        handleSearch,
        cartItems,
        cartItemsQuantity,
        TotalCartPrice,
        setCartItems,
        addItem,
        removeItem,
        incressQuantity,
        decressQuantity,
      }}
    >
      <Suspense fallback={<div>Loading from suspense...</div>}>
        {children}
      </Suspense>
    </BookContext.Provider>
  );
}
