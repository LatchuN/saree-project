'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { name: 'Kanchipuram', slug: 'kanchipuram' },
  { name: 'Banarasi', slug: 'banarasi' },
  { name: 'Soft Silk', slug: 'soft-silk' },
  { name: 'Bridal', slug: 'bridal' },
  { name: 'Pattu', slug: 'pattu' },
  { name: 'Tussar', slug: 'tussar' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-burgundy text-gold-light text-xs py-2 text-center tracking-widest uppercase font-medium">
        ✦ Free Shipping on Orders Above ₹2,999 ✦ Authentic Handwoven Silk Sarees ✦
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="container-silk">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-burgundy hover:text-maroon transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" id="logo-link">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-burgundy font-bold text-lg font-heading shadow-md group-hover:shadow-glow transition-shadow">
                S
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-burgundy leading-tight tracking-tight">
                  Silk Saree
                </h1>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-dark font-semibold leading-none">
                  Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-semibold text-text-secondary hover:text-maroon transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdown(true)}
                onMouseLeave={() => setCategoryDropdown(false)}
              >
                <button
                  id="categories-dropdown"
                  className="flex items-center gap-1 text-sm font-semibold text-text-secondary hover:text-maroon transition-colors"
                >
                  Collections
                  <ChevronDown size={14} className={`transition-transform ${categoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {categoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 glass-card rounded-xl shadow-elevated p-2"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products?category=${cat.slug}`}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-maroon hover:bg-cream rounded-lg transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1 pt-1">
                        <Link
                          href="/products"
                          className="block px-4 py-2.5 text-sm font-semibold text-gold-dark hover:text-maroon hover:bg-cream rounded-lg transition-all"
                        >
                          View All →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/products"
                className="text-sm font-semibold text-text-secondary hover:text-maroon transition-colors relative group"
              >
                Shop All
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search */}
              <button
                id="search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-text-secondary hover:text-maroon transition-colors rounded-full hover:bg-cream"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                id="wishlist-link"
                className="p-2 text-text-secondary hover:text-maroon transition-colors rounded-full hover:bg-cream hidden sm:block"
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                id="cart-link"
                className="p-2 text-text-secondary hover:text-maroon transition-colors rounded-full hover:bg-cream relative"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-maroon text-cream text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* User / Login */}
              <Link
                href="/auth/login"
                id="login-link"
                className="btn-primary !py-2 !px-4 text-sm hidden sm:inline-flex"
              >
                <User size={16} />
                Login
              </Link>
              <Link
                href="/auth/login"
                className="p-2 text-text-secondary hover:text-maroon transition-colors rounded-full hover:bg-cream sm:hidden"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="container-silk py-4">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    placeholder="Search for Kanchipuram, Banarasi, Bridal sarees..."
                    className="input-field pl-12 pr-4"
                    autoFocus
                    id="search-input"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-80 max-w-[85vw] h-full bg-surface shadow-elevated overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-heading font-bold text-burgundy">Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-text-secondary">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-1">
                  <Link href="/" className="block px-4 py-3 text-text-primary font-medium hover:bg-cream rounded-lg">
                    Home
                  </Link>
                  <Link href="/products" className="block px-4 py-3 text-text-primary font-medium hover:bg-cream rounded-lg">
                    Shop All
                  </Link>
                  <div className="px-4 py-3">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Collections</span>
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="block px-8 py-2.5 text-sm text-text-secondary hover:text-maroon hover:bg-cream rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="section-divider !my-4" />
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-text-primary font-medium hover:bg-cream rounded-lg">
                    <Heart size={18} /> Wishlist
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-3 text-text-primary font-medium hover:bg-cream rounded-lg">
                    <ShoppingBag size={18} /> My Orders
                  </Link>
                </div>

                <div className="mt-8">
                  <Link href="/auth/login" className="btn-primary w-full justify-center">
                    <User size={18} /> Login / Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
