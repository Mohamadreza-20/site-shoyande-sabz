export type CartItem = {
  id: string;
  title: string;
  image: string;
  category: string;
  priceValue: number;
  quantity: number;
  stock?: number;
};
