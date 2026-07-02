import { Minus, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { InquiryItem } from "@/types";

interface InquiryItemRowProps {
  item: InquiryItem;
  onUpdateQuantity: (partId: string, quantity: number) => void;
  onRemove: (partId: string) => void;
}

export function InquiryItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: InquiryItemRowProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border-subtle last:border-0">
      {/* Thumbnail */}
      <div className="w-12 h-12 shrink-0 rounded-sm bg-bg-surface flex items-center justify-center overflow-hidden">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text-muted/30"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-body font-medium text-text-primary truncate">
              {item.part.name}
            </p>
            <p className="text-xs font-mono text-accent-blue mt-0.5">
              #{item.part.partNumber}
            </p>
          </div>
          <Badge
            variant="stock"
            status={item.part.stockStatus}
            className="shrink-0"
          >
            {item.part.stockStatus === "in_stock"
              ? "In Stock"
              : item.part.stockStatus === "low_stock"
                ? "Low"
                : "OOS"}
          </Badge>
        </div>

        {/* Quantity stepper + Remove */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border-subtle rounded-sm overflow-hidden">
            <button
              onClick={() =>
                onUpdateQuantity(item.part.id, item.quantity - 1)
              }
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-glass-bg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 h-7 flex items-center justify-center text-xs font-mono text-text-primary border-x border-border-subtle">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.part.id, item.quantity + 1)
              }
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-glass-bg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.part.id)}
            className="p-1.5 rounded-sm text-text-muted hover:text-status-red hover:bg-status-red/10 transition-colors"
            aria-label={`Remove ${item.part.name} from inquiry list`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
