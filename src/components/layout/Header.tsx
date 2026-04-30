import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link href="/" className="text-xl font-bold text-brand-teal">
        Aerove
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-brand-textMuted hover:text-brand-teal transition-colors">
          Home
        </Link>
      </nav>
    </header>
  );
}