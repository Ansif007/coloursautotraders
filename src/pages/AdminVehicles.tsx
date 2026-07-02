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
        <h1 className="text-2xl font-bold text-white">Vehicles</h1>
        <Link
          to="/admin/add-vehicle"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Add Vehicle
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search vehicles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-blue-500"
      />

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-400">
          {search ? "No vehicles match your search." : "No vehicles yet."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium hidden sm:table-cell">Make</th>
                <th className="pb-3 font-medium hidden md:table-cell">Model</th>
                <th className="pb-3 font-medium hidden md:table-cell">Parts</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v: Vehicle) => (
                <tr key={v.id} className="border-b border-slate-800 text-white">
                  <td className="py-3">{v.name}</td>
                  <td className="py-3 hidden sm:table-cell text-slate-300">{v.make}</td>
                  <td className="py-3 hidden md:table-cell text-slate-300">{v.model}</td>
                  <td className="py-3 hidden md:table-cell text-slate-300">{v.partCount ?? "-"}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-vehicle/${v.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id, v.name)}
                        className="text-red-400 hover:text-red-300 text-sm"
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
