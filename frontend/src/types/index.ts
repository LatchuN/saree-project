// ===== USER & AUTH =====

export interface User {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

// ===== CATEGORIES =====

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

// ===== PRODUCTS =====

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  category_id: string | null;
  category?: Category;
  images: string[];
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  metadata: Record<string, unknown>;
  avg_rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

// ===== CART =====

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
  created_at: string;
}

export interface LocalCartItem {
  product_id: string;
  quantity: number;
  product?: Product;
}

// ===== WISHLIST =====

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

// ===== ADDRESS =====

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string | null;
  pincode: string;
  is_default: boolean;
  created_at: string;
}

export interface AddressFormData {
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

// ===== ORDERS =====

export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  address?: Address;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  payment_status: 'pending_verification' | 'verified' | 'rejected';
  transaction_id: string | null;
  payment_proof_url: string | null;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
  created_at: string;
}

// ===== REVIEWS =====

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  user?: Pick<User, 'full_name' | 'avatar_url'>;
  created_at: string;
  updated_at: string;
}

export interface ReviewFormData {
  product_id: string;
  rating: number;
  comment: string;
}

// ===== API RESPONSES =====

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// ===== DASHBOARD =====

export interface DashboardStats {
  total_products: number;
  total_orders: number;
  total_users: number;
  total_revenue: number;
  recent_orders: Order[];
  order_status_counts: Record<string, number>;
}

// ===== TOAST =====

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
