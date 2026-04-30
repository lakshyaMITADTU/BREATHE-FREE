import React, { useState } from 'react';
import type { AuthView } from '../AuthContainer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';

interface Props {
  onNavigate: (view: AuthView) => void;
}

export function Login({ onNavigate }: Props) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onNavigate('home');
    } else {
      onNavigate('basic_info');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-brand-textMuted text-sm">
          {isLogin ? 'Enter your details to access your dashboard' : 'Join BreatheFree and start your journey'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            required 
          />
        )}
        <Input 
          label="Email or Phone" 
          type="text" 
          placeholder="Enter email or phone" 
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />

        {isLogin && (
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={() => onNavigate('forgot_password')}
              className="text-sm text-brand-teal hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button fullWidth type="submit" className="mt-6">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-brand-textMuted">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-brand-teal font-medium hover:underline"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </Card>
  );
}
