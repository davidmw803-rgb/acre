import { motion } from 'motion/react';
import heroImage from '@/assets/4bb4a51e74bbb9ba51177d177674070209538998.png';

interface HeroSectionProps {
  onReserve: () => void;
}

export function HeroSection({ onReserve }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Acre autonomous lawn mowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight"
        >
          The Land, Automated.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl tracking-wide"
        >
          Centimeter precision. Zero emissions. Absolute silence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onReserve}
            className="px-8 py-4 bg-white text-black text-sm tracking-wide rounded-full hover:bg-gray-100 transition-all"
          >
            Design Your Acre
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-sm tracking-wide rounded-full border border-white/30 hover:bg-white/20 transition-all">
            Watch the Film
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}