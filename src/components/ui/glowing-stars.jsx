import React from "react";
import { cn } from "@/lib/utils";

export const GlowingStarsBackgroundCard = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "h-full w-full bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-6 rounded-2xl relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 top-1/4 left-1/3 animate-pulse"></div>
        <div className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 top-3/4 left-1/4 animate-pulse delay-1000"></div>
        <div className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 top-1/2 right-1/4 animate-pulse delay-500"></div>
        <div className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 bottom-1/4 right-1/3 animate-pulse delay-300"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn(
        "text-base text-white max-w-[16rem] leading-6",
        className
      )}
    >
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children
}) => {
  return (
    <h1
      className={cn(
        "font-bold text-xl text-white relative z-20",
        className
      )}
    >
      {children}
    </h1>
  );
};
