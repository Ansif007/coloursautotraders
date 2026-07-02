import { useState } from "react";
import { Plus, Trash2, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { showToast } from "@/components/ui/Toast";
import { generateId, slugify } from "@/lib/utils";
import type { Part, Category, StockStatus, Specification, Compatibility } from "@/types";

const CATEGORIES: { value: Category; label: string }[] = [
  "engine", "transmission", "suspension", "brakes", "electrical",
  "body", "hydraulics", "filters", "belts_chains", "cooling",
  "exhaust", "industrial",
].map((c) => ({ value: c as Category, label: c.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) }));

interface PartFormProps {
  initial?: Partial<Part>;
  onSave: (part: Part) => void;
}

export function PartForm({ initial, onSave }: PartFormProps) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    partNumber: initial?.partNumber || "",
    oemNumbers: initial?.oemNumbers || [],
    brand: initial?.brand || "",
    category: initial?.category || "engine" as Category,
    subcategory: initial?.subcategory || "",
    featured: initial?.featured || false,
    imageUrl: initial?.images?.[0]?.url || "",
    shortDescription: initial?.shortDescription || "",
    description: initial?.description || "",
    specifications: initial?.specifications || [] as Specification[],
    compatibility: initial?.compatibility || [] as Compatibility[],
    stockStatus: initial?.stockStatus || "in_stock" as StockStatus,
    stockNote: initial?.stockNote || "",
    tags: initial?.tags || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [oemInput, setOemInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const validateImageUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      const ext = parsed.pathname.split(".").pop()?.toLowerCase();
      if (ext && !["jpg", "jpeg", "png", "webp", "avif", "svg"].includes(ext)) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Part name is required";
    if (!form.partNumber.trim()) errs.partNumber = "Part number is required — check the manufacturer's label.";
    if (form.shortDescription.length > 120) errs.shortDescription = "Short description must be 120 characters or less";
    if (form.imageUrl && !validateImageUrl(form.imageUrl)) errs.imageUrl = "Must be a valid URL ending in jpg, jpeg, png, webp, avif, or svg";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      showToast("Please fix the form errors", "error");
      return;
    }

    const part: Part = {
      id: initial?.id || generateId(),
      slug: initial?.slug || slugify(form.name),
      name: form.name,
      partNumber: form.partNumber,
      oemNumbers: form.oemNumbers,
      brand: form.brand,
      category: form.category,
      subcategory: form.subcategory,
      description: form.description,
      shortDescription: form.shortDescription,
      images: form.imageUrl
        ? [{ url: form.imageUrl, alt: form.name, isPrimary: true }]
        : [],
      specifications: form.specifications,
      compatibility: form.compatibility,
      stockStatus: form.stockStatus,
      stockNote: form.stockNote || undefined,
      tags: form.tags,
      viewCount: initial?.viewCount || 0,
      featured: form.featured,
      createdAt: initial?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(part);
  };

  const addOem = () => {
    if (oemInput.trim() && !form.oemNumbers.includes(oemInput.trim())) {
      setForm({ ...form, oemNumbers: [...form.oemNumbers, oemInput.trim()] });
      setOemInput("");
    }
  };

  const removeOem = (oem: string) => {
    setForm({ ...form, oemNumbers: form.oemNumbers.filter((o) => o !== oem) });
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const updateSpec = (i: number, field: keyof Specification, value: string) => {
    const specs = [...form.specifications];
    specs[i] = { ...specs[i]!, [field]: value };
    setForm({ ...form, specifications: specs });
  };

  const addSpec = () => {
    setForm({
      ...form,
      specifications: [...form.specifications, { label: "", value: "", unit: "" }],
    });
  };

  const removeSpec = (i: number) => {
    setForm({
      ...form,
      specifications: form.specifications.filter((_, idx) => idx !== i),
    });
  };

  const updateComp = (i: number, field: keyof Compatibility, value: string | number) => {
    const comps = [...form.compatibility];
    comps[i] = { ...comps[i]!, [field]: value };
    setForm({ ...form, compatibility: comps });
  };

  const addComp = () => {
    setForm({
      ...form,
      compatibility: [
        ...form.compatibility,
        { make: "", model: "", yearFrom: 2000, yearTo: 2025 },
      ],
    });
  };

  const removeComp = (i: number) => {
    setForm({
      ...form,
      compatibility: form.compatibility.filter((_, idx) => idx !== i),
    });
  };

  const charCount = form.shortDescription.length;

  const Fieldset = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <fieldset className="border border-border-subtle rounded-lg p-4 sm:p-5 space-y-4">
      <legend className="text-sm font-heading font-bold text-text-primary px-2 uppercase tracking-wider">
        {label}
      </legend>
      {children}
    </fieldset>
  );

  return (
    <div className="space-y-8 w-full max-w-3xl">
      {/* Basic Information */}
      <Fieldset label="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Part Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Crankshaft Bearing Set"
              error={errors.name}
            />
          </div>
          <div>
            <Input
              label="Part Number *"
              value={form.partNumber}
              onChange={(e) => setForm({ ...form, partNumber: e.target.value })}
              placeholder="CB-8872-STD"
              className="font-mono"
              error={errors.partNumber}
            />
          </div>
        </div>

        {/* OEM Numbers tag input */}
        <div>
          <label className="text-sm text-text-secondary font-body block mb-1.5">
            OEM Numbers
          </label>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {form.oemNumbers.map((oem) => (
              <span
                key={oem}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-accent-blue/10 text-accent-blue text-xs font-mono border border-accent-blue/20"
              >
                {oem}
                <button onClick={() => removeOem(oem)} className="hover:text-status-red transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={oemInput}
              onChange={(e) => setOemInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addOem())}
              placeholder="Type OEM number and press Enter"
              className="flex-1 h-10 px-3 rounded-md font-mono text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
            />
            <Button type="button" variant="outline" size="sm" onClick={addOem}>
              Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="Nippon Bearings"
          />
          <div>
            <label className="text-sm text-text-secondary font-body block mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="w-full h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle focus:outline-none focus:border-accent-amber"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Subcategory"
          value={form.subcategory}
          onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
          placeholder="Bearings"
        />

        {/* Featured toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={form.featured}
            onClick={() => setForm({ ...form, featured: !form.featured })}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              form.featured ? "bg-accent-amber" : "bg-bg-elevated border border-border-subtle"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                form.featured ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-body text-text-secondary">Featured part</span>
        </label>
      </Fieldset>

      {/* Images */}
      <Fieldset label="Images">
        <Input
          label="Image URL"
          value={form.imageUrl}
          onChange={(e) => {
            setForm({ ...form, imageUrl: e.target.value });
            if (errors.imageUrl) setErrors({ ...errors, imageUrl: "" });
          }}
          placeholder="https://example.com/part-image.jpg"
          error={errors.imageUrl}
        />
        {form.imageUrl && (
          <div className="w-24 h-24 rounded-md overflow-hidden border border-border-subtle bg-bg-surface">
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </Fieldset>

      {/* Descriptions */}
      <Fieldset label="Description &amp; Short Description">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm text-text-secondary font-body">
              Short Description
            </label>
            <span className={`text-xs font-mono ${charCount > 120 ? "text-status-red" : "text-text-muted"}`}>
              {charCount}/120
            </span>
          </div>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            placeholder="Brief description for card display..."
            rows={2}
            className={`w-full px-3 py-2.5 rounded-md font-body text-sm text-text-primary bg-bg-surface border transition-colors focus:outline-none focus:border-accent-amber resize-y ${
              charCount > 120 ? "border-status-red" : "border-border-subtle"
            }`}
          />
          {errors.shortDescription && (
            <p className="text-xs text-status-red font-body mt-1">{errors.shortDescription}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm text-text-secondary font-body">
              Full Description
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1 text-xs font-body text-accent-amber hover:underline"
            >
              <Eye className="w-3 h-3" />
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
          {showPreview ? (
            <div className="p-4 rounded-md bg-bg-surface border border-border-subtle text-sm font-body text-text-secondary whitespace-pre-line min-h-[120px]">
              {form.description || "No content"}
            </div>
          ) : (
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Full markdown description..."
              rows={6}
              className="w-full px-3 py-2.5 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle focus:outline-none focus:border-accent-amber resize-y font-mono"
            />
          )}
        </div>
      </Fieldset>

      {/* Specifications */}
      <Fieldset label="Specifications">
        {form.specifications.map((spec, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => updateSpec(i, "label", e.target.value)}
                placeholder="Label"
                className="h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="Value"
                className="h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
              />
              <input
                type="text"
                value={spec.unit || ""}
                onChange={(e) => updateSpec(i, "unit", e.target.value)}
                placeholder="Unit (optional)"
                className="h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
              />
            </div>
            <button
              type="button"
              onClick={() => removeSpec(i)}
              className="mt-1 p-2 rounded-md text-text-muted hover:text-status-red hover:bg-status-red/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addSpec}>
          <Plus className="w-4 h-4" />
          Add Specification
        </Button>
      </Fieldset>

      {/* Compatibility */}
      <Fieldset label="Compatibility">
        {form.compatibility.map((comp, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={comp.make}
                onChange={(e) => updateComp(i, "make", e.target.value)}
                placeholder="Make"
                className="h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
              />
              <input
                type="text"
                value={comp.model}
                onChange={(e) => updateComp(i, "model", e.target.value)}
                placeholder="Model"
                className="h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={comp.yearFrom}
                  onChange={(e) => updateComp(i, "yearFrom", parseInt(e.target.value) || 2000)}
                  placeholder="Year From"
                  className="w-full h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
                />
                <input
                  type="number"
                  value={comp.yearTo}
                  onChange={(e) => updateComp(i, "yearTo", parseInt(e.target.value) || 2025)}
                  placeholder="Year To"
                  className="w-full h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeComp(i)}
              className="mt-1 p-2 rounded-md text-text-muted hover:text-status-red hover:bg-status-red/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addComp}>
          <Plus className="w-4 h-4" />
          Add Compatibility
        </Button>
      </Fieldset>

      {/* Stock & Status */}
      <Fieldset label="Stock &amp; Status">
        <div>
          <label className="text-sm text-text-secondary font-body block mb-2">
            Stock Status
          </label>
          <div className="flex gap-3">
            {(
              [
                { value: "in_stock", label: "In Stock" },
                { value: "low_stock", label: "Low Stock" },
                { value: "out_of_stock", label: "Out of Stock" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.value}
                className={`flex-1 cursor-pointer text-center py-2.5 rounded-md text-sm font-body transition-colors border ${
                  form.stockStatus === opt.value
                    ? "bg-accent-amber/10 text-accent-amber border-accent-amber/30"
                    : "bg-bg-surface text-text-muted border-border-subtle hover:text-text-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="stockStatus"
                  value={opt.value}
                  checked={form.stockStatus === opt.value}
                  onChange={() => setForm({ ...form, stockStatus: opt.value })}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <Input
          label="Stock Note (optional)"
          value={form.stockNote}
          onChange={(e) => setForm({ ...form, stockNote: e.target.value })}
          placeholder="Expected restock: 2 weeks"
        />

        {/* Tags */}
        <div>
          <label className="text-sm text-text-secondary font-body block mb-1.5">
            Tags
          </label>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-bg-elevated text-text-secondary text-xs font-body border border-border-subtle"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-status-red transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Type tag and press Enter"
              className="flex-1 h-10 px-3 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent-amber"
            />
            <Button type="button" variant="outline" size="sm" onClick={addTag}>
              Add
            </Button>
          </div>
        </div>
      </Fieldset>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-bg-base py-4 border-t border-border-subtle">
        <Button variant="primary" size="lg" onClick={handleSave} className="w-full sm:w-auto">
          Save Part
        </Button>
      </div>
    </div>
  );
}
