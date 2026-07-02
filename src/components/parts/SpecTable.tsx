import type { Specification } from "@/types";

interface SpecTableProps {
  specifications: Specification[];
}

export function SpecTable({ specifications }: SpecTableProps) {
  if (specifications.length === 0) {
    return (
      <p className="text-sm font-body text-text-muted py-8 text-center">
        No specifications available for this part.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle">
      <table className="w-full">
        <tbody>
          {specifications.map((spec, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-bg-surface" : "bg-bg-base"
              } transition-colors`}
            >
              <td className="px-5 py-3 text-sm font-body text-text-secondary w-1/3 border-b border-border-subtle">
                {spec.label}
              </td>
              <td className="px-5 py-3 text-sm border-b border-border-subtle">
                <span className="font-mono text-text-primary">
                  {spec.value}
                </span>
                {spec.unit && (
                  <span className="ml-1 text-text-muted font-body text-xs">
                    {spec.unit}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
