'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
