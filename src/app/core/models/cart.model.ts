export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image_url?: string;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface AddToCartDto {
  user_id: number;
  product_id: number;
  quantity: number;
}
