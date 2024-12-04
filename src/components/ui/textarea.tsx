import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-base shadow-sm transition-all",
          "placeholder:text-gray-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
