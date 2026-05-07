import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Lock, ArrowRight, Fingerprint } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Criterion AI — Explainable Tender Intelligence" },
      { name: "description", content: "Secure AI-assisted tender evaluation platform for government procurement officers." },
    ],
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("r.mehta@procurement.gov.in");
  const [pw, setPw] = useState("••••••••••");
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left brand */}
        <div className="hidden md:block fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success ring-pulse" /> Government-grade · ISO 27001
          </div>
          <h1 className="mt-6 text-5xl font-display font-semibold leading-[1.05]">
            AI-Assisted <br /> <span className="text-gradient">Tender Evaluation</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            Criterion AI brings explainable intelligence to government procurement —
            transparent eligibility checks, source-traceable evidence, and tamper-proof audit trails.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: "1.2K+", v: "Tenders Processed" },
              { k: "92%", v: "Avg Confidence" },
              { k: "100%", v: "Audit Coverage" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-lg p-3">
                <div className="text-xl font-display font-semibold text-gradient">{s.k}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Login card */}
        <div className="glass rounded-2xl p-8 fade-in-up relative">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-cyan glow-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-semibold">Criterion AI</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Secure Access Portal</div>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-display font-semibold">Sign in to your workspace</h2>
          <p className="text-xs text-muted-foreground mt-1">Use your government SSO or department credentials.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="text-xs text-muted-foreground">Official Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-input border border-border text-sm outline-none focus:border-primary transition" />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground flex items-center gap-2"><Lock className="h-3 w-3" /> Password</span>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-input border border-border text-sm outline-none focus:border-primary transition" />
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" defaultChecked className="accent-primary" /> Remember device</label>
              <a href="#" className="text-primary hover:underline">Forgot?</a>
            </div>
            <Link to="/app" className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-cyan text-primary-foreground font-medium text-sm glow-primary hover:opacity-95 transition">
              Continue securely <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <button type="button" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm hover:bg-accent/50 transition">
              <Fingerprint className="h-4 w-4" /> Sign in with NIC SSO
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            All sessions are end-to-end encrypted & audit logged.
          </div>
        </div>
      </div>
    </div>
  );
}
