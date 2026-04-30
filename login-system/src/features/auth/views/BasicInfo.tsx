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
    <Card className="w-full max-w-md text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Info</h2>
        <p className="text-brand-textMuted text-sm">
          Let's personalize your BreatheFree experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Your Age" 
          type="number" 
          placeholder="e.g. 28" 
          required 
        />
        <Input 
          label="Years Smoking" 
          type="number" 
          placeholder="e.g. 5" 
          required 
        />
        <Input 
          label="Cigarettes per day" 
          type="number" 
          placeholder="e.g. 10" 
          required 
        />

        <Button fullWidth type="submit" className="mt-6">
          Continue
        </Button>
      </form>
    </Card>
  );
}
