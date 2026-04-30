'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FRAME_COUNT = 120

export default function SectionOne() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    // Preload images
    const images: HTMLImageElement[] = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image()
        img.src = `/sequence1/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`
        images.push(img)
    }

    const render = () => {
        if (!images[frame.value]) return
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        const img = images[frame.value]
        const hRatio = canvas.width / img.width
        const vRatio = canvas.height / img.height
        const ratio = Math.max(hRatio, vRatio)
        const centerShift_x = (canvas.width - img.width * ratio) / 2
        const centerShift_y = (canvas.height - img.height * ratio) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        )
    }

    images[0].onload = render

    const frame = { value: 0 }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%",
            scrub: true,
            pin: true,
        }
    })

    // Animate frames (duration normalized to 1)
    tl.to(frame, {
        value: FRAME_COUNT - 1,
        snap: "value",
        ease: "none",
        onUpdate: render,
        duration: 0.9 // Leaving 0.1 for fade out
    }, 0)

    // Headline first
    tl.fromTo(headlineRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0)

    // Subtext in after headline with overlap
    tl.fromTo(subtextRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0.2)

    // Fade out both once sequence reaches lung exposure
    tl.to([headlineRef.current, subtextRef.current], { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.6)

    // Fade to black at the very end
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.9)

    window.addEventListener("resize", render)
    return () => window.removeEventListener("resize", render)
  }, { scope: containerRef })

  return (
    <div id="section-one" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <div className="absolute left-6 top-[30%] z-40 max-w-md text-white pointer-events-none">
            <h1 ref={headlineRef} className="text-5xl font-bold tracking-tight md:text-7xl opacity-0">Every Breath Matters</h1>
            <p ref={subtextRef} className="mt-3 text-xl md:text-3xl text-white/80 opacity-0">Quit smoking, regain your life, and breathe freely again.</p>
        </div>
    </div>
  )
}
