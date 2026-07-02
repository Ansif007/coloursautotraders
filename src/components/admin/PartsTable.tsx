import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown, Edit3, Trash2, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/store/adminStore";
import { showToast } from "@/components/ui/Toast";

type SortKey = "name" | "partNumber" | "category" | "brand" | "stockStatus" | "viewCount";

export function PartsTable() {
  const navigate = useNavigate();
  const { parts, deletePart } = useAdminStore();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return parts;
    const q = search.toLowerCase();
    return parts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [parts, search]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return sortAsc ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    setDeleting(id);
    try {
      await deletePart(id);
      showToast(`${name} deleted`, "success");
    } catch {
      showToast("Failed to delete part", "error");
    } finally {
      setDeleting(null);
    }
  };

  const SortHeader = ({
    label,
    sortKey: sk,
  }: {
    label: string;
    sortKey: SortKey;
  }) => (
    <button
      onClick={() => toggleSort(sk)}
      className="flex items-center gap-1 text-xs font-mono uppercase text-text-muted hover:text-text-secondary transition-colors tracking-wider"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  if (parts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Package className="w-12 h-12 text-text-muted/30 mb-4" />
        <p className="text-sm font-body text-text-secondary mb-2">
          No parts yet. Add your first part
        </p>
        <Button variant="primary" onClick={() => navigate("/admin/add-part")}>
          Add Part
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory..."
            className="w-full h-10 pl-10 pr-3 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-lg">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-bg-surface border-b border-border-subtle">
              <th className="px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Name" sortKey="name" />
              </th>
              <th className="px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Part #" sortKey="partNumber" />
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Category" sortKey="category" />
              </th>
              <th className="hidden md:table-cell px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Brand" sortKey="brand" />
              </th>
              <th className="px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Stock" sortKey="stockStatus" />
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left">
                <SortHeader label="Views" sortKey="viewCount" />
              </th>
              <th className="hidden lg:table-cell px-3 sm:px-4 py-3 text-left">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Featured
                </span>
              </th>
              <th className="px-3 sm:px-4 py-3 text-right">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((part) => (
              <tr
                key={part.id}
                className="border-b border-border-subtle hover:bg-bg-elevated transition-colors"
              >
                <td className="px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm font-body text-text-primary">
                    {part.name}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm font-mono text-accent-blue tabular-nums">
                    {part.partNumber}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm font-body text-text-secondary capitalize">
                    {part.category}
                  </span>
                </td>
                <td className="hidden md:table-cell px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm font-body text-text-secondary">
                    {part.brand}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <Badge variant="stock" status={part.stockStatus}>
                    {part.stockStatus === "in_stock"
                      ? "In Stock"
                      : part.stockStatus === "low_stock"
                        ? "Low"
                        : "OOS"}
                  </Badge>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm font-mono text-text-muted">
                    {part.viewCount}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-3 sm:px-4 py-3">
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-body",
                      part.featured ? "text-status-green" : "text-text-muted"
                    )}
                  >
                    {part.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-part/${part.slug}`)
                      }
                      className="p-1.5 rounded-sm text-text-muted hover:text-accent-amber hover:bg-accent-amber/10 transition-colors"
                      aria-label={`Edit ${part.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(part.id, part.name)}
                      disabled={deleting === part.id}
                      className="p-1.5 rounded-sm text-text-muted hover:text-status-red hover:bg-status-red/10 transition-colors disabled:opacity-40"
                      aria-label={`Delete ${part.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-text-muted font-body mt-3">
        Showing {sorted.length} of {parts.length} parts
      </p>
    </div>
  );
}
