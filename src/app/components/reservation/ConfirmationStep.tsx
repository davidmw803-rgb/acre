import { CheckCircle2, Mail, Download } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReservationData } from '../ReservationFlow';

interface ConfirmationStepProps {
  data: ReservationData;
  onClose: () => void;
}

export function ConfirmationStep({ data, onClose }: ConfirmationStepProps) {
  const reservationNumber = `ACRE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl mb-4 text-gray-900">Reservation Confirmed!</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to the ACRE family. Your Model {data.model} is reserved for the 2026 production run.
        </p>

        <div className="bg-gray-50 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Reservation Number</p>
            <p className="text-2xl tracking-wider text-gray-900">{reservationNumber}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <p className="text-sm text-gray-600 mb-1">Model</p>
              <p className="text-gray-900">Model {data.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
              <p className="text-gray-900">{data.city}, {data.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Contact Email</p>
              <p className="text-gray-900">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Est. Delivery</p>
              <p className="text-gray-900">Q2 2026</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <Mail className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <h4 className="text-sm mb-2 text-gray-900">Check Your Email</h4>
            <p className="text-sm text-gray-600">
              Confirmation sent to {data.email}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <Download className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <h4 className="text-sm mb-2 text-gray-900">Download App</h4>
            <p className="text-sm text-gray-600">
              Track your reservation progress
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <CheckCircle2 className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <h4 className="text-sm mb-2 text-gray-900">Fully Refundable</h4>
            <p className="text-sm text-gray-600">
              Cancel anytime before delivery
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onClose}
            className="px-12 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
          <p className="text-sm text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:support@acre.com" className="text-gray-900 underline">
              support@acre.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
