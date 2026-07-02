import { Link } from "react-router-dom";
import type { Vehicle } from "@/types";

interface Props {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
  return (
    <Link
      to={`/vehicles/${vehicle.slug}`}
      className="block bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{vehicle.name}</h3>
          <p className="text-sm text-slate-400">
            Make: {vehicle.make} &middot; Model: {vehicle.model}
          </p>
        </div>
      </div>
    </Link>
  );
}
