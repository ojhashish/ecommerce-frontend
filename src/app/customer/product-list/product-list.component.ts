import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/api/product.service';
import { CategoryService } from '../../core/api/category.service';
import { CartService } from '../../core/api/cart.service';
import { Product, Category } from '../../core/models/product.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HeaderComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = false;
  searchTerm = '';
  selectedCategory: number | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  async loadCategories() {
    try {
      this.categories = await this.categoryService.getCategories();
    } catch (error: any) {
      console.error('Error loading categories:', error);
    }
  }

  async loadProducts() {
    this.loading = true;
    try {
      const params: any = {};
      if (this.searchTerm) {
        params.search = this.searchTerm;
      }
      if (this.selectedCategory) {
        params.category_id = this.selectedCategory;
      }
      this.products = await this.productService.getProducts(params);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load products';
      this.toastr.error(message, 'Error');
    } finally {
      this.loading = false;
    }
  }

  onSearch() {
    this.loadProducts();
  }

  onCategoryChange() {
    this.loadProducts();
  }

  async addToCart(product: Product) {
    try {
      await this.cartService.addToCart(product.product_id, 1);
      console.log(product.product_id, 1);
      this.toastr.success(`${product.name} added to cart!`, 'Success');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      this.toastr.error(message, 'Error');
    }
  }
}
