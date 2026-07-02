import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { mockParts } from "@/lib/mockData";
import { PartGrid } from "@/components/parts/PartGrid";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import type { Category, StockStatus } from "@/types";

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initialCategory = searchParams.get("category") as Category | null;

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParts = useMemo(() => {
    let result = [...mockParts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedMake) {
      result = result.filter((p) =>
        p.compatibility.some((c) => c.make === selectedMake)
      );
    }

    if (selectedModel) {
      result = result.filter((p) =>
        p.compatibility.some(
          (c) => c.model === selectedModel && c.make === selectedMake
        )
      );
    }

    if (selectedStock !== "all") {
      result = result.filter((p) => p.stockStatus === selectedStock);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNumber.toLowerCase().includes(q) ||
          p.oemNumbers.some((oem) => oem.toLowerCase().includes(q)) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    return result;
  }, [
    selectedCategories,
    selectedBrands,
    selectedMake,
    selectedModel,
    selectedStock,
    searchQuery,
  ]);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedMake("");
    setSelectedModel("");
    setSelectedStock("all");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Mobile Filter Button */}
      <div className="lg:hidden px-6 mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-secondary hover:text-text-primary transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {selectedCategories.length + selectedBrands.length + (selectedMake ? 1 : 0) +
            (selectedStock !== "all" ? 1 : 0) + (searchQuery ? 1 : 0) > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-accent-amber text-white text-[10px] font-mono font-bold rounded-full">
              {selectedCategories.length + selectedBrands.length + (selectedMake ? 1 : 0) +
                (selectedStock !== "all" ? 1 : 0) + (searchQuery ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              selectedMake={selectedMake}
              selectedModel={selectedModel}
              selectedStock={selectedStock}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategories}
              onBrandChange={setSelectedBrands}
              onMakeChange={setSelectedMake}
              onModelChange={setSelectedModel}
              onStockChange={setSelectedStock}
              onSearchChange={setSearchQuery}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          <PartGrid parts={filteredParts} />
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-bg-elevated rounded-t-xl max-h-[85vh] overflow-y-auto border-t border-border-subtle"
            >
              <div className="sticky top-0 bg-bg-elevated z-10 flex items-center justify-between p-6 border-b border-border-subtle">
                <h3 className="text-base font-heading font-bold text-text-primary">
                  Filters
                </h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-glass-bg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  selectedMake={selectedMake}
                  selectedModel={selectedModel}
                  selectedStock={selectedStock}
                  searchQuery={searchQuery}
                  onCategoryChange={setSelectedCategories}
                  onBrandChange={setSelectedBrands}
                  onMakeChange={setSelectedMake}
                  onModelChange={setSelectedModel}
                  onStockChange={setSelectedStock}
                  onSearchChange={setSearchQuery}
                  onReset={handleReset}
                />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full mt-6 h-12 rounded-md bg-accent-amber text-white font-body font-medium hover:bg-accent-amber/90 transition-colors"
                >
                  Show {filteredParts.length} result
                  {filteredParts.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
