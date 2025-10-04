export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    image_url?: string;
  };
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface CheckoutResponse {
  order: Order;
  message: string;
}
