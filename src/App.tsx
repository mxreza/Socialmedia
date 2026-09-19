import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import profileImg from "./assets/images/profile.jpg";
import profileWebp from "./assets/images/profile.webp";

import { Coffee, Rocket, Cpu, Zap, Brain, Palette, Atom, Sparkles, Monitor, Orbit, Instagram, Linkedin, Dribbble, Trophy } from "lucide-react";

const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 260, mass: 0.45 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let rafId: number | null = null;
    let pendingX = -100;
    let pendingY = -100;

    const moveCursor = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          cursorX.set(pendingX);
          cursorY.set(pendingY);
          rafId = null;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        const hovering = !!target.closest("a, button, .card-glass-hover, [role='button']");
        setIsHovering((prev) => (prev !== hovering ? hovering : prev));
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-teal/50 rounded-full pointer-events-none z-[9999] mix-blend-screen -ml-4 -mt-4"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        animate={{
          scale: isHovering ? 1.55 : 1,
          borderColor: isHovering ? "rgba(255, 109, 76, 0.75)" : "rgba(44, 216, 228, 0.5)",
          backgroundColor: isHovering ? "rgba(255, 109, 76, 0.08)" : "rgba(44, 216, 228, 0)"
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] -ml-0.75 -mt-0.75"
        style={{
          x: cursorX,
          y: cursorY,
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
};

// --- Brand Icons ---

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.48 17.33c-.22.35-.67.45-1.02.24-2.81-1.72-6.35-2.11-10.52-1.15-.41.09-.81-.16-.9-.57-.09-.4.16-.8.56-.9 4.54-1.04 8.44-.6 11.61 1.34.36.21.46.66.27 1.04zm1.46-3.26a.93.93 0 0 1-1.27.3c-3.22-1.98-8.13-2.56-11.93-1.4-.46.14-.95-.12-1.09-.58-.14-.46.12-.95.58-1.09 4.34-1.32 9.76-.67 13.45 1.6.45.2.6.77.26 1.17zm.13-3.39c-3.86-2.29-10.22-2.5-13.92-1.38-.53.16-1.1-.14-1.26-.67-.16-.53.14-1.1.67-1.26 4.25-1.29 11.28-1.04 15.71 1.6.48.28.64.9.36 1.37-.28.48-.9.64-1.56.34z"/>
  </svg>
);

const StravaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.008 13.828h4.172z"/>
  </svg>
);

const MediumIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z"/>
  </svg>
);

const VirgoolIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
     <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0.923,6.333c2.727,0,4.936,2.88,4.936,5.7 c0,1.754-0.347,3.445-1.026,4.992c-0.826,1.881-2.186,3.489-3.882,4.59c-0.342,0.222-0.798,0.121-1.019-0.221 c-0.221-0.342-0.12-0.797,0.222-1.019c1.247-0.81,2.255-1.987,2.885-3.37c-0.651,0.262-1.365,0.41-2.115,0.41 c-3.149,0-5.702-2.553-5.702-5.702S9.774,6.333,12.923,6.333z"/>
  </svg>
);

// --- Components ---

const Background = React.memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050e0c]">
    <div className="dot-grid" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_50%_50%,rgba(5,35,30,0.65)_0%,transparent_75%)]" />
    <div className="noise" />
  </div>
));

const Arrow = React.memo(({ absolute, centered }: { absolute?: boolean; centered?: boolean }) => (
  <div className={`w-[30px] h-[30px] rounded-full bg-orange/14 border border-orange/28 flex items-center justify-center shrink-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[linear-gradient(135deg,#D4140D,#FF6D4C)] group-hover:border-[#FF6D4C]/50 group-hover:shadow-[0_0_14px_rgba(212,20,13,0.45)] group-hover:scale-105 ${absolute ? (centered ? 'absolute top-1/2 -translate-y-1/2 right-5 z-10' : 'absolute top-1/2 -translate-y-1/2 lg:top-5 lg:translate-y-0 right-5 z-10') : ''}`}>
    <svg className="w-[13px] h-[13px] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 14 14">
      <path className="stroke-orange group-hover:stroke-white/95 transition-colors duration-300" d="M2 12L12 2M12 2H6M12 2V8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
));

const Chip = React.memo(({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 bg-orange/8 border border-orange/15 rounded-[9px] p-[5px_9px_6px] flex flex-col gap-[2px] transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-orange/13 group-hover:border-orange/28">
    <span className="font-display font-bold text-[14.5px] text-t1 leading-none">{value}</span>
    <span className="text-[8.5px] text-t3 uppercase tracking-[0.5px] font-semibold">{label}</span>
  </div>
));

const ProfilePattern = React.memo(() => (
  <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.65] [mask-image:linear-gradient(to_bottom,black_45%,transparent_98%)]">
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-110">
      {/* Cosmic Background Nodes */}
      <circle cx="250" cy="180" r="220" stroke="rgba(44,216,228,0.18)" strokeWidth="0.5" strokeDasharray="5 10" />
      <circle cx="250" cy="180" r="160" stroke="rgba(255,109,76,0.14)" strokeWidth="0.5" />
      
      {/* Stars & Pulsing Points */}
      <g opacity=".85">
        <circle cx="60" cy="80" r="1.2" fill="#fff" className="animate-pulse" />
        <circle cx="440" cy="120" r="1" fill="#fff" />
        <circle cx="120" cy="320" r="1.5" fill="#fff" style={{ animationDelay: '1.5s' }} className="animate-pulse" />
        <circle cx="380" cy="360" r="1.2" fill="#fff" />
        <circle cx="250" cy="40" r="0.8" fill="#fff" />
        <circle cx="400" cy="250" r="1" fill="#fff" style={{ animationDelay: '2s' }} className="animate-pulse" />
        <circle cx="100" cy="150" r="0.6" fill="#fff" />
        <circle cx="450" cy="300" r="0.8" fill="#fff" />
        <circle cx="200" cy="50" r="0.5" fill="#fff" />
      </g>
      
      {/* Lucide Icons in Pattern - Area 1 (Top Left) */}
      <g transform="translate(40, 30) rotate(-15)">
        <Monitor size={22} className="text-teal opacity-40" strokeWidth={1.5} />
      </g>
      <g transform="translate(85, 65) rotate(10)">
        <Rocket size={28} className="text-orange opacity-45" strokeWidth={1.2} />
      </g>
      <g transform="translate(20, 110)">
        <Zap size={20} className="text-teal opacity-30" strokeWidth={1.5} />
      </g>
 
      {/* Area 2 (Top Right) */}
      <g transform="translate(380, 25) rotate(15)">
        <Orbit size={24} className="text-teal opacity-50" strokeWidth={1.2} />
      </g>
      <g transform="translate(440, 60)">
        <Palette size={20} className="text-orange opacity-35" strokeWidth={1.5} />
      </g>
      <g transform="translate(330, 70)">
        <Monitor size={26} className="text-teal opacity-25" strokeWidth={1.5} />
      </g>
 
      {/* Area 3 (Center Cluster) */}
      <g transform="translate(180, 45)">
        <Zap size={18} className="text-orange opacity-40" strokeWidth={1.5} />
      </g>
      <g transform="translate(290, 140) rotate(-20)">
        <Rocket size={22} className="text-teal opacity-35" strokeWidth={1.2} />
      </g>
      <g transform="translate(210, 320)">
        <Orbit size={25} className="text-orange opacity-30" strokeWidth={1.2} />
      </g>
 
      {/* Area 4 (Bottom Left) */}
      <g transform="translate(50, 280) rotate(12)">
        <Palette size={24} className="text-teal opacity-45" strokeWidth={1.5} />
      </g>
      <g transform="translate(110, 320)">
        <Monitor size={20} className="text-orange opacity-30" strokeWidth={1.5} />
      </g>
      <g transform="translate(30, 340)">
        <Zap size={22} className="text-teal opacity-25" strokeWidth={1.5} />
      </g>
 
      {/* Area 5 (Bottom Right) */}
      <g transform="translate(420, 280) rotate(-10)">
        <Rocket size={28} className="text-orange opacity-50" strokeWidth={1.2} />
      </g>
      <g transform="translate(360, 330)">
        <Monitor size={22} className="text-teal opacity-35" strokeWidth={1.5} />
      </g>
      <g transform="translate(450, 350)">
        <Orbit size={20} className="text-orange opacity-25" strokeWidth={1.2} />
      </g>
 
      {/* Area 6 (Mid Sides) */}
      <g transform="translate(460, 180)">
        <Zap size={18} className="text-teal opacity-40" strokeWidth={1.5} />
      </g>
      <g transform="translate(15, 210) rotate(25)">
        <Palette size={20} className="text-orange opacity-30" strokeWidth={1.5} />
      </g>
      <g transform="translate(130, 240)">
        <Monitor size={24} className="text-teal opacity-20" strokeWidth={1.5} />
      </g>
      <g transform="translate(390, 160)">
        <Orbit size={22} className="text-orange opacity-35" strokeWidth={1.2} />
      </g>
 
      {/* Existing Abstract Icons (Brain, Atom, etc.) distributed */}
      <g transform="translate(250, 80)">
        <Brain size={18} className="text-teal opacity-40" strokeWidth={1.5} />
      </g>
      <g transform="translate(140, 100)">
        <Atom size={22} className="text-orange opacity-25" strokeWidth={1.5} />
      </g>
      <g transform="translate(320, 240)">
        <Cpu size={20} className="text-teal opacity-30" strokeWidth={1} />
      </g>
 
      {/* Grid Lines */}
      <path d="M0 200 H500 M250 0 V400" stroke="rgba(44,216,228,0.1)" strokeWidth="0.5" />
      
      {/* Orbital Design Rings */}
      <ellipse cx="250" cy="180" rx="300" ry="95" stroke="rgba(255,109,76,0.15)" strokeWidth="1.2" transform="rotate(-20, 250, 180)" />
      <ellipse cx="250" cy="180" rx="340" ry="130" stroke="rgba(44,216,228,0.08)" strokeWidth="0.8" transform="rotate(15, 250, 180)" />
      
      {/* Pixel nodes */}
      <rect x="440" y="200" width="4" height="4" fill="#2cd8e4" opacity=".4" />
      <rect x="450" y="210" width="4" height="4" fill="#FF6D4C" opacity=".4" />
      <rect x="50" y="100" width="4" height="4" fill="#2cd8e4" opacity=".4" />
      <rect x="40" y="40" width="3" height="3" fill="#fff" opacity=".3" />
      <rect x="460" y="350" width="3" height="3" fill="#fff" opacity=".3" />
 
      <circle cx="250" cy="180" r="100" stroke="rgba(44,216,228,0.12)" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="250" cy="180" r="260" stroke="rgba(255,109,76,0.06)" strokeWidth="0.5" />
 
      <path d="M80 340 Q 250 280 420 340" stroke="rgba(44,216,228,0.3)" strokeWidth="2" fill="none" opacity=".5" />
      <circle cx="80" cy="340" r="3" fill="#FF6D4C" opacity=".6" />
      <circle cx="420" cy="340" r="3" fill="#FF6D4C" opacity=".6" />
    </svg>
  </div>
));

export default function App() {
  const [stats, setStats] = useState({
    instagram: { followers: "485", posts: "118" },
    linkedin: { connects: "2.8k", posts: "47" },
    spotify: { playlists: "18", minutes: "45k" },
    x: { followers: "360", posts: "680" },
    coffeebede: { fans: "12", coffees: "42" },
    chess: { rating: "1.4k", wins: "860" },
    dribbble: { followers: "320", shots: "62" },
    strava: { activities: "14", distance: "54 km" },
    virgool: { followers: "85", posts: "82" }
  });



  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      <Background />
      
      <motion.main 
        initial={!isMobile ? { opacity: 0, y: 16 } : { opacity: 1 }}
        animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
        transition={!isMobile ? { 
          duration: 0.35,
          ease: [0.2, 0.8, 0.2, 1]
        } : { duration: 0 }}
        className="page relative z-10 max-w-[980px] mx-auto p-[50px_18px_80px]"
      >
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[195px_195px_195px_92px_92px] gap-[10px]">
          
          {/* Profile Card */}
          <motion.div 
            className="card-glass lg:col-span-2 lg:row-span-2 p-0 flex flex-col justify-end min-h-[320px] lg:min-h-[400px] rounded-[32px] lg:order-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,109,76,0.08),rgba(212,20,13,0.03),transparent_60%)] pointer-events-none" />
            <ProfilePattern />
            <div className="relative z-[3] p-[24px_26px_28px] flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="w-[140px] h-[140px] rounded-full p-[3px] bg-[linear-gradient(135deg,#2cd8e4,#FF6D4C,#D4140D)] mb-[20px] shrink-0 shadow-[0_0_0_6px_rgba(44,216,228,0.10),0_8px_28px_rgba(0,0,0,0.50)]">
                <div className="w-full h-full rounded-full bg-[linear-gradient(145deg,#0d3530,#08201c)] flex items-center justify-center overflow-hidden font-display font-bold text-[20px] text-teal tracking-[0.5px]">
                  <picture className="w-full h-full">
                    <source srcSet={profileWebp} type="image/webp" />
                    <img 
                      src={profileImg} 
                      alt="Mohammadreza Aghamohammadi" 
                      width={140}
                      height={140}
                      decoding="async"
                      fetchPriority="high"
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('images.unsplash.com')) {
                          target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                        }
                      }} 
                      className="w-full h-full object-cover" 
                    />
                  </picture>
                </div>
              </div>
              <h1 className="font-display font-medium text-[clamp(24px,3vw,36px)] leading-[1.1] text-t1 mb-[12px]">
                Mohammadreza<br/>Aghamohammadi
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-[12px] mt-[4px]">
                <div className="flex items-center gap-[7px] text-[15px] font-medium text-t2 tracking-[0.2px]">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#22d87a] shrink-0 animate-[heartbeat_2.6s_ease-in-out_infinite]" style={{ willChange: "transform, opacity" }} />
                  Product Designer
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card-glass lg:col-span-2 lg:row-span-1 p-[28px_30px] flex flex-col justify-center items-start text-left rounded-[32px] lg:order-2"
          >
            <div className="font-display text-[10px] font-bold tracking-[3px] uppercase text-orange opacity-90 mb-[12px]">About</div>
            <p className="text-[14px] font-light leading-[1.85] text-t2">
              <strong className="text-t1 font-semibold">Product designer</strong> focused on creating <strong className="text-t1 font-semibold">user-centered</strong>, minimalist, and <strong className="text-t1 font-semibold">data-driven</strong> digital experiences. Passionate about <strong className="text-t1 font-semibold">product management</strong> and building products, solving complex problems, technology, <strong className="text-t1 font-semibold">systems thinking</strong>, and crafting <strong className="text-t1 font-semibold">functional and beautiful</strong> digital experiences.
            </p>
          </motion.div>

          {/* Instagram Card (Now 3rd in DOM for mobile, Order 4 for desktop) */}
          <a href="https://instagram.com/mxreza_" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-4">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <Instagram className="w-6 h-6 text-[#E4405F] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Instagram</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza_</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.instagram.followers} label="Followers" />
                <Chip value={stats.instagram.posts} label="Posts" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.instagram.followers}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.instagram.posts}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a href="https://linkedin.com/in/mxreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 sm:col-span-2 lg:col-span-2 relative lg:order-5">
            <Arrow absolute />
            <div className="w-[48px] h-[48px] rounded-[13px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <Linkedin className="w-8 h-8 text-[#0A66C2] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-105" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[16px] text-t1 mb-[1px] lg:mb-[3px]">LinkedIn</div>
              <div className="text-[10.5px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[8px]">
                <Chip value={stats.linkedin.connects} label="Connects" />
                <Chip value={stats.linkedin.posts} label="Posts" />
                <Chip value="Professional" label="Mode" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.linkedin.connects}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Connects</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.linkedin.posts}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* Spotify Card */}
          <a href="https://open.spotify.com/user/8tzab99p5plcegezsx2wrz6vg" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-6">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <SpotifyIcon className="w-6 h-6 text-[#1DB954] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Spotify</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">Listening now</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.spotify.playlists} label="Playlists" />
                <Chip value={stats.spotify.minutes} label="Minutes" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.spotify.playlists}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Playlists</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.spotify.minutes}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Min</span>
              </div>
            </div>
          </a>

          {/* X Card */}
          <a href="https://x.com/mxrezax" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-7">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <XIcon className="w-4 h-4 text-white transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">X</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxrezax</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.x.followers} label="Followers" />
                <Chip value={stats.x.posts} label="Posts" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.x.followers}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.x.posts}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* CoffeeBede Card */}
          <a href="https://www.coffeebede.com/mreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[12px_22px] lg:p-[15px_22px] flex flex-row items-center gap-[14px] h-full sm:col-span-2 lg:col-span-2 lg:row-span-1 rounded-[32px] min-h-[90px] sm:min-h-[95px] lg:min-h-0 relative overflow-hidden lg:order-11">
            <Arrow absolute centered />
            <div className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] rounded-[11px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <Coffee className="w-6 h-6 text-[#f5c842] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[15px] text-t1 mb-[0px]">CoffeeBede</div>
              <div className="text-[9px] text-t3 font-medium uppercase tracking-[0.3px]">Support me</div>
            </div>
            <div className="flex items-center gap-[11px] shrink-0 pr-10 relative z-[1]">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[14px] text-t1 leading-none">{stats.coffeebede.fans}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Fans</span>
              </div>
              <div className="w-[1px] h-[22px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[14px] text-t1 leading-none">{stats.coffeebede.coffees}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Coffees</span>
              </div>
            </div>
          </a>

          {/* Chess Card */}
          <a href="https://link.chess.com/play/WmoVTI" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[12px_22px] lg:p-[15px_22px] flex flex-row items-center gap-[14px] h-full sm:col-span-2 lg:col-span-2 lg:row-span-1 rounded-[32px] min-h-[90px] sm:min-h-[95px] lg:min-h-0 relative overflow-hidden lg:order-10">
            <Arrow absolute centered />
            <div className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] rounded-[11px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <Trophy className="w-7 h-7 text-[#81B64C] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[15px] text-t1 mb-[0px]">Chess.com</div>
              <div className="text-[9px] text-t3 italic">Challenge me ♟</div>
            </div>
            <div className="flex items-center gap-[11px] shrink-0 pr-10 relative z-[1]">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[14px] text-t1 leading-none">{stats.chess.rating}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Rating</span>
              </div>
              <div className="w-[1px] h-[22px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[14px] text-t1 leading-none">{stats.chess.wins}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Wins</span>
              </div>
            </div>
          </a>

          {/* Dribbble Card (Now last in DOM for mobile, Order 3 for desktop) */}
          <a href="https://dribbble.com/mxreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-3">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <Dribbble className="w-6 h-6 text-[#EA4C89] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Dribbble</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.dribbble.followers} label="Followers" />
                <Chip value={stats.dribbble.shots} label="Shots" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.dribbble.followers}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.dribbble.shots}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Shots</span>
              </div>
            </div>
          </a>

          {/* Strava Card */}
          <a href="https://strava.app.link/FcNvsLKqy6b" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 lg:col-span-1 lg:row-span-2 relative overflow-hidden lg:order-8">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <StravaIcon className="w-6 h-6 text-[#FC4C02] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Strava</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.strava.activities} label="Activities" />
                <Chip value={stats.strava.distance} label="Distance" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.strava.activities}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Activities</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.strava.distance}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Distance</span>
              </div>
            </div>
          </a>

          {/* Virgool Card */}
          <a href="https://virgool.io/@mxreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 lg:col-span-1 lg:row-span-2 relative overflow-hidden lg:order-9">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <VirgoolIcon className="w-6 h-6 text-[#177bdc] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Virgool</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value={stats.virgool.followers} label="Followers" />
                <Chip value={stats.virgool.posts} label="Posts" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.virgool.followers}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">{stats.virgool.posts}</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>
        </div>
      </motion.main>
    </div>
  );
}

