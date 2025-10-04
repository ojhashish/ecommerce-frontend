import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./customer/product-list/product-list.component').then(m => m.ProductListComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CUSTOMER'] }
  },
  {
    path: 'cart',
    loadComponent: () => import('./customer/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CUSTOMER'] }
  },
  {
    path: 'orders',
    loadComponent: () => import('./customer/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CUSTOMER'] }
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./customer/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CUSTOMER'] }
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/products',
    loadComponent: () => import('./admin/product-management/product-management.component').then(m => m.ProductManagementComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/categories',
    loadComponent: () => import('./admin/category-management/category-management.component').then(m => m.CategoryManagementComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/orders',
    loadComponent: () => import('./admin/order-management/order-management.component').then(m => m.OrderManagementComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
