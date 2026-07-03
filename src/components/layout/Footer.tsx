import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle bg-bg-base mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-6">
          {/* Company */}
          <div className="min-w-[160px]">
            <p className="text-[10px] font-body font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Company</p>
            <div className="flex flex-col gap-1">
              <Link to="/about" className="text-[11px] font-body text-text-secondary hover:text-text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-[11px] font-body text-text-secondary hover:text-text-primary transition-colors">Contact</Link>
            </div>
          </div>
          {/* Parts */}
          <div className="min-w-[160px]">
            <p className="text-[10px] font-body font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Parts</p>
            <div className="flex flex-col gap-1">
              <Link to="/catalog" className="text-[11px] font-body text-text-secondary hover:text-text-primary transition-colors">Full Catalog</Link>
              <Link to="/catalog?category=engine" className="text-[11px] font-body text-text-secondary hover:text-text-primary transition-colors">Engine</Link>
              <Link to="/catalog?category=brakes" className="text-[11px] font-body text-text-secondary hover:text-text-primary transition-colors">Brakes</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border-subtle pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[10px] font-body font-semibold text-text-muted uppercase tracking-[0.1em]">
            &copy; {year} Colors Auto Traders
          </p>
          <p className="text-[10px] font-body text-text-muted">
            B2B Spare Parts Inquiry Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
