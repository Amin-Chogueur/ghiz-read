export interface BookType {
  title: string;
  description: string;
  price: string;
  _id: string;
  image: string;
  quantity: number;
  category: Category;
  numberOfPages: string;
  auther: string;
}

export interface CartItem {
  title: string;
  description: string;
  price: string;
  itemId: string;
  image: string;
  quantityInCart: number;
  quantityInStore: number;
  categoryName: string;
  auther: string;
}
export interface Category {
  _id: string;
  name: string;
}
