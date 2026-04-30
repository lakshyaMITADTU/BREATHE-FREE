'use client'

import SectionOne from "@/components/SectionOne";
import SectionTwo from "@/components/SectionTwo";
import SectionThree from "@/components/SectionThree";
import JoinSection from "@/components/JoinSection";

export default function Home() {

  return (
    <main className="bg-black w-full min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <a href="/loginkarro.html" className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-black shadow-lg ring-1 ring-black/10 backdrop-blur hover:bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 inline-block">
          Login
        </a>
      </div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <JoinSection />
    </main>
  );
}