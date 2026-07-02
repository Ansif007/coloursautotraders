import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useInquiry } from "@/hooks/useInquiry";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Catalog", path: "/catalog" },
  { label: "Vehicles", path: "/vehicles" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

interface HeaderProps {
  onInquiryToggle?: () => void;
}

export function Header({ onInquiryToggle }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useInquiry();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const count = totalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-bg-base border-b border-border-subtle">
        {/* Main row */}
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-xs font-heading font-bold text-text-primary uppercase tracking-[0.15em]">
              Colours Auto Traders
            </span>
          </Link>

          {/* Search — prominent, always visible */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-[520px]">
            <div className="flex w-full border border-border-subtle bg-bg-surface focus-within:border-accent-amber transition-colors">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by part name, number, or OEM code..."
                className="flex-1 h-9 px-3 bg-transparent text-sm font-body text-text-primary placeholder:text-text-muted placeholder:opacity-60 focus:outline-none"
                aria-label="Search parts"
              />
              <button
                type="submit"
                className="w-9 h-9 flex items-center justify-center bg-accent-amber text-white hover:bg-accent-amber/90 transition-colors shrink-0"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile search icon */}
            <Link
              to="/catalog"
              className="sm:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={onInquiryToggle}
              className="relative p-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Open inquiry list"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent-amber text-white text-[9px] font-mono font-bold"
                >
                  {count > 99 ? "99+" : count}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop nav row */}
        <div className="hidden lg:block border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 flex items-center h-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-[10px] font-body font-semibold uppercase tracking-[0.1em] transition-colors",
                    location.pathname === link.path ? "text-accent-amber" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-bg-base"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.075, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-lg font-heading font-bold text-text-primary uppercase tracking-[0.1em] transition-colors",
                      location.pathname === link.path ? "text-accent-amber" : "text-text-primary hover:text-accent-amber"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
