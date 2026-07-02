import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/adminStore";
import { formatDate } from "@/lib/utils";

export function AdminDashboard() {
  const { parts, loading } = useAdminStore();

  const recentParts = useMemo(
    () =>
      [...parts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 10),
    [parts]
  );

  if (loading) {
    return <div className="text-sm font-body text-text-muted">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-lg sm:text-xl font-heading font-bold text-text-primary mb-6 sm:mb-8">
        Dashboard
      </h1>

      <div>
        <h2 className="text-sm sm:text-base font-heading font-bold text-text-primary mb-4">
          Recently Added
        </h2>
        <div className="overflow-x-auto border border-border-subtle rounded-lg">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="bg-bg-surface border-b border-border-subtle">
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Part #
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Category
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Stock
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Date Added
                </th>
                <th className="px-3 sm:px-4 py-3 text-right text-[10px] sm:text-xs font-mono uppercase text-text-muted tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentParts.map((part) => (
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
                    <span className="text-xs sm:text-sm font-mono text-accent-blue">
                      {part.partNumber}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-4 py-3">
                    <span className="text-xs sm:text-sm font-body text-text-secondary capitalize">
                      {part.category}
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
                    <span className="text-xs sm:text-sm font-body text-text-muted">
                      {formatDate(part.createdAt)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-right">
                    <Link
                      to={`/admin/edit-part/${part.slug}`}
                      className="text-[10px] sm:text-xs font-body text-accent-amber hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
