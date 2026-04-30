'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SectionThree() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cravingTextRef = useRef<HTMLDivElement>(null)
  const hurtingTextRef = useRef<HTMLDivElement>(null)
  const stopTextRef = useRef<HTMLDivElement>(null)
  const greenTintRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=400%",
      pin: true,
    })

    // Fade in craving text at the top
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "+=200%",
        scrub: true,
      }
    })

    tl.fromTo(cravingTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
    tl.to(cravingTextRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7)

    // Fade in hurting text after craving text
    tl.fromTo(hurtingTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.7)
    tl.to(hurtingTextRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 1.3)

    // Green tint and stop text appear together
    tl.fromTo(greenTintRef.current, { opacity: 0 }, { opacity: 0.15, duration: 0.8, ease: "power2.out" }, 1.3)
    tl.fromTo(stopTextRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.3)

    // Logo fades in with scale
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.5)
  }, { scope: containerRef })

  return (
    <div id="section-three" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Minimalistic focus for the final branding scrollytelling */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 to-black/90 opacity-80" />
      
      <div ref={greenTintRef} className="absolute inset-0 bg-gradient-to-b from-green-500/0 via-green-500/0 to-green-900/0 opacity-0 pointer-events-none" />
      
      <div ref={cravingTextRef} className="absolute top-20 left-1/2 -translate-x-1/2 z-40 opacity-0">
        <p className="text-5xl md:text-6xl font-bold text-white text-center tracking-wide">AND CRAVING NEVER ENDS</p>
      </div>

      <div ref={hurtingTextRef} className="absolute top-64 left-1/2 -translate-x-1/2 z-40 opacity-0 w-[90%] md:w-[70%]">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">You Know It's Hurting You.</h2>
        <p className="mt-3 text-2xl md:text-3xl text-white/80 text-center">
          Yet you keep going back, again and again.
        </p>
      </div>

      <div ref={stopTextRef} className="absolute left-1/2 -translate-x-1/2 z-40 opacity-0 w-[90%] md:w-[70%]" style={{ top: "60%" }}>
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center">But You Can Stop.</h2>
        <p className="mt-4 text-2xl md:text-3xl text-white/80 text-center">
          Take control, break the cycle, and start breathing free again.
        </p>
      </div>

      
    </div>
  )
}

