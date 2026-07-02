import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  onClick?: () => void;
}

export function Card({
  children,
  className,
  as: Tag = "div",
  onClick,
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "bg-bg-surface border border-border-subtle rounded-lg shadow-card",
        "transition-all duration-[var(--duration-base)] ease-[var(--ease-micro)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}
