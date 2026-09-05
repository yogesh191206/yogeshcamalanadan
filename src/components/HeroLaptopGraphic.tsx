import React from 'react';

export const HeroLaptopGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] mx-auto aspect-[4/3] flex items-center justify-center select-none pointer-events-none sm:pointer-events-auto">
      {/* Outer Blue Nebula Radial Glow */}
      <div className="absolute inset-0 bg-radial from-blue-600/25 via-sky-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-[90px] -top-10 -right-10 pointer-events-none" />
      <div className="absolute w-80 h-32 rounded-full bg-cyan-400/25 blur-[60px] bottom-6 left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Floating particles/sparkles */}
      <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
      <div className="absolute top-6 right-24 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9] animate-ping" />
      <div className="absolute bottom-28 left-8 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse" />
      <div className="absolute bottom-16 right-16 w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_14px_#38bdf8] animate-pulse" />

      {/* Main Container with 3D Perspective */}
      <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
        
        {/* Glowing Platform / Pedestal below laptop */}
        <div 
          className="absolute bottom-8 w-[380px] sm:w-[440px] h-[140px] rounded-[100%] border border-cyan-400/30 bg-gradient-to-b from-blue-600/30 via-sky-500/10 to-transparent shadow-[0_0_50px_rgba(56,189,248,0.35)]"
          style={{ transform: 'rotateX(72deg)' }}
        >
          {/* Inner concentric ring */}
          <div className="absolute inset-4 rounded-[100%] border border-cyan-300/40 shadow-[inset_0_0_20px_rgba(56,189,248,0.4)]" />
        </div>

        {/* 3D Laptop Chassis Assembly */}
        <div 
          className="relative transition-transform duration-500 hover:[transform:rotateX(10deg)_rotateY(-12deg)_scale(1.02)]"
          style={{ transform: 'rotateX(14deg) rotateY(-16deg) rotateZ(2deg)' }}
        >
          {/* Laptop Screen Display Lid */}
          <div className="relative w-[320px] sm:w-[380px] h-[210px] sm:h-[245px] rounded-t-xl rounded-b-sm bg-gradient-to-b from-[#182032] to-[#0d1527] p-2.5 sm:p-3 border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,99,235,0.25)] flex flex-col justify-between">
            
            {/* Top Webcam / Sensor Notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500" />
            </div>

            {/* Inner Screen IDE Editor */}
            <div className="relative w-full h-full rounded-md bg-[#070d1d] border border-blue-900/50 overflow-hidden flex flex-col shadow-inner">
              
              {/* Code Editor Header Bar */}
              <div className="h-6 bg-[#0c162f] border-b border-blue-950 flex items-center justify-between px-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-blue-300/80 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>Developer.tsx</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Glowing Code Lines Display */}
              <div className="p-3 font-mono text-[9px] sm:text-[10px] leading-relaxed overflow-hidden text-left space-y-1.5 bg-gradient-to-br from-[#060c1c] to-[#040814]">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 select-none">1</span>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-300 font-bold">developer</span> = {'{'}
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-slate-600 select-none">2</span>
                  <span className="text-slate-300">name:</span>{' '}
                  <span className="text-emerald-400">"Yogesh"</span>,
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-slate-600 select-none">3</span>
                  <span className="text-slate-300">role:</span>{' '}
                  <span className="text-emerald-400">"Web Developer"</span>,
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-slate-600 select-none">4</span>
                  <span className="text-slate-300">skills:</span> [
                  <span className="text-amber-300">"HTML"</span>,{' '}
                  <span className="text-sky-300">"CSS"</span>,{' '}
                  <span className="text-yellow-300">"JS"</span>]
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-slate-600 select-none">5</span>
                  <span className="text-slate-300">status:</span>{' '}
                  <span className="text-cyan-300">"Open for Internships"</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 select-none">6</span>
                  <span>{'}'};</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-slate-600 select-none">7</span>
                  <span className="text-blue-400">buildFuture</span>
                  <span className="text-slate-400">()</span>;
                  <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-1" />
                </div>
              </div>

              {/* Realistic Glossy Screen Reflection Diagonal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              
              {/* Bottom Cyan Glow inside screen */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-500/30 blur-xl pointer-events-none" />
            </div>

          </div>

          {/* Laptop Base & Keyboard Lower Half */}
          <div 
            className="relative -mt-1 w-[350px] sm:w-[410px] -ml-[15px] h-[130px] rounded-b-2xl bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#0a0f1d] border-t-2 border-slate-600 border-x border-b border-slate-700/80 shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.25)] p-3 flex flex-col justify-between"
            style={{ transform: 'rotateX(55deg)', transformOrigin: 'top center' }}
          >
            {/* Keyboard Well */}
            <div className="w-[88%] mx-auto h-[68px] rounded bg-[#070d1d] border border-slate-800/80 p-1 grid grid-cols-12 gap-0.5 opacity-90 shadow-inner">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className="rounded-[2px] bg-[#131c33] border border-slate-700/50 shadow-[0_1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center text-[5px] text-slate-500"
                />
              ))}
            </div>

            {/* Trackpad */}
            <div className="w-24 h-10 mx-auto -mt-1 rounded-md bg-[#0a1226] border border-slate-700/60 shadow-inner" />

            {/* Front Lip Inset */}
            <div className="w-16 h-1 mx-auto rounded-full bg-slate-600/60 -mb-1" />
          </div>

        </div>

        {/* ---------------- 3D Floating Tech Badges ---------------- */}

        {/* 1. Code Brackets Badge </> (Top-Left) */}
        <div 
          className="absolute -top-4 left-2 sm:left-4 z-20 transition-transform duration-300 hover:scale-110"
          style={{ animation: 'badgeFloat1 4.5s ease-in-out infinite' }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 border-2 border-blue-400/80 shadow-[0_10px_25px_rgba(37,99,235,0.6),0_0_20px_rgba(96,165,250,0.4)] flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
            <span className="font-mono font-bold text-white text-base sm:text-lg tracking-tighter drop-shadow">
              &lt;/&gt;
            </span>
          </div>
        </div>

        {/* 2. JavaScript Badge JS (Mid-Left) */}
        <div 
          className="absolute top-24 -left-2 sm:left-2 z-20 transition-transform duration-300 hover:scale-110"
          style={{ animation: 'badgeFloat2 5s ease-in-out infinite' }}
        >
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br from-[#f7df1e] to-[#eab308] border-2 border-yellow-200/90 shadow-[0_10px_25px_rgba(234,179,8,0.5),0_0_20px_rgba(250,204,21,0.4)] flex items-end justify-end p-1.5 transform rotate-6 hover:rotate-0 transition-transform">
            <span className="font-sans font-black text-black text-sm sm:text-base leading-none tracking-tight">
              JS
            </span>
          </div>
        </div>

        {/* 3. CSS Badge (Mid-Right) */}
        <div 
          className="absolute top-16 -right-2 sm:right-2 z-20 transition-transform duration-300 hover:scale-110"
          style={{ animation: 'badgeFloat3 4.8s ease-in-out infinite' }}
        >
          <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] border-2 border-sky-300/80 shadow-[0_10px_25px_rgba(37,99,235,0.6),0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
            <span className="font-sans font-extrabold text-white text-xs sm:text-sm tracking-wide drop-shadow">
              CSS
            </span>
          </div>
        </div>

        {/* 4. HTML Badge (Lower-Right) */}
        <div 
          className="absolute bottom-16 right-0 sm:right-6 z-20 transition-transform duration-300 hover:scale-110"
          style={{ animation: 'badgeFloat4 5.2s ease-in-out infinite' }}
        >
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] border-2 border-orange-300/80 shadow-[0_10px_25px_rgba(234,88,12,0.6),0_0_20px_rgba(251,146,60,0.4)] flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform">
            <span className="font-sans font-extrabold text-white text-xs sm:text-sm tracking-wide drop-shadow">
              HTML
            </span>
          </div>
        </div>

      </div>

      {/* Embedded CSS for keyframe float animations */}
      <style>{`
        @keyframes badgeFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-8px) rotate(-8deg); }
        }
        @keyframes badgeFloat2 {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes badgeFloat3 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-9px) rotate(8deg); }
        }
        @keyframes badgeFloat4 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-11px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
};
