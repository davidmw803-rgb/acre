import { motion } from 'motion/react';
import heroImage from '@/assets/4bb4a51e74bbb9ba51177d177674070209538998.png';

interface PartnersHeroProps {
  onContact: () => void;
}

export function PartnersHero({ onContact }: PartnersHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Acre manufacturing partnership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.35em] text-white/70 uppercase mb-6"
        >
          Manufacturing Partners
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight max-w-4xl"
        >
          Build what comes next.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl tracking-wide leading-relaxed"
        >
          Acre is selecting a world-class manufacturing partner for our 2026 production run.
          Multi-year roadmap. Fully specified product. Ready to tool.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onContact}
            className="px-8 py-4 bg-white text-black text-sm tracking-wide rounded-full hover:bg-gray-100 transition-all"
          >
            Start the Conversation
          </button>
          <a
            href="#opportunity"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-sm tracking-wide rounded-full border border-white/30 hover:bg-white/20 transition-all"
          >
            See the Opportunity
          </a>
        </motion.div>
      </div>
    </section>
  );
}
