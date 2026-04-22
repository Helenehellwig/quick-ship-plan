import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Box,
  Truck,
  Plane,
  MapPin,
  Calendar,
  Package,
  Shield,
  Clock,
  Headphones,
  CheckCircle2,
  Zap,
  Globe,
  Mail,
  User,
  FileText,
  AlertTriangle,
  Sparkles,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";

type FormMode = "form" | "email";

type Pkg = {
  id: string;
  quantity: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  packageType: string;
  description: string;
  unstackable: boolean;
};

const newPkg = (): Pkg => ({
  id: crypto.randomUUID(),
  quantity: "",
  length: "",
  width: "",
  height: "",
  weight: "",
  packageType: "",
  description: "",
  unstackable: false,
});

const Index = () => {
  const [mode, setMode] = useState<FormMode>("form");
  const [packages, setPackages] = useState<Pkg[]>([newPkg()]);

  const updatePkg = (id: string, patch: Partial<Pkg>) =>
    setPackages((p) => p.map((pk) => (pk.id === id ? { ...pk, ...patch } : pk)));
  const removePkg = (id: string) =>
    setPackages((p) => (p.length === 1 ? p : p.filter((pk) => pk.id !== id)));
  const addPkg = () => setPackages((p) => [...p, newPkg()]);

  const totalWeight = packages.reduce((sum, p) => {
    const q = parseFloat(p.quantity) || 0;
    const w = parseFloat(p.weight) || 0;
    return sum + q * w;
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="relative z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-brand text-primary-foreground">
              <Box className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight">movitus</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#why" className="transition-colors hover:text-foreground">Why Movitus</a>
            <a href="#track" className="transition-colors hover:text-foreground">Track</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block">
              Sign in
            </a>
            <Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand/90">
              Get a quote
            </Button>
          </div>
        </div>
      </header>

      {/* HERO with form on top */}
      <section className="relative">
        {/* Backdrop layers */}
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:pt-20">
          {/* Eyebrow */}
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Live network · 12,400 shipments moving right now
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-center text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Ship anything,{" "}
            <span className="font-serif italic text-brand">anywhere</span>
            <br />
            in a few clicks.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg text-muted-foreground md:text-xl">
            Instant quotes. Door-to-door pickup. Live tracking. From a single
            envelope to full freight — we move it.
          </p>

          {/* QUOTE FORM */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div
              className="relative rounded-2xl border border-border bg-card/80 p-2 backdrop-blur-xl"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Mode tabs */}
              <div className="flex items-center gap-1 rounded-xl bg-muted/40 p-1">
                <ModeTab icon={Package} label="Parcel" active={mode === "parcel"} onClick={() => setMode("parcel")} />
                <ModeTab icon={Box} label="Pallet" active={mode === "pallet"} onClick={() => setMode("pallet")} />
                <ModeTab icon={Truck} label="Freight" active={mode === "freight"} onClick={() => setMode("freight")} />
                <div className="ml-auto hidden items-center gap-2 px-3 text-xs text-muted-foreground sm:flex">
                  <Zap className="h-3.5 w-3.5 text-brand" />
                  Quote in ~8 seconds
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="grid grid-cols-1 gap-2 p-2 md:grid-cols-12 md:gap-3 md:p-4"
              >
                <FormField className="md:col-span-4" icon={MapPin} label="From" placeholder="ZIP or city" />
                <FormField className="md:col-span-4" icon={MapPin} label="To" placeholder="ZIP or city" />
                <FormField className="md:col-span-2" icon={Box} label="Weight" placeholder="kg" type="number" />
                <FormField className="md:col-span-2" icon={Calendar} label="Pickup" placeholder="" type="date" />

                <div className="md:col-span-12 mt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="group h-14 w-full bg-brand text-primary-foreground hover:bg-brand/90 glow-brand text-base font-semibold"
                  >
                    Get my instant quote
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </div>

            {/* trust row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand" /> Insured up to $25k
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" /> Same-day pickup
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" /> No account needed
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-brand" /> Real humans 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="border-y border-border/50 bg-card/30 py-8">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Carrier network
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 px-8">
            {[...Array(2)].flatMap((_, i) =>
              ["DHL", "FedEx", "UPS", "Maersk", "DSV", "Kuehne+Nagel", "DB Schenker", "GLS", "TNT"].map((p) => (
                <span key={`${i}-${p}`} className="text-2xl font-semibold tracking-tight text-muted-foreground/60">
                  {p}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand">/ how it works</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Three steps from <span className="font-serif italic">click</span> to delivered.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us what & where",
                desc: "Drop in pickup, drop-off, weight and date. We compare 40+ carriers in real time.",
                icon: Package,
              },
              {
                step: "02",
                title: "Pick your price",
                desc: "Cheapest, fastest, greenest — your choice. Pay by card, Apple Pay or invoice.",
                icon: Zap,
              },
              {
                step: "03",
                title: "We pick it up",
                desc: "A driver shows up at your door. Track every step until it lands.",
                icon: Truck,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand/40"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-sm text-muted-foreground">{s.step}</span>
                  <s.icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <div className="absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-brand to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES split */}
      <section id="services" className="relative py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand">/ what we move</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              From a sneaker box <br />
              to a <span className="font-serif italic text-brand">shipping container</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Whether you're sending a birthday gift across town or moving 20 pallets across the continent, you get the same simple flow and one transparent price.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Package, title: "Parcels", note: "0–30 kg", desc: "Next-day or economy. Drop-off or door pickup." },
              { icon: Box, title: "Pallets", note: "EU + half pallets", desc: "Liftgate, indoor delivery, white glove options." },
              { icon: Truck, title: "Road freight", note: "LTL & FTL", desc: "Domestic and cross-border, fully tracked." },
              { icon: Plane, title: "Air & sea", note: "Worldwide", desc: "Customs handled. ETD/ETA in your inbox." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40">
                <s.icon className="h-6 w-6 text-brand" />
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{s.note}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — big feature */}
      <section id="why" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Stat value="8s" label="Avg. time to quote" />
            <Stat value="180+" label="Countries served" />
            <Stat value="4.9★" label="From 31,000 reviews" />
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14">
                <span className="font-mono text-xs uppercase tracking-widest text-brand">/ why movitus</span>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                  Built for humans, <br />
                  not <span className="font-serif italic">logistics nerds</span>.
                </h2>
                <ul className="mt-8 space-y-5">
                  {[
                    "No jargon. No login walls. Just a price.",
                    "One contract for every carrier you use.",
                    "Live chat with a real person in under 30 seconds.",
                    "Pay later, by invoice, if your business needs it.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-10 bg-brand text-primary-foreground hover:bg-brand/90">
                  Start a shipment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Decorative tracker mock */}
              <div className="relative min-h-[420px] border-t border-border bg-secondary/40 p-10 lg:border-l lg:border-t-0">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-2 w-2 animate-pulse-glow rounded-full bg-brand" />
                    LIVE · MV-48201
                  </div>
                  <div className="mt-4 font-serif text-3xl">Berlin → Amsterdam</div>

                  <div className="mt-10 space-y-6">
                    {[
                      { label: "Picked up", time: "08:14", done: true },
                      { label: "In transit · Hannover hub", time: "13:02", done: true },
                      { label: "Out for delivery", time: "—", done: false, active: true },
                      { label: "Delivered", time: "—", done: false },
                    ].map((s, i, arr) => (
                      <div key={s.label} className="relative flex items-start gap-4">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`grid h-7 w-7 place-items-center rounded-full border-2 ${
                              s.done
                                ? "border-brand bg-brand text-primary-foreground"
                                : s.active
                                ? "border-brand bg-card text-brand animate-pulse-glow"
                                : "border-border bg-card text-muted-foreground"
                            }`}
                          >
                            {s.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-mono">{i + 1}</span>}
                          </div>
                          {i < arr.length - 1 && (
                            <div className={`mt-1 h-12 w-px ${s.done ? "bg-brand/60" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pt-1">
                          <div className={`font-medium ${s.done || s.active ? "text-foreground" : "text-muted-foreground"}`}>
                            {s.label}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">{s.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK CTA */}
      <section id="track" className="relative py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Globe className="mx-auto h-10 w-10 text-brand animate-float" />
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Already shipping with us?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Drop your tracking number — we'll show you exactly where it is.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-2 rounded-full border border-border bg-card p-2"
          >
            <Input
              placeholder="MV-XXXXX"
              className="border-0 bg-transparent font-mono text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-full bg-brand text-primary-foreground hover:bg-brand/90">
              Track
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-brand text-primary-foreground">
              <Box className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
            <span className="font-semibold tracking-tight">movitus</span>
            <span className="ml-3 text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Pricing</a>
            <a href="#" className="hover:text-foreground">For business</a>
            <a href="#" className="hover:text-foreground">Help</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

/* ---------- subcomponents ---------- */

const ModeTab = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Package;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:flex-none sm:px-5 ${
      active
        ? "bg-card text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <Icon className={`h-4 w-4 ${active ? "text-brand" : ""}`} />
    {label}
  </button>
);

const FormField = ({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  className = "",
}: {
  icon: typeof MapPin;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) => (
  <div
    className={`group relative rounded-xl border border-transparent bg-secondary/40 px-4 py-3 transition-colors focus-within:border-brand/40 focus-within:bg-secondary/60 ${className}`}
  >
    <Label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3 w-3" />
      {label}
    </Label>
    <Input
      type={type}
      placeholder={placeholder}
      className="mt-1 h-7 border-0 bg-transparent p-0 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-2xl border border-border bg-card p-8">
    <div className="font-serif text-6xl text-brand md:text-7xl">{value}</div>
    <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
  </div>
);

export default Index;
