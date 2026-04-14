import { motion } from 'motion/react';
import { Cog, CircuitBoard, Battery, Droplets, ClipboardCheck, Truck } from 'lucide-react';

const capabilities = [
  {
    icon: Cog,
    title: 'Precision Injection Molding',
    description:
      'Multi-cavity tooling for complex chassis geometry. Automotive-grade surface finish on visible parts.',
  },
  {
    icon: CircuitBoard,
    title: 'PCBA & Motor Integration',
    description:
      'SMT assembly for motor control, RTK module, and sensor fusion board. BLDC motor integration with fine-balance QC.',
  },
  {
    icon: Battery,
    title: 'LFP Battery Pack Assembly',
    description:
      'Cell sourcing, BMS integration, and pack-level safety testing. UN38.3 and IEC 62133 qualified.',
  },
  {
    icon: Droplets,
    title: 'IP67 Sealing & Weatherproofing',
    description:
      'Ultrasonic welding, gasket selection, and in-line water-ingress testing on every unit.',
  },
  {
    icon: ClipboardCheck,
    title: 'Functional QC + EOL Testing',
    description:
      '100% functional test at end of line. Automated regression on RTK lock, drive current, and blade balance.',
  },
  {
    icon: Truck,
    title: 'US 3PL Logistics',
    description:
      'Cartoned export-ready packaging. FCL shipments to US 3PL with Incoterms FOB Yantian or Shanghai.',
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            What We're Looking For
          </p>
          <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight">
            Capabilities we need.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A partner who can run every step of the process below under one roof —
            or coordinate tier-2 vendors tightly enough that we won't feel the seams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-8 rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-gray-300 rounded-full">
                  <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{cap.title}</h3>
                <p className="text-gray-600 leading-relaxed">{cap.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
