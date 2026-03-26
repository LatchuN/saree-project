'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, ArrowRight, Upload, Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const STORE_UPI_ID = 'silksareestore@upi';

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [address, setAddress] = useState({
    full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '',
  });
  const [transactionId, setTransactionId] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [txError, setTxError] = useState('');

  const orderTotal = 22997; // Demo total

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(STORE_UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProofPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = () => {
    setTxError('');
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setTxError('Please enter a valid Transaction ID / UTR number (min 6 characters)');
      return;
    }
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md glass-card rounded-2xl p-10 shadow-elevated"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle size={72} className="text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-heading font-bold text-burgundy mb-3">Order Placed!</h2>
          <p className="text-text-muted mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-text-muted mb-4">Order #SS-{Date.now().toString().slice(-6)}</p>

          <div className="p-4 bg-surface rounded-lg mb-4">
            <p className="text-sm text-text-muted">Amount</p>
            <p className="text-2xl font-bold text-maroon">{formatPrice(orderTotal)}</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6 text-left">
            <div className="flex items-start gap-2">
              <Clock size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Waiting for Payment Verification</p>
                <p className="text-xs text-amber-600 mt-1">
                  Our team will verify your payment within 2-4 hours. You&apos;ll receive a confirmation once verified.
                </p>
              </div>
            </div>
          </div>

          <div className="text-left p-4 bg-surface rounded-lg mb-6 text-sm">
            <p className="text-text-muted">Transaction ID</p>
            <p className="font-mono font-bold text-text-primary">{transactionId}</p>
          </div>

          <a href="/orders" className="btn-primary">View My Orders</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-surface border-b border-border">
        <div className="container-silk py-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-burgundy">Checkout</h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mt-4">
            <div className={`flex items-center gap-2 text-sm font-semibold ${step === 'address' ? 'text-maroon' : 'text-text-muted'}`}>
              <MapPin size={16} />
              <span>Address</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className={`flex items-center gap-2 text-sm font-semibold ${step === 'payment' ? 'text-maroon' : 'text-text-muted'}`}>
              <CreditCard size={16} />
              <span>UPI Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-silk py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'address' ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-heading font-bold text-burgundy mb-6">Delivery Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">Full Name</label>
                      <input type="text" value={address.full_name} onChange={(e) => setAddress({ ...address, full_name: e.target.value })} className="input-field" required placeholder="Your full name" id="checkout-name" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">Phone Number</label>
                      <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="input-field" required placeholder="+91 XXXXX XXXXX" id="checkout-phone" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1 block">Address</label>
                    <textarea value={address.address_line} onChange={(e) => setAddress({ ...address, address_line: e.target.value })} className="input-field min-h-[80px]" required placeholder="House/Flat No., Street, Landmark" id="checkout-address" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">City</label>
                      <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-field" required placeholder="City" id="checkout-city" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">State</label>
                      <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="input-field" placeholder="State" id="checkout-state" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">Pincode</label>
                      <input type="text" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="input-field" required placeholder="600001" id="checkout-pincode" />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary !py-3 mt-4" id="continue-payment-btn">
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-heading font-bold text-burgundy mb-6">Pay via UPI</h2>

                {/* Delivery Address Summary */}
                <div className="p-4 border border-border rounded-xl mb-6">
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">Delivery Address</h3>
                  <p className="text-sm text-text-muted">{address.full_name} • {address.phone}</p>
                  <p className="text-sm text-text-muted">{address.address_line}, {address.city}, {address.state} - {address.pincode}</p>
                  <button onClick={() => setStep('address')} className="text-sm text-maroon font-semibold mt-2 hover:underline">Change</button>
                </div>

                {/* UPI Payment Instructions */}
                <div className="bg-surface rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-heading font-bold text-burgundy mb-2">Pay Using Any UPI App</h3>
                    <p className="text-sm text-text-muted">Google Pay • PhonePe • Paytm • BHIM • Any UPI</p>
                  </div>

                  {/* Amount */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-text-muted">Amount to Pay</p>
                    <p className="text-4xl font-bold text-maroon mt-1">{formatPrice(orderTotal)}</p>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="flex justify-center mb-6">
                    <div className="w-52 h-52 bg-white rounded-2xl border-2 border-gold/30 shadow-silk flex flex-col items-center justify-center p-4">
                      <div className="w-40 h-40 bg-gradient-to-br from-burgundy/5 to-gold/5 rounded-xl flex items-center justify-center border border-border">
                        <div className="text-center">
                          <div className="grid grid-cols-5 gap-1 mx-auto w-28">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? 'bg-burgundy' : 'bg-transparent'}`} />
                            ))}
                          </div>
                          <p className="text-[9px] text-text-muted mt-2">Scan QR to Pay</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID */}
                  <div className="bg-white rounded-xl p-4 border border-gold/20 shadow-sm mb-4">
                    <p className="text-xs text-text-muted text-center mb-2">Or pay directly to UPI ID</p>
                    <div className="flex items-center justify-center gap-3">
                      <code className="text-lg font-mono font-bold text-burgundy tracking-wide">{STORE_UPI_ID}</code>
                      <button
                        onClick={handleCopyUPI}
                        className="p-2 rounded-lg hover:bg-cream transition-colors"
                        id="copy-upi-btn"
                        title="Copy UPI ID"
                      >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-text-muted" />}
                      </button>
                    </div>
                    {copied && <p className="text-xs text-green-600 text-center mt-1">Copied!</p>}
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-text-muted">Pay the exact amount shown above</p>
                  </div>
                </div>

                {/* Transaction ID Input */}
                <div className="bg-white rounded-xl border border-border p-6 mb-6">
                  <h3 className="font-semibold text-text-primary mb-4">Payment Confirmation</h3>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-text-primary mb-1 block">
                      Transaction ID / UTR Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => { setTransactionId(e.target.value); setTxError(''); }}
                      placeholder="Enter 12-digit UTR number from your UPI app"
                      className={`input-field font-mono ${txError ? '!border-red-400' : ''}`}
                      id="transaction-id-input"
                    />
                    {txError && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {txError}
                      </p>
                    )}
                    <p className="text-xs text-text-muted mt-1.5">
                      You can find this in your UPI app under transaction history
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1 block">
                      Payment Screenshot <span className="text-text-muted font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      {proofPreview ? (
                        <div className="relative">
                          <img src={proofPreview} alt="Payment proof" className="w-full max-h-48 object-contain rounded-lg border border-border bg-cream" />
                          <button
                            onClick={() => { setProofFile(null); setProofPreview(null); }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-md text-red-500 hover:bg-red-50 text-xs font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-xl hover:border-gold cursor-pointer transition-colors" htmlFor="proof-upload">
                          <Upload size={24} className="text-text-muted" />
                          <span className="text-sm text-text-muted">Upload payment screenshot</span>
                          <span className="text-xs text-text-muted">JPG, PNG up to 5MB</span>
                        </label>
                      )}
                      <input
                        type="file"
                        id="proof-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="btn-gold w-full !py-4 text-base"
                  id="place-order-btn"
                >
                  <CheckCircle size={20} />
                  Place Order — {formatPrice(orderTotal)}
                </button>

                <p className="text-xs text-text-muted text-center mt-3">
                  By placing this order, your payment will be verified by our team within 2-4 hours.
                </p>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-heading font-bold text-burgundy mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Subtotal (3 items)</span><span className="font-semibold">{formatPrice(22997)}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Shipping</span><span className="font-semibold text-green-600">FREE</span></div>
                <div className="section-divider !my-3" />
                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-maroon text-lg">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {step === 'payment' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-700 font-semibold flex items-center gap-1">
                    <CreditCard size={12} /> Pay via UPI — No gateway fees!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
