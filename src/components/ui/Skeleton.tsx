import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle" | "card";
}

export function Skeleton({ className, variant = "rect" }: SkeletonProps) {
  const base = cn(
    "bg-gradient-to-r from-bg-surface via-bg-elevated to-bg-surface bg-[length:200%_100%] animate-shimmer",
    variant === "text" && "h-4 rounded-sm",
    variant === "circle" && "rounded-full",
    variant === "card" && "rounded-lg",
    className
  );

  return <div className={base} />;
}
