import { Brain, Satellite, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export function FeatureGrid() {
  const features = [
    {
      icon: Brain,
      title: 'Neural Mapping',
      description: 'Acre uses proprietary SLAM to create a high-fidelity digital twin of your estate.',
    },
    {
      icon: Satellite,
      title: 'RTK-GPS Precision',
      description: 'Guided by satellites. Corrected by ground stations. Accurate to within 2cm.',
    },
    {
      icon: Volume2,
      title: 'WhisperDrive™',
      description: "At 45dB, the only thing you'll notice is the perfect cut.",
    },
  ];

  return (
    <section id="technology" className="py-24 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-gray-300 rounded-full">
                  <Icon className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
