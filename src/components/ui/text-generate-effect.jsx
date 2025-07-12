import React from "react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className
}) => {
  return (
    <div className={cn("font-bold", className)}>
      <div className="text-black dark:text-white">
        {words}
      </div>
    </div>
  );
};
