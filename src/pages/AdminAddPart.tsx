import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PartForm } from "@/components/admin/PartForm";
import { useAdminStore } from "@/store/adminStore";
import { showToast } from "@/components/ui/Toast";
import type { Part } from "@/types";

export function AdminAddPart() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { parts, addPart, updatePart } = useAdminStore();
  const isEditing = !!slug;
  const [existingPart, setExistingPart] = useState<Part | undefined>();
  const [loadingPart, setLoadingPart] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;
    const cached = parts.find((p) => p.slug === slug);
    if (cached) {
      setExistingPart(cached);
      setLoadingPart(false);
      return;
    }
    fetch(`/api/parts/${slug}`)
      .then((r) => r.json())
      .then((data) => setExistingPart(data))
      .catch(() => showToast("Failed to load part", "error"))
      .finally(() => setLoadingPart(false));
  }, [slug, isEditing, parts]);

  const handleSave = async (part: Part) => {
    try {
      if (isEditing) {
        await updatePart(part);
        showToast("Part updated successfully", "success");
      } else {
        await addPart(part);
        showToast("Part saved successfully", "success");
      }
      navigate("/admin/inventory");
    } catch {
      showToast("Failed to save part", "error");
    }
  };

  if (loadingPart) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-heading font-bold text-text-primary">
            Edit Part
          </h1>
        </div>
        <div className="text-sm font-body text-text-muted py-8 text-center">
          Loading part data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-heading font-bold text-text-primary">
          {isEditing ? "Edit Part" : "Add New Part"}
        </h1>
      </div>
      <PartForm initial={existingPart} onSave={handleSave} />
    </div>
  );
}
