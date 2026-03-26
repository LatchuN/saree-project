import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const categories = [
  { name: 'Kanchipuram', slug: 'kanchipuram' },
  { name: 'Banarasi', slug: 'banarasi' },
  { name: 'Soft Silk', slug: 'soft-silk' },
  { name: 'Bridal', slug: 'bridal' },
  { name: 'Pattu', slug: 'pattu' },
  { name: 'Tussar', slug: 'tussar' },
];

export default function Footer() {
  return (
    <footer className="bg-burgundy text-cream/80">
      {/* Main Footer */}
      <div className="container-silk py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-burgundy font-bold text-lg font-heading">
                S
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-cream">Silk Saree</h3>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light">Store</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cream/60 mb-6">
              Discover the finest handwoven silk sarees from across India. 
              Each piece tells a story of tradition, craftsmanship, and timeless elegance.
            </p>
            <p className="text-xs text-cream/40 flex items-center gap-1">
              Made with <Heart size={12} className="text-maroon-light fill-maroon-light" /> in India
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold mb-6">Collections</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {cat.name} Silk
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-cream/60 hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link href="/auth/login" className="text-sm text-cream/60 hover:text-gold transition-colors">My Account</Link></li>
              <li><Link href="/cart" className="text-sm text-cream/60 hover:text-gold transition-colors">Shopping Cart</Link></li>
              <li><Link href="/wishlist" className="text-sm text-cream/60 hover:text-gold transition-colors">Wishlist</Link></li>
              <li><Link href="/orders" className="text-sm text-cream/60 hover:text-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-cream/80">+91 98765 43210</p>
                  <p className="text-xs text-cream/40">Mon-Sat, 10AM - 7PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-cream/80">support@silksareestore.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-cream/80">T. Nagar, Chennai,<br />Tamil Nadu 600017</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-silk py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Silk Saree Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-cream/40 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-cream/40 hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-cream/40 hover:text-gold transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
