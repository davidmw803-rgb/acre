import type { ReservationData } from '../ReservationFlow';

interface PersonalInfoStepProps {
  data: ReservationData;
  onUpdate: (updates: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({ data, onUpdate, onNext, onBack }: PersonalInfoStepProps) {
  const isValid = 
    data.firstName &&
    data.lastName &&
    data.email &&
    data.phone &&
    data.address &&
    data.city &&
    data.state &&
    data.zip;

  return (
    <div>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl">
        Please provide your contact and delivery information.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">First Name *</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Last Name *</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">Delivery Address *</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">City *</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onUpdate({ city: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
            placeholder="San Francisco"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">State *</label>
            <input
              type="text"
              value={data.state}
              onChange={(e) => onUpdate({ state: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
              placeholder="CA"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider mb-3 text-gray-700">ZIP *</label>
            <input
              type="text"
              value={data.zip}
              onChange={(e) => onUpdate({ zip: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
              placeholder="94102"
              maxLength={5}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 transition-all text-sm uppercase tracking-wider"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-12 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}