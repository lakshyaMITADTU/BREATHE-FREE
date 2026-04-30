'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FRAME_COUNT = 120

export default function SectionTwo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  const postTextRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    // Preload images
    const images: HTMLImageElement[] = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image()
        img.src = `/sequence2/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`
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
            end: "+=400%", // changed from 300 to 400
            scrub: true,
            pin: true,
        }
    })

    // Fade from black transition at the start
    tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0)

    // Animate frames
    tl.to(frame, {
        value: FRAME_COUNT - 1,
        snap: "value",
        ease: "none",
        onUpdate: render,
        duration: 0.9
    }, 0.1)

    // Show left/right copy around frame 48 (~0.45 progress into frame timeline)
    tl.fromTo([leftTextRef.current, rightTextRef.current], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.45)
    tl.to([leftTextRef.current, rightTextRef.current], { opacity: 0, y: -30, duration: 0.2, ease: "power2.in" }, 0.75)

    // Post-cigarette statement (headline + subtext)
    tl.fromTo(postTextRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.78)

    window.addEventListener("resize", render)
    return () => window.removeEventListener("resize", render)
  }, { scope: containerRef })

  return (
    <div id="section-two" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none" />

        <div ref={leftTextRef} className="absolute left-16 top-[35%] z-40 w-[35%] text-white opacity-0 pointer-events-none">
            <p className="text-base uppercase tracking-[0.2em] text-red-400 font-semibold">START / HOOK</p>
            <h2 className="mt-3 text-6xl font-bold">Just One.</h2>
            <p className="mt-2 text-2xl leading-snug text-white/80">
                It feels harmless.
                <br />Just a moment. Just a choice.
            </p>
        </div>

        <div ref={rightTextRef} className="absolute right-16 top-[35%] z-40 w-[35%] text-white opacity-0 pointer-events-none text-right">
            <p className="text-base uppercase tracking-[0.2em] text-red-400 font-semibold">IMPACT / TRUTH</p>
            <h2 className="mt-3 text-6xl font-bold">But It Never Stays One.</h2>
            <p className="mt-2 text-2xl leading-snug text-white/80">
                Addiction builds slowly,
                <br />before you even realize it.
            </p>
        </div>


        <div ref={postTextRef} className="absolute left-1/2 top-[68%] z-40 -translate-x-1/2 opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-bold text-white">You Know It’s Hurting You.</h2>
            <p className="mt-3 text-2xl md:text-3xl text-white/80 text-center">
                Yet you keep going back, again and again.
            </p>
        </div>
    </div>
  )
}
