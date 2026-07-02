import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { Category, StockStatus } from "@/types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "engine", label: "Engine" },
  { value: "transmission", label: "Transmission" },
  { value: "suspension", label: "Suspension" },
  { value: "brakes", label: "Brakes" },
  { value: "electrical", label: "Electrical" },
  { value: "filters", label: "Filters" },
  { value: "belts_chains", label: "Belts & Chains" },
  { value: "cooling", label: "Cooling" },
  { value: "body", label: "Body" },
  { value: "hydraulics", label: "Hydraulics" },
  { value: "exhaust", label: "Exhaust" },
  { value: "industrial", label: "Industrial" },
];

const BRANDS = [
  "Nippon Bearings",
  "FrictiON Tech",
  "DrumPro",
  "Denso",
  "NGK",
  "KYB",
  "Eibach",
  "Sankei",
  "Fram",
  "MANN-FILTER",
  "Donaldson",
  "Mahle",
  "Aisin",
  "Riken",
  "Gates",
  "Continental",
  "Garrett Motion",
  "Advics",
  "SKF",
  "GKN",
];

const MAKES = [
  "Toyota",
  "Nissan",
  "Mitsubishi",
  "Isuzu",
  "Hino",
  "Ford",
  "Mazda",
];

interface FilterSidebarProps {
  selectedCategories: Category[];
  selectedBrands: string[];
  selectedMake: string;
  selectedModel: string;
  selectedStock: StockStatus | "all";
  searchQuery: string;
  onCategoryChange: (categories: Category[]) => void;
  onBrandChange: (brands: string[]) => void;
  onMakeChange: (make: string) => void;
  onModelChange: (model: string) => void;
  onStockChange: (status: StockStatus | "all") => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  selectedCategories,
  selectedBrands,
  selectedMake,
  selectedModel,
  selectedStock,
  searchQuery,
  onCategoryChange,
  onBrandChange,
  onMakeChange,
  onModelChange,
  onStockChange,
  onSearchChange,
  onReset,
}: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    search: true,
    category: true,
    brand: false,
    make: false,
    stock: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredBrands = useMemo(
    () =>
      BRANDS.filter((b) =>
        b.toLowerCase().includes(brandSearch.toLowerCase())
      ),
    [brandSearch]
  );

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (selectedMake ? 1 : 0) +
    (selectedModel ? 1 : 0) +
    (selectedStock !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const SectionHeader = ({
    title,
    sectionKey,
  }: {
    title: string;
    sectionKey: string;
  }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="flex items-center justify-between w-full text-sm font-body font-medium text-text-primary mb-2"
    >
      {title}
      <ChevronDown
        className={cn(
          "w-3.5 h-3.5 text-text-muted transition-transform duration-200",
          expandedSections[sectionKey] && "rotate-180"
        )}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-body text-text-muted">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
          </span>
          <button
            onClick={onReset}
            className="text-xs font-body text-accent-amber hover:underline"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Search */}
      <div>
        <SectionHeader title="Search" sectionKey="search" />
        <AnimatePresence initial={false}>
          {expandedSections["search"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search parts..."
                className="mt-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category */}
      <div>
        <SectionHeader title="Category" sectionKey="category" />
        <AnimatePresence initial={false}>
          {expandedSections["category"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-1"
            >
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  className="flex items-center gap-2 py-1 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onCategoryChange([...selectedCategories, cat.value]);
                      } else {
                        onCategoryChange(
                          selectedCategories.filter((c) => c !== cat.value)
                        );
                      }
                    }}
                    className="w-4 h-4 rounded-sm border-border-subtle bg-bg-surface text-accent-amber focus:ring-accent-amber/50 focus:ring-offset-0"
                  />
                  <span className="text-sm font-body text-text-secondary group-hover:text-text-primary transition-colors">
                    {cat.label}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand */}
      <div>
        <SectionHeader title="Brand" sectionKey="brand" />
        <AnimatePresence initial={false}>
          {expandedSections["brand"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative mt-2 mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brands..."
                  className="w-full h-8 pl-8 pr-2 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1 custom-scrollbar">
                {filteredBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 py-1 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onBrandChange([...selectedBrands, brand]);
                        } else {
                          onBrandChange(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        }
                      }}
                      className="w-4 h-4 rounded-sm border-border-subtle bg-bg-surface text-accent-amber focus:ring-accent-amber/50 focus:ring-offset-0"
                    />
                    <span className="text-sm font-body text-text-secondary group-hover:text-text-primary transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vehicle Make */}
      <div>
        <SectionHeader title="Vehicle Make" sectionKey="make" />
        <AnimatePresence initial={false}>
          {expandedSections["make"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <select
                value={selectedMake}
                onChange={(e) => {
                  onMakeChange(e.target.value);
                  onModelChange("");
                }}
                className="w-full h-9 px-3 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-primary focus:outline-none focus:border-accent-amber mt-2"
              >
                <option value="">All Makes</option>
                {MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stock Status */}
      <div>
        <SectionHeader title="Stock Status" sectionKey="stock" />
        <AnimatePresence initial={false}>
          {expandedSections["stock"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-2">
                {(
                  [
                    { value: "all", label: "All" },
                    { value: "in_stock", label: "In Stock" },
                    { value: "low_stock", label: "Low Stock" },
                    { value: "out_of_stock", label: "Out of Stock" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      onStockChange(
                        option.value === "all"
                          ? "all"
                          : (option.value as StockStatus)
                      )
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors",
                      selectedStock === option.value
                        ? "bg-accent-amber/15 border-accent-amber/40 text-accent-amber"
                        : "bg-bg-surface border-border-subtle text-text-muted hover:text-text-secondary"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
