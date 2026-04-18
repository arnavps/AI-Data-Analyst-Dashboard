import * as React from "react";
import { cn } from "@/app/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-zinc-200/50 bg-zinc-100/30 px-4 py-2 text-sm transition-all duration-300 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/20 focus-visible:border-apple-blue focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:focus-visible:bg-zinc-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
