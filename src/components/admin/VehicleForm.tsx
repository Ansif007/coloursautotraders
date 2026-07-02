import { useState } from "react";
import type { Vehicle } from "@/types";

interface Props {
  initial?: Vehicle;
  onSubmit: (data: { name: string; make: string; model: string; image?: string }) => Promise<void>;
}

export default function VehicleForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name || "");
  const [make, setMake] = useState(initial?.make || "");
  const [model, setModel] = useState(initial?.model || "");
  const [image, setImage] = useState(initial?.image || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !make.trim() || !model.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), make: make.trim(), model: model.trim(), image: image.trim() || undefined });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-amber"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-amber"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-amber"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border-subtle rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-amber"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-accent-amber hover:bg-accent-blue text-white font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
      >
        {submitting ? "Saving..." : initial ? "Update Vehicle" : "Add Vehicle"}
      </button>
    </form>
  );
}
