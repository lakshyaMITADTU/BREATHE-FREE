import React, { useState } from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../components/ui/Button';

interface Props {
  onNavigate: (view: AuthView) => void;
}

const goals = [
  "Better Health & Breathing",
  "Save Money",
  "For My Family",
  "More Energy & Focus",
  "Break the Addiction"
];

export function ChooseGoals({ onNavigate }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    if (selected.includes(goal)) {
      setSelected(selected.filter(g => g !== goal));
    } else {
      setSelected([...selected, goal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('home');
  };

  return (
    <Card className="w-full max-w-md text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Goals</h2>
        <p className="text-brand-textMuted text-sm">
          Select what you want to achieve most by quitting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-3">
          {goals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={cn(
                "w-full px-4 py-3 rounded-md border text-left text-sm font-medium transition-colors",
                selected.includes(goal) 
                  ? "bg-brand-teal text-brand-darkest border-brand-teal" 
                  : "bg-[#14261c] text-white border-brand-border hover:border-brand-teal/50"
              )}
            >
              {goal}
            </button>
          ))}
        </div>

        <Button fullWidth type="submit" disabled={selected.length === 0}>
          Finish Onboarding
        </Button>
      </form>
    </Card>
  );
}
