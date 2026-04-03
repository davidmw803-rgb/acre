import { motion } from 'motion/react';

interface ClosingCTAProps {
  onReserve: () => void;
}

export function ClosingCTA({ onReserve }: ClosingCTAProps) {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900">
            Take your weekends back.
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Secure your place in the 2026 production run. Fully refundable $100 deposit.
          </p>
          <div className="space-y-4">
            <button
              onClick={onReserve}
              className="px-12 py-4 bg-gray-900 text-white text-lg tracking-wide rounded-full hover:bg-gray-800 transition-all hover:scale-105"
            >
              Reserve Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}