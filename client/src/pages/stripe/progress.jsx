"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const mergeClasses = (...classes) => twMerge(clsx(classes));

const Progress = React.forwardRef(function Progress(
  { className, value, ...props },
  ref
) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={mergeClasses(
        "relative h-2 w-full overflow-hidden rounded-full bg-white dark:bg-darkSecondary shadow-sm",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-darkPrimary dark:bg-slate-50 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
