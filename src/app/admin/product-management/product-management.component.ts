import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/api/product.service';
import { Product } from '../../core/models/product.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, HeaderComponent],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  displayedColumns = ['id', 'name', 'price', 'stock', 'category', 'actions'];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    try {
      this.products = await this.productService.getProducts();
    } catch (error: any) {
      this.toastr.error('Failed to load products', 'Error');
    } finally {
      this.loading = false;
    }
  }

  async deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.productService.deleteProduct(id);
        this.toastr.success('Product deleted successfully', 'Success');
        this.loadProducts();
      } catch (error: any) {
        this.toastr.error('Failed to delete product', 'Error');
      }
    }
  }
}
