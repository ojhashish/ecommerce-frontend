import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/api/cart.service';
import { Cart } from '../../core/models/cart.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, RouterModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = false;
  displayedColumns = ['product', 'price', 'quantity', 'subtotal', 'actions'];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    this.loading = true;
    try {
      console.log('Cart component: Loading cart data...');
      this.cart = await this.cartService.getCart();
      console.log('Cart component: Cart data loaded successfully:', this.cart);
    } catch (error: any) {
      console.error('Cart component: Error loading cart:', error);
      this.toastr.error('Failed to load cart', 'Error');
    } finally {
      this.loading = false;
    }
  }

  async updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) return;
    try {
      this.cart = await this.cartService.updateCartItem(productId, newQuantity);
      this.toastr.success('Cart updated', 'Success');
    } catch (error: any) {
      this.toastr.error('Failed to update cart', 'Error');
    }
  }

  async removeItem(productId: number) {
    try {
      this.cart = await this.cartService.removeFromCart(productId);
      this.toastr.success('Item removed from cart', 'Success');
    } catch (error: any) {
      this.toastr.error('Failed to remove item', 'Error');
    }
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
