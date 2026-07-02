import { motion } from "framer-motion";
import { mockParts } from "@/lib/mockData";
import { PartCard } from "@/components/parts/PartCard";

const featured = mockParts.filter((p) => p.featured).slice(0, 8);

export function FeaturedParts() {
  return (
    <section className="bg-bg-surface border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.15em]">
              Featured Parts
            </h2>
            <div className="w-10 h-0.5 bg-accent-amber mt-2" />
          </div>
          <a
            href="/catalog"
            className="text-[10px] font-body font-semibold text-accent-amber uppercase tracking-[0.1em] hover:underline"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((part, i) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <PartCard part={part} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
