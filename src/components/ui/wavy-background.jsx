import React from "react";
import { cn } from "@/lib/utils";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center relative",
        containerClassName
      )}
    >
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        {...props}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00B2E3" />
              <stop offset="100%" stopColor="#003057" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            fill="url(#gradient)"
            opacity={waveOpacity}
          >
            <animate
              attributeName="d"
              dur={speed === "fast" ? "10s" : "20s"}
              repeatCount="indefinite"
              values="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z;M0,0 C150,100 350,200 500,0 L500,00 L0,0 Z;M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            />
          </path>
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
