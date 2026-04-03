import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReservationData, ModelType } from '../ReservationFlow';

interface ModelSelectionProps {
  data: ReservationData;
  onUpdate: (updates: Partial<ReservationData>) => void;
  onNext: () => void;
}

export function ModelSelection({ data, onUpdate, onNext }: ModelSelectionProps) {
  const models = [
    {
      id: 'G' as ModelType,
      name: 'Model G',
      subtitle: 'Suburban',
      price: '$4,999',
      coverage: 'Up to 0.5 acres',
      features: ['Single battery system', 'Standard precision mapping', 'Basic obstacle avoidance'],
    },
    {
      id: 'E' as ModelType,
      name: 'Model E',
      subtitle: 'Estate',
      price: '$7,999',
      coverage: 'Up to 2 acres',
      features: ['Dual battery system', 'Premium RTK-GPS precision', 'Advanced AI navigation'],
      popular: true,
    },
    {
      id: 'T' as ModelType,
      name: 'Model T',
      subtitle: 'Terrain',
      price: '$12,999',
      coverage: 'Up to 5 acres',
      features: ['All-wheel drive system', '45° incline capability', 'Extreme terrain handling'],
    },
  ];

  const handleModelSelect = (modelId: ModelType) => {
    onUpdate({ model: modelId });
  };

  return (
    <div>
      <p className="text-xl text-gray-600 mb-16 max-w-3xl">
        Select the model that best fits your property and terrain needs.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {models.map((model, index) => (
          <motion.button
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleModelSelect(model.id)}
            className={`relative text-left p-8 rounded-2xl border-2 transition-all ${
              data.model === model.id
                ? 'border-gray-900 bg-gray-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
            }`}
          >
            {model.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
                Most Popular
              </div>
            )}

            {data.model === model.id && (
              <div className="absolute top-6 right-6 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-3xl tracking-tight mb-1 text-gray-900">{model.name}</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider">({model.subtitle})</p>
            </div>

            <div className="mb-6">
              <p className="text-4xl tracking-tight mb-2 text-gray-900">{model.price}</p>
              <p className="text-sm text-gray-600">{model.coverage}</p>
            </div>

            <div className="space-y-3">
              {model.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-200">
        <button
          onClick={onNext}
          disabled={!data.model}
          className="px-12 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
        >
          Continue to Configuration
        </button>
      </div>
    </div>
  );
}