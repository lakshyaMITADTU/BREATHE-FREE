import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function Onboarding({ onNavigate }: Props) {
  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to Aerove
        </h2>
        <p className="text-brand-textMuted text-lg">
          Experience the future of parallax storytelling
        </p>
      </div>

      <div className="space-y-4">
        <Button
          fullWidth
          onClick={() => onNavigate('login')}
          className="text-lg py-3"
        >
          Get Started
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => onNavigate('login')}
          className="text-lg py-3"
        >
          I Already Have an Account
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-brand-textMuted">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </Card>
  );
}