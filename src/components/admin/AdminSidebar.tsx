import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/inventory", label: "Inventory", icon: Package },
  { path: "/admin/add-part", label: "Add New Part", icon: PlusCircle },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAdminStore((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const NavLinks = ({ vertical }: { vertical?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 transition-colors",
              vertical
                ? "px-3 py-2.5 rounded-md text-sm font-body w-full"
                : "px-3 py-2 rounded-md text-xs font-body",
              isActive
                ? "bg-accent-amber/10 text-accent-amber"
                : "text-text-muted hover:text-text-secondary hover:bg-glass-bg"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[220px] bg-bg-surface border-r border-border-subtle flex-col z-30">
        <Link
          to="/admin/dashboard"
          className="h-16 flex items-center gap-2 px-6 border-b border-border-subtle shrink-0"
        >
          <span className="text-base font-heading font-bold tracking-tight">
            <span className="text-text-primary">PART</span>
            <span className="text-accent-amber">FORGE</span>
          </span>
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-border-subtle">
            Admin
          </span>
        </Link>

        <nav className="flex-1 py-4 space-y-1 px-3">
          <NavLinks vertical />
        </nav>

        <div className="border-t border-border-subtle p-3 space-y-1 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body text-text-muted hover:text-text-secondary hover:bg-glass-bg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body text-status-red/60 hover:text-status-red hover:bg-status-red/5 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-bg-surface border-b border-border-subtle flex items-center justify-between px-4 z-30">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-sm font-heading font-bold tracking-tight">
            <span className="text-text-primary">PART</span>
            <span className="text-accent-amber">FORGE</span>
          </span>
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider px-1 py-0.5 rounded-sm border border-border-subtle">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-text-muted hover:text-text-primary"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[260px] bg-bg-surface border-r border-border-subtle flex flex-col z-50"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-border-subtle shrink-0">
                <span className="text-sm font-heading font-bold tracking-tight">
                  <span className="text-text-primary">PART</span>
                  <span className="text-accent-amber">FORGE</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-muted hover:text-text-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 py-4 space-y-1 px-3">
                <NavLinks vertical />
              </nav>
              <div className="border-t border-border-subtle p-3 space-y-1 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body text-text-muted hover:text-text-secondary hover:bg-glass-bg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Admin</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body text-status-red/60 hover:text-status-red hover:bg-status-red/5 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
