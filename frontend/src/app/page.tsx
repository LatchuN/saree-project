'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, Repeat, Sparkles } from 'lucide-react';

const categories = [
  {
    name: 'Kanchipuram',
    slug: 'kanchipuram',
    description: 'Temple city elegance',
    color: 'from-red-900 to-amber-800',
    emoji: '🏛️',
  },
  {
    name: 'Banarasi',
    slug: 'banarasi',
    description: 'Mughal heritage weaves',
    color: 'from-purple-900 to-pink-800',
    emoji: '👑',
  },
  {
    name: 'Soft Silk',
    slug: 'soft-silk',
    description: 'Everyday luxury',
    color: 'from-teal-900 to-emerald-800',
    emoji: '🌿',
  },
  {
    name: 'Bridal',
    slug: 'bridal',
    description: 'For your special day',
    color: 'from-rose-900 to-red-800',
    emoji: '💍',
  },
  {
    name: 'Pattu',
    slug: 'pattu',
    description: 'South Indian classics',
    color: 'from-amber-900 to-yellow-800',
    emoji: '🪷',
  },
  {
    name: 'Tussar',
    slug: 'tussar',
    description: 'Natural golden silk',
    color: 'from-orange-900 to-amber-700',
    emoji: '✨',
  },
];

const features = [
  {
    icon: <Truck size={28} />,
    title: 'Free Shipping',
    description: 'On orders above ₹2,999',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: '100% Authentic',
    description: 'Certified handwoven silk',
  },
  {
    icon: <Repeat size={28} />,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Premium Quality',
    description: 'Handpicked by experts',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The Kanchipuram saree I ordered is absolutely stunning! The zari work is exquisite and the silk quality is top-notch.',
  },
  {
    name: 'Lakshmi Iyer',
    location: 'Chennai',
    rating: 5,
    text: 'I bought my bridal saree from here and it was the best decision. The colors are even more beautiful in person!',
  },
  {
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'Amazing collection and fast delivery. The packaging was so careful and beautiful. Highly recommend!',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative gradient-hero min-h-[85vh] flex items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/3 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/5" />
        </div>

        <div className="container-silk relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 badge-gold mb-6 !text-gold-light !bg-gold/10 px-4 py-2 rounded-full"
            >
              <Sparkles size={14} />
              <span className="text-sm">New Bridal Collection 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-cream leading-[1.1] mb-6"
            >
              Timeless{' '}
              <span className="text-gold">Silk</span>
              <br />
              Sarees for Every
              <br />
              <span className="text-gold-light italic">Occasion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-cream/60 mb-8 max-w-lg leading-relaxed"
            >
              Discover handwoven masterpieces from Kanchipuram, Varanasi, and beyond. 
              Each saree carries centuries of tradition in every thread.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products" className="btn-gold !px-8 !py-3.5 text-base" id="hero-shop-btn">
                Explore Collection
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=bridal"
                className="btn-outline !border-gold/40 !text-gold-light hover:!bg-gold/10 hover:!text-gold !px-8 !py-3.5 text-base"
                id="hero-bridal-btn"
              >
                Bridal Sarees
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8 mt-12 pt-8 border-t border-cream/10"
            >
              <div>
                <p className="text-2xl font-heading font-bold text-gold">500+</p>
                <p className="text-xs text-cream/40 mt-1">Saree Designs</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-gold">50K+</p>
                <p className="text-xs text-cream/40 mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-gold">4.8★</p>
                <p className="text-xs text-cream/40 mt-1">Average Rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES BAR ===== */}
      <section className="bg-white border-b border-border">
        <div className="container-silk py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4"
              >
                <div className="text-gold shrink-0">{feature.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">{feature.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-20 silk-texture">
        <div className="container-silk">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="badge-gold text-xs mb-3 inline-block">EXPLORE</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-burgundy mb-3">
              Shop by Collection
            </h2>
            <p className="text-text-muted max-w-md mx-auto">
              Browse our curated collections of authentic handwoven silk sarees
            </p>
            <div className="w-20 h-0.5 gradient-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="block group relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[3/2]"
                  id={`category-${cat.slug}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-transform duration-500 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-4xl mb-3">{cat.emoji}</span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-cream mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-cream/60">{cat.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold-light font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      View Collection <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS PLACEHOLDER ===== */}
      <section className="py-20 bg-white">
        <div className="container-silk">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="badge-maroon text-xs mb-3 inline-block">TRENDING</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-burgundy mb-3">
              Featured Sarees
            </h2>
            <p className="text-text-muted max-w-md mx-auto">
              Handpicked bestsellers loved by our customers
            </p>
            <div className="w-20 h-0.5 gradient-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="product-card"
              >
                <div className="aspect-[3/4] skeleton" />
                <div className="p-4">
                  <div className="skeleton h-4 w-3/4 mb-2" />
                  <div className="skeleton h-3 w-1/2 mb-3" />
                  <div className="skeleton h-5 w-1/3" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline" id="view-all-products">
              View All Sarees
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CRAFT STORY SECTION ===== */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-gold/5 blur-2xl" />
          <div className="absolute bottom-10 left-20 w-60 h-60 rounded-full bg-gold/3 blur-3xl" />
        </div>
        <div className="container-silk relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Heritage</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-cream mt-4 mb-6">
                Weaving Dreams in
                <span className="text-gold"> Pure Silk</span>
              </h2>
              <p className="text-cream/60 leading-relaxed mb-8 text-lg">
                Every saree in our collection is a masterpiece woven by skilled artisans who have 
                inherited their craft across generations. From the temple city of Kanchipuram to the 
                ghats of Varanasi, we bring you the finest silk traditions of India.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-heading font-bold text-gold">25+</p>
                  <p className="text-xs text-cream/40 mt-1">Years of Legacy</p>
                </div>
                <div className="w-px bg-cream/10" />
                <div>
                  <p className="text-3xl font-heading font-bold text-gold">200+</p>
                  <p className="text-xs text-cream/40 mt-1">Master Weavers</p>
                </div>
                <div className="w-px bg-cream/10" />
                <div>
                  <p className="text-3xl font-heading font-bold text-gold">15</p>
                  <p className="text-xs text-cream/40 mt-1">Weaving Clusters</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 silk-texture">
        <div className="container-silk">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="badge-gold text-xs mb-3 inline-block">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-burgundy mb-3">
              What Our Customers Say
            </h2>
            <div className="w-20 h-0.5 gradient-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="star-filled fill-gold" />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 text-sm italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-burgundy font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="container-silk">
          <motion.div
            {...fadeInUp}
            className="gradient-hero rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/5 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-cream mb-4">
                Start Your Silk Journey Today
              </h2>
              <p className="text-cream/60 mb-8 max-w-md mx-auto">
                Join 50,000+ happy customers and find your perfect silk saree
              </p>
              <Link href="/products" className="btn-gold !px-10 !py-4 text-base" id="cta-shop-btn">
                Shop Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
