export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number;
  imageUrl?: string;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreateDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number;
  image_url?: string;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  image_url?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryCreateDto {
  name: string;
  description?: string;
}
