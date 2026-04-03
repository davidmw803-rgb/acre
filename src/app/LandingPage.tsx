import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { BrainSection } from './components/BrainSection';
import { PerformanceRibbon } from './components/PerformanceRibbon';
import { ModelComparison } from './components/ModelComparison';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import type { ModelType } from './components/ReservationFlow';

export default function LandingPage() {
  const navigate = useNavigate();

  const openReservation = (model?: ModelType) => {
    navigate('/reserve', { state: { model: model || null } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onReserve={() => openReservation()} />
      <HeroSection onReserve={() => openReservation()} />
      <FeatureGrid />
      <BrainSection />
      <PerformanceRibbon />
      <ModelComparison onReserve={openReservation} />
      <ClosingCTA onReserve={() => openReservation()} />
      <Footer />
    </div>
  );
}
