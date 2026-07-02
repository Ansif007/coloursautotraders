import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Compatibility } from "@/types";

interface CompatibilityAccordionProps {
  entries: Compatibility[];
}

export function CompatibilityAccordion({
  entries,
}: CompatibilityAccordionProps) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = search
    ? entries.filter(
        (e) =>
          e.make.toLowerCase().includes(search.toLowerCase()) ||
          e.model.toLowerCase().includes(search.toLowerCase()) ||
          e.engineCode?.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  if (entries.length === 0) {
    return (
      <p className="text-sm font-body text-text-muted py-8 text-center">
        No compatibility data available for this part.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by make, model, or engine code..."
          className="w-full h-10 pl-10 pr-3 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-amber transition-colors"
        />
      </div>

      {/* Accordion Items */}
      {filtered.map((entry, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-lg border border-border-subtle overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 bg-bg-surface hover:bg-bg-elevated transition-colors text-left"
            >
              <div>
                <span className="text-sm font-body font-medium text-text-primary">
                  {entry.make}
                </span>
                <span className="text-sm font-body text-text-secondary mx-2">
                  {entry.model}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {entry.yearFrom}–{entry.yearTo}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-text-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-4 bg-bg-base border-t border-border-subtle space-y-2">
                    {entry.engineCode && (
                      <div className="flex items-center gap-2 text-sm font-body">
                        <span className="text-text-muted">Engine:</span>
                        <span className="font-mono text-text-primary">
                          {entry.engineCode}
                        </span>
                      </div>
                    )}
                    {entry.notes && (
                      <div className="flex items-start gap-2 text-sm font-body">
                        <span className="text-text-muted shrink-0">Notes:</span>
                        <span className="text-text-secondary">
                          {entry.notes}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs font-body text-status-green">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Compatible
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-sm font-body text-text-muted text-center py-4">
          No compatibility entries match your search.
        </p>
      )}
    </div>
  );
}
