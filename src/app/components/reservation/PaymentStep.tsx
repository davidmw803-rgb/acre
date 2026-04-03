import { useState } from 'react';
import { CreditCard, Lock, Shield } from 'lucide-react';
import type { ReservationData } from '../ReservationFlow';

interface PaymentStepProps {
  data: ReservationData;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentStep({ data, onNext, onBack }: PaymentStepProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValid = cardNumber && expiry && cvv && agreed;

  const handleSubmit = () => {
    if (isValid) {
      // In a real app, this would process the payment
      onNext();
    }
  };

  const getModelPrice = () => {
    switch (data.model) {
      case 'G': return 4999;
      case 'E': return 7999;
      case 'T': return 12999;
      default: return 0;
    }
  };

  const getAccessoryTotal = () => {
    const prices: Record<string, number> = {
      'charging-dock': 299,
      'boundary-kit': 199,
      'cover': 149,
      'maintenance-kit': 99,
    };
    return data.accessories.reduce((sum, id) => sum + (prices[id] || 0), 0);
  };

  const total = getModelPrice() + getAccessoryTotal();
  const deposit = 100;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Payment Form */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="text-sm uppercase tracking-wider text-gray-600">Secure Payment Processing</span>
            </div>

            <div className="mb-6">
              <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                  className="w-full px-5 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    setExpiry(value);
                  }}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="mb-1 font-medium">Your deposit is fully refundable</p>
                  <p className="text-blue-700">Cancel anytime before delivery for a full refund of your $100 deposit.</p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I agree to the reservation terms and conditions. I understand that my deposit is fully refundable until delivery.
              </span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-2xl p-8 sticky top-6 border-2 border-gray-200">
            <h3 className="text-2xl tracking-tight mb-6 text-gray-900">Order Summary</h3>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  Model {data.model}
                </span>
                <span className="text-xl text-gray-900">
                  ${getModelPrice().toLocaleString()}
                </span>
              </div>

              {data.accessories.length > 0 && (
                <div className="space-y-3 pt-2">
                  {data.accessories.map(id => {
                    const accessoryNames: Record<string, string> = {
                      'charging-dock': 'Premium Charging Dock',
                      'boundary-kit': 'Extended Boundary Kit',
                      'cover': 'All-Weather Cover',
                      'maintenance-kit': 'Annual Maintenance Kit',
                    };
                    const prices: Record<string, number> = {
                      'charging-dock': 299,
                      'boundary-kit': 199,
                      'cover': 149,
                      'maintenance-kit': 99,
                    };
                    return (
                      <div key={id} className="flex justify-between text-sm items-center">
                        <span className="text-gray-600">{accessoryNames[id]}</span>
                        <span className="text-gray-700">${prices[id]}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between text-lg items-center">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl tracking-tight text-gray-900">Due Today</span>
                <span className="text-3xl tracking-tight text-gray-900">${deposit}</span>
              </div>
              <p className="text-sm text-gray-600">
                Remaining balance due before delivery in 2026
              </p>
            </div>

            <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
              <p>• Estimated delivery: Q2 2026</p>
              <p>• 100% refundable until delivery</p>
              <p>• Final payment required 30 days before delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200 mt-10">
        <button
          onClick={onBack}
          className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 transition-all text-sm uppercase tracking-wider"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="px-12 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
        >
          Complete Reservation
        </button>
      </div>
    </div>
  );
}