import { Link, useLocation } from "react-router";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[--color-wx-border] shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to={isLoggedIn ? "/track" : "/"} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[--color-wx-blue] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
          </div>
          <div>
            <span
              className="text-xl font-extrabold tracking-tight text-[--color-wx-ink] group-hover:text-[--color-wx-blue] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              WASHEX
            </span>
            <span className="hidden sm:block text-[10px] font-medium text-[--color-wx-muted] leading-none tracking-wider uppercase -mt-0.5">
              College Laundry Portal
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 md:gap-2">
          {[
            { label: "Services", href: "/services" },
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === href
                  ? "bg-[--color-wx-sky] text-[--color-wx-blue]"
                  : "text-[--color-wx-slate] hover:text-[--color-wx-ink] hover:bg-[--color-wx-surface]"
              }`}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="ml-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[--color-wx-sky] text-[--color-wx-blue] hover:bg-[--color-wx-sky-mid] transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
