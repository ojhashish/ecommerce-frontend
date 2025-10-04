# E-Commerce Portal - Angular Frontend

A modern Angular 20.2+ frontend for an e-commerce management portal with role-based authentication.

## Technical Stack

- **Angular 20.2+** - Latest Angular framework
- **Axios** - HTTP client for API calls (instead of HttpClient)
- **Angular Material** - UI component library
- **Reactive Forms** - Form handling
- **JWT Authentication** - Token-based auth with LocalStorage
- **ngx-toastr** - Toast notifications
- **RxJS** - Reactive state management
- **TypeScript** - Type-safe development
- **SCSS** - Styling

## Features

### Authentication
- ✅ User Registration (Customer role)
- ✅ User Login with JWT
- ✅ Role-based routing (ADMIN/CUSTOMER)
- ✅ Route guards for protection

### Customer Features (/shop)
- ✅ Browse and search products
- ✅ Filter by category
- ✅ Add products to cart
- ✅ View and manage cart
- ✅ Checkout process
- ✅ View order history
- ✅ View order details

### Admin Features (/admin)
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ Order management
- ✅ Update order status
- ✅ Sales reports

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── api/               # Axios instance and service files
│   │   │   ├── axios-instance.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── order.service.ts
│   │   │   └── admin.service.ts
│   │   ├── guards/            # AuthGuard, RoleGuard
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   └── models/            # TypeScript interfaces
│   │       ├── auth.model.ts
│   │       ├── product.model.ts
│   │       ├── cart.model.ts
│   │       ├── order.model.ts
│   │       └── common.model.ts
│   ├── auth/                  # Login, Register components
│   │   ├── login/
│   │   └── register/
│   ├── shared/                # Shared components
│   │   ├── header/
│   │   └── unauthorized/
│   ├── customer/              # Customer-facing components
│   │   ├── product-list/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── order-detail/
│   ├── admin/                 # Admin components
│   │   ├── dashboard/
│   │   ├── product-management/
│   │   ├── category-management/
│   │   └── order-management/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts         # Development config
│   └── environment.prod.ts    # Production config
├── assets/
├── styles.scss
└── main.ts
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 20.2+
- Backend server running on http://localhost:3000

### Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Install Angular Material:**
```bash
ng add @angular/material
```

3. **Configure environment:**
Update `src/environments/environment.ts` with your backend API URL:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000'
};
```

4. **Run the development server:**
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

## API Integration

### Axios Setup

All API calls use a custom Axios instance (`core/api/axios-instance.ts`) that:
- Automatically adds JWT token to requests
- Handles 401 unauthorized errors
- Redirects to login on token expiration

### Services

Each feature has a dedicated service:
- **AuthService**: Login, register, logout, getCurrentUser
- **ProductService**: CRUD operations for products
- **CategoryService**: CRUD operations for categories
- **CartService**: Cart operations
- **OrderService**: Order checkout and management
- **AdminService**: Admin statistics and reports

## Authentication Flow

1. User registers/logs in
2. JWT token is stored in localStorage
3. Token is automatically attached to all API requests
4. On successful login, redirect based on role:
   - CUSTOMER → `/shop`
   - ADMIN → `/admin/dashboard`
5. Routes are protected by guards
6. Token expiration triggers automatic logout

## Route Guards

### AuthGuard
Checks if user is authenticated. Redirects to `/login` if not.

### RoleGuard
Checks if user has required role. Uses route data:
```typescript
{
  path: 'admin/dashboard',
  canActivate: [authGuard, roleGuard],
  data: { roles: ['ADMIN'] }
}
```

## Development

### Generate Component
```bash
ng generate component customer/my-component --standalone
```

### Generate Service
```bash
ng generate service core/api/my-service
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Backend API Endpoints

The application expects the following endpoints from the backend:

### Auth
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user

### Products
- GET `/products` - List all products (with search & category filter)
- GET `/products/:id` - Get product by ID
- POST `/products` - Create product (ADMIN)
- PUT `/products/:id` - Update product (ADMIN)
- DELETE `/products/:id` - Delete product (ADMIN)

### Categories
- GET `/categories` - List all categories
- POST `/categories` - Create category (ADMIN)
- PUT `/categories/:id` - Update category (ADMIN)
- DELETE `/categories/:id` - Delete category (ADMIN)

### Cart
- GET `/cart` - Get user's cart
- POST `/cart` - Add item to cart
- PUT `/cart/:productId` - Update cart item quantity
- DELETE `/cart/:productId` - Remove item from cart

### Orders
- POST `/orders/checkout` - Create order from cart
- GET `/orders` - Get user's orders
- GET `/orders/:id` - Get order details
- PUT `/orders/:id/status` - Update order status (ADMIN)

### Admin
- GET `/admin/reports/sales` - Get sales report
- GET `/admin/orders` - Get all orders

## Troubleshooting

### CORS Issues
Ensure backend has CORS enabled for `http://localhost:4200`

### Token Not Being Sent
Check that token is stored in localStorage and axios interceptor is working

### Module Not Found Errors
Run `npm install` to ensure all dependencies are installed

## License

ISC
