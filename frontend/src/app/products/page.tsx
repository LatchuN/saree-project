'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, Heart, ShoppingBag, X } from 'lucide-react';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import type { Product, Category } from '@/types';

const CATEGORIES = [
  { name: 'All', slug: '' },
  { name: 'Kanchipuram', slug: 'kanchipuram' },
  { name: 'Banarasi', slug: 'banarasi' },
  { name: 'Soft Silk', slug: 'soft-silk' },
  { name: 'Bridal', slug: 'bridal' },
  { name: 'Pattu', slug: 'pattu' },
  { name: 'Tussar', slug: 'tussar' },
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

// Demo products for visual display
const DEMO_PRODUCTS: Product[] = [
  { id: '1', name: 'Royal Kanchipuram Silk', slug: 'royal-kanchipuram', description: 'Traditional Kanchipuram silk saree with temple border and rich zari work', price: 12999, compare_price: 18999, category_id: '1', images: [], stock_quantity: 10, is_featured: true, is_active: true, metadata: {}, avg_rating: 4.8, review_count: 24, created_at: '', updated_at: '' },
  { id: '2', name: 'Banarasi Bridal Gold', slug: 'banarasi-bridal-gold', description: 'Exquisite Banarasi silk with heavy gold zari and intricate patterns', price: 24999, compare_price: 34999, category_id: '2', images: [], stock_quantity: 5, is_featured: true, is_active: true, metadata: {}, avg_rating: 4.9, review_count: 18, created_at: '', updated_at: '' },
  { id: '3', name: 'Soft Silk Turquoise', slug: 'soft-silk-turquoise', description: 'Lightweight soft silk saree perfect for daily wear', price: 4999, compare_price: 6999, category_id: '3', images: [], stock_quantity: 20, is_featured: false, is_active: true, metadata: {}, avg_rating: 4.5, review_count: 32, created_at: '', updated_at: '' },
  { id: '4', name: 'Bridal Red Embroidered', slug: 'bridal-red-embroidered', description: 'Heavy bridal saree with stone work and designer pallu', price: 35999, compare_price: 45999, category_id: '4', images: [], stock_quantity: 3, is_featured: true, is_active: true, metadata: {}, avg_rating: 5.0, review_count: 8, created_at: '', updated_at: '' },
  { id: '5', name: 'Pattu Temple Border', slug: 'pattu-temple-border', description: 'Classic Pattu silk with temple border design', price: 8999, compare_price: 11999, category_id: '5', images: [], stock_quantity: 15, is_featured: false, is_active: true, metadata: {}, avg_rating: 4.6, review_count: 14, created_at: '', updated_at: '' },
  { id: '6', name: 'Tussar Natural Gold', slug: 'tussar-natural-gold', description: 'Natural Tussar silk with hand-painted tribal motifs', price: 6999, compare_price: 9999, category_id: '6', images: [], stock_quantity: 8, is_featured: false, is_active: true, metadata: {}, avg_rating: 4.7, review_count: 21, created_at: '', updated_at: '' },
  { id: '7', name: 'Kanchipuram Peacock Blue', slug: 'kanchipuram-peacock-blue', description: 'Stunning peacock blue Kanchipuram with contrast border', price: 15999, compare_price: 19999, category_id: '1', images: [], stock_quantity: 7, is_featured: true, is_active: true, metadata: {}, avg_rating: 4.9, review_count: 11, created_at: '', updated_at: '' },
  { id: '8', name: 'Banarasi Meenakari Green', slug: 'banarasi-meenakari-green', description: 'Meenakari work on pure Banarasi silk', price: 19999, compare_price: 27999, category_id: '2', images: [], stock_quantity: 6, is_featured: false, is_active: true, metadata: {}, avg_rating: 4.4, review_count: 9, created_at: '', updated_at: '' },
];

const SAREE_COLORS: Record<string, string> = {
  '1': 'from-red-800 to-amber-700',
  '2': 'from-purple-800 to-pink-700',
  '3': 'from-teal-700 to-cyan-600',
  '4': 'from-rose-800 to-red-600',
  '5': 'from-amber-800 to-yellow-600',
  '6': 'from-orange-800 to-amber-600',
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = DEMO_PRODUCTS.filter((p) => {
    if (activeCategory) {
      const catMap: Record<string, string> = {
        kanchipuram: '1', banarasi: '2', 'soft-silk': '3', bridal: '4', pattu: '5', tussar: '6',
      };
      if (p.category_id !== catMap[activeCategory]) return false;
    }
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-16">
        <div className="container-silk text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-cream mb-3">
            {activeCategory
              ? CATEGORIES.find((c) => c.slug === activeCategory)?.name + ' Silk Sarees'
              : 'All Silk Sarees'}
          </h1>
          <p className="text-cream/60">
            Discover our curated collection of handwoven silk masterpieces
          </p>
        </div>
      </div>

      <div className="container-silk py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search sarees..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="product-search"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              className="input-field !w-auto !py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-border rounded-lg sm:hidden"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block w-full sm:w-52 shrink-0`}>
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
                Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === cat.slug
                        ? 'bg-maroon text-cream font-semibold'
                        : 'text-text-secondary hover:bg-cream hover:text-maroon'
                    }`}
                    id={`filter-${cat.slug || 'all'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-text-muted mb-6">
              Showing {filteredProducts.length} sarees
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/products/${product.slug}`} className="block product-card group">
                    {/* Image Placeholder */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${SAREE_COLORS[product.category_id || '1']} product-image`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30">🪡</span>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.is_featured && (
                          <span className="badge badge-gold text-[10px]">Featured</span>
                        )}
                        {getDiscountPercent(product.price, product.compare_price) && (
                          <span className="badge badge-maroon text-[10px] !bg-maroon !text-cream">
                            {getDiscountPercent(product.price, product.compare_price)}% OFF
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                        <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                          <Heart size={16} className="text-maroon" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                          <ShoppingBag size={16} className="text-maroon" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1 group-hover:text-maroon transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-text-muted mb-2 line-clamp-1">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            size={12}
                            className={j < Math.round(product.avg_rating || 0) ? 'star-filled fill-gold' : 'star-empty'}
                          />
                        ))}
                        <span className="text-xs text-text-muted ml-1">({product.review_count})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-maroon">{formatPrice(product.price)}</span>
                        {product.compare_price && (
                          <span className="text-sm text-text-muted line-through">
                            {formatPrice(product.compare_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-heading font-bold text-burgundy mb-2">No sarees found</h3>
                <p className="text-text-muted">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="skeleton w-40 h-8" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
