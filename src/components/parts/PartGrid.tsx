import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { PartCard } from "./PartCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Part } from "@/types";

type SortOption = "relevance" | "name-asc" | "name-desc" | "newest" | "most-viewed";
type ViewMode = "grid" | "list";

const PAGE_SIZE = 9;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "newest", label: "Newest" },
  { value: "most-viewed", label: "Most Viewed" },
];

interface PartGridProps {
  parts: Part[];
  isLoading?: boolean;
}

export function PartGrid({ parts, isLoading = false }: PartGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortOpen, setSortOpen] = useState(false);

  const sortedParts = useMemo(() => {
    const copy = [...parts];
    switch (sort) {
      case "name-asc":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return copy.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return copy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "most-viewed":
        return copy.sort((a, b) => b.viewCount - a.viewCount);
      default:
        return copy;
    }
  }, [parts, sort]);

  const visibleParts = sortedParts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedParts.length;

  if (isLoading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-[380px]" />
        ))}
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text-muted/40 mb-6"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
          No parts matched your filters
        </h3>
        <p className="text-sm font-body text-text-muted max-w-xs">
          Try adjusting your search or clearing filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <p className="text-sm font-body text-text-secondary">
          <span className="text-text-primary font-medium">{parts.length}</span>{" "}
          parts found
        </p>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 h-9 px-3 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-secondary hover:text-text-primary transition-colors"
            >
              {sortOptions.find((o) => o.value === sort)?.label}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 w-48 bg-bg-elevated border border-border-subtle rounded-lg shadow-card py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm font-body transition-colors",
                        sort === option.value
                          ? "text-accent-amber bg-accent-amber/5"
                          : "text-text-secondary hover:text-text-primary hover:bg-glass-bg"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-accent-amber/10 text-accent-amber"
                  : "text-text-muted hover:text-text-primary"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "list"
                  ? "bg-accent-amber/10 text-accent-amber"
                  : "text-text-muted hover:text-text-primary"
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Parts Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleParts.map((part, i) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <PartCard part={part} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleParts.map((part, i) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <PartCard part={part} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Load More ({sortedParts.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
