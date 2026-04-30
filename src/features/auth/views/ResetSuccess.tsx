import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function ResetSuccess({ onNavigate }: Props) {
  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Password Reset</h2>
        <p className="text-brand-textMuted text-sm">
          Your password has been successfully reset
        </p>
      </div>

      <Button fullWidth onClick={() => onNavigate('login')} className="mt-6">
        Back to Login
      </Button>
    </Card>
  );
}