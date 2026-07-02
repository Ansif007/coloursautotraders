import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "@/store/adminStore";
import type { Vehicle } from "@/types";

export default function AdminVehicles() {
  const { vehicles, fetchVehicles, deleteVehicle, loading } = useAdminStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filtered = vehicles.filter(
    (v: Vehicle) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This will also unlink all parts.`)) return;
    try {
      await deleteVehicle(id);
    } catch {
      alert("Failed to delete vehicle.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Vehicles</h1>
        <Link
          to="/admin/add-vehicle"
          className="bg-accent-amber hover:bg-accent-blue text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Add Vehicle
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search vehicles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-accent-amber"
      />

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-text-muted">
          {search ? "No vehicles match your search." : "No vehicles yet."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-text-muted text-sm border-b border-border-subtle">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium hidden sm:table-cell">Make</th>
                <th className="pb-3 font-medium hidden md:table-cell">Model</th>
                <th className="pb-3 font-medium hidden md:table-cell">Parts</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v: Vehicle) => (
                <tr key={v.id} className="border-b border-border-subtle text-text-primary">
                  <td className="py-3">{v.name}</td>
                  <td className="py-3 hidden sm:table-cell text-text-secondary">{v.make}</td>
                  <td className="py-3 hidden md:table-cell text-text-secondary">{v.model}</td>
                  <td className="py-3 hidden md:table-cell text-text-secondary">{v.partCount ?? "-"}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-vehicle/${v.slug}`}
                        className="text-accent-amber hover:text-accent-blue text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id, v.name)}
                        className="text-status-red hover:text-status-red/80 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
