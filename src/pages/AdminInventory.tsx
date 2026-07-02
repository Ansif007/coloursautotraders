import { PartsTable } from "@/components/admin/PartsTable";

export function AdminInventory() {
  return (
    <div>
      <h1 className="text-xl font-heading font-bold text-text-primary mb-8">
        Inventory
      </h1>
      <PartsTable />
    </div>
  );
}
