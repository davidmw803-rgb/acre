import { useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { LawnmowerModel } from './components/LawnmowerModel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Check, RotateCcw, ChevronRight } from 'lucide-react';

const COLOR_OPTIONS = [
  { name: 'Pearl White', hex: '#F0F0F0' },
  { name: 'Stealth Black', hex: '#1a1a1a' },
  { name: 'Forest Green', hex: '#2d5a27' },
  { name: 'Slate Blue', hex: '#3a5a7c' },
  { name: 'Sunset Orange', hex: '#c45a2d' },
  { name: 'Matte Red', hex: '#8b2020' },
];

const MODEL_SPECS: Record<string, {
  name: string;
  subtitle: string;
  tagline: string;
  price: string;
  coverage: string;
  battery: string;
  features: string[];
  specs: { label: string; value: string }[];
}> = {
  G: {
    name: 'Model G',
    subtitle: 'Suburban',
    tagline: 'The Precision Tool',
    price: '$2,499',
    coverage: 'Up to 0.5 acres',
    battery: '90 min runtime',
    features: [
      'Single battery system',
      'Standard precision GPS mapping',
      'Quiet operation — under 58dB',
      'Auto-return charging dock',
      'Smartphone app control',
      'Rain sensor equipped',
    ],
    specs: [
      { label: 'Cutting Width', value: '22 cm' },
      { label: 'Cutting Height', value: '20–60 mm' },
      { label: 'Weight', value: '8.5 kg' },
      { label: 'Max Incline', value: '25°' },
      { label: 'Battery', value: '2.5 Ah Li-ion' },
      { label: 'Charge Time', value: '60 min' },
    ],
  },
  E: {
    name: 'Model E',
    subtitle: 'Estate',
    tagline: 'The Benchmark',
    price: '$3,999',
    coverage: 'Up to 2 acres',
    battery: '150 min runtime',
    features: [
      'Dual battery hot-swap system',
      'Premium RTK-GPS precision (±2cm)',
      'AI-powered obstacle avoidance',
      'Multi-zone scheduling',
      'OTA firmware updates',
      'Weatherproof IP67 rating',
    ],
    specs: [
      { label: 'Cutting Width', value: '28 cm' },
      { label: 'Cutting Height', value: '15–70 mm' },
      { label: 'Weight', value: '12.3 kg' },
      { label: 'Max Incline', value: '35°' },
      { label: 'Battery', value: '2× 5.0 Ah Li-ion' },
      { label: 'Charge Time', value: '75 min' },
    ],
  },
  T: {
    name: 'Model T',
    subtitle: 'Terrain',
    tagline: 'The All-Wheel Drive Titan',
    price: '$5,499',
    coverage: 'Up to 5 acres',
    battery: '240 min runtime',
    features: [
      'All-wheel drive system',
      'Military-grade RTK-GPS',
      'LiDAR + camera fusion navigation',
      '45° incline capability',
      'Reinforced titanium blade deck',
      'Remote diagnostics & support',
    ],
    specs: [
      { label: 'Cutting Width', value: '36 cm' },
      { label: 'Cutting Height', value: '15–80 mm' },
      { label: 'Weight', value: '18.7 kg' },
      { label: 'Max Incline', value: '45°' },
      { label: 'Battery', value: '3× 5.0 Ah Li-ion' },
      { label: 'Charge Time', value: '90 min' },
    ],
  },
};

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
    </div>
  );
}

export default function ProductPage() {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const model = MODEL_SPECS[modelId?.toUpperCase() || 'E'] || MODEL_SPECS.E;
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [activeTab, setActiveTab] = useState<'features' | 'specs'>('features');

  return (
    <div className="min-h-screen bg-white">
      <Header onReserve={() => navigate('/reserve')} />

      <main className="pt-20">
        {/* Hero: 3D Viewer + Info */}
        <section className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 3D Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl overflow-hidden relative">
                <Canvas
                  camera={{ position: [3, 2, 3], fov: 40 }}
                  shadows
                  gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                >
                  {/* 3-point studio lighting */}
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 8, 3]} intensity={1.5} castShadow shadow-mapSize={1024} />
                  <directionalLight position={[-4, 5, -2]} intensity={0.6} />
                  <directionalLight position={[0, 3, -5]} intensity={0.3} />
                  <Suspense fallback={null}>
                    <LawnmowerModel color={selectedColor.hex} />
                    <ContactShadows
                      position={[0, -0.35, 0]}
                      opacity={0.5}
                      scale={6}
                      blur={2.5}
                    />
                    <Environment preset="studio" />
                  </Suspense>
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    autoRotate
                    autoRotateSpeed={1.5}
                    minDistance={2}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.2}
                  />
                </Canvas>
                <LoadingSpinner />

                {/* Drag hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <RotateCcw className="w-3 h-3" />
                  Drag to rotate
                </div>
              </div>

              {/* Color Picker */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3 tracking-wide uppercase">
                  Color — {selectedColor.name}
                </h3>
                <div className="flex gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.hex === c.hex
                          ? 'border-gray-900 scale-110 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="mb-2">
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Back to all models
                </button>
              </div>

              <h1 className="text-5xl font-medium text-gray-900 mb-1">
                {model.name}
              </h1>
              <p className="text-lg text-gray-500 mb-2">{model.subtitle}</p>
              <p className="text-xl text-gray-700 mb-6">{model.tagline}</p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-medium text-gray-900">{model.price}</span>
                <span className="text-sm text-gray-400">Starting price</span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Coverage</p>
                  <p className="text-lg font-medium text-gray-900">{model.coverage}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Battery</p>
                  <p className="text-lg font-medium text-gray-900">{model.battery}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-10">
                <button
                  onClick={() => navigate('/reserve', { state: { model: modelId?.toUpperCase() } })}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-lg"
                >
                  Reserve Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs: Features / Specs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                  {(['features', 'specs'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-medium tracking-wide uppercase transition-colors relative ${
                        activeTab === tab
                          ? 'text-gray-900'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'features' ? (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {model.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{f}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-0 divide-y divide-gray-100"
                  >
                    {model.specs.map((s, i) => (
                      <div key={i} className="flex justify-between py-3">
                        <span className="text-gray-500">{s.label}</span>
                        <span className="font-medium text-gray-900">{s.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
