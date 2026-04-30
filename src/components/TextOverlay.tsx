'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function TextOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Helper to format animations securely to avoid any overlap
    const animateText = (tl: gsap.core.Timeline, id: string, inTime: number, outTime: number, duration = 0.8) => {
      // Fade in and slide up from below
      tl.fromTo(id, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration, ease: 'power2.out' }, 
        inTime
      )
      // Fade out and slide up out of view
      tl.to(id, 
        { opacity: 0, y: -50, duration, ease: 'power2.in' }, 
        outTime
      )
    }

    // SECTION 1 TIMELINE (0 to 10)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-one",
        start: "top top",
        end: "+=400%",
        scrub: true,
      }
    })
    tl1.to({}, {duration: 10}, 0) // Explicitly set length to 10
    // timings: in starts, out starts
    animateText(tl1, "#text-1", 1.0, 4.0, 1.0) // 1 to 2 in, 4 to 5 out
    animateText(tl1, "#text-2", 5.0, 8.0, 1.0) // 5 to 6 in, 8 to 9 out

    // SECTION 2 TIMELINE (0 to 10)
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-two",
        start: "top top",
        end: "+=400%",
        scrub: true,
      }
    })
    tl2.to({}, {duration: 10}, 0)
    animateText(tl2, "#text-3", 0.5, 2.0, 0.7) // 0.5 to 1.2 in, 2.0 to 2.7 out
    animateText(tl2, "#text-4", 2.7, 4.2, 0.7) // 2.7 to 3.4 in, 4.2 to 4.9 out
    animateText(tl2, "#text-5", 4.9, 6.4, 0.7) // 4.9 to 5.6 in, 6.4 to 7.1 out
    animateText(tl2, "#text-6", 7.1, 8.6, 0.7) // 7.1 to 7.8 in, 8.6 to 9.3 out

    // SECTION 3 TIMELINE (0 to 10)
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-three",
        start: "top top",
        end: "+=400%",
        scrub: true,
      }
    })
    tl3.to({}, {duration: 10}, 0)
    animateText(tl3, "#text-7", 0.5, 2.0, 0.7)
    animateText(tl3, "#text-8", 2.7, 4.2, 0.7)
    animateText(tl3, "#text-9", 4.9, 6.4, 0.7)
    animateText(tl3, "#text-10", 7.1, 8.6, 0.7)

  }, { scope: containerRef })

  const texts = [
    // Section 1
    { id: 'text-1', content: "Every inhale travels deeper..." },
    { id: 'text-2', content: "...into places you can’t see." },
    // Section 2
    { id: 'text-3', content: "Each puff carries more than smoke." },
    { id: 'text-4', content: "Toxins. Damage. Irreversible change." },
    { id: 'text-5', content: "What feels like relief..." },
    { id: 'text-6', content: "...is slowly taking something away." },
    // Section 3
    { id: 'text-7', content: "What if smoking didn’t have to cost your health?" },
    { id: 'text-8', content: "A smarter way. A safer alternative." },
    { id: 'text-9', content: "Reimagining every inhale." },
    { id: 'text-10', content: "Reducing harm. Preserving life." },
  ]

  return (
    <div ref={containerRef} className="fixed top-1/2 left-8 md:left-24 -translate-y-1/2 z-50 pointer-events-none w-full max-w-4xl">
      <div className="relative w-full">
        {texts.map((item) => (
          <h2 
            key={item.id} 
            id={item.id}
            className="absolute left-0 text-white font-sans text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight opacity-0 w-full leading-tight"
          >
            {item.content}
          </h2>
        ))}
      </div>
    </div>
  )
}
