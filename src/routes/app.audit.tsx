import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { auditTrail, bidders, evaluation } from "@/data/mock";
import { Download, FileCheck2, ShieldCheck, Hash, Printer } from "lucide-react";

export const Route = createFileRoute("/app/audit")({
  component: Audit,
});

function Audit() {
  const summary = bidders.map((b) => {
    const evals = Object.values(evaluation[b.id]);
    const pass = evals.filter((e) => e.status === "PASS").length;
    const score = Math.round((pass / evals.length) * 100);
    const decision = score >= 90 ? "Recommended for Award" : score >= 70 ? "Conditional · Needs Clarification" : "Not Eligible";
    return { ...b, score, decision };
  });

  return (
    <>
      <Topbar title="Audit Report" subtitle="Tamper-proof evaluation record · TND-2026-0481" />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in-up">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Final Compliance Report</div>
                <h2 className="mt-1 text-2xl font-display font-semibold">Metro Rail Phase IV — Civil Works</h2>
                <div className="text-xs text-muted-foreground mt-1">Tender ID TND-2026-0481 · Ministry of Urban Development · Generated 2026-05-06 11:18 IST</div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-cyan text-primary-foreground inline-flex items-center gap-1"><Download className="h-3.5 w-3.5" /> PDF</button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-border inline-flex items-center gap-1"><Printer className="h-3.5 w-3.5" /> Print</button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {summary.map((b) => (
                <div key={b.id} className="rounded-xl border border-border bg-card/40 p-4">
                  <div className="text-xs text-muted-foreground">{b.name}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-3xl font-display font-semibold text-gradient tabular-nums">{b.score}</div>
                    <div className="text-xs text-muted-foreground">/100</div>
                  </div>
                  <div className={`mt-2 text-[11px] px-2 py-1 rounded-md inline-block border ${b.score >= 90 ? "bg-success/15 text-success border-success/30" : b.score >= 70 ? "bg-warning/15 text-warning border-warning/30" : "bg-destructive/15 text-destructive border-destructive/30"}`}>{b.decision}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-success/30 bg-success/5 p-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <div>
                <div className="font-medium">AI Recommendation</div>
                <p className="text-xs text-muted-foreground mt-1">Apex Infrastructure Ltd. is the most compliant bidder with a 100% pass rate on mandatory criteria and the lowest aggregate risk (12/100). Recommended for award subject to final committee review.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-cyan" /> Compliance Summary</h3>
              <span className="text-[11px] text-muted-foreground">7 criteria · 3 bidders</span>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { l: "Total criteria", v: 7 },
                { l: "Mandatory", v: 6 },
                { l: "Risks detected", v: 6 },
                { l: "Reviewer actions", v: 4 },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-card/40 p-3">
                  <div className="text-2xl font-display font-semibold tabular-nums">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold flex items-center gap-2"><Hash className="h-4 w-4 text-primary" /> Audit Trail</h3>
            <span className="text-[11px] text-success px-2 py-1 rounded-full bg-success/15 border border-success/30">Tamper-proof</span>
          </div>
          <ol className="mt-4 space-y-4 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
            {auditTrail.map((a, i) => (
              <li key={i} className="relative pl-6">
                <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
                <div className="text-sm font-medium">{a.event}</div>
                <div className="text-[11px] text-muted-foreground">{a.actor} · {a.ts}</div>
                <div className="text-[10px] font-mono text-cyan/80 mt-0.5">sha256 {a.hash}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
