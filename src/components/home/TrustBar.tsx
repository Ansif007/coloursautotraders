import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { label: "Parts in Catalog", target: 22, suffix: "+" },
  { label: "Categories", target: 6, suffix: "" },
  { label: "Years in Operation", target: 12, suffix: "+" },
  { label: "OEM Brands Supported", target: 6, suffix: "" },
];

function StatItem({ label, target, suffix, delay }: { label: string; target: number; suffix: string; delay: number }) {
  const { count, ref } = useCountUp(target);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center px-4"
    >
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-3xl sm:text-4xl font-heading font-black text-text-primary tabular-nums tracking-[-0.03em]">
          {count}
        </span>
        {suffix && (
          <span className="text-xl font-heading font-bold text-accent-amber">{suffix}</span>
        )}
      </div>
      <p className="text-[10px] font-body font-medium text-text-muted uppercase tracking-[0.15em] mt-1.5">
        {label}
      </p>
    </motion.div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="text-center px-4">
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-3xl sm:text-4xl font-heading font-black text-text-muted/30 tabular-nums tracking-[-0.03em]">
          —
        </span>
      </div>
      <p className="text-[10px] font-body font-medium text-text-muted uppercase tracking-[0.15em] mt-1.5">
        {label}
      </p>
    </div>
  );
}

export function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-6 bg-bg-surface"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center flex-1 justify-center">
              {i > 0 && (
                <div className="w-px h-10 bg-border-subtle shrink-0" aria-hidden="true" />
              )}
              {isInView ? <StatItem {...stat} delay={i * 0.12} /> : <Placeholder label={stat.label} />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
