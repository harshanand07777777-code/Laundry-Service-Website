import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

interface LoginPageProps {
  onLogin: (id: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(form.email);
      setLoading(false);
      navigate("/track");
    }, 700);
  }

  return (
    <div className="min-h-full flex flex-col bg-[--color-wx-surface]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 py-14">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* College badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[--color-wx-blue] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-[--color-wx-ink] tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              WASHEX
            </span>
          </div>

          <div className="bg-white border border-[--color-wx-border] rounded-2xl shadow-sm p-8">
            <div className="text-center mb-7">
              <h1 className="text-2xl font-bold text-[--color-wx-ink] mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                Welcome to WASHEX
              </h1>
              <p className="text-sm text-[--color-wx-slate]">
                Your college laundry, just a few clicks away.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[--color-wx-slate] uppercase tracking-widest mb-1.5">
                  Email / Student ID
                </label>
                <input
                  type="text"
                  placeholder="you@college.edu or STU-12345"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[--color-wx-border] rounded-xl px-4 py-3 text-sm text-[--color-wx-ink] placeholder:text-[--color-wx-muted] focus:outline-none focus:ring-2 focus:ring-[--color-wx-blue]/25 focus:border-[--color-wx-blue] transition-all bg-[--color-wx-surface]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[--color-wx-slate] uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-[--color-wx-border] rounded-xl px-4 py-3 text-sm text-[--color-wx-ink] placeholder:text-[--color-wx-muted] focus:outline-none focus:ring-2 focus:ring-[--color-wx-blue]/25 focus:border-[--color-wx-blue] transition-all bg-[--color-wx-surface]"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-600">
                  <span>⚠</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[--color-wx-blue] hover:bg-[--color-wx-blue-dark] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "Login to WASHEX"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[--color-wx-border] text-center space-y-2">
              <p className="text-sm text-[--color-wx-slate]">
                New user?{" "}
                <Link to="/signup" className="text-[--color-wx-blue] font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
              <p className="text-xs text-[--color-wx-muted]">
                Already have an account?{" "}
                <button
                  onClick={() => setForm({ email: "demo@college.edu", password: "demo1234" })}
                  className="text-[--color-wx-blue] hover:underline font-medium"
                >
                  Use demo credentials
                </button>
              </p>
            </div>
          </div>

          {/* Info strip */}
          <div className="mt-5 flex items-center justify-center gap-6 text-xs text-[--color-wx-muted]">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[--color-wx-sky] flex items-center justify-center text-[--color-wx-blue]">🔒</span>
              Secure Portal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[--color-wx-sky] flex items-center justify-center text-[--color-wx-blue]">🎓</span>
              Students Only
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[--color-wx-sky] flex items-center justify-center text-[--color-wx-blue]">📲</span>
              24/7 Access
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[--color-wx-border] bg-white px-8 py-5 text-xs text-[--color-wx-muted] flex flex-wrap items-center justify-between gap-3">
      <span className="font-semibold text-[--color-wx-slate]">WASHEX — College Laundry Portal</span>
      <div className="flex gap-5">
        <a href="#" className="hover:text-[--color-wx-ink] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[--color-wx-ink] transition-colors">Terms</a>
        <a href="#" className="hover:text-[--color-wx-ink] transition-colors">Help Desk</a>
      </div>
      <span>© 2026 WASHEX. All rights reserved.</span>
    </footer>
  );
}
