import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAdminStore } from "@/store/adminStore";
import VehicleForm from "@/components/admin/VehicleForm";
import type { Vehicle } from "@/types";

export default function AdminAddVehicle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addVehicle, updateVehicle } = useAdminStore();
  const [existing, setExisting] = useState<Vehicle | undefined>();
  const [loading, setLoading] = useState(!!slug);

  useEffect(() => {
    if (!slug) return;
    api.vehicles
      .get(slug)
      .then((v) => setExisting(v))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (data: { name: string; make: string; model: string; image?: string }) => {
    if (existing) {
      await updateVehicle({ ...existing, ...data });
    } else {
      await addVehicle(data);
    }
    navigate("/admin/vehicles");
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {existing ? "Edit Vehicle" : "Add Vehicle"}
      </h1>
      <div className="max-w-lg">
        <VehicleForm initial={existing} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
