import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "outline" && "text-foreground",
        variant === "success" && "bg-green-100 text-green-800 border-green-300",
        variant === "warning" && "bg-yellow-100 text-yellow-800 border-yellow-300",
        variant === "danger" && "bg-red-100 text-red-800 border-red-300",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
