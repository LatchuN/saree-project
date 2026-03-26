'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: '1', name: 'Kanchipuram' },
  { id: '2', name: 'Banarasi' },
  { id: '3', name: 'Soft Silk' },
  { id: '4', name: 'Bridal' },
  { id: '5', name: 'Pattu' },
  { id: '6', name: 'Tussar' },
];

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '', description: '', price: '', compare_price: '', category_id: '', stock_quantity: '', is_featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product would be created via API in production!');
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-cream rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-heading font-bold text-burgundy">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Basic Information</h3>

          <div>
            <label className="text-sm font-semibold text-text-primary mb-1 block">Product Name</label>
            <input type="text" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Royal Kanchipuram Silk Saree" />
          </div>

          <div>
            <label className="text-sm font-semibold text-text-primary mb-1 block">Description</label>
            <textarea className="input-field min-h-[120px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the saree..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-text-primary mb-1 block">Price (₹)</label>
              <input type="number" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required placeholder="12999" />
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary mb-1 block">Compare Price (₹)</label>
              <input type="number" className="input-field" value={form.compare_price} onChange={(e) => setForm({ ...form, compare_price: e.target.value })} placeholder="18999" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-text-primary mb-1 block">Category</label>
              <select className="input-field" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary mb-1 block">Stock Quantity</label>
              <input type="number" className="input-field" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} placeholder="10" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 accent-maroon" />
            <span className="text-sm font-semibold text-text-primary">Featured Product</span>
          </label>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-semibold text-text-primary mb-4">Product Images</h3>
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-gold transition-colors cursor-pointer">
            <Upload size={32} className="text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-muted">Drag & drop images or click to upload</p>
            <p className="text-xs text-text-muted mt-1">JPEG, PNG, WebP up to 5MB</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary">Save Product</button>
          <Link href="/admin/products" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
