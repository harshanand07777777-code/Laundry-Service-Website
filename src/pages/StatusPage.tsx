import { useParams, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

type OrderStatus = "received" | "washing" | "drying" | "ironing" | "ready" | "delivered";

interface Order {
  id: string;
  student: string;
  hostel: string;
  room: string;
  status: OrderStatus;
  orderDate: string;
  expectedDate: string;
  expectedTime: string;
  items: { name: string; qty: number }[];
  serviceType: string;
  weight: string;
}

const ORDERS: Record<string, Order> = {
  "WSH-2847": {
    id: "WSH-2847",
    student: "Arjun Sharma",
    hostel: "Hostel B",
    room: "Room 214",
    status: "ready",
    orderDate: "Sep 6, 2026",
    expectedDate: "Sep 8, 2026",
    expectedTime: "Before 5:00 PM",
    items: [
      { name: "Shirts", qty: 3 },
      { name: "Trousers", qty: 2 },
      { name: "T-Shirts", qty: 4 },
      { name: "Socks (pairs)", qty: 3 },
    ],
    serviceType: "Wash & Fold",
    weight: "4.2 kg",
  },
  "WSH-1903": {
    id: "WSH-1903",
    student: "Priya Nair",
    hostel: "Hostel A",
    room: "Room 108",
    status: "ironing",
    orderDate: "Sep 7, 2026",
    expectedDate: "Sep 9, 2026",
    expectedTime: "Before 3:00 PM",
    items: [
      { name: "Kurti", qty: 2 },
      { name: "Salwar", qty: 2 },
      { name: "Dupatta", qty: 1 },
      { name: "Jeans", qty: 1 },
    ],
    serviceType: "Wash, Dry & Iron",
    weight: "3.8 kg",
  },
  "WSH-3341": {
    id: "WSH-3341",
    student: "Rohan Mehta",
    hostel: "Hostel C",
    room: "Room 305",
    status: "washing",
    orderDate: "Sep 8, 2026",
    expectedDate: "Sep 10, 2026",
    expectedTime: "Before 6:00 PM",
    items: [
      { name: "Bed sheets", qty: 2 },
      { name: "Pillow covers", qty: 3 },
      { name: "Towels", qty: 2 },
    ],
    serviceType: "Bedding & Linen",
    weight: "6.1 kg",
  },
  "WSH-0519": {
    id: "WSH-0519",
    student: "Sneha Patel",
    hostel: "Hostel D",
    room: "Room 412",
    status: "delivered",
    orderDate: "Sep 4, 2026",
    expectedDate: "Sep 6, 2026",
    expectedTime: "Completed",
    items: [
      { name: "Shirts", qty: 2 },
      { name: "Trousers", qty: 1 },
      { name: "Dresses", qty: 2 },
    ],
    serviceType: "Wash & Fold",
    weight: "3.0 kg",
  },
};

const STEPS: { key: OrderStatus; label: string; icon: string; short: string }[] = [
  { key: "received", label: "Order Received", icon: "📋", short: "Received" },
  { key: "washing", label: "Washing", icon: "🫧", short: "Washing" },
  { key: "drying", label: "Drying", icon: "💨", short: "Drying" },
  { key: "ironing", label: "Ironing & Folding", icon: "👔", short: "Ironing" },
  { key: "ready", label: "Ready for Collection", icon: "✅", short: "Ready" },
  { key: "delivered", label: "Delivered", icon: "📦", short: "Delivered" },
];

const STATUS_MSG: Record<OrderStatus, { color: string; bg: string; text: string }> = {
  received: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200", text: "Your order has been received and is queued for processing." },
  washing: { color: "text-cyan-700", bg: "bg-cyan-50 border-cyan-200", text: "Your clothes are currently being washed with care." },
  drying: { color: "text-sky-700", bg: "bg-sky-50 border-sky-200", text: "Your clothes are in the dryer. Almost there!" },
  ironing: { color: "text-violet-700", bg: "bg-violet-50 border-violet-200", text: "Your clothes are being ironed and neatly folded." },
  ready: { color: "text-green-700", bg: "bg-green-50 border-green-200", text: "Your laundry is ready! Come collect it from the laundry centre." },
  delivered: { color: "text-slate-700", bg: "bg-slate-50 border-slate-200", text: "Delivered! Your clothes have been returned to your room." },
};

interface StatusPageProps {
  onLogout: () => void;
}

export default function StatusPage({ onLogout }: StatusPageProps) {
  const { laundryNum } = useParams<{ laundryNum: string }>();
  const navigate = useNavigate();
  const order = laundryNum ? ORDERS[laundryNum] : undefined;

  if (!order) {
    return (
      <div className="min-h-full flex flex-col bg-[--color-wx-surface]">
        <Navbar isLoggedIn onLogout={onLogout} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-[--color-wx-ink] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Order not found
            </h2>
            <p className="text-[--color-wx-slate] text-sm mb-6">
              The laundry number{" "}
              <span className="font-mono font-medium">{laundryNum}</span> does not exist.
            </p>
            <button
              onClick={() => navigate("/track")}
              className="px-6 py-2.5 bg-[--color-wx-blue] text-white text-sm font-semibold rounded-xl hover:bg-[--color-wx-blue-dark] transition-colors"
            >
              ← Back to Track Laundry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.key === order.status);
  const msg = STATUS_MSG[order.status];

  return (
    <div className="min-h-full flex flex-col bg-[--color-wx-surface]">
      <Navbar isLoggedIn onLogout={onLogout} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 md:px-10 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/track")}
          className="flex items-center gap-1.5 text-sm text-[--color-wx-slate] hover:text-[--color-wx-blue] mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Track Laundry
        </button>

        {/* Header card */}
        <div className="bg-white border border-[--color-wx-border] rounded-2xl shadow-sm overflow-hidden mb-5 animate-fade-in-up">
          <div className="bg-gradient-to-r from-[--color-wx-blue] to-[#2563eb] px-7 py-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Laundry Order</p>
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
              >
                {order.id}
              </p>
              <p className="text-white/80 text-sm mt-0.5">{order.student} · {order.hostel}, {order.room}</p>
            </div>
            <div className={`px-4 py-2 rounded-xl border text-sm font-semibold ${msg.bg} ${msg.color}`}>
              {STEPS.find((s) => s.key === order.status)?.icon}{" "}
              {STEPS.find((s) => s.key === order.status)?.label}
            </div>
          </div>

          {/* Meta row */}
          <div className="px-7 py-5 border-t border-[--color-wx-border] grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: "Order Date", value: order.orderDate },
              { label: "Expected Completion", value: order.expectedDate },
              { label: "Collection Time", value: order.expectedTime },
              { label: "Service Type", value: order.serviceType },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-[--color-wx-muted] uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-[--color-wx-ink]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status message */}
        <div className={`flex items-start gap-3 rounded-2xl border px-5 py-4 mb-5 text-sm ${msg.bg} ${msg.color}`}>
          <span className="text-lg flex-shrink-0">{STEPS[stepIndex]?.icon}</span>
          <div>
            <p className="font-semibold mb-0.5">{STEPS[stepIndex]?.label}</p>
            <p className="opacity-80">{msg.text}</p>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="bg-white border border-[--color-wx-border] rounded-2xl shadow-sm p-7 mb-5">
          <h2 className="text-sm font-semibold text-[--color-wx-ink] uppercase tracking-widest mb-7">
            Progress Tracker
          </h2>

          {/* Desktop */}
          <div className="hidden sm:block">
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-[--color-wx-border]" />
              <div
                className="absolute top-5 left-5 h-0.5 bg-[--color-wx-blue] transition-all duration-700"
                style={{ width: `calc(${(stepIndex / (STEPS.length - 1)) * 100}% - 4px)`, maxWidth: "calc(100% - 44px)" }}
              />
              <div className="relative grid grid-cols-6 gap-2">
                {STEPS.map((step, i) => {
                  const done = i < stepIndex;
                  const active = i === stepIndex;
                  const pending = i > stepIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-base z-10 transition-all duration-300 ${
                          active
                            ? "bg-[--color-wx-blue] ring-4 ring-[--color-wx-blue]/20 scale-110 shadow-lg"
                            : done
                            ? "bg-[--color-wx-blue]/15 text-[--color-wx-blue]"
                            : "bg-[--color-wx-border]/50 text-[--color-wx-muted]/50"
                        }`}
                      >
                        {done ? (
                          <svg className="w-4 h-4 text-[--color-wx-blue]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          step.icon
                        )}
                      </div>
                      <div className="text-center">
                        <p className={`text-[10px] font-semibold leading-snug ${
                          active ? "text-[--color-wx-blue]" : done ? "text-[--color-wx-ink]" : "text-[--color-wx-muted]/50"
                        }`}>
                          {step.short}
                        </p>
                        {active && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[--color-wx-blue] animate-pulse mt-0.5" />
                        )}
                        {done && (
                          <p className="text-[9px] text-[--color-wx-success] font-semibold">✓ Done</p>
                        )}
                        {pending && (
                          <p className="text-[9px] text-[--color-wx-muted]/50">Pending</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile — vertical */}
          <div className="sm:hidden space-y-0">
            {STEPS.map((step, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              const pending = i > stepIndex;
              return (
                <div key={step.key} className="flex items-start gap-3 relative">
                  {i < STEPS.length - 1 && (
                    <div className={`absolute left-4 top-10 w-0.5 h-8 ${done ? "bg-[--color-wx-blue]" : "bg-[--color-wx-border]"}`} />
                  )}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm z-10 ${
                    active ? "bg-[--color-wx-blue] ring-4 ring-[--color-wx-blue]/20 shadow-lg" : done ? "bg-[--color-wx-blue]/15" : "bg-[--color-wx-border]/50"
                  }`}>
                    {done ? (
                      <svg className="w-3.5 h-3.5 text-[--color-wx-blue]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : step.icon}
                  </div>
                  <div className="pb-8 pt-1">
                    <p className={`text-sm font-semibold ${active ? "text-[--color-wx-blue]" : done ? "text-[--color-wx-ink]" : "text-[--color-wx-muted]/50"}`}>
                      {step.label}
                      {active && <span className="ml-2 text-xs font-normal">← Current</span>}
                      {done && <span className="ml-2 text-xs text-[--color-wx-success]">✓ Done</span>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Items & details */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-[--color-wx-border] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[--color-wx-ink] uppercase tracking-widest mb-4">
              Items in this Order
            </h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-[--color-wx-border] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[--color-wx-blue]/50" />
                    <span className="text-sm text-[--color-wx-ink]">{item.name}</span>
                  </div>
                  <span
                    className="text-sm font-semibold text-[--color-wx-slate]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    × {item.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[--color-wx-border] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[--color-wx-ink] uppercase tracking-widest mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              {[
                { label: "Total Items", value: `${order.items.reduce((a, b) => a + b.qty, 0)} pcs` },
                { label: "Total Weight", value: order.weight },
                { label: "Service Type", value: order.serviceType },
                { label: "Hostel", value: `${order.hostel}, ${order.room}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-[--color-wx-muted]">{label}</span>
                  <span className="text-sm font-semibold text-[--color-wx-ink]">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[--color-wx-border]">
              <div className="flex items-center gap-2 text-xs text-[--color-wx-muted]">
                <span>📍</span>
                Collect from: Block D, Ground Floor, Student Laundry Centre
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate("/track")}
            className="flex items-center gap-2 px-6 py-3 bg-[--color-wx-sky] text-[--color-wx-blue] font-semibold text-sm rounded-xl hover:bg-[--color-wx-sky-mid] transition-colors border border-[--color-wx-sky-mid]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Track Laundry
          </button>
        </div>
      </main>

      <Footer />
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
