import React, { useState } from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

const goals = [
  'Experience Parallax Storytelling',
  'Learn About Aerove',
  'Explore Interactive Design',
  'Discover New Technologies'
];

export function ChooseGoals({ onNavigate }: Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('home');
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">What brings you here?</h2>
        <p className="text-brand-textMuted text-sm">
          Select all that apply
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {goals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                selectedGoals.includes(goal)
                  ? 'border-brand-teal bg-brand-teal/10 text-white'
                  : 'border-brand-border bg-brand-card/50 text-brand-textMuted hover:border-brand-teal/50'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        <Button
          fullWidth
          type="submit"
          className="mt-6"
          disabled={selectedGoals.length === 0}
        >
          Complete Setup
        </Button>
      </form>
    </Card>
  );
}