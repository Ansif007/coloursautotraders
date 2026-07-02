import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Copy,
  Check,
  Minus,
  Plus,
  Share2,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { mockParts } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageGallery } from "@/components/parts/ImageGallery";
import { SpecTable } from "@/components/parts/SpecTable";
import { CompatibilityAccordion } from "@/components/parts/CompatibilityAccordion";
import { PartCard } from "@/components/parts/PartCard";
import { useInquiry } from "@/hooks/useInquiry";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/ui/Toast";

type Tab = "specifications" | "compatibility" | "description";

const tabs: { key: Tab; label: string }[] = [
  { key: "specifications", label: "Specifications" },
  { key: "compatibility", label: "Compatibility" },
  { key: "description", label: "Description" },
];

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useInquiry();

  const [activeTab, setActiveTab] = useState<Tab>("specifications");
  const [quantity, setQuantity] = useState(1);
  const [btnState, setBtnState] = useState<"idle" | "loading" | "done">("idle");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const part = useMemo(
    () => mockParts.find((p) => p.slug === slug),
    [slug]
  );

  const relatedParts = useMemo(
    () =>
      part
        ? mockParts
            .filter((p) => p.category === part.category && p.id !== part.id)
            .slice(0, 4)
        : [],
    [part]
  );

  if (!part) {
    return (
      <main className="min-h-screen pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-body text-text-secondary mb-4">
              Part not found
            </p>
            <Link
              to="/catalog"
              className="text-accent-amber font-body hover:underline"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNumber(text);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const handleAddToInquiry = () => {
    if (btnState !== "idle") return;
    setBtnState("loading");
    setTimeout(() => {
      addItem(part, quantity);
      setBtnState("done");
      setTimeout(() => setBtnState("idle"), 1200);
    }, 300);
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard", "success");
    } catch {
      showToast("Failed to copy link", "error");
    }
  };

  const stockLabel =
    part.stockStatus === "in_stock"
      ? "In Stock"
      : part.stockStatus === "low_stock"
        ? "Low Stock"
        : "Out of Stock";

  return (
    <main className="min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-body text-text-muted hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-text-muted mb-8">
          <Link to="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to="/catalog"
            className="hover:text-text-primary transition-colors"
          >
            Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/catalog?category=${part.category}`}
            className="hover:text-text-primary transition-colors capitalize"
          >
            {part.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-secondary truncate max-w-[200px]">
            {part.name}
          </span>
        </nav>

        {/* Above Fold — 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left — Image Gallery */}
          <ImageGallery images={part.images} partName={part.name} />

          {/* Right — Part Details */}
          <div className="flex flex-col gap-5">
            {/* Category + Stock Badges */}
            <div className="flex items-center gap-3">
              <Badge variant="category">{part.category}</Badge>
              <Badge variant="stock" status={part.stockStatus}>
                {stockLabel}
              </Badge>
            </div>

            {/* Part Name */}
            <h1 className="text-2xl font-heading font-bold text-text-primary leading-tight">
              {part.name}
            </h1>

            {/* Brand */}
            <p className="text-base font-body text-text-secondary">
              {part.brand}
            </p>

            {/* Part Number Block */}
            <div className="bg-bg-elevated border border-border-glow rounded-md p-5 space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                PART NO.
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-mono text-accent-blue font-medium tabular-nums">
                  {part.partNumber}
                </span>
                <button
                  onClick={() => handleCopy(part.partNumber)}
                  className="flex items-center gap-1.5 text-xs font-body text-text-muted hover:text-accent-amber transition-colors"
                >
                  {copiedNumber === part.partNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-status-green" />
                      <span className="text-status-green">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* OEM Numbers */}
              {part.oemNumbers.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-border-subtle">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    OEM Numbers
                  </span>
                  {part.oemNumbers.map((oem) => (
                    <div
                      key={oem}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-mono text-text-secondary">
                        {oem}
                      </span>
                      <button
                        onClick={() => handleCopy(oem)}
                        className="shrink-0 text-text-muted hover:text-accent-amber transition-colors"
                        aria-label={`Copy OEM number ${oem}`}
                      >
                        {copiedNumber === oem ? (
                          <Check className="w-3.5 h-3.5 text-status-green" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm font-body text-text-secondary leading-relaxed">
              {part.shortDescription}
            </p>

            {/* Stock Note */}
            {part.stockNote && (
              <p className="text-xs font-body text-status-yellow bg-status-yellow/5 px-3 py-2 rounded-md border border-status-yellow/20">
                {part.stockNote}
              </p>
            )}

            {/* Quantity Stepper + Add to Inquiry */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-glass-bg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-14 h-12 flex items-center justify-center text-sm font-mono text-text-primary tabular-nums border-x border-border-subtle">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-glass-bg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.div
                className="flex-1"
                animate={
                  btnState === "done"
                    ? {
                        scale: [0.94, 1.04, 1],
                        transition: {
                          duration: 0.4,
                          ease: [0.34, 1.56, 0.64, 1],
                        },
                      }
                    : btnState === "loading"
                      ? { scale: 0.94 }
                      : { scale: 1 }
                }
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToInquiry}
                  disabled={btnState !== "idle"}
                >
                  {btnState === "done" ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Inquiry
                    </>
                  ) : (
                    "Add to Inquiry List"
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Share Row */}
            <div className="flex items-center gap-4 pt-2 border-t border-border-subtle">
              <span className="text-xs font-body text-text-muted uppercase tracking-wider">
                Share
              </span>
              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 text-sm font-body text-text-secondary hover:text-accent-amber transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${part.name} - ${part.partNumber} ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-body text-text-secondary hover:text-status-green transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Below Fold — Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="flex border-b border-border-subtle mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-6 py-3 text-sm font-body font-medium transition-colors",
                  activeTab === tab.key
                    ? "text-accent-amber"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-amber rounded-full"
                    transition={{
                      duration: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "specifications" && (
              <SpecTable specifications={part.specifications} />
            )}
            {activeTab === "compatibility" && (
              <CompatibilityAccordion entries={part.compatibility} />
            )}
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <div className="text-sm font-body text-text-secondary leading-relaxed whitespace-pre-line">
                  {part.description}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Parts */}
        {relatedParts.length > 0 && (
          <div className="border-t border-border-subtle pt-12">
            <h2 className="text-xl font-heading font-bold text-text-primary mb-8">
              You may also need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map((rp) => (
                <PartCard
                  key={rp.id}
                  part={rp}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
