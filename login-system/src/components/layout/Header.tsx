import React from 'react';

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center bg-[#0a100d] border-b border-[#14261c] z-20">
      <div className="text-xl font-bold tracking-tight text-white flex items-center">
        Breathe<span className="text-brand-teal">Free</span>
      </div>
    </header>
  );
}
