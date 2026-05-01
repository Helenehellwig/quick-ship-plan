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
  Ship,
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
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#" className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-brand/10 ring-1 ring-brand/30">
              <span className="h-2 w-2 rounded-full bg-brand" />
            </div>
            <span className="text-[15px] font-medium tracking-tight">Movitus</span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#why" className="transition-colors hover:text-foreground">Why Movitus</a>
            <a href="#track" className="transition-colors hover:text-foreground">Track</a>
          </nav>
          <div className="flex items-center gap-5">
            <a href="#" className="hidden text-[13px] text-muted-foreground transition-colors hover:text-foreground md:block">
              Sign in
            </a>
            <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-4 text-[13px] font-medium">
              Get a quote
            </Button>
          </div>
        </div>
      </header>

      {/* HERO with form on top */}
      <section className="relative">
        {/* Backdrop layers */}
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-brand/10 blur-[160px]" />

        <div className="mx-auto max-w-6xl px-6 pb-28 pt-20 lg:pt-28">
          {/* Eyebrow */}
          <div className="mx-auto mb-7 flex w-fit items-center gap-2 text-[12px] font-medium tracking-wide text-brand">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            <span className="uppercase tracking-[0.18em]">Movitus Freight Platform</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-center text-balance text-5xl font-medium leading-[1.02] tracking-display md:text-7xl lg:text-[5.5rem]">
            We help you pick
            <br />
            the <span className="font-serif italic font-normal text-brand">best carrier</span>
            <span className="text-muted-foreground">.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-center text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            Tell us where it's going. Verified European carriers bid for your freight,
            and we recommend the best one — on price, service and timing.
            <br className="hidden md:block" />
            <span className="text-foreground/70">No account. No commitment. No hidden fees.</span>
          </p>

          {/* QUOTE FORM */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div
              className="relative rounded-[28px] border border-white/[0.06] bg-card/60 p-1.5 backdrop-blur-2xl"
              style={{ boxShadow: "0 1px 0 hsl(180 30% 100% / 0.04) inset, 0 50px 100px -30px hsl(200 60% 0% / 0.6)" }}
            >
              {/* Mode tabs: Form vs Email */}
              <div className="flex items-center gap-1 rounded-[22px] bg-muted/30 p-1">
                <ModeTab icon={FileText} label="Fill form" active={mode === "form"} onClick={() => setMode("form")} />
                <ModeTab icon={Mail} label="Send by email" active={mode === "email"} onClick={() => setMode("email")} />
                <div className="ml-auto hidden items-center gap-2 px-3 text-xs text-muted-foreground sm:flex">
                  <Zap className="h-3 w-3 text-brand" />
                  Bids in 24–48h · No commitment
                </div>
              </div>

              {mode === "email" ? (
                <EmailMode />
              ) : (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid grid-cols-1 gap-3 p-2 md:grid-cols-12 md:p-4"
                >
                  {/* Contact */}
                  <FormField className="md:col-span-4" icon={Mail} label="Your email" type="email" placeholder="you@company.com" required />
                  <FormField className="md:col-span-4" icon={User} label="Full name" placeholder="Anna Schmidt" required />
                  <FormField className="md:col-span-4" icon={FileText} label="Order name" placeholder="e.g. Berlin → Rotterdam #14" required />

                  {/* Route */}
                  <FormField className="md:col-span-5" icon={MapPin} label="From" placeholder="Pickup address, city, country" required />
                  <FormField className="md:col-span-5" icon={MapPin} label="To" placeholder="Delivery address, city, country" required />
                  <FormField className="md:col-span-2" icon={Calendar} label="Pickup date" type="date" required />

                  {/* Goods classification */}
                  <SelectField
                    className="md:col-span-6"
                    icon={AlertTriangle}
                    label="Dangerous goods"
                    placeholder="No dangerous goods"
                    options={[
                      "No dangerous goods",
                      "Class 1 — Explosives",
                      "Class 2 — Gases",
                      "Class 3 — Flammable liquids",
                      "Class 4 — Flammable solids",
                      "Class 5 — Oxidizing substances",
                      "Class 6 — Toxic & infectious substances",
                      "Class 7 — Radioactive materials",
                      "Class 8 — Corrosive substances",
                      "Class 9 — Miscellaneous dangerous goods",
                    ]}
                  />
                  <SelectField
                    className="md:col-span-6"
                    icon={Sparkles}
                    label="Special handling"
                    placeholder="Standard"
                    options={[
                      "Standard",
                      "Fragile",
                      "Temperature controlled",
                      "High value",
                      "Anonymous delivery",
                      "Urgent delivery",
                    ]}
                  />

                  {/* Packages */}
                  <div className="md:col-span-12 mt-2 space-y-3">
                    {packages.map((pkg, idx) => (
                      <PackageBlock
                        key={pkg.id}
                        index={idx}
                        pkg={pkg}
                        canRemove={packages.length > 1}
                        onChange={(patch) => updatePkg(pkg.id, patch)}
                        onRemove={() => removePkg(pkg.id)}
                      />
                    ))}

                    <button
                      type="button"
                      onClick={addPkg}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/20 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" /> Add another package
                    </button>
                  </div>

                  {/* Totals + submit */}
                  <div className="md:col-span-12 mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-[13px] text-muted-foreground">
                      Total weight{" "}
                      <span className="font-mono font-medium text-foreground">
                        {totalWeight.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg
                      </span>{" "}
                      · {packages.length} package{packages.length > 1 ? "s" : ""}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="group h-12 w-full rounded-full bg-brand text-primary-foreground hover:bg-brand/90 text-[14px] font-medium tracking-tight sm:w-auto sm:px-7"
                    >
                      Find my best carrier
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* trust row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[12.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Verified carriers only
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Bids in 24–48h
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> No account needed
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Headphones className="h-3.5 w-3.5" /> Zero commitment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="border-y border-border/40 py-10">
        <p className="mb-7 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by 40+ verified European carriers
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-20 px-8">
            {[...Array(2)].flatMap((_, i) =>
              ["DHL", "FedEx", "UPS", "Maersk", "DSV", "Kuehne+Nagel", "DB Schenker", "GLS", "TNT"].map((p) => (
                <span key={`${i}-${p}`} className="text-xl font-medium tracking-tight text-muted-foreground/40">
                  {p}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-brand">How it works</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-medium tracking-display md:text-6xl">
              Three steps. <span className="text-muted-foreground">From request to delivered.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us what & where",
                desc: "Fill out the form or send us an email with all your shipment details — whichever is easiest.",
                icon: Package,
              },
              {
                step: "02",
                title: "Carriers bid",
                desc: "Verified European carriers bid on your shipment, and we find the optimal match — fast.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Confirm & ship",
                desc: "Confirm your match and everything gets picked up and delivered exactly as you requested.",
                icon: Truck,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-brand/30"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground">{s.step}</span>
                  <s.icon className="h-4 w-4 text-brand/80" strokeWidth={1.5} />
                </div>
                <h3 className="text-[22px] font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] font-light leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES split */}
      <section id="services" className="relative py-32">
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-brand/[0.06] blur-[140px]" />
        <div className="mx-auto grid max-w-6xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-brand">What we move</span>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-display md:text-6xl">
              From a single pallet <br />
              to a <span className="font-serif italic font-normal text-brand">full container</span>.
            </h2>
            <p className="mt-6 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground">
              One flow for every shipment. Tell us what you have, and we'll match it
              to the right carrier — whether it's a single pallet across town, or twenty pallets across the continent.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm divide-y divide-border/60">
            {[
              {
                icon: Truck,
                title: "Road",
                desc: "Pallets and full truckloads across Europe and within India — domestic and cross-border.",
              },
              {
                icon: Plane,
                title: "Air",
                desc: "Time-critical freight between Europe and India, with customs handled end-to-end.",
              },
              {
                icon: Ship,
                title: "Sea",
                desc: "FCL and LCL container shipping on the Europe ↔ India trade lanes.",
              },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-5 p-7 transition-colors hover:bg-secondary/40">
                <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border/60 bg-background">
                  <s.icon className="h-4 w-4 text-brand" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-[18px] font-medium tracking-tight">{s.title}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">EU · India</span>
                  </div>
                  <p className="mt-1.5 text-[14px] font-light leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — big feature */}
      <section id="why" className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card/40 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14">
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-brand">Why Movitus</span>
                <h2 className="mt-4 text-balance text-4xl font-medium tracking-display md:text-5xl">
                  We pick the best carrier,<br />
                  <span className="text-muted-foreground">so you don't have to.</span>
                </h2>
                <ul className="mt-10 space-y-4">
                  {[
                    "Reliable, vetted carriers — every shipment handled with care.",
                    "GDPR compliant. Your data stays private and secure.",
                    "On-time delivery, every time — we make sure of it.",
                    "24/7 support. Real people, whenever you need us.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] font-light leading-relaxed text-foreground/90">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-brand" strokeWidth={2} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-10 h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[14px] font-medium px-6">
                  Start a shipment
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>

              {/* Decorative tracker mock */}
              <div className="relative min-h-[460px] border-t border-border/60 bg-secondary/30 p-10 md:p-14 lg:border-l lg:border-t-0">
                <div className="absolute inset-0 bg-grid" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-brand" />
                    Live · MV-48201
                  </div>
                  <div className="mt-3 font-serif text-3xl tracking-tight">Berlin → Mumbai</div>
                  <div className="mt-1 text-[13px] text-muted-foreground">Best match: <span className="text-foreground">EuroFreight GmbH · €842</span></div>

                  <div className="mt-10 space-y-6">
                    {[
                      { label: "Picked up", time: "08:14", done: true },
                      { label: "In transit · Frankfurt hub", time: "13:02", done: true },
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
      <section id="track" className="relative py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Globe className="mx-auto h-8 w-8 text-brand/80 animate-float" strokeWidth={1.25} />
          <h2 className="mt-8 text-balance text-4xl font-medium tracking-display md:text-6xl">
            Already shipping with us?
          </h2>
          <p className="mt-4 text-[17px] font-light text-muted-foreground">Drop your tracking number. We'll show you exactly where it is.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-md gap-2 rounded-full border border-border/60 bg-card/40 p-1.5 backdrop-blur"
          >
            <Input
              placeholder="MV-XXXXX"
              className="border-0 bg-transparent font-mono text-[15px] placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-full bg-brand text-primary-foreground hover:bg-brand/90 text-[13px] font-medium px-5">
              Track
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-[12.5px] text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 ring-1 ring-brand/30">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            </div>
            <span className="font-medium tracking-tight text-foreground">Movitus</span>
            <span>· © {new Date().getFullYear()}</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
    className={`flex flex-1 items-center justify-center gap-2 rounded-[18px] px-4 py-2 text-[13px] font-medium transition-all sm:flex-none sm:px-5 ${
      active
        ? "bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <Icon className={`h-3.5 w-3.5 ${active ? "text-brand" : ""}`} strokeWidth={1.75} />
    {label}
  </button>
);

const FormField = ({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  className = "",
  required = false,
}: {
  icon: typeof MapPin;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
}) => (
  <div
    className={`group relative rounded-xl border border-transparent bg-secondary/40 px-4 py-3 transition-colors focus-within:border-brand/40 focus-within:bg-secondary/60 ${className}`}
  >
    <Label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3 w-3" />
      {label}
      {required && <span className="text-brand">*</span>}
    </Label>
    <Input
      type={type}
      placeholder={placeholder}
      required={required}
      className="mt-1 h-7 border-0 bg-transparent p-0 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>
);

const SelectField = ({
  icon: Icon,
  label,
  placeholder,
  options,
  className = "",
}: {
  icon: typeof MapPin;
  label: string;
  placeholder?: string;
  options: string[];
  className?: string;
}) => (
  <div
    className={`group relative rounded-xl border border-transparent bg-secondary/40 px-4 py-3 transition-colors focus-within:border-brand/40 focus-within:bg-secondary/60 ${className}`}
  >
    <Label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3 w-3" />
      {label}
    </Label>
    <Select>
      <SelectTrigger className="mt-1 h-7 border-0 bg-transparent p-0 text-base font-medium text-foreground focus:ring-0 focus:ring-offset-0 [&>span]:text-foreground data-[placeholder]:[&>span]:text-muted-foreground/50">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const PackageBlock = ({
  index,
  pkg,
  canRemove,
  onChange,
  onRemove,
}: {
  index: number;
  pkg: Pkg;
  canRemove: boolean;
  onChange: (patch: Partial<Pkg>) => void;
  onRemove: () => void;
}) => {
  const lineWeight =
    (parseFloat(pkg.quantity) || 0) * (parseFloat(pkg.weight) || 0);

  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-brand">
            Package {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">
            Line weight:{" "}
            <span className="font-mono text-foreground">{lineWeight} kg</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <Checkbox
              checked={pkg.unstackable}
              onCheckedChange={(v) => onChange({ unstackable: v === true })}
              className="h-4 w-4 border-border data-[state=checked]:bg-brand data-[state=checked]:text-primary-foreground data-[state=checked]:border-brand"
            />
            unstackable
          </label>
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove package"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-12 md:gap-3">
        {/* Quantity */}
        <PkgInput
          className="md:col-span-2"
          label="Qty *"
          suffix="pcs"
          type="number"
          value={pkg.quantity}
          onChange={(v) => onChange({ quantity: v })}
          placeholder="1"
        />

        {/* Dimensions */}
        <div className="col-span-2 rounded-lg bg-card/60 px-3 py-2 md:col-span-4">
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Dimensions L×W×H *
          </div>
          <div className="mt-1 flex items-center gap-1 text-base font-medium">
            <input
              type="number"
              value={pkg.length}
              onChange={(e) => onChange({ length: e.target.value })}
              placeholder="L"
              className="w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground/50"
            />
            <span className="text-muted-foreground">×</span>
            <input
              type="number"
              value={pkg.width}
              onChange={(e) => onChange({ width: e.target.value })}
              placeholder="W"
              className="w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground/50"
            />
            <span className="text-muted-foreground">×</span>
            <input
              type="number"
              value={pkg.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="H"
              className="w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground/50"
            />
            <span className="text-xs text-muted-foreground">cm</span>
          </div>
        </div>

        {/* Weight */}
        <PkgInput
          className="md:col-span-2"
          label="Unit weight *"
          suffix="kg"
          type="number"
          value={pkg.weight}
          onChange={(v) => onChange({ weight: v })}
          placeholder="0"
        />

        {/* Type */}
        <div className="col-span-2 rounded-lg bg-card/60 px-3 py-2 md:col-span-4">
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Package type *
          </div>
          <Select value={pkg.packageType} onValueChange={(v) => onChange({ packageType: v })}>
            <SelectTrigger className="mt-0.5 h-7 border-0 bg-transparent p-0 text-base font-medium focus:ring-0 focus:ring-offset-0 data-[placeholder]:[&>span]:text-muted-foreground/50">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pallet">Pallet — Standard 120×80cm with exchange</SelectItem>
              <SelectItem value="carton">Carton — Standard shipping box</SelectItem>
              <SelectItem value="case">Case — Protective container</SelectItem>
              <SelectItem value="bundle">Bundle — Multiple items together</SelectItem>
              <SelectItem value="custom">Custom — Special requirements</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="col-span-2 md:col-span-12">
          <Textarea
            value={pkg.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Description (optional) — what's inside?"
            rows={2}
            className="resize-none border-border bg-card/60 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-brand/40"
          />
        </div>
      </div>
    </div>
  );
};

const PkgInput = ({
  label,
  suffix,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  suffix?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) => (
  <div className={`rounded-lg bg-card/60 px-3 py-2 ${className}`}>
    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
    <div className="mt-1 flex items-baseline gap-1">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground/50"
      />
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  </div>
);

const EmailMode = () => {
  const email = "platform@carrier.movitus.com";
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 md:p-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-brand">/ send by email</span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          Email us your shipment.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll parse, format and send it out for bidding. No account, no fuss.
        </p>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="mt-5 flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-left transition-colors hover:border-brand/40"
        >
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Send to
            </div>
            <div className="truncate font-mono text-base font-medium text-foreground">
              {email}
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-brand">
            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </span>
        </button>

        <a
          href={`mailto:${email}?subject=New%20shipment%20request`}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand/90"
        >
          <Mail className="h-4 w-4" />
          Open in mail app
        </a>
      </div>

      <div className="rounded-xl border border-border bg-secondary/30 p-5">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Make sure your email includes
        </div>
        <ul className="mt-3 space-y-2.5 text-sm">
          {[
            "Full pickup address (street, city, country)",
            "Full delivery address (street, city, country)",
            "Desired pickup date",
            "Cargo type and description",
            "Weight and dimensions (if known)",
            "Special handling or dangerous goods",
            "Your contact name and phone number",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand" />
              <span className="text-muted-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-3xl border border-border/60 bg-card/40 p-10 backdrop-blur-sm">
    <div className="font-serif text-6xl tracking-tight text-foreground md:text-7xl">{value}</div>
    <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
  </div>
);

export default Index;
