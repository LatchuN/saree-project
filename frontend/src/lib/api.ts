const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

// Products
export const productsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/products${query}`);
  },
  get: (id: string) => fetchApi(`/products/${id}`),
  create: (data: FormData, token: string) =>
    fetchApi('/products', { method: 'POST', body: data, token, headers: {} }),
  update: (id: string, data: Record<string, unknown>, token: string) =>
    fetchApi(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data), token }),
  delete: (id: string, token: string) =>
    fetchApi(`/products/${id}`, { method: 'DELETE', token }),
};

// Categories
export const categoriesApi = {
  list: () => fetchApi('/categories'),
  create: (data: Record<string, unknown>, token: string) =>
    fetchApi('/categories', { method: 'POST', body: JSON.stringify(data), token }),
};

// Cart
export const cartApi = {
  get: (token: string) => fetchApi('/cart', { token }),
  add: (data: { product_id: string; quantity: number }, token: string) =>
    fetchApi('/cart', { method: 'POST', body: JSON.stringify(data), token }),
  update: (id: string, quantity: number, token: string) =>
    fetchApi(`/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity }), token }),
  remove: (id: string, token: string) =>
    fetchApi(`/cart/${id}`, { method: 'DELETE', token }),
};

// Wishlist
export const wishlistApi = {
  get: (token: string) => fetchApi('/wishlist', { token }),
  add: (product_id: string, token: string) =>
    fetchApi('/wishlist', { method: 'POST', body: JSON.stringify({ product_id }), token }),
  remove: (id: string, token: string) =>
    fetchApi(`/wishlist/${id}`, { method: 'DELETE', token }),
};

// Orders
export const ordersApi = {
  list: (token: string) => fetchApi('/orders', { token }),
  get: (id: string, token: string) => fetchApi(`/orders/${id}`, { token }),
  create: (data: Record<string, unknown>, token: string) =>
    fetchApi('/orders', { method: 'POST', body: JSON.stringify(data), token }),
};

// Payments
export const paymentsApi = {
  createOrder: (data: { amount: number; order_id: string }, token: string) =>
    fetchApi('/payments/create-order', { method: 'POST', body: JSON.stringify(data), token }),
  verify: (data: Record<string, string>, token: string) =>
    fetchApi('/payments/verify', { method: 'POST', body: JSON.stringify(data), token }),
};

// Reviews
export const reviewsApi = {
  getForProduct: (productId: string) => fetchApi(`/reviews/product/${productId}`),
  create: (data: { product_id: string; rating: number; comment: string }, token: string) =>
    fetchApi('/reviews', { method: 'POST', body: JSON.stringify(data), token }),
  update: (id: string, data: { rating: number; comment: string }, token: string) =>
    fetchApi(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data), token }),
  delete: (id: string, token: string) =>
    fetchApi(`/reviews/${id}`, { method: 'DELETE', token }),
};

// Admin
export const adminApi = {
  dashboard: (token: string) => fetchApi('/admin/dashboard', { token }),
  orders: (token: string) => fetchApi('/admin/orders', { token }),
  updateOrder: (id: string, data: Record<string, unknown>, token: string) =>
    fetchApi(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify(data), token }),
  users: (token: string) => fetchApi('/admin/users', { token }),
};

// Upload
export const uploadApi = {
  image: (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetchApi<{ url: string }>('/upload/image', {
      method: 'POST',
      body: formData,
      token,
      headers: {},
    });
  },
};

export { fetchApi };
