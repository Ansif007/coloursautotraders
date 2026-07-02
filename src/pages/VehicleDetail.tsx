import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Part } from "@/types";
import { api } from "@/lib/api";
import { PartCard } from "@/components/parts/PartCard";

interface VehicleDetail {
  id: string;
  slug: string;
  name: string;
  make: string;
  model: string;
  image?: string;
  parts: Part[];
}

export default function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!slug) return;
    api.vehicles
      .get(slug)
      .then(setVehicle)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-text-muted">Loading vehicle...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl text-text-primary mb-4">Vehicle not found</h1>
        <Link to="/vehicles" className="text-accent-amber hover:underline">
          &larr; Back to vehicles
        </Link>
      </div>
    );
  }

  const filtered = vehicle.parts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-bg-base border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            to="/vehicles"
            className="text-accent-amber hover:underline text-sm mb-4 inline-block"
          >
            &larr; Back to vehicles
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">{vehicle.name}</h1>
          <p className="text-text-muted mt-1">
            Make: {vehicle.make} &middot; Model: {vehicle.model}
          </p>
          <p className="text-text-secondary text-sm mt-1">
            {vehicle.parts.length} compatible part{vehicle.parts.length !== 1 ? "s" : ""}
          </p>
          <div className="mt-6 max-w-md">
            <input
              type="text"
              placeholder="Search parts by name, category or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-amber"
            />
          </div>
        </div>
      </section>

      {/* Parts grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <p className="text-text-muted">
            {search ? "No parts match your search." : "No compatible parts found for this vehicle."}
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
