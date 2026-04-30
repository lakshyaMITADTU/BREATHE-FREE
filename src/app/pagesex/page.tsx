export default function PageSex() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),_transparent_22%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#e2e8f0_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-12 sm:px-10 lg:px-16">
        <header className="space-y-4">
          <span className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-lg shadow-fuchsia-300/20 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-300/30">
            Colourful experience
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 transition duration-300 ease-out hover:text-slate-900 sm:text-6xl">
            Light mode refreshed with bright color and warm glow.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 sm:text-xl transition duration-300 ease-out hover:text-slate-700">
            A sunny, high-contrast page using glassy cards, subtle gradients, and lively accent colors for a clean light UI.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {['Warm palette', 'Soft glass cards', 'Clean light UI'].map((label) => (
              <span key={label} className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm shadow-slate-200/50 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:shadow-slate-300/40">
                {label}
              </span>
            ))}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr] pt-10">
          <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/80 backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/50">
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700 transition duration-300 ease-out hover:-translate-y-1 hover:bg-cyan-200">
                Shine with color
              </span>
              <h2 className="text-3xl font-semibold text-slate-950 transition duration-300 ease-out hover:text-slate-800">A bright system that feels soft and premium</h2>
              <p className="max-w-xl text-slate-600 transition duration-300 ease-out hover:text-slate-700">
                Warm gradients, luminous highlights, and clean white surfaces work together for a polished light interface.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 p-6 text-white shadow-lg shadow-cyan-200/50 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-100/90">Feature</p>
                <p className="mt-3 text-2xl font-semibold">Luminous visuals</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-pink-400 via-rose-500 to-orange-400 p-6 text-white shadow-lg shadow-pink-200/50 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-pink-100/90">Style</p>
                <p className="mt-3 text-2xl font-semibold">Soft contrast</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 shadow-inner shadow-slate-100/80 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 transition duration-300 ease-out hover:text-slate-600">Ready to launch</p>
              <p className="mt-3 text-lg leading-8 transition duration-300 ease-out hover:text-slate-700">
                Swap in your own content or use this as a clean and colorful light landing page that still has personality.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 transition duration-300 ease-out hover:text-slate-600">Status</p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-950 transition duration-300 ease-out hover:text-slate-800">100% Users</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 transition duration-300 ease-out hover:-translate-y-1 hover:bg-orange-200">
                  ✨
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Daily', value: '50%', color: 'from-cyan-400 to-sky-500' },
                  { label: 'Occasional', value: '30%', color: 'from-fuchsia-400 to-pink-500' },
                  { label: 'Passive', value: '20%', color: 'from-slate-300 to-slate-400' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2 transition duration-300 ease-out hover:-translate-y-0.5">
                    <div className="flex items-center justify-between text-sm text-slate-600 transition duration-300 ease-out hover:text-slate-700">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-300 ease-out`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40">
              <h3 className="text-2xl font-semibold text-slate-950 transition duration-300 ease-out hover:text-slate-800">Keep the glow going</h3>
              <p className="mt-4 text-slate-600 transition duration-300 ease-out hover:text-slate-700">
                This layout now uses a bright light palette with airy white cards, pastel highlights, and easy reading for full light-mode support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition duration-300 ease-out hover:-translate-y-1 hover:bg-slate-200">Soft gradients</span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition duration-300 ease-out hover:-translate-y-1 hover:bg-slate-200">White surfaces</span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition duration-300 ease-out hover:-translate-y-1 hover:bg-slate-200">Warm accents</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
