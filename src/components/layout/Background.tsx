import React from 'react';

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-darkest">
      {/* Wave Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 C150,150 350,-50 500,50 C650,150 850,-50 1000,50 L1000,100 L0,100 Z' fill='none' stroke='%2341c3a8' stroke-width='2'/%3E%3Cpath d='M0,70 C150,170 350,-30 500,70 C650,170 850,-30 1000,70 L1000,100 L0,100 Z' fill='none' stroke='%2341c3a8' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M0,90 C150,190 350,-10 500,90 C650,190 850,-10 1000,90 L1000,100 L0,100 Z' fill='none' stroke='%2341c3a8' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Radial Gradients for Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-teal/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-teal/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}