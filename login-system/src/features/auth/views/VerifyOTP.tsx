import React, { useState } from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function VerifyOTP({ onNavigate }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input logic would go here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('reset_password');
  };

  return (
    <Card className="w-full max-w-md">
      <button 
        onClick={() => onNavigate('forgot_password')}
        className="text-brand-textMuted hover:text-white mb-6 flex items-center text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
        <p className="text-brand-textMuted text-sm">
          Enter the 6-digit code sent to your registered email/phone.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, idx) => (
            <Input 
              key={idx}
              type="text" 
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="text-center text-lg font-bold w-12 px-0"
              maxLength={1}
              required 
            />
          ))}
        </div>

        <Button fullWidth type="submit">
          Verify and Continue
        </Button>
      </form>
    </Card>
  );
}
