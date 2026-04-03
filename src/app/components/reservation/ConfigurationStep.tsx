import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReservationData } from '../ReservationFlow';

interface ConfigurationStepProps {
  data: ReservationData;
  onUpdate: (updates: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ConfigurationStep({ data, onUpdate, onNext, onBack }: ConfigurationStepProps) {
  const colors = [
    { id: 'matte-black', name: 'Matte Black', hex: '#1a1a1a' },
    { id: 'silver', name: 'Metallic Silver', hex: '#c0c0c0' },
    { id: 'forest-green', name: 'Forest Green', hex: '#2d5016' },
    { id: 'pearl-white', name: 'Pearl White', hex: '#f5f5f5' },
  ];

  const accessories = [
    {
      id: 'charging-dock',
      name: 'Premium Charging Dock',
      price: '$299',
      description: 'Weatherproof charging station with LED indicators',
    },
    {
      id: 'boundary-kit',
      name: 'Extended Boundary Kit',
      price: '$199',
      description: 'Additional perimeter markers for complex properties',
    },
    {
      id: 'cover',
      name: 'All-Weather Cover',
      price: '$149',
      description: 'UV-resistant protective cover with custom fit',
    },
    {
      id: 'maintenance-kit',
      name: 'Annual Maintenance Kit',
      price: '$99',
      description: 'Replacement blades and filters for one year',
    },
  ];

  const toggleAccessory = (accessoryId: string) => {
    const current = data.accessories || [];
    if (current.includes(accessoryId)) {
      onUpdate({ accessories: current.filter(id => id !== accessoryId) });
    } else {
      onUpdate({ accessories: [...current, accessoryId] });
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h3 className="text-2xl tracking-tight mb-6 text-gray-900">Choose Your Color</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {colors.map((color) => (
            <motion.button
              key={color.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpdate({ color: color.id })}
              className={`p-6 rounded-2xl border-2 transition-all ${
                data.color === color.id
                  ? 'border-gray-900 bg-gray-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div
                className="w-full aspect-square rounded-xl mb-4 border border-gray-200 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm text-gray-900 mb-2">{color.name}</p>
              {data.color === color.id && (
                <Check className="w-4 h-4 text-gray-900 mx-auto" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl tracking-tight mb-6 text-gray-900">Add Accessories</h3>
        <div className="space-y-4">
          {accessories.map((accessory) => {
            const isSelected = data.accessories.includes(accessory.id);
            return (
              <button
                key={accessory.id}
                onClick={() => toggleAccessory(accessory.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-5 ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all mt-1 ${
                    isSelected
                      ? 'bg-gray-900 border-gray-900'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg text-gray-900">{accessory.name}</h4>
                    <span className="text-lg text-gray-900">{accessory.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{accessory.description}</p>
                </div>
              </button>
            );
          })}
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
          className="px-12 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all text-sm uppercase tracking-wider"
        >
          Continue to Personal Info
        </button>
      </div>
    </div>
  );
}