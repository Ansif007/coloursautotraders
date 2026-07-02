import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAdminStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const ok = await login(pin);
    setLoading(false);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-base px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-accent-amber/10 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-accent-amber" />
          </div>
          <h1 className="text-xl font-heading font-bold text-text-primary">
            Admin Access
          </h1>
          <p className="text-sm font-body text-text-muted mt-2 text-center">
            Enter the admin PIN to access the control panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin PIN"
              autoFocus
              disabled={loading}
              className={`w-full h-12 px-4 rounded-md font-mono text-base text-text-primary bg-bg-surface border transition-all duration-[var(--duration-base)] focus:outline-none ${
                error
                  ? "border-status-red shadow-[0_0_16px_rgba(176,71,62,0.2)]"
                  : "border-border-subtle focus:border-accent-amber focus:shadow-[var(--shadow-glow-amber)]"
              } disabled:opacity-60`}
              aria-label="Admin PIN"
            />
            {error && (
              <p className="text-xs text-status-red font-body mt-2">
                Incorrect PIN. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-md bg-accent-amber text-white font-body font-medium text-base hover:bg-accent-amber/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Checking..." : "Enter Admin"}
          </button>
        </form>

        <p className="text-xs text-text-muted font-body text-center mt-8">
          Authentication is handled server-side with JWT.
        </p>
      </motion.div>
    </main>
  );
}
