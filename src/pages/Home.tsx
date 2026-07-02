import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Hero } from "@/components/home/Hero";
import { FeaturedParts } from "@/components/home/FeaturedParts";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { api } from "@/lib/api";
import type { Vehicle } from "@/types";

export function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    api.vehicles.list().then(setVehicles);
  }, []);

  return (
    <main>
      <Hero />
      {vehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-primary">Browse Vehicles</h2>
            <Link
              to="/vehicles"
              className="text-sm text-accent-amber hover:text-accent-blue transition-colors font-medium"
            >
              View All &rarr;
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.slice(0, 6).map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </section>
      )}
      <FeaturedParts />
    </main>
  );
}
