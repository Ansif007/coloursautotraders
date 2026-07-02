import { useRef, useState, useEffect } from "react";

export function BlueprintGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="blueprint-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#D5D0C5"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          <radialGradient
            id="blueprint-torch"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="rgba(217,127,12,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        <rect
          width="100%"
          height="100%"
          fill="url(#blueprint-torch)"
          style={{
            transition: "all 100ms ease-out",
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
            opacity: 0.8,
          }}
        />
      </svg>
      {/* Extra overlay div to handle the torch more smoothly */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217,127,12,0.04) 0%, transparent 100%)`,
          transition: "background 100ms ease-out",
        }}
      />
    </div>
  );
}
