import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';

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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
        <p className="text-brand-textMuted text-sm">
          Enter your email to receive a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Button fullWidth type="submit" className="mt-6">
          Send Reset Code
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate('login')}
          className="text-sm text-brand-teal hover:underline"
        >
          Back to Login
        </button>
      </div>
    </Card>
  );
}