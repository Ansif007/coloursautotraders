import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Vehicle } from "@/types";
import VehicleCard from "@/components/vehicles/VehicleCard";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.vehicles
      .list()
      .then(setVehicles)
      .finally(() => setLoading(false));
  }, []);

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse Vehicles</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Select a vehicle to view its compatible spare parts.
          </p>
          <div className="mt-6 max-w-md">
            <input
              type="text"
              placeholder="Search vehicles by name, make or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-slate-400">Loading vehicles...</p>
        ) : filtered.length === 0 ? (
          <p className="text-slate-400">
            {search ? "No vehicles match your search." : "No vehicles found."}
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
