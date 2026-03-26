'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye, Clock, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const DEMO_ORDERS = [
  { id: 'SS-001234', customer: 'Priya Sharma', email: 'priya@email.com', amount: 12999, status: 'pending', payment_status: 'pending_verification', payment_method: 'UPI', transaction_id: '423156789012', payment_proof_url: null, date: '27 Mar 2026', items: 1 },
  { id: 'SS-001233', customer: 'Lakshmi Iyer', email: 'lakshmi@email.com', amount: 24999, status: 'confirmed', payment_status: 'verified', payment_method: 'UPI', transaction_id: '312456789045', payment_proof_url: '/demo-proof.png', date: '26 Mar 2026', items: 2 },
  { id: 'SS-001232', customer: 'Ananya Reddy', email: 'ananya@email.com', amount: 4999, status: 'delivered', payment_status: 'verified', payment_method: 'UPI', transaction_id: '567890123456', payment_proof_url: null, date: '25 Mar 2026', items: 1 },
  { id: 'SS-001231', customer: 'Radha Krishna', email: 'radha@email.com', amount: 35999, status: 'cancelled', payment_status: 'rejected', payment_method: 'UPI', transaction_id: '000000000000', payment_proof_url: null, date: '24 Mar 2026', items: 3 },
];

const paymentStatusConfig: Record<string, { label: string; class: string; icon: typeof Clock }> = {
  pending_verification: { label: 'Pending Verification', class: '!bg-amber-50 !text-amber-700 !border-amber-200', icon: Clock },
  verified: { label: 'Verified', class: 'badge-success', icon: CheckCircle },
  rejected: { label: 'Rejected', class: 'badge-error', icon: XCircle },
};

const statusColors: Record<string, string> = {
  pending: 'badge-gold',
  confirmed: 'badge-maroon',
  shipped: '!bg-blue-50 !text-blue-700',
  delivered: 'badge-success',
  cancelled: 'badge-error',
};

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending_verification' | 'verified' | 'rejected'>('all');

  const filtered = filter === 'all' ? DEMO_ORDERS : DEMO_ORDERS.filter(o => o.payment_status === filter);
  const pendingCount = DEMO_ORDERS.filter(o => o.payment_status === 'pending_verification').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-burgundy">Orders & Payments</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-amber-600 font-semibold mt-1 flex items-center gap-1">
              <Clock size={14} /> {pendingCount} payment(s) awaiting verification
            </p>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending_verification', label: `Pending (${pendingCount})` },
          { key: 'verified', label: 'Verified' },
          { key: 'rejected', label: 'Rejected' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === tab.key ? 'bg-maroon text-cream' : 'bg-white border border-border text-text-secondary hover:border-gold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-text-muted">Order</th>
              <th className="text-left p-4 font-semibold text-text-muted">Customer</th>
              <th className="text-left p-4 font-semibold text-text-muted">Amount</th>
              <th className="text-left p-4 font-semibold text-text-muted">Transaction ID</th>
              <th className="text-left p-4 font-semibold text-text-muted">Proof</th>
              <th className="text-left p-4 font-semibold text-text-muted">Payment</th>
              <th className="text-left p-4 font-semibold text-text-muted">Status</th>
              <th className="text-right p-4 font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const pConfig = paymentStatusConfig[order.payment_status];
              return (
                <tr key={order.id} className={`border-b border-border/50 hover:bg-cream/30 transition-colors ${order.payment_status === 'pending_verification' ? 'bg-amber-50/30' : ''}`}>
                  <td className="p-4">
                    <p className="font-mono font-bold text-text-primary">{order.id}</p>
                    <p className="text-xs text-text-muted">{order.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-xs text-text-muted">{order.email}</p>
                  </td>
                  <td className="p-4 font-bold text-text-primary">{formatPrice(order.amount)}</td>
                  <td className="p-4">
                    <code className="text-xs font-mono bg-surface px-2 py-1 rounded">{order.transaction_id}</code>
                  </td>
                  <td className="p-4">
                    {order.payment_proof_url ? (
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="View proof">
                        <ImageIcon size={16} />
                      </button>
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`badge border ${pConfig.class}`}>
                      {pConfig.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    {order.payment_status === 'pending_verification' ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verify Payment"
                          id={`verify-${order.id}`}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject Payment"
                          id={`reject-${order.id}`}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ) : (
                      <button className="p-2 text-text-muted hover:text-maroon rounded-lg hover:bg-cream transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <p className="text-sm">No orders matching this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
