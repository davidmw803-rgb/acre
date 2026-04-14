import { motion } from 'motion/react';

// TODO: confirm unit targets and milestone dates
const milestones = [
  {
    phase: 'EVT',
    quarter: 'Q4 2025',
    description: 'Engineering validation — 50 units',
  },
  {
    phase: 'DVT',
    quarter: 'Q1 2026',
    description: 'Design validation — 250 units',
  },
  {
    phase: 'PVT',
    quarter: 'Q2 2026',
    description: 'Production validation — 1,500 units',
  },
  {
    phase: 'MP',
    quarter: 'Q3 2026',
    description: 'Mass production — ramp begins',
  },
];

// TODO: confirm unit projections
const projections = [
  { year: 'Year 1', units: '25,000', note: '2026' },
  { year: 'Year 2', units: '75,000', note: '2027' },
  { year: 'Year 3', units: '150,000', note: '2028' },
];

export function VolumeTimelineSection() {
  return (
    <section className="py-32 px-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            Volume & Timeline
          </p>
          <h2 className="text-5xl md:text-6xl text-gray-900 mb-8 tracking-tight">
            Built for scale from day one.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are planning a measured ramp — validation first, mass production second.
            The partner we select will be our home for the full multi-year roadmap below.
          </p>
        </motion.div>

        {/* Milestone timeline */}
        <div className="mb-24">
          <h3 className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-8">
            Production Milestones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-5 left-8 right-8 h-px bg-gray-300" />

            {milestones.map((m, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs tracking-wide flex-shrink-0 relative z-10">
                    {index + 1}
                  </div>
                  <div className="md:text-center">
                    <div className="text-xl text-gray-900 mb-1">{m.phase}</div>
                    <div className="text-sm text-gray-500 mb-2">{m.quarter}</div>
                    <div className="text-sm text-gray-600 leading-relaxed md:max-w-[180px] md:mx-auto">
                      {m.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projections */}
        <div>
          <h3 className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-8">
            Unit Projections
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {projections.map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-10 border border-gray-200"
              >
                <div className="text-sm tracking-wide text-gray-500 uppercase mb-2">
                  {p.year} <span className="text-gray-400">— {p.note}</span>
                </div>
                <div className="text-6xl text-gray-900 tracking-tight mb-2">{p.units}</div>
                <div className="text-sm text-gray-500">units</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
