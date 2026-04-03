import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ModelSelection } from './reservation/ModelSelection';
import { ConfigurationStep } from './reservation/ConfigurationStep';
import { PersonalInfoStep } from './reservation/PersonalInfoStep';
import { PaymentStep } from './reservation/PaymentStep';
import { ConfirmationStep } from './reservation/ConfirmationStep';

export type ModelType = 'G' | 'E' | 'T' | null;

export interface ReservationData {
  model: ModelType;
  color: string;
  accessories: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface ReservationFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialModel?: ModelType;
}

export function ReservationFlow({ open, onOpenChange, initialModel }: ReservationFlowProps) {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    model: initialModel || null,
    color: 'matte-black',
    accessories: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation completes
    setTimeout(() => {
      setStep(1);
      setReservationData({
        model: null,
        color: 'matte-black',
        accessories: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      });
    }, 300);
  };

  const updateData = (updates: Partial<ReservationData>) => {
    setReservationData({ ...reservationData, ...updates });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0 bg-white border-0 flex flex-col">
        <div className="flex-shrink-0 bg-white z-10 border-b border-gray-200 px-12 py-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-gray-500">Step {step} of 5</span>
              <span className="text-xs uppercase tracking-wider text-gray-500">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Title */}
          <h2 className="text-4xl tracking-tight text-gray-900">
            {step === 1 && 'Choose Your Model'}
            {step === 2 && 'Configure Your Acre'}
            {step === 3 && 'Your Information'}
            {step === 4 && 'Secure Your Reservation'}
            {step === 5 && 'Reservation Confirmed'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-12 py-10">
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
      </DialogContent>
    </Dialog>
  );
}