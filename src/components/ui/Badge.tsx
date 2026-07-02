import { cn } from "@/lib/utils";
import type { StockStatus } from "@/types";

interface BadgeProps {
  variant?: "stock" | "default" | "category";
  status?: StockStatus;
  children: React.ReactNode;
  className?: string;
}

const stockStyles: Record<StockStatus, string> = {
  in_stock: "bg-status-green/15 text-status-green border border-status-green/30",
  low_stock: "bg-status-yellow/15 text-status-yellow border border-status-yellow/30",
  out_of_stock: "bg-status-red/15 text-status-red border border-status-red/30",
};

export function Badge({
  variant = "default",
  status,
  children,
  className,
}: BadgeProps) {
  const base = cn(
    "inline-flex items-center font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm",
    variant === "stock" && status && stockStyles[status],
    variant === "default" && "bg-bg-elevated text-text-secondary border border-border-subtle",
    variant === "category" && "bg-bg-elevated text-text-secondary border border-border-subtle",
    className
  );

  return <span className={base}>{children}</span>;
}
