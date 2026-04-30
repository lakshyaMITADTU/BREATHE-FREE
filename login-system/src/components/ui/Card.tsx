import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientBorder?: boolean;
}

export function Card({ className, gradientBorder, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-br from-brand-card/80 to-brand-card/20 backdrop-blur-md p-6 shadow-xl border border-brand-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
