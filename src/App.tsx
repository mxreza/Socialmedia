import React from "react";
import { motion } from "motion/react";

import { Coffee, Rocket, Cpu, Zap, Brain, Palette, Atom, Sparkles } from "lucide-react";

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_50%,rgba(5,35,30,0.6)_0%,transparent_70%)]" />
    {/* Teal blobs */}
    <div className="blob animate-blob w-[640px] h-[540px] opacity-[0.58] -top-[14%] -left-[10%] bg-[radial-gradient(circle,rgba(10,148,133,0.52)_0%,transparent_70%)]" />
    <div className="blob animate-blob-slow w-[500px] h-[440px] opacity-[0.44] bottom-[8%] -right-[8%] bg-[radial-gradient(circle,rgba(6,96,84,0.42)_0%,transparent_70%)]" />
    <div className="blob animate-blob w-[300px] h-[280px] opacity-[0.32] top-[42%] left-[35%] bg-[radial-gradient(circle,rgba(14,207,182,0.26)_0%,transparent_70%)]" />
    {/* Orange blobs */}
    <div className="blob animate-blob w-[540px] h-[480px] opacity-[0.78] top-[2%] right-[2%] bg-[radial-gradient(circle,rgba(220,72,10,0.52)_0%,transparent_70%)]" />
    <div className="blob animate-blob-slow w-[400px] h-[360px] opacity-[0.68] bottom-[18%] left-[18%] bg-[radial-gradient(circle,rgba(255,80,20,0.38)_0%,transparent_70%)]" />
    <div className="blob animate-blob-reverse w-[300px] h-[260px] opacity-[0.58] top-[55%] right-[28%] bg-[radial-gradient(circle,rgba(255,100,30,0.28)_0%,transparent_70%)]" />
    <div className="noise" />
  </div>
);

const Arrow = ({ absolute, centered }: { absolute?: boolean; centered?: boolean }) => (
  <div className={`w-[30px] h-[30px] rounded-full bg-orange/14 border border-orange/28 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#ff5e1a,#ff7242)] group-hover:border-[#ff5e1a]/50 group-hover:shadow-[0_0_14px_rgba(255,80,20,0.4)] ${absolute ? (centered ? 'absolute top-1/2 -translate-y-1/2 right-5 z-10' : 'absolute top-1/2 -translate-y-1/2 lg:top-5 lg:translate-y-0 right-5 z-10') : ''}`}>
    <svg className="w-[13px] h-[13px]" viewBox="0 0 14 14">
      <path className="stroke-orange-hi group-hover:stroke-white/95" d="M2 12L12 2M12 2H6M12 2V8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
);

const Chip = ({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 bg-orange/8 border border-orange/15 rounded-[9px] p-[5px_9px_6px] flex flex-col gap-[2px] transition-colors duration-200 group-hover:bg-orange/13 group-hover:border-orange/28">
    <span className="font-display font-bold text-[14.5px] text-t1 leading-none">{value}</span>
    <span className="text-[8.5px] text-t3 uppercase tracking-[0.5px] font-semibold">{label}</span>
  </div>
);

const ProfilePattern = () => (
  <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.65] [mask-image:linear-gradient(to_bottom,black_45%,transparent_98%)]">
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-110">
      {/* Cosmic Background Nodes */}
      <circle cx="250" cy="180" r="220" stroke="rgba(14,207,182,0.18)" strokeWidth="0.5" strokeDasharray="5 10" />
      <circle cx="250" cy="180" r="160" stroke="rgba(255,94,26,0.14)" strokeWidth="0.5" />
      
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
      
      {/* Lucide Icons in Pattern */}
      <foreignObject x="320" y="55" width="30" height="30">
        <Brain className="w-full h-full text-teal opacity-60" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="350" y="35" width="20" height="20">
        <Sparkles className="w-full h-full text-orange opacity-50" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="170" y="300" width="30" height="30">
        <Atom className="w-full h-full text-teal opacity-40" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="45" y="145" width="24" height="24" transform="rotate(15)">
        <Palette className="w-full h-full text-teal opacity-50" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="135" y="255" width="24" height="24">
        <Zap className="w-full h-full text-orange opacity-50" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="75" y="55" width="35" height="35" transform="rotate(-15)">
        <Cpu className="w-full h-full text-teal opacity-40" strokeWidth={1} />
      </foreignObject>
      
      <foreignObject x="415" y="75" width="28" height="28" transform="rotate(-30)">
        <Rocket className="w-full h-full text-teal opacity-60" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="35" y="295" width="25" height="25" transform="rotate(20)">
        <Sparkles className="w-full h-full text-teal opacity-30" strokeWidth={1} />
      </foreignObject>

      <foreignObject x="375" y="315" width="28" height="28">
        <Zap className="w-full h-full text-teal opacity-40" strokeWidth={1.5} />
      </foreignObject>

      {/* New Additional Icons */}
      <foreignObject x="440" y="40" width="18" height="18">
        <Cpu className="w-full h-full text-orange opacity-30" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="20" y="60" width="22" height="22">
        <Rocket className="w-full h-full text-teal opacity-25" strokeWidth={1.2} />
      </foreignObject>

      <foreignObject x="460" y="150" width="20" height="20">
        <Brain className="w-full h-full text-orange opacity-35" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="280" y="280" width="25" height="25" transform="rotate(10)">
        <Palette className="w-full h-full text-teal opacity-30" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="100" y="350" width="20" height="20">
        <Atom className="w-full h-full text-orange opacity-30" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="220" y="20" width="18" height="18">
        <Sparkles className="w-full h-full text-teal opacity-40" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="400" y="220" width="22" height="22" transform="rotate(-15)">
        <Zap className="w-full h-full text-teal opacity-25" strokeWidth={1.2} />
      </foreignObject>

      <foreignObject x="50" y="220" width="20" height="20">
        <Cpu className="w-full h-full text-orange opacity-35" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="120" y="20" width="24" height="24" transform="rotate(5)">
        <Palette className="w-full h-full text-orange opacity-25" strokeWidth={1.2} />
      </foreignObject>

      <foreignObject x="300" y="340" width="24" height="24">
        <Rocket className="w-full h-full text-orange opacity-30" strokeWidth={1.5} />
      </foreignObject>

      <foreignObject x="450" y="340" width="18" height="18">
        <Brain className="w-full h-full text-teal opacity-30" strokeWidth={1.2} />
      </foreignObject>

      <foreignObject x="10" y="360" width="22" height="22">
        <Zap className="w-full h-full text-orange opacity-25" strokeWidth={1.5} />
      </foreignObject>

      {/* Grid Lines */}
      <path d="M0 200 H500 M250 0 V400" stroke="rgba(14,207,182,0.1)" strokeWidth="0.5" />
      
      {/* Orbital Design Rings */}
      <ellipse cx="250" cy="180" rx="300" ry="95" stroke="rgba(255,94,26,0.15)" strokeWidth="1.2" transform="rotate(-20, 250, 180)" />
      <ellipse cx="250" cy="180" rx="340" ry="130" stroke="rgba(14,207,182,0.08)" strokeWidth="0.8" transform="rotate(15, 250, 180)" />
      
      {/* Pixel nodes */}
      <rect x="440" y="200" width="4" height="4" fill="#0ecfb6" opacity=".4" />
      <rect x="450" y="210" width="4" height="4" fill="#ff5e1a" opacity=".4" />
      <rect x="50" y="100" width="4" height="4" fill="#0ecfb6" opacity=".4" />
      <rect x="40" y="40" width="3" height="3" fill="#fff" opacity=".3" />
      <rect x="460" y="350" width="3" height="3" fill="#fff" opacity=".3" />

      <circle cx="250" cy="180" r="100" stroke="rgba(14,207,182,0.12)" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="250" cy="180" r="260" stroke="rgba(255,94,26,0.06)" strokeWidth="0.5" />

      <path d="M80 340 Q 250 280 420 340" stroke="rgba(14,207,182,0.3)" strokeWidth="2" fill="none" opacity=".5" />
      <circle cx="80" cy="340" r="3" fill="#ff5e1a" opacity=".6" />
      <circle cx="420" cy="340" r="3" fill="#ff5e1a" opacity=".6" />
    </svg>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen relative">
      <Background />
      
      <main className="page relative z-10 max-w-[980px] mx-auto p-[50px_18px_80px]">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[195px_195px_195px_110px] gap-[10px]">
          
          {/* Profile Card */}
          <div className="card-glass lg:col-span-2 lg:row-span-2 p-0 flex flex-col justify-end min-h-[320px] lg:min-h-[400px] rounded-[32px] lg:order-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,100,26,0.06),transparent_60%)] pointer-events-none" />
            <ProfilePattern />
            <div className="relative z-[3] p-[24px_26px_28px] flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="w-[140px] h-[140px] rounded-full p-[3px] bg-[linear-gradient(135deg,#0ecfb6,#ff5e1a)] mb-[20px] shrink-0 shadow-[0_0_0_6px_rgba(14,207,182,0.10),0_8px_28px_rgba(0,0,0,0.50)]">
                <div className="w-full h-full rounded-full bg-[linear-gradient(145deg,#0d3530,#08201c)] flex items-center justify-center overflow-hidden font-display font-bold text-[20px] text-teal tracking-[0.5px]">
                  <img 
                    src="/profile.jpg" 
                    alt="Mohammadreza Aghamohammadi" 
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('dicebear')) {
                        target.src = "https://api.dicebear.com/7.x/notionists/svg?seed=Mohammadreza&backgroundColor=0a1414&hairColor=221916";
                      }
                    }} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <h1 className="font-display font-medium text-[clamp(24px,3vw,36px)] leading-[1.1] text-t1 mb-[12px]">
                Mohammadreza<br/>Aghamohammadi
              </h1>
              <div className="flex items-center gap-[7px] text-[15px] font-medium text-t2 tracking-[0.2px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#22d87a] shrink-0 animate-[heartbeat_2.6s_ease-in-out_infinite]" />
                Product Designer
              </div>
            </div>
          </div>

          <div className="card-glass lg:col-span-2 lg:row-span-1 p-[28px_30px] flex flex-col justify-center items-center text-center lg:items-start lg:text-left rounded-[32px] lg:order-2">
            <div className="font-display text-[10px] font-bold tracking-[3px] uppercase text-orange opacity-90 mb-[12px]">About</div>
            <p className="text-[14px] font-light leading-[1.85] text-t2">
              <strong className="text-t1 font-semibold">Product designer</strong> focused on thoughtful and minimalist digital experiences, passionate about <strong className="text-t1 font-semibold">product management</strong> and building products, interface design, and creating functional and beautiful systems. Outside of design, I enjoy <strong className="text-t1 font-semibold">technology</strong>, EDM music, chess, and creative ideas.
            </p>
          </div>

          {/* Instagram Card (Now 3rd in DOM for mobile, Order 4 for desktop) */}
          <a href="https://instagram.com/Future.xperience" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-4">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" className="w-6 h-6 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Instagram</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@Future.xperience</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value="4.2k" label="Followers" />
                <Chip value="118" label="Posts" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">4.2k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">118</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a href="https://linkedin.com/in/mxreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 sm:col-span-2 lg:col-span-2 relative lg:order-5">
            <Arrow absolute />
            <div className="w-[48px] h-[48px] rounded-[13px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <svg className="w-8 h-8 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 24 24" fill="#0A66C2">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[16px] text-t1 mb-[1px] lg:mb-[3px]">LinkedIn</div>
              <div className="text-[10.5px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[8px]">
                <Chip value="2.8k" label="Connects" />
                <Chip value="47" label="Posts" />
                <Chip value="Professional" label="Mode" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">2.8k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Connects</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">47</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* Spotify Card */}
          <a href="https://open.spotify.com/user/8tzab99p5plcegezsx2wrz6vg" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-6">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <img src="https://cdn.simpleicons.org/spotify/1DB954" alt="Spotify" className="w-6 h-6 transition-all duration-300 transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Spotify</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">Listening now</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value="18" label="Playlists" />
                <Chip value="45k" label="Minutes" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">18</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Playlists</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">45k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Min</span>
              </div>
            </div>
          </a>

          {/* X Card */}
          <a href="https://x.com/mxrezax" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-7">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <img src="https://cdn.simpleicons.org/x/ffffff" alt="X" className="w-4 h-4 transition-all duration-300 transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">X</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxrezax</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value="3.2k" label="Followers" />
                <Chip value="680" label="Posts" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">3.2k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">680</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Posts</span>
              </div>
            </div>
          </a>

          {/* CoffeeBede Card */}
          <a href="https://www.coffeebede.com/mreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row items-center gap-[14px] h-full sm:col-span-2 lg:col-span-2 rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-8">
            <Arrow absolute centered />
            <div className="w-[48px] h-[48px] rounded-[13px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <Coffee className="w-7 h-7 text-[#f5c842] transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[17px] text-t1 mb-[1px]">CoffeeBede</div>
              <div className="text-[10px] text-t3 font-medium">Support me</div>
            </div>
            <div className="flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">12</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Fans</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">42</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Coffees</span>
              </div>
            </div>
          </a>

          {/* Chess Card */}
          <a href="https://link.chess.com/play/WmoVTI" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row items-center gap-[14px] h-full sm:col-span-2 lg:col-span-2 rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-9">
            <Arrow absolute centered />
            <div className="w-[48px] h-[48px] rounded-[13px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0">
               <img src="https://cdn.simpleicons.org/chessdotcom/81B64C" alt="Chess.com" className="w-8 h-8 transition-all duration-300 transform group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[17px] text-t1 mb-[1px]">Chess.com</div>
              <div className="text-[10px] text-t3 italic">Challenge me ♟</div>
            </div>
            <div className="flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">1.4k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Rating</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">860</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Wins</span>
              </div>
            </div>
          </a>

          {/* Dribbble Card (Now last in DOM for mobile, Order 3 for desktop) */}
          <a href="https://dribbble.com/mxreza" target="_blank" rel="noopener noreferrer" className="card-glass card-glass-hover group p-[20px_22px] flex flex-row lg:flex-col items-center lg:items-stretch gap-[14px] lg:gap-0 h-full rounded-[32px] min-h-[110px] sm:min-h-[125px] lg:min-h-0 relative overflow-hidden lg:order-3">
            <Arrow absolute />
            <div className="w-10 h-10 rounded-[12px] bg-white/4 border border-white/7 flex items-center justify-center shrink-0 lg:mb-0">
               <img src="https://cdn.simpleicons.org/dribbble/EA4C89" alt="Dribbble" className="w-6 h-6 transition-all duration-300 transform group-hover:scale-110" />
            </div>
            <div className="flex-1 lg:mt-auto lg:pt-3 min-w-0">
              <div className="font-display font-bold text-[14.5px] text-t1 mb-[1px] lg:mb-[3px]">Dribbble</div>
              <div className="text-[10px] text-t3 tracking-[0.1px] mb-0 lg:mb-[14px]">@mxreza</div>
              <div className="hidden lg:flex gap-[6px]">
                <Chip value="1.4k" label="Followers" />
                <Chip value="62" label="Shots" />
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-[11px] shrink-0 pr-10">
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">1.4k</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold">Followers</span>
              </div>
              <div className="w-[1px] h-[26px] bg-orange/18 shrink-0" />
              <div className="flex flex-col items-end gap-[1px]">
                <span className="font-display font-bold text-[15px] text-t1 leading-none">62</span>
                <span className="text-[8px] text-t3 uppercase tracking-[0.5px] font-semibold text-right">Shots</span>
              </div>
            </div>
          </a>

        </div>
      </main>
    </div>
  );
}

