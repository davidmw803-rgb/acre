import image_dfc2222cbd1f12dd82a5bca9bf4e843132d5c6e2 from '@/assets/dfc2222cbd1f12dd82a5bca9bf4e843132d5c6e2.png';
import image_a86d4dc4df9739edeecc3c16bad566a6ab2c04c5 from '@/assets/a86d4dc4df9739edeecc3c16bad566a6ab2c04c5.png';
import image_a1868680de77280bbc21689ca35f84b77d33bb54 from '@/assets/a1868680de77280bbc21689ca35f84b77d33bb54.png';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ModelType } from './ReservationFlow';

interface ModelComparisonProps {
  onReserve: (model: ModelType) => void;
}

export function ModelComparison({ onReserve }: ModelComparisonProps) {
  const navigate = useNavigate();
  const models = [
    {
      id: 'G' as ModelType,
      name: 'Model G',
      subtitle: 'Suburban',
      tagline: 'The Precision Tool',
      image: image_a1868680de77280bbc21689ca35f84b77d33bb54,
      features: ['Up to 0.5 acres', 'Single battery system', 'Standard precision mapping'],
      popular: false,
    },
    {
      id: 'E' as ModelType,
      name: 'Model E',
      subtitle: 'Estate',
      tagline: 'The Benchmark',
      image: image_a86d4dc4df9739edeecc3c16bad566a6ab2c04c5,
      features: ['Up to 2 acres', 'Dual battery system', 'Premium RTK-GPS precision'],
      popular: true,
    },
    {
      id: 'T' as ModelType,
      name: 'Model T',
      subtitle: 'Terrain',
      tagline: 'The All-Wheel Drive Titan',
      image: image_dfc2222cbd1f12dd82a5bca9bf4e843132d5c6e2,
      features: ['Up to 5 acres', 'All-wheel drive system', '45° incline capability'],
      popular: false,
    },
  ];

  return (
    <section id="models" className="py-24 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-gray-900">Choose Your Model</h2>
          <p className="text-xl text-gray-600">Engineered for every landscape</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${
                model.popular ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {model.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gray-900 text-white px-4 py-1 rounded-full text-xs tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl mb-1 text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">({model.subtitle})</p>
                  <p className="text-lg text-gray-700">{model.tagline}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {model.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/product/${model.id}`)}
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </button>
                <button 
                  onClick={() => onReserve(model.id)}
                  className="w-full px-6 py-3 mt-2 border border-gray-900 text-gray-900 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Reserve Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}