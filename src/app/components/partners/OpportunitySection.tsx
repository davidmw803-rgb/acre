import { motion } from 'motion/react';

// TODO: confirm these figures before sharing externally
const stats = [
  {
    value: '$4.2B',
    label: 'Global robotic mower market, 2026',
  },
  {
    value: '18%',
    label: 'Projected CAGR through 2030',
  },
  {
    value: '12,400+',
    label: 'Acre reservations to date',
  },
];

export function OpportunitySection() {
  return (
    <section id="opportunity" className="py-32 px-8 bg-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            The Opportunity
          </p>
          <h2 className="text-5xl md:text-6xl text-white mb-8 tracking-tight">
            A category waking up.
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            The US residential robotic mower market is where electric vehicles were in 2015 —
            proven technology, growing demand, and no category-defining brand. Acre is
            positioned as the premium-tier entrant: the Tesla to Husqvarna's incumbents.
            We've done the design. We've proven the demand. We need the right partner to build it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-6xl md:text-7xl text-white mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-lg text-gray-400 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
