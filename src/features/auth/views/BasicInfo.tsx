import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function BasicInfo({ onNavigate }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('choose_goals');
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
        <p className="text-brand-textMuted text-sm">
          Help us personalize your experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Age"
          type="number"
          placeholder="25"
          required
        />
        <Input
          label="Location"
          placeholder="City, Country"
          required
        />

        <Button fullWidth type="submit" className="mt-6">
          Continue
        </Button>
      </form>
    </Card>
  );
}