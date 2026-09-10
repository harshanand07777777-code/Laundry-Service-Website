import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

interface TrackPageProps {
  studentId: string;
  onLogout: () => void;
}

export default function TrackPage({ studentId, onLogout }: TrackPageProps) {
  const navigate = useNavigate();
  const [laundryNum, setLaundryNum] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const VALID_NUMBERS = ["WSH-2847", "WSH-1903", "WSH-3341", "WSH-0519"];

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const val = laundryNum.trim().toUpperCase();
    if (!val) { setError("Please enter your laundry number."); return; }
    if (!VALID_NUMBERS.includes(val)) {
      setError("No order found for this number. Try: " + VALID_NUMBERS.slice(0, 3).join(", "));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/status/${val}`);
    }, 600);
  }

  return (
    <div className="min-h-full flex flex-col bg-[--color-wx-surface]">
      <Navbar isLoggedIn onLogout={onLogout} />

      <main className="flex-1 px-5 py-14">
        {/* Welcome banner */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="bg-[--color-wx-blue] rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                Student Portal
              </p>
              <h2 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Welcome back, {studentId.split("@")[0]} 👋
              </h2>
              <p className="text-white/70 text-sm mt-0.5">
                Track your laundry and stay updated from pickup to delivery.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["Active Orders: 1", "Completed: 3"].map((s) => (
                <div key={s} className="bg-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-medium border border-white/20">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Track form */}
          <div className="md:col-span-3 animate-fade-in-up">
            <div className="bg-white border border-[--color-wx-border] rounded-2xl shadow-sm p-8">
              <div className="mb-6">
                <div className="w-11 h-11 rounded-xl bg-[--color-wx-sky] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[--color-wx-blue]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-[--color-wx-ink] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  Track Your Laundry
                </h1>
                <p className="text-sm text-[--color-wx-slate]">
                  Enter your laundry number to check the current status of your clothes.
                </p>
              </div>

              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[--color-wx-slate] uppercase tracking-widest mb-1.5">
                    Laundry Number
                  </label>
                  <input
                    type="text"
                    value={laundryNum}
                    onChange={(e) => { setLaundryNum(e.target.value); setError(""); }}
                    placeholder="e.g. WSH-2847"
                    className="w-full border border-[--color-wx-border] rounded-xl px-4 py-3.5 text-sm text-[--color-wx-ink] placeholder:text-[--color-wx-muted] focus:outline-none focus:ring-2 focus:ring-[--color-wx-blue]/25 focus:border-[--color-wx-blue] transition-all bg-[--color-wx-surface]"
                    style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <p className="mt-1.5 text-xs text-[--color-wx-muted] flex items-center gap-1">
                    <span>ℹ</span>
                    You can find your laundry number on your receipt or laundry slip.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-600">
                    <span>⚠</span> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[--color-wx-blue] hover:bg-[--color-wx-blue-dark] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        Track Laundry
                      </>}
                </button>
              </form>

              {/* Demo numbers */}
              <div className="mt-6 pt-5 border-t border-[--color-wx-border]">
                <p className="text-xs font-semibold text-[--color-wx-muted] uppercase tracking-widest mb-2.5">
                  Demo Laundry Numbers
                </p>
                <div className="flex flex-wrap gap-2">
                  {VALID_NUMBERS.map((n) => (
                    <button
                      key={n}
                      onClick={() => { setLaundryNum(n); setError(""); }}
                      className="px-3 py-1.5 rounded-lg border border-[--color-wx-border] text-xs text-[--color-wx-slate] hover:border-[--color-wx-blue] hover:text-[--color-wx-blue] transition-all"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="md:col-span-2 space-y-4">
            <InfoCard
              icon="🗓"
              title="Collection Schedule"
              lines={[
                "Mon – Fri: 7:00 AM – 9:00 AM",
                "Sat: 8:00 AM – 10:00 AM",
                "Sun: Closed",
              ]}
            />
            <InfoCard
              icon="📍"
              title="Laundry Centre"
              lines={[
                "Block D, Ground Floor",
                "Near Student Services",
                "Hostel Campus, Gate 3",
              ]}
            />
            <InfoCard
              icon="📞"
              title="Support"
              lines={[
                "Helpdesk: ext. 2200",
                "Email: laundry@college.edu",
                "Mon–Sat, 8 AM–6 PM",
              ]}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="bg-white border border-[--color-wx-border] rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold text-[--color-wx-ink]">{title}</h3>
      </div>
      <div className="space-y-1">
        {lines.map((l) => (
          <p key={l} className="text-sm text-[--color-wx-slate]">{l}</p>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[--color-wx-border] bg-white px-8 py-5 text-xs text-[--color-wx-muted] flex flex-wrap items-center justify-between gap-3 mt-10">
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
