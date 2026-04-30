import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function VerifyOTP({ onNavigate }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('reset_password');
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Verify Code</h2>
        <p className="text-brand-textMuted text-sm">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Verification Code"
          placeholder="000000"
          required
        />

        <Button fullWidth type="submit" className="mt-6">
          Verify Code
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate('forgot_password')}
          className="text-sm text-brand-teal hover:underline"
        >
          Resend Code
        </button>
      </div>
    </Card>
  );
}