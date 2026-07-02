import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-0 left-0 right-0 z-50 bg-bg-elevated border-b border-border-subtle shadow-card"
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4">
                <Search className="w-6 h-6 text-text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by part name, number, or OEM code..."
                  className="flex-1 bg-transparent text-xl font-body text-text-primary placeholder:text-text-muted placeholder:opacity-50 focus:outline-none border-none"
                  aria-label="Search all parts"
                />
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-glass-bg transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-xs font-body text-text-muted">
                Search across part names, part numbers, OEM numbers, and brands
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
