'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus, Truck, ShieldCheck, Repeat } from 'lucide-react';
import { formatPrice, getDiscountPercent } from '@/lib/utils';

// Demo product for display
const DEMO_PRODUCT = {
  id: '1',
  name: 'Royal Kanchipuram Silk Saree',
  slug: 'royal-kanchipuram',
  description: `This exquisite Kanchipuram silk saree is a masterpiece of traditional South Indian weaving. Handcrafted by skilled artisans, it features:\n\n• Pure mulberry silk with authentic zari work\n• Traditional temple border with intricate motifs\n• Rich color palette that's perfect for weddings and festivals\n• Comes with a matching blouse piece\n\nThe saree is adorned with classic peacock and floral patterns, woven with pure gold zari thread. Each piece takes approximately 15-20 days to complete, making it a true labor of love.`,
  price: 12999,
  compare_price: 18999,
  category_name: 'Kanchipuram',
  images: ['1', '2', '3', '4'],
  stock_quantity: 10,
  avg_rating: 4.8,
  review_count: 24,
};

const DEMO_REVIEWS = [
  { id: '1', user_name: 'Priya M.', rating: 5, comment: 'Absolutely gorgeous saree! The zari work is so detailed and the silk quality is premium. Got so many compliments at the wedding.', created_at: '2026-02-15T00:00:00Z', user_avatar: null },
  { id: '2', user_name: 'Lakshmi S.', rating: 5, comment: 'Beautiful saree with rich colors. The border design is exactly as shown. Delivery was quick and well-packaged.', created_at: '2026-01-20T00:00:00Z', user_avatar: null },
  { id: '3', user_name: 'Anita R.', rating: 4, comment: 'Very nice quality silk. The color was slightly different from the picture but still beautiful. Would buy again.', created_at: '2026-01-05T00:00:00Z', user_avatar: null },
];

const IMAGE_GRADIENTS = [
  'from-red-800 to-amber-700',
  'from-red-900 to-rose-700',
  'from-amber-800 to-red-700',
  'from-rose-800 to-amber-600',
];

export default function ProductDetailPage() {
  const product = DEMO_PRODUCT;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const discount = getDiscountPercent(product.price, product.compare_price);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container-silk py-3">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-maroon transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-text-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-silk py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
              <div className={`absolute inset-0 bg-gradient-to-br ${IMAGE_GRADIENTS[selectedImage]} transition-all duration-500`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20">🪡</span>
              </div>

              {discount && (
                <div className="absolute top-4 left-4">
                  <span className="badge !bg-maroon !text-cream">{discount}% OFF</span>
                </div>
              )}

              {/* Nav arrows */}
              <button
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-gold shadow-glow' : 'border-border hover:border-gold/50'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${IMAGE_GRADIENTS[i]}`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="badge badge-gold mb-3">{product.category_name}</span>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-burgundy mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.avg_rating) ? 'star-filled fill-gold' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-text-primary">{product.avg_rating}</span>
              <span className="text-sm text-text-muted">({product.review_count} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-maroon">{formatPrice(product.price)}</span>
              {product.compare_price && (
                <>
                  <span className="text-lg text-text-muted line-through">{formatPrice(product.compare_price)}</span>
                  <span className="badge badge-maroon !bg-green-100 !text-green-800">Save {formatPrice(product.compare_price - product.price)}</span>
                </>
              )}
            </div>

            <p className="text-text-muted text-sm mb-1">Inclusive of all taxes</p>

            <div className="section-divider !my-6" />

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-text-primary mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-cream transition-colors rounded-l-lg"
                    id="qty-minus"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="p-2.5 hover:bg-cream transition-colors rounded-r-lg"
                    id="qty-plus"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-text-muted">
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="btn-primary flex-1 !py-3.5" id="add-to-cart-btn">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="btn-outline !p-3.5" id="wishlist-btn">
                <Heart size={18} />
              </button>
            </div>

            {/* Buy Now */}
            <button className="btn-gold w-full !py-3.5 mb-8" id="buy-now-btn">
              Buy Now
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-surface rounded-xl">
              <div className="text-center">
                <Truck size={20} className="text-gold mx-auto mb-1" />
                <p className="text-xs text-text-muted">Free Shipping</p>
              </div>
              <div className="text-center">
                <ShieldCheck size={20} className="text-gold mx-auto mb-1" />
                <p className="text-xs text-text-muted">100% Authentic</p>
              </div>
              <div className="text-center">
                <Repeat size={20} className="text-gold mx-auto mb-1" />
                <p className="text-xs text-text-muted">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="mt-16">
          <div className="flex border-b border-border gap-8 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'description' ? 'text-maroon' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Description
              {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'reviews' ? 'text-maroon' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Reviews ({product.review_count})
              {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
            </button>
          </div>

          {activeTab === 'description' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose max-w-3xl text-text-secondary leading-relaxed whitespace-pre-line"
            >
              {product.description}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
              {/* Review Summary */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-surface rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-heading font-bold text-burgundy">{product.avg_rating}</p>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(product.avg_rating) ? 'star-filled fill-gold' : 'star-empty'} />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-1">{product.review_count} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = DEMO_REVIEWS.filter((r) => r.rating === star).length;
                    const pct = product.review_count ? (count / product.review_count) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-text-muted w-4">{star}★</span>
                        <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                          <div className="h-full gradient-gold rounded-full" style={{ width: `${Math.min(pct * 3, 100)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {DEMO_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-burgundy font-bold text-sm">
                        {review.user_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-text-primary">{review.user_name}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? 'star-filled fill-gold' : 'star-empty'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
