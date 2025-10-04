import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { Cart, AddToCartDto, CartItem } from '../models/cart.model';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

interface ApiCartItem {
  cart_id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  async getCart(): Promise<Cart> {
    try {
      // Get cart items from the API
      const response = await axiosInstance.get<ApiCartItem[]>('/cart');
      const apiCartItems = response.data;
      
      console.log('Raw cart response:', apiCartItems);
      
      if (!apiCartItems || !Array.isArray(apiCartItems)) {
        console.error('Invalid cart data received:', apiCartItems);
        return { items: [], total: 0 };
      }
      
      // Transform the API response to the expected Cart format
      const cartItems: CartItem[] = [];
      let total = 0;
      
      // Fetch product details for each cart item
      for (const item of apiCartItems) {
        try {
          const product = await this.productService.getProduct(item.product_id);
          
          cartItems.push({
            id: item.cart_id,
            product_id: item.product_id,
            quantity: item.quantity,
            product: {
              id: product.product_id,
              name: product.name,
              price: product.price,
              image_url: product.imageUrl
            }
          });
          
          total += product.price * item.quantity;
        } catch (error) {
          console.error(`Failed to fetch product ${item.product_id}:`, error);
          // Add the item even without product details
          cartItems.push({
            id: item.cart_id,
            product_id: item.product_id,
            quantity: item.quantity
          });
        }
      }
      
      const formattedCart: Cart = {
        items: cartItems,
        total: total
      };
      
      console.log('Formatted cart:', formattedCart);
      return formattedCart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { items: [], total: 0 };
    }
  }

  async addToCart(productId: number, quantity: number): Promise<Cart> {
    try {
      const user = this.authService.getStoredUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Simplified request format as per your API
      const data = { 
        product_id: productId, 
        quantity 
      };
      
      console.log('Adding to cart:', data);
      await axiosInstance.post('/cart', data);
      
      // After adding to cart, get the updated cart
      return this.getCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async updateCartItem(productId: number, quantity: number): Promise<Cart> {
    try {
      await axiosInstance.put(`/cart/${productId}`, { quantity });
      // After updating cart item, get the updated cart
      return this.getCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  async removeFromCart(productId: number): Promise<Cart> {
    try {
      await axiosInstance.delete(`/cart/${productId}`);
      // After removing from cart, get the updated cart
      return this.getCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }
}
