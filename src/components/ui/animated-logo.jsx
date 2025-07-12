import React from "react";
import { cn } from "@/lib/utils";

export const AnimatedLogo = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Glow effect background */}
      <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#00B2E3]/30 via-[#003057]/20 to-[#00B2E3]/30 rounded-full animate-pulse"></div>
      
      {/* Main logo container */}
      <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="relative">
          {/* Logo image */}
          <img 
            src="/Insecap_Logo-01.png" 
            alt="INSECAP" 
            className="h-20 w-auto mx-auto opacity-90 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
          
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00B2E3] rounded-full animate-bounce delay-100"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#003057] rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 -right-4 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
          <div className="absolute top-1/4 -left-4 w-1 h-1 bg-[#00B2E3] rounded-full animate-ping delay-700"></div>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-3xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00B2E3] via-transparent to-[#003057] opacity-30 animate-spin" style={{ animationDuration: '8s' }}></div>
        </div>
      </div>
      
      {/* Additional glow rings */}
      <div className="absolute inset-0 rounded-full border border-[#00B2E3]/20 animate-ping" style={{ animationDuration: '3s' }}></div>
      <div className="absolute inset-0 scale-110 rounded-full border border-[#003057]/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
    </div>
  );
};
