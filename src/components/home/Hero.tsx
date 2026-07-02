import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroSearchBar } from "./HeroSearchBar";

const headlineWords = ["Find", "the", "Exact", "Part.", "Get", "a", "Quote", "in", "Minutes."];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-bg-base border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-[10px] font-body font-semibold text-accent-amber uppercase tracking-[0.15em] mb-3">
            Colours Auto Traders — Precision Parts. Trusted Source.
          </p>

          {/* Headline */}
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-hero font-heading font-bold text-text-primary leading-tight mb-3"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordReveal}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <p className="text-sm font-body text-text-secondary mb-6 max-w-xl">
            OEM-matched specifications. Verified compatibility.
            Submit an inquiry. Get a bulk quote in minutes.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl">
            <HeroSearchBar />
          </div>

          {/* Quick category links */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            {[
              { label: "Engine Parts", query: "engine" },
              { label: "Brakes", query: "brakes" },
              { label: "Electrical", query: "electrical" },
              { label: "Suspension", query: "suspension" },
            ].map((pill) => (
              <button
                key={pill.label}
                onClick={() => navigate(`/catalog?category=${pill.query}`)}
                className="px-3 py-1.5 border border-border-subtle text-[10px] font-body font-semibold text-text-secondary hover:text-text-primary hover:border-accent-amber/40 transition-colors uppercase tracking-[0.1em]"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
