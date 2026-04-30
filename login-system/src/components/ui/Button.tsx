import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  fullWidth, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:opacity-50 h-11 px-6 py-2 shadow-[0_0_15px_rgba(65,195,168,0.3)]",
        {
          "bg-brand-teal text-brand-darkest hover:bg-brand-darkTeal hover:shadow-[0_0_20px_rgba(65,195,168,0.5)]": variant === 'primary',
          "border border-brand-teal text-brand-teal hover:bg-brand-teal/10": variant === 'outline',
          "text-brand-textMuted hover:text-brand-teal shadow-none hover:shadow-none": variant === 'ghost',
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
