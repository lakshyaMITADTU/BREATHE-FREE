import React from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { ArrowRight, Brain, Coins, Wind } from 'lucide-react';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function Onboarding({ onNavigate }: Props) {
  return (
    <div className="flex flex-col items-start w-full max-w-2xl px-4 py-8">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 tracking-tighter">
        Life
        <br />
        <span className="text-brand-teal italic font-black">After</span>
        <br />
        <span className="text-brand-teal italic font-black">Aerove</span>
      </h1>
      
      <p className="text-lg md:text-xl text-brand-textMuted mt-8 mb-10 max-w-xl leading-relaxed">
        Quitting isn't just about avoiding harm — it's about gaining something extraordinary. Better sleep. Richer taste. Deeper breaths. More time.
      </p>

      <Button onClick={() => onNavigate('login')} className="mb-16 font-bold tracking-wider rounded-none">
        ASK OUR AI COACH <ArrowRight className="ml-2 w-5 h-5" />
      </Button>

      <div className="w-full space-y-4">
        <Card className="flex items-start gap-4 p-5 hover:border-brand-teal/50 transition-colors">
          <div className="mt-1 bg-yellow-500/20 p-2 rounded-full">
            <Coins className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Financial Freedom</h3>
            <p className="text-sm text-brand-textMuted mt-1">
              Save ₹50,000+ per year by quitting a pack-a-day habit.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-4 p-5 hover:border-brand-teal/50 transition-colors">
          <div className="mt-1 bg-pink-500/20 p-2 rounded-full">
            <Wind className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Easier Breathing</h3>
            <p className="text-sm text-brand-textMuted mt-1">
              Lung capacity improves within weeks. Stairs become effortless.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-4 p-5 hover:border-brand-teal/50 transition-colors">
          <div className="mt-1 bg-fuchsia-500/20 p-2 rounded-full">
            <Brain className="w-6 h-6 text-fuchsia-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Sharper Mind</h3>
            <p className="text-sm text-brand-textMuted mt-1">
              Improved circulation boosts memory, focus and cognition.
            </p>
          </div>
        </Card>
      </div>
      
      <div className="w-full flex justify-center mt-12 mb-4">
        <span className="text-xs text-brand-textMuted tracking-[0.3em] uppercase">Scroll</span>
      </div>
    </div>
  );
}
