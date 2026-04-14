import { motion } from 'motion/react';

// TODO: confirm these numbers before showing partners/investors
const stats = [
  {
    value: '12,400+',
    label: 'Reservations to date',
  },
  {
    value: '$48M',
    label: 'US robotic mower TAM, 2026',
  },
  {
    value: 'Q3 2026',
    label: 'First production run',
  },
  {
    value: '48 states',
    label: 'Target launch coverage',
  },
];

export function TractionSection() {
  return (
    <section id="traction" className="py-24 px-8 bg-white border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            Traction
          </p>
          <h2 className="text-5xl mb-4 text-gray-900">A category waking up.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acre enters 2026 with a validated audience, a tested supply plan, and a launch window.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl text-gray-900 mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-500 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
