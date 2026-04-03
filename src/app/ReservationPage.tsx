import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ModelSelection } from './components/reservation/ModelSelection';
import { ConfigurationStep } from './components/reservation/ConfigurationStep';
import { PersonalInfoStep } from './components/reservation/PersonalInfoStep';
import { PaymentStep } from './components/reservation/PaymentStep';
import { ConfirmationStep } from './components/reservation/ConfirmationStep';
import type { ReservationData } from './components/ReservationFlow';

export default function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialModel = location.state?.model || null;

  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    model: initialModel,
    color: null,
    accessories: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const updateData = (updates: Partial<ReservationData>) => {
    setReservationData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Back to Home</span>
          </button>
          
          <div className="text-2xl tracking-tight font-medium text-gray-900">ACRE</div>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-gray-500">Step {step} of 5</span>
              <span className="text-xs uppercase tracking-wider text-gray-500">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Title */}
          <h1 className="text-5xl md:text-6xl tracking-tight text-gray-900 mb-16">
            {step === 1 && 'Choose Your Model'}
            {step === 2 && 'Configure Your Acre'}
            {step === 3 && 'Your Information'}
            {step === 4 && 'Secure Your Reservation'}
            {step === 5 && 'Reservation Confirmed'}
          </h1>

          {/* Step Content */}
          <div>
            {step === 1 && (
              <ModelSelection
                data={reservationData}
                onUpdate={updateData}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <ConfigurationStep
                data={reservationData}
                onUpdate={updateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <PersonalInfoStep
                data={reservationData}
                onUpdate={updateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 4 && (
              <PaymentStep
                data={reservationData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 5 && (
              <ConfirmationStep
                data={reservationData}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
