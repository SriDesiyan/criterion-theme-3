import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FileUp, FolderInput, BrainCircuit, ScanSearch, ShieldAlert, FileCheck2, Settings, Sparkles } from "lucide-react";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/tender-upload", label: "Tender Upload", icon: FileUp },
  { to: "/app/bidder-upload", label: "Bidder Documents", icon: FolderInput },
  { to: "/app/evaluation", label: "AI Evaluation", icon: BrainCircuit },
  { to: "/app/explainability", label: "Explainability", icon: ScanSearch },
  { to: "/app/risk", label: "Risk & Review", icon: ShieldAlert },
  { to: "/app/audit", label: "Audit Report", icon: FileCheck2 },
];

export function Sidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
        <div className="relative h-9 w-9 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-cyan glow-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <div className="font-display font-semibold text-sm">Criterion AI</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tender Intelligence</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to} className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? "bg-sidebar-accent text-foreground border border-border shadow-[inset_0_1px_0_oklch(1_0_0_/_0.06)]" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"}`}>
              <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
              <span>{it.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary ring-pulse" />}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 p-3 rounded-lg glass">
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Settings className="h-3.5 w-3.5" /> AI Engine v3.2</div>
        <div className="mt-2 text-[11px] text-muted-foreground">Models: Eligibility, OCR, Risk</div>
        <div className="mt-2 flex items-center gap-2 text-[11px]"><span className="h-2 w-2 rounded-full bg-success ring-pulse" /> Operational</div>
      </div>
    </aside>
  );
}
