import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function ForgotPassword({ onNavigate }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('verify_otp');
  };

  return (
    <Card className="w-full max-w-md">
      <button 
        onClick={() => onNavigate('login')}
        className="text-brand-textMuted hover:text-white mb-6 flex items-center text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
        <p className="text-brand-textMuted text-sm">
          Enter your registered email or phone number and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Registered Email / Phone" 
          type="text" 
          placeholder="Enter email or phone" 
          required 
        />

        <Button fullWidth type="submit">
          Send Recovery Link / OTP
        </Button>
      </form>
    </Card>
  );
}
