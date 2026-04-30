import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function ResetSuccess({ onNavigate }: Props) {
  return (
    <Card className="w-full max-w-md text-center py-10">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-brand-teal/20 p-4">
          <CheckCircle2 className="w-12 h-12 text-brand-teal" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">Password Reset!</h2>
      <p className="text-brand-textMuted text-sm mb-8">
        Your password has been successfully reset. Click below to log in magically.
      </p>

      <Button fullWidth onClick={() => onNavigate('login')}>
        Back to Login
      </Button>
    </Card>
  );
}
