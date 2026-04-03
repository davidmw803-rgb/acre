import { motion } from 'motion/react';
import { MapPin, Shield, TrendingUp } from 'lucide-react';

export function BrainSection() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - LiDAR Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1611759386222-9ac905b251d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGlkYXIlMjBzZW5zb3IlMjBibHVlfGVufDF8fHx8MTc3MDY5MDE2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="LiDAR sensor technology"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-blue-500/20" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-6 text-gray-900">Software at the Core.</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Like a Tesla, your Acre gets better over time. Over-the-air updates optimize cutting patterns, 
              improve battery life, and introduce new terrain-handling capabilities.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-gray-900">Live Path Tracking</h4>
                  <p className="text-gray-600">Monitor real-time progress from anywhere</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-gray-900">Dynamic Obstacle Avoidance</h4>
                  <p className="text-gray-600">Intelligent navigation around objects and people</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-gray-900">Seasonal Growth Analytics</h4>
                  <p className="text-gray-600">Data-driven insights for optimal lawn health</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
