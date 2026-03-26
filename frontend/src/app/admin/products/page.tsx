'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const DEMO_PRODUCTS = [
  { id: '1', name: 'Royal Kanchipuram Silk', price: 12999, stock_quantity: 10, is_active: true, category_name: 'Kanchipuram', is_featured: true },
  { id: '2', name: 'Banarasi Bridal Gold', price: 24999, stock_quantity: 5, is_active: true, category_name: 'Banarasi', is_featured: true },
  { id: '3', name: 'Soft Silk Turquoise', price: 4999, stock_quantity: 20, is_active: true, category_name: 'Soft Silk', is_featured: false },
  { id: '4', name: 'Bridal Red Embroidered', price: 35999, stock_quantity: 3, is_active: true, category_name: 'Bridal', is_featured: true },
  { id: '5', name: 'Pattu Temple Border', price: 8999, stock_quantity: 0, is_active: false, category_name: 'Pattu', is_featured: false },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');

  const filtered = DEMO_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-burgundy">Products</h2>
        <a href="/admin/products/new" className="btn-primary text-sm">
          <Plus size={16} /> Add Product
        </a>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
        <input type="text" placeholder="Search products..." className="input-field pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-text-muted">Product</th>
              <th className="text-left p-4 font-semibold text-text-muted">Category</th>
              <th className="text-left p-4 font-semibold text-text-muted">Price</th>
              <th className="text-left p-4 font-semibold text-text-muted">Stock</th>
              <th className="text-left p-4 font-semibold text-text-muted">Status</th>
              <th className="text-right p-4 font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg bg-gradient-to-br from-maroon to-maroon-dark" />
                    <div>
                      <p className="font-semibold text-text-primary">{product.name}</p>
                      {product.is_featured && <span className="badge badge-gold text-[10px]">Featured</span>}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-text-secondary">{product.category_name}</td>
                <td className="p-4 font-semibold">{formatPrice(product.price)}</td>
                <td className="p-4">
                  <span className={product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500 font-semibold'}>
                    {product.stock_quantity > 0 ? product.stock_quantity : 'Out of stock'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`badge ${product.is_active ? 'badge-success' : 'badge-error'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-text-muted hover:text-maroon rounded-lg hover:bg-cream transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="p-2 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
