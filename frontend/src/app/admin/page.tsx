'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, IndianRupee, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const stats = [
  { label: 'Total Products', value: '48', icon: Package, color: 'text-blue-600 bg-blue-50' },
  { label: 'Total Orders', value: '156', icon: ShoppingCart, color: 'text-green-600 bg-green-50' },
  { label: 'Pending Payments', value: '3', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Revenue', value: formatPrice(485000), icon: IndianRupee, color: 'text-gold-dark bg-amber-50' },
];

const recentOrders = [
  { id: 'SS-001234', customer: 'Priya Sharma', amount: 12999, status: 'pending', payment_status: 'pending_verification', date: '2 hours ago' },
  { id: 'SS-001233', customer: 'Lakshmi Iyer', amount: 24999, status: 'confirmed', payment_status: 'verified', date: '5 hours ago' },
  { id: 'SS-001232', customer: 'Ananya Reddy', amount: 4999, status: 'delivered', payment_status: 'verified', date: '1 day ago' },
  { id: 'SS-001231', customer: 'Radha Krishna', amount: 35999, status: 'pending', payment_status: 'pending_verification', date: '1 day ago' },
  { id: 'SS-001230', customer: 'Meera Patel', amount: 8999, status: 'confirmed', payment_status: 'verified', date: '2 days ago' },
];

const statusColors: Record<string, string> = {
  pending: 'badge-gold',
  confirmed: 'badge-maroon',
  shipped: '!bg-blue-50 !text-blue-700',
  delivered: 'badge-success',
  cancelled: 'badge-error',
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-burgundy">Dashboard</h2>
          <p className="text-sm text-text-muted">Welcome back, Admin!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-border hover:border-gold/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={16} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-heading font-bold text-burgundy">Recent Orders</h3>
          <a href="/admin/orders" className="text-sm text-maroon font-semibold hover:underline flex items-center gap-1">
            View All <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-text-muted">Order ID</th>
                <th className="text-left p-4 font-semibold text-text-muted">Customer</th>
                <th className="text-left p-4 font-semibold text-text-muted">Amount</th>
                <th className="text-left p-4 font-semibold text-text-muted">Status</th>
                <th className="text-left p-4 font-semibold text-text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                  <td className="p-4 font-mono font-semibold text-text-primary">{order.id}</td>
                  <td className="p-4 text-text-secondary">{order.customer}</td>
                  <td className="p-4 font-semibold text-text-primary">{formatPrice(order.amount)}</td>
                  <td className="p-4">
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="p-4 text-text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
