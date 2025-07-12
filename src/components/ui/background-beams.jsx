import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
  ];

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-image:radial-gradient(900px_at_center,white,transparent)]",
        className
      )}
    >
      <svg
        className="absolute h-full w-full inset-0"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4_2)">
          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              stroke={`url(#paint${index}_linear)`}
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          ))}
        </g>
        <defs>
          {paths.map((_, index) => (
            <linearGradient
              key={index}
              id={`paint${index}_linear`}
              x1="352"
              y1="338"
              x2="148"
              y2="338"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="1" />
            </linearGradient>
          ))}
          <clipPath id="clip0_4_2">
            <rect width="696" height="316" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
