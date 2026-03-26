'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, ChevronRight } from 'lucide-react';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-burgundy">
        <div className="container-silk py-4">
          <h1 className="text-xl font-heading font-bold text-cream">Admin Dashboard</h1>
        </div>
      </div>

      <div className="container-silk py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-56 shrink-0">
            <nav className="sticky top-24 space-y-1">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                      isActive ? 'bg-maroon text-cream font-semibold shadow-md' : 'text-text-secondary hover:bg-cream hover:text-maroon'
                    }`}
                  >
                    <link.icon size={18} />
                    {link.label}
                    {isActive && <ChevronRight size={14} className="ml-auto" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
