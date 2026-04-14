import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartnersHero } from './components/partners/PartnersHero';
import { OpportunitySection } from './components/partners/OpportunitySection';
import { ProductReadinessSection } from './components/partners/ProductReadinessSection';
import { VolumeTimelineSection } from './components/partners/VolumeTimelineSection';
import { CapabilitiesSection } from './components/partners/CapabilitiesSection';
import { ComplianceSection } from './components/partners/ComplianceSection';
import { PartnerContactForm } from './components/partners/PartnerContactForm';

export default function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onReserve={scrollToContact} ctaLabel="Contact Us" variant="partners" />
      <PartnersHero onContact={scrollToContact} />
      <OpportunitySection />
      <ProductReadinessSection />
      <VolumeTimelineSection />
      <CapabilitiesSection />
      <ComplianceSection />
      <PartnerContactForm />
      <Footer />
    </div>
  );
}
