import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, EyeOff, Apple } from 'lucide-react';

const steps = [
  { id: 1, title: 'Sign up your account', active: true },
  { id: 2, title: 'Set up your profile', active: false },
  { id: 3, title: 'Start your journey', active: false },
];

export function SplitScreenAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  // Physics-based parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax constraints for left panel and right panel tilt
  const leftPanelX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const leftPanelY = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  
  const rightPanelRotateX = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  const rightPanelRotateY = useTransform(smoothMouseX, [-1, 1], [8, -8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to run from -1 to 1 across the screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans text-white overflow-hidden bg-[#050505] relative selection:bg-teal-500/30">
      
      {/* GLOBAL NOISE / GRAIN EFFECT */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* GLOBAL VIGNETTE EFFECT */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

      {/* LEFT PANEL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#115a45] via-[#0f3d2e] to-[#041a13] flex flex-col justify-center p-8 lg:p-16 overflow-hidden"
      >
        {/* Soft atmospheric lighting glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-400/10 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0b7a6e]/20 blur-[140px] mix-blend-screen pointer-events-none" />

        <motion.div 
          className="relative z-10 max-w-xl mx-auto w-full"
          style={{ x: leftPanelX, y: leftPanelY }}
        >
          {/* Subtle radial lighting glow behind the main heading */}
          <div className="absolute top-[5%] left-[20%] w-64 h-64 bg-teal-400/15 blur-[80px] pointer-events-none mix-blend-screen" />

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow-xl"
          >
            Get Started with Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-teal-50/80 text-lg mb-12 max-w-md font-medium"
          >
            Complete these easy steps to register your account.
          </motion.p>

          <div className="flex flex-col xl:flex-row gap-5 perspective-[1200px]">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
                transition={{ 
                  opacity: { duration: 0.7, delay: 0.4 + index * 0.1, ease: "easeOut" },
                  x: { duration: 0.7, delay: 0.4 + index * 0.1, ease: "easeOut" },
                  y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
                }}
                whileHover={{
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.04,
                  translateZ: 30,
                  y: 0
                }}
                className={`relative p-6 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 backdrop-blur-xl border flex-1 group ${
                  step.active 
                    ? 'bg-white/10 border-white/20 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.4)]' 
                    : 'bg-black/10 border-white/5 opacity-70 hover:opacity-100 hover:bg-white/5 hover:border-white/10'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Active glow behind the card content */}
                {step.active && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-teal-400/30 blur-[40px] pointer-events-none" />
                )}

                {/* Top highlight reflection on the glass for premium feel */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-2xl opacity-50" />

                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0 shadow-inner ${
                  step.active ? 'bg-teal-400 text-[#0f3d2e] shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 'bg-white/10 text-white shadow-black/20'
                }`}>
                  {step.id}
                </div>
                <span className={`relative font-semibold text-sm leading-tight tracking-wide ${step.active ? 'text-white' : 'text-teal-50/80'}`}>
                  {step.title}
                </span>

                {/* Floating animation for active step */}
                {step.active && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                    className="absolute inset-0 rounded-2xl border border-teal-300/20 pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-16 relative bg-[#050505] overflow-hidden"
      >
        {/* Very subtle ambient lighting in background of right panel for depth */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

        <motion.div 
          className="w-full max-w-[440px] relative perspective-[1200px] z-10"
          style={{
            rotateX: rightPanelRotateX,
            rotateY: rightPanelRotateY,
          }}
        >
          {/* Glass Form Container */}
          <div className="bg-[#111111]/60 backdrop-blur-2xl p-8 lg:p-12 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)] border border-white/10 relative transform-gpu">
            
            {/* Top highlight reflection on form container */}
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_20px_rgba(255,255,255,0.03)] pointer-events-none" />
            
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-white drop-shadow-md">
              {isLogin ? 'Welcome Back' : 'Sign Up Account'}
            </h2>
            <p className="text-gray-400/80 text-sm mb-10 font-medium tracking-wide">
              {isLogin ? 'Enter your details to access your dashboard' : 'Enter your personal data to create your account'}
            </p>

            {/* Social Logins */}
            <div className="flex gap-4 mb-8">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 text-sm font-semibold shadow-inner group relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
                <svg className="w-5 h-5 drop-shadow-sm" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 text-sm font-semibold shadow-inner group relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
                <Apple className="w-5 h-5 text-white drop-shadow-sm" />
                Apple
              </motion.button>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {!isLogin && (
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all duration-300 text-white placeholder-gray-500 shadow-inner"
                    />
                  </div>
                  <div className="space-y-2 flex-1 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all duration-300 text-white placeholder-gray-500 shadow-inner"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 relative group">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Email</label>
                <input 
                  type="email" 
                  placeholder="john.doe@example.com"
                  className="w-full bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all duration-300 text-white placeholder-gray-500 shadow-inner"
                />
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all duration-300 text-white placeholder-gray-500 shadow-inner pr-10"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full overflow-hidden bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.6)] transition-all duration-300 mt-8 group"
              >
                {/* Button highlight sweep effect */}
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
                <span className="relative z-10 drop-shadow-sm">{isLogin ? 'Sign In' : 'Sign Up'}</span>
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-400/80 mt-8 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-teal-400 hover:text-teal-300 font-bold transition-all duration-300 hover:underline hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] cursor-pointer"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
