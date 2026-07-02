/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
        },
        border: {
          subtle: "var(--border-subtle)",
          glow: "var(--border-glow)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          amber: "var(--accent-amber)",
          "amber-glow": "var(--accent-amber-glow)",
          blue: "var(--accent-blue)",
          "blue-glow": "var(--accent-blue-glow)",
        },
        status: {
          green: "var(--status-green)",
          red: "var(--status-red)",
          yellow: "var(--status-yellow)",
        },
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
      },
      fontFamily: {
        heading: ['"Inter"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        xs: ["11px", "1.4"],
        sm: ["13px", "1.5"],
        base: ["14px", "1.5"],
        lg: ["16px", "1.4"],
        xl: ["20px", "1.3"],
        "2xl": ["24px", "1.2"],
        hero: ["clamp(28px, 4vw, 40px)", "1.1"],
      },
      letterSpacing: {
        swiss: "0.15em",
        wide: "0.08em",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "20px",
        full: "9999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "glow-amber": "var(--shadow-glow-amber)",
        "glow-blue": "var(--shadow-glow-blue)",
      },
      animation: {
        "shimmer": "shimmer 1.8s infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-slower": "spin 18s linear infinite",
        "pulse-bounce": "pulseBounce 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "scan-line": "scanLine 1.2s ease-in-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite reverse",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "count-up": "countUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
  ],
};
