import { motion } from 'motion/react';

export function PerformanceRibbon() {
  const stats = [
    {
      value: '45°',
      label: 'Max Incline Performance',
    },
    {
      value: '2.5 hrs',
      label: 'Charge to Full',
    },
    {
      value: '0.0 lbs',
      label: 'Carbon Emissions',
    },
  ];

  return (
    <section className="py-20 px-8 bg-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
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
