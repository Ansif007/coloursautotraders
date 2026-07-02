import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Engine",
    slug: "engine",
    count: 24,
    description: "Pistons, gaskets, timing components",
    color: "bg-accent-amber",
  },
  {
    name: "Brakes",
    slug: "brakes",
    count: 18,
    description: "Pads, rotors, calipers",
    color: "bg-status-red",
  },
  {
    name: "Electrical",
    slug: "electrical",
    count: 31,
    description: "Sensors, alternators, wiring",
    color: "bg-accent-blue",
  },
  {
    name: "Suspension",
    slug: "suspension",
    count: 22,
    description: "Struts, control arms, bushings",
    color: "bg-status-green",
  },
  {
    name: "Cooling",
    slug: "cooling",
    count: 14,
    description: "Radiators, thermostats, hoses",
    color: "bg-status-yellow",
  },
  {
    name: "Filters",
    slug: "filters",
    count: 11,
    description: "Oil, air, fuel, cabin",
    color: "bg-[#8B5CF6]",
  },
];

export function CategoryShowcase() {
  const navigate = useNavigate();

  return (
    <section className="bg-bg-base border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.15em]">
            Browse by Category
          </h2>
          <div className="w-10 h-0.5 bg-accent-amber mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => navigate(`/catalog?category=${cat.slug}`)}
              className="flex flex-col items-center gap-2 p-4 bg-bg-surface border border-border-subtle hover:border-accent-amber/40 transition-colors text-left"
            >
              <span className={`w-6 h-0.5 ${cat.color}`} />
              <span className="text-sm font-body font-semibold text-text-primary">
                {cat.name}
              </span>
              <span className="text-[10px] font-body text-text-muted">
                {cat.count} parts
              </span>
              <span className="text-[10px] font-body text-text-secondary text-center leading-snug">
                {cat.description}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
