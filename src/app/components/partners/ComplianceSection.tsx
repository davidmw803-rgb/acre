import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const certifications = [
  { code: 'FCC Part 15', region: 'United States' },
  { code: 'CE / UKCA', region: 'EU & UK' },
  { code: 'RoHS', region: 'Hazardous substances' },
  { code: 'REACH', region: 'EU chemical safety' },
  { code: 'UL 1447', region: 'Battery-powered outdoor equipment' },
  { code: 'IP67', region: 'Ingress protection' },
];

export function ComplianceSection() {
  return (
    <section className="py-32 px-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            Compliance Targets
          </p>
          <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight">
            Built to pass on the first run.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our design targets the following certifications. We expect our partner to
            support sample submissions and rework loops through an approved lab network.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-lg text-gray-900 mb-1">{cert.code}</div>
                <div className="text-sm text-gray-500">{cert.region}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
