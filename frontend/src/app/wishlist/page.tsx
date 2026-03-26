'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const DEMO_WISHLIST = [
  { id: '1', name: 'Royal Kanchipuram Silk', price: 12999, compare_price: 18999, slug: 'royal-kanchipuram', category: 'Kanchipuram' },
  { id: '2', name: 'Banarasi Bridal Gold', price: 24999, compare_price: 34999, slug: 'banarasi-bridal-gold', category: 'Banarasi' },
  { id: '3', name: 'Tussar Natural Gold', price: 6999, compare_price: 9999, slug: 'tussar-natural-gold', category: 'Tussar' },
];

const COLORS = ['from-red-800 to-amber-700', 'from-purple-800 to-pink-700', 'from-orange-800 to-amber-600'];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-surface border-b border-border">
        <div className="container-silk py-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-burgundy">My Wishlist</h1>
          <p className="text-sm text-text-muted mt-1">{DEMO_WISHLIST.length} saved items</p>
        </div>
      </div>

      <div className="container-silk py-8">
        {DEMO_WISHLIST.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="text-border mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-burgundy mb-2">Wishlist is empty</h2>
            <p className="text-text-muted mb-6">Save your favourite sarees here!</p>
            <Link href="/products" className="btn-primary">Browse Sarees</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_WISHLIST.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="product-card group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${COLORS[i]} product-image`} />
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl opacity-20">🪡</span></div>
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-red-50 transition-colors">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gold-dark font-semibold uppercase">{item.category}</span>
                  <h3 className="font-semibold text-text-primary text-sm mt-1">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-maroon">{formatPrice(item.price)}</span>
                    <span className="text-sm text-text-muted line-through">{formatPrice(item.compare_price)}</span>
                  </div>
                  <button className="btn-primary w-full !py-2 mt-3 text-sm">
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
