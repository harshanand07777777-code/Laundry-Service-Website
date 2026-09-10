import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

interface SignUpPageProps {
  onLogin: (id: string) => void;
}

export default function SignUpPage({ onLogin }: SignUpPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const required = ["fullName", "studentId", "email", "phone", "password", "confirmPassword"] as const;
    if (required.some((k) => !form[k])) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(form.email);
      setLoading(false);
      navigate("/track");
    }, 800);
  }

  const fields: { key: keyof typeof form; label: string; type: string; placeholder: string }[] = [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Arjun Sharma" },
    { key: "studentId", label: "Student ID", type: "text", placeholder: "e.g. STU-20240123" },
    { key: "email", label: "College Email", type: "email", placeholder: "arjun@college.edu" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
    { key: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
    { key: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
  ];

  return (
    <div className="min-h-full flex flex-col bg-[--color-wx-surface]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[--color-wx-blue] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-[--color-wx-ink] tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                WASHEX
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[--color-wx-ink] mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
              Create your account
            </h1>
            <p className="text-sm text-[--color-wx-slate]">
              Register to access the WASHEX college laundry portal.
            </p>
          </div>

          <div className="bg-white border border-[--color-wx-border] rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[--color-wx-slate] uppercase tracking-widest mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={set(key)}
                    className="w-full border border-[--color-wx-border] rounded-xl px-4 py-3 text-sm text-[--color-wx-ink] placeholder:text-[--color-wx-muted] focus:outline-none focus:ring-2 focus:ring-[--color-wx-blue]/25 focus:border-[--color-wx-blue] transition-all bg-[--color-wx-surface]"
                    autoComplete={type === "password" ? "new-password" : undefined}
                  />
                </div>
              ))}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-600">
                  <span>⚠</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[--color-wx-blue] hover:bg-[--color-wx-blue-dark] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "Create Account"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[--color-wx-border] text-center">
              <p className="text-sm text-[--color-wx-slate]">
                Already have an account?{" "}
                <Link to="/" className="text-[--color-wx-blue] font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-[--color-wx-muted] mt-5">
            By creating an account, you agree to WASHEX's{" "}
            <a href="#" className="text-[--color-wx-blue] hover:underline">Terms of Use</a>.
          </p>
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
