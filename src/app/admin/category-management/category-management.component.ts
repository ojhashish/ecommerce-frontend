import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/api/category.service';
import { Category } from '../../core/models/product.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="page-container">
      <div class="header-section">
        <h1>Category Management</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Category
        </button>
      </div>
      <mat-table [dataSource]="categories">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let cat">{{ cat.id }}</td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let cat">{{ cat.name }}</td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let cat">{{ cat.description || '-' }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let cat">
            <button mat-icon-button color="primary"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn" (click)="deleteCategory(cat.id)"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </mat-table>
    </div>
  `,
  styles: [`
    .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    mat-table { width: 100%; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  `]
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['id', 'name', 'description', 'actions'];

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      this.categories = await this.categoryService.getCategories();
    } catch (error: any) {
      this.toastr.error('Failed to load categories', 'Error');
    }
  }

  async deleteCategory(id: number) {
    if (confirm('Are you sure?')) {
      try {
        await this.categoryService.deleteCategory(id);
        this.toastr.success('Category deleted', 'Success');
        this.loadCategories();
      } catch (error: any) {
        this.toastr.error('Failed to delete category', 'Error');
      }
    }
  }
}
