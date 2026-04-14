import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import productImage from '@/assets/a86d4dc4df9739edeecc3c16bad566a6ab2c04c5.png';

// TODO: confirm readiness status before finalizing
const readiness = [
  {
    title: 'Industrial Design — Finalized',
    description: 'Three-model lineup with shared chassis architecture. CAD packages release-ready.',
  },
  {
    title: 'Electronics Architecture — Locked',
    description: 'Motor control, RTK module, sensor stack, and MCU selections complete. Schematics available under NDA.',
  },
  {
    title: 'Firmware v1 — Running',
    description: 'Working prototypes cutting real lawns today. SLAM, path planning, and OTA update pipeline validated.',
  },
  {
    title: 'DFM Review — In Progress',
    description: 'We are actively seeking a partner to lead tooling, PCBA sourcing, and production ramp.',
  },
];

export function ProductReadinessSection() {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Product image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
              <img
                src={productImage}
                alt="Acre Model E prototype"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-400 tracking-wide">
              Model E — working prototype, shown in Forest Green
            </div>
          </motion.div>

          {/* Right: Readiness list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
              Product Readiness
            </p>
            <h2 className="text-5xl mb-6 text-gray-900 tracking-tight">
              Not a pitch deck. A product.
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Your job is tooling and production — not R&D. Every part of the product
              has been designed, prototyped, and tested in-house before we opened the search
              for a manufacturing partner.
            </p>

            <div className="space-y-6">
              {readiness.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
