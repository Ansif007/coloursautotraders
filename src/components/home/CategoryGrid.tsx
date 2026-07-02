import { motion } from "framer-motion";
import {
  Cog,
  Wrench,
  Hammer,
  Shield,
  Zap,
  Thermometer,
  Wind,
  Cable,
  Shirt,
  Droplets,
  Factory,
  Beaker,
} from "lucide-react";

const categories = [
  { name: "Engine", icon: Cog, count: 4 },
  { name: "Transmission", icon: Wrench, count: 1 },
  { name: "Suspension", icon: Hammer, count: 4 },
  { name: "Brakes", icon: Shield, count: 3 },
  { name: "Electrical", icon: Zap, count: 3 },
  { name: "Cooling", icon: Thermometer, count: 3 },
  { name: "Filters", icon: Wind, count: 3 },
  { name: "Belts & Chains", icon: Cable, count: 2 },
  { name: "Body", icon: Shirt, count: 0 },
  { name: "Hydraulics", icon: Droplets, count: 0 },
  { name: "Exhaust", icon: Factory, count: 0 },
  { name: "Industrial", icon: Beaker, count: 0 },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function CategoryGrid() {
  return (
    <section className="relative py-24 px-6 bg-bg-base overflow-hidden">
      {/* Swiss-style structural rule */}
      <div className="absolute top-0 left-6 right-6 h-px bg-border-subtle" />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.2em] mb-12 text-center"
        >
          Browse by Category
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.name}
                variants={item}
                href={cat.count > 0 ? `/catalog?category=${cat.name.toLowerCase()}` : undefined}
                onClick={(e) => {
                  if (cat.count === 0) e.preventDefault();
                }}
                className={`relative group flex flex-col items-center justify-center aspect-square bg-bg-surface border border-border-subtle transition-all duration-[var(--duration-base)] hover:bg-bg-elevated ${
                  cat.count > 0 ? "cursor-pointer" : "cursor-default opacity-40"
                }`}
              >
                <Icon className="w-8 h-8 text-text-secondary mb-3 transition-all duration-[var(--duration-base)] group-hover:scale-110 group-hover:text-accent-amber" />
                <span className="text-xs font-body font-medium text-text-secondary group-hover:text-text-primary uppercase tracking-[0.1em] transition-colors duration-[var(--duration-fast)]">
                  {cat.name}
                </span>
                {cat.count > 0 && (
                  <span className="text-[10px] text-text-muted font-mono mt-1.5">
                    {cat.count} parts
                  </span>
                )}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
