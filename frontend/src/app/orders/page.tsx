'use client';

import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const DEMO_ORDERS = [
  {
    id: 'SS-001234', status: 'pending', payment_status: 'pending_verification', payment_method: 'UPI', transaction_id: '423156789012', total_amount: 12999, created_at: '27 Mar 2026',
    items: [{ name: 'Royal Kanchipuram Silk', quantity: 1, price: 12999 }],
  },
  {
    id: 'SS-001230', status: 'confirmed', payment_status: 'verified', payment_method: 'UPI', transaction_id: '312456789045', total_amount: 29998, created_at: '25 Mar 2026',
    items: [
      { name: 'Banarasi Bridal Gold', quantity: 1, price: 24999 },
      { name: 'Soft Silk Turquoise', quantity: 1, price: 4999 },
    ],
  },
  {
    id: 'SS-001229', status: 'cancelled', payment_status: 'rejected', payment_method: 'UPI', transaction_id: '000000000000', total_amount: 8999, created_at: '23 Mar 2026',
    items: [{ name: 'Pattu Temple Border', quantity: 1, price: 8999 }],
  },
];

const paymentStatusUI: Record<string, { label: string; color: string; icon: typeof Clock; bg: string }> = {
  pending_verification: {
    label: 'Waiting for payment verification',
    color: 'text-amber-700',
    icon: Clock,
    bg: 'bg-amber-50 border-amber-200',
  },
  verified: {
    label: 'Payment verified',
    color: 'text-green-700',
    icon: CheckCircle,
    bg: 'bg-green-50 border-green-200',
  },
  rejected: {
    label: 'Payment rejected — please contact support',
    color: 'text-red-700',
    icon: XCircle,
    bg: 'bg-red-50 border-red-200',
  },
};

const orderStatusColors: Record<string, string> = {
  pending: 'badge-gold', confirmed: 'badge-maroon', shipped: '!bg-blue-50 !text-blue-700', delivered: 'badge-success', cancelled: 'badge-error',
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-surface border-b border-border">
        <div className="container-silk py-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-burgundy">My Orders</h1>
        </div>
      </div>

      <div className="container-silk py-8 max-w-3xl">
        {DEMO_ORDERS.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="text-border mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-burgundy mb-2">No Orders Yet</h2>
            <p className="text-text-muted mb-6">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {DEMO_ORDERS.map((order, i) => {
              const pUI = paymentStatusUI[order.payment_status];
              const PayIcon = pUI.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border rounded-xl hover:border-gold/30 transition-colors overflow-hidden"
                >
                  {/* Payment Status Banner */}
                  <div className={`px-5 py-3 border-b ${pUI.bg} flex items-center gap-2`}>
                    <PayIcon size={16} className={pUI.color} />
                    <p className={`text-sm font-semibold ${pUI.color}`}>{pUI.label}</p>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-mono font-bold text-text-primary">{order.id}</p>
                        <p className="text-xs text-text-muted">{order.created_at}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${orderStatusColors[order.status]}`}>{order.status}</span>
                        <ChevronRight size={16} className="text-text-muted" />
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div className="mb-3 text-xs text-text-muted">
                      Payment: {order.payment_method} • UTR: <code className="font-mono bg-surface px-1.5 py-0.5 rounded">{order.transaction_id}</code>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded bg-gradient-to-br from-maroon to-maroon-dark shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                            <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="text-sm text-text-muted">Total</span>
                      <span className="font-bold text-maroon">{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
