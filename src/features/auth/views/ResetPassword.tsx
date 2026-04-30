import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function ResetPassword({ onNavigate }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('reset_success');
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-brand-textMuted text-sm">
          Enter your new password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <Button fullWidth type="submit" className="mt-6">
          Reset Password
        </Button>
      </form>
    </Card>
  );
}