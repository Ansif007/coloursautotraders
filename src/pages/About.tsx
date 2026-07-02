import { Link } from "react-router-dom";
import { Shield, Truck, Search, Wrench } from "lucide-react";

const values = [
  {
    icon: Search,
    title: "Verified Sourcing",
    desc: "Every part we supply is cross-checked against OEM specifications to ensure exact fitment and performance. No guesswork.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "We partner with trusted manufacturers and distributors. Counterfeit or substandard parts never reach our inventory.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    desc: "Based in Perumbaikad, we serve workshops and dealers across Kottayam and wider Kerala with reliable turnaround times.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    desc: "Our team understands the parts we sell. If a component doesn't match, we help identify the right alternative.",
  },
];

export function AboutPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero */}
      <section className="px-6 pb-16 border-b border-border-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
            About
          </p>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-text-primary mb-4 tracking-[-0.02em]">
            Precision Spare Parts, Delivered Fast
          </h1>
          <p className="text-sm font-body text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Colours Auto Traders is a B2B automotive spare parts supplier based
            in Perumbaikad, Kottayam. We source, verify, and deliver quality
            components for workshops, service centres, and dealerships across
            Kerala.
          </p>
        </div>
      </section>

      {/* Swiss rule */}
      <div className="h-0.5 bg-accent-amber mx-auto max-w-5xl" />

      {/* Values */}
      <section className="px-6 py-16 bg-bg-surface">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.2em] mb-10 text-center">
            How We Work
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-bg-base border border-border-subtle p-6 hover:border-accent-amber/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-bg-elevated flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent-amber" />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-text-primary mb-2 uppercase tracking-[0.1em]">
                    {v.title}
                  </h3>
                  <p className="text-xs font-body text-text-secondary leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-bg-surface border-t border-border-subtle relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-amber/30" />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.2em] mb-3">
            Need a Specific Part?
          </p>
          <h2 className="text-2xl font-heading font-black text-text-primary mb-3 tracking-[-0.02em]">
            Let Us Source It For You
          </h2>
          <p className="text-sm font-body text-text-secondary mb-8 max-w-md mx-auto">
            Browse our catalog or send us your requirements. We respond to every
            inquiry within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="inline-flex items-center h-11 px-6 bg-accent-amber text-white font-body font-semibold text-xs uppercase tracking-[0.15em] hover:bg-accent-amber/90 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center h-11 px-6 border border-border-subtle text-text-primary font-body font-semibold text-xs uppercase tracking-[0.15em] hover:bg-bg-elevated transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
