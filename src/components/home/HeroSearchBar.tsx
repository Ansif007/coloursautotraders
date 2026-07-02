import { useState, useRef } from "react";
import { Search } from "lucide-react";

const popularSearches = [
  "Brake Pads",
  "Oil Filters",
  "Timing Belt",
  "Shock Absorbers",
];

export function HeroSearchBar() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(value.trim())}`;
    }
  };

  return (
    <div className="w-full max-w-[680px] mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`flex items-center h-14 rounded-md border transition-all duration-[var(--duration-base)] ${
            focused
              ? "border-accent-amber shadow-[var(--shadow-glow-amber)]"
              : "border-border-subtle"
          } bg-glass-bg backdrop-blur-sm`}
        >
          {/* Search Icon */}
          <div className="pl-4 pr-3 flex items-center">
            <Search className="w-5 h-5 text-text-muted" />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search by part name, number, or OEM code..."
            className="flex-1 h-full bg-transparent text-text-primary font-body text-base placeholder:text-text-muted placeholder:opacity-50 focus:outline-none border-none outline-none"
            aria-label="Search parts"
          />

          {/* Divider */}
          <div className="w-px h-6 bg-border-subtle shrink-0" />

          {/* Submit Button */}
          <button
            type="submit"
            className="mx-1 w-10 h-10 flex items-center justify-center rounded-md bg-accent-amber text-white hover:bg-accent-amber/90 transition-colors shrink-0"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Scanning line animation on focus */}
        {focused && (
          <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden rounded-b-md pointer-events-none">
            <div className="absolute inset-0 bg-accent-amber/30" />
            <div className="w-full h-full bg-accent-amber animate-scan-line" />
          </div>
        )}
      </form>

      {/* Popular searches */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs text-text-muted font-body">Popular:</span>
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => {
              setValue(term);
              inputRef.current?.focus();
            }}
            className="text-xs text-text-muted hover:text-text-primary font-body transition-colors px-2 py-1 rounded-md hover:bg-bg-elevated"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
