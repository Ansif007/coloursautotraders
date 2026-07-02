import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useInquiry } from "@/hooks/useInquiry";
import type { Part } from "@/types";

interface PartCardProps {
  part: Part;
}

export function PartCard({ part }: PartCardProps) {
  const { addItem } = useInquiry();
  const [qty, setQty] = useState(1);
  const [btnState, setBtnState] = useState<"idle" | "loading" | "done">("idle");

  const handleAdd = () => {
    if (btnState !== "idle") return;
    setBtnState("loading");
    setTimeout(() => {
      addItem(part, qty);
      setBtnState("done");
      setTimeout(() => setBtnState("idle"), 1200);
    }, 200);
  };

  const stockColor =
    part.stockStatus === "in_stock"
      ? "text-status-green"
      : part.stockStatus === "low_stock"
        ? "text-status-yellow"
        : "text-status-red";

  const stockLabel =
    part.stockStatus === "in_stock"
      ? "In Stock"
      : part.stockStatus === "low_stock"
        ? "Low Stock"
        : "Out of Stock";

  return (
    <div className="flex flex-col bg-bg-surface border border-border-subtle group">
      {/* Image */}
      <Link to={`/catalog/${part.slug}`} className="relative aspect-[4/3] bg-bg-elevated overflow-hidden">
        {part.images[0]?.url ? (
          <img
            src={part.images[0].url}
            alt={part.images[0].alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted/40">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {/* Part Number */}
        <p className="font-mono text-[11px] text-accent-blue tabular-nums">
          #{part.partNumber}
        </p>

        {/* Name */}
        <h3 className="text-sm font-body font-semibold text-text-primary leading-snug line-clamp-2">
          <Link to={`/catalog/${part.slug}`} className="hover:underline">
            {part.name}
          </Link>
        </h3>

        {/* Brand */}
        <p className="text-[11px] font-body text-text-secondary">{part.brand}</p>

        {/* Stock status — text + colored square */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`w-2 h-2 ${part.stockStatus === "in_stock" ? "bg-status-green" : part.stockStatus === "low_stock" ? "bg-status-yellow" : "bg-status-red"}`} />
          <span className={`text-[10px] font-body font-medium ${stockColor} uppercase tracking-[0.05em]`}>
            {stockLabel}
          </span>
        </div>

        {/* Quantity + Add */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-subtle">
          <div className="flex items-center border border-border-subtle">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 h-7 flex items-center justify-center text-[11px] font-mono text-text-primary tabular-nums border-x border-border-subtle">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <motion.button
            animate={
              btnState === "done"
                ? { scale: [0.95, 1.03, 1] }
                : btnState === "loading"
                  ? { scale: 0.95 }
                  : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={handleAdd}
            disabled={btnState !== "idle"}
            className="flex-1 h-7 flex items-center justify-center bg-accent-amber text-white text-[10px] font-body font-semibold uppercase tracking-[0.1em] hover:bg-accent-amber/90 transition-colors disabled:opacity-70"
          >
            {btnState === "done" ? (
              <Check className="w-3 h-3" />
            ) : (
              "Add"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
