import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm text-text-secondary font-body"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 px-3 rounded-md font-body text-sm text-text-primary",
            "bg-bg-surface border border-border-subtle",
            "placeholder:text-text-muted placeholder:opacity-100",
            "transition-all duration-[var(--duration-base)] ease-[var(--ease-micro)]",
            "focus:outline-none focus:border-accent-amber focus:shadow-[var(--shadow-glow-amber)]",
            "file:mr-3 file:py-1 file:px-3 file:rounded-md file:text-sm file:bg-accent-amber/10 file:text-accent-amber file:border-0",
            error && "border-status-red focus:border-status-red focus:shadow-none",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-status-red font-body">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
