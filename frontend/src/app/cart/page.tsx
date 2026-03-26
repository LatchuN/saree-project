'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

// Demo cart items
const INITIAL_CART = [
  { id: '1', product_id: '1', quantity: 1, product: { name: 'Royal Kanchipuram Silk Saree', price: 12999, images: [], slug: 'royal-kanchipuram' } },
  { id: '2', product_id: '3', quantity: 2, product: { name: 'Soft Silk Turquoise Dream', price: 4999, images: [], slug: 'soft-silk-turquoise' } },
];

const CART_COLORS = ['from-red-800 to-amber-700', 'from-teal-700 to-cyan-600'];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems(cartItems.filter((i) => i.id !== id));
    } else {
      setCartItems(cartItems.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 2999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <ShoppingBag size={64} className="text-border mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-burgundy mb-2">Your Cart is Empty</h2>
          <p className="text-text-muted mb-6">Add some beautiful sarees to get started!</p>
          <Link href="/products" className="btn-primary">Browse Sarees <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-surface border-b border-border">
        <div className="container-silk py-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-burgundy">Shopping Cart</h1>
          <p className="text-sm text-text-muted mt-1">{cartItems.length} item(s)</p>
        </div>
      </div>

      <div className="container-silk py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 border border-border rounded-xl hover:border-gold/30 transition-colors"
              >
                {/* Product Image */}
                <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden shrink-0">
                  <div className={`w-full h-full bg-gradient-to-br ${CART_COLORS[i] || 'from-amber-800 to-red-700'} flex items-center justify-center`}>
                    <span className="text-3xl opacity-30">🪡</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`} className="font-semibold text-text-primary hover:text-maroon transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-lg font-bold text-maroon mt-1">{formatPrice(item.product.price)}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1.5 hover:bg-cream rounded-l-lg"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1.5 hover:bg-cream rounded-r-lg"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => updateQty(item.id, 0)} className="p-2 text-text-muted hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="hidden sm:block text-right">
                  <p className="font-bold text-text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-heading font-bold text-burgundy mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gold-dark">Add {formatPrice(2999 - subtotal)} more for free shipping!</p>
                )}
                <div className="section-divider !my-3" />
                <div className="flex justify-between text-base">
                  <span className="font-bold text-text-primary">Total</span>
                  <span className="font-bold text-maroon text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full !py-3 mt-6" id="checkout-btn">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <Link href="/products" className="block text-center text-sm text-text-muted hover:text-maroon mt-4 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
