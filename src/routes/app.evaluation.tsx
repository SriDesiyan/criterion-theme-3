import { createFileRoute, Link } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { criteria, bidders, evaluation } from "@/data/mock";
import { StatusBadge, ConfidenceBar } from "@/components/app/StatusBadge";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Sparkles, ShieldAlert, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/evaluation")({
  component: Evaluation,
});

function Evaluation() {
  const [open, setOpen] = useState<string | null>("turnover");

  // bidder summary scores
  const summary = bidders.map((b) => {
    const evals = Object.values(evaluation[b.id]);
    const pass = evals.filter((e) => e.status === "PASS").length;
    const fail = evals.filter((e) => e.status === "FAIL").length;
    const review = evals.filter((e) => e.status === "REVIEW").length;
    const score = Math.round((pass / evals.length) * 100);
    return { ...b, pass, fail, review, score };
  });

  return (
    <>
      <Topbar title="AI Eligibility Evaluation" subtitle="Tender TND-2026-0481 · Metro Rail Phase IV — Civil Works" />
      <div className="p-6 space-y-6 fade-in-up">
        {/* Bidder summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.map((b) => (
            <div key={b.id} className="glass rounded-xl p-5 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Bidder</div>
                  <div className="font-display font-semibold mt-0.5">{b.name}</div>
                </div>
                <div className={`text-[11px] px-2 py-1 rounded-md border ${b.score >= 90 ? "bg-success/15 text-success border-success/30" : b.score >= 70 ? "bg-warning/15 text-warning border-warning/30" : "bg-destructive/15 text-destructive border-destructive/30"}`}>
                  Eligibility {b.score}%
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg p-2 bg-success/10 border border-success/30"><div className="text-success font-semibold">{b.pass}</div><div className="text-[10px] text-muted-foreground">PASS</div></div>
                <div className="rounded-lg p-2 bg-warning/10 border border-warning/30"><div className="text-warning font-semibold">{b.review}</div><div className="text-[10px] text-muted-foreground">REVIEW</div></div>
                <div className="rounded-lg p-2 bg-destructive/10 border border-destructive/30"><div className="text-destructive font-semibold">{b.fail}</div><div className="text-[10px] text-muted-foreground">FAIL</div></div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1"><span>Risk score</span><span className="tabular-nums">{b.risk}/100</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${b.risk < 25 ? "bg-success" : b.risk < 60 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${b.risk}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="glass rounded-xl">
          <div className="p-5 flex items-center justify-between border-b border-border">
            <div>
              <h3 className="font-display font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan" /> Criterion-Level Comparison</h3>
              <p className="text-xs text-muted-foreground">AI-evaluated eligibility with confidence and traceable evidence.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/app/explainability" className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-accent/50 inline-flex items-center gap-1">Open evidence <ArrowRight className="h-3 w-3" /></Link>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-cyan text-primary-foreground inline-flex items-center gap-1"><Download className="h-3 w-3" /> Export</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-card/40">
                  <th className="px-5 py-3 w-[34%]">Criterion</th>
                  {bidders.map((b) => <th key={b.id} className="px-3 py-3">{b.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c) => {
                  const isOpen = open === c.key;
                  return (
                    <React.Fragment key={c.key}>
                      <tr className="border-t border-border hover:bg-accent/20 transition cursor-pointer" onClick={() => setOpen(isOpen ? null : c.key)}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                            <div>
                              <div className="font-medium">{c.label}</div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{c.type} · {c.mandatory ? "mandatory" : "optional"}</div>
                            </div>
                          </div>
                        </td>
                        {bidders.map((b) => {
                          const e = evaluation[b.id][c.key];
                          return (
                            <td key={b.id} className="px-3 py-3 align-top">
                              <div className="flex flex-col gap-1.5">
                                <StatusBadge status={e.status} />
                                <ConfidenceBar value={e.confidence} />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      {isOpen && (
                        <tr className="bg-card/30 border-t border-border">
                          <td colSpan={4} className="px-5 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {bidders.map((b) => {
                                const e = evaluation[b.id][c.key];
                                return (
                                  <div key={b.id} className="rounded-lg border border-border bg-card/60 p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="text-xs font-medium">{b.name}</div>
                                      <StatusBadge status={e.status} />
                                    </div>
                                    <div className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">Evidence (p.{e.page})</div>
                                    <div className="mt-1 text-sm rounded-md bg-primary/10 border border-primary/30 px-2 py-1.5 text-foreground/90">
                                      <span className="bg-warning/30 px-1 rounded">{e.evidence}</span>
                                    </div>
                                    <div className="mt-2 text-[11px] text-muted-foreground">AI reasoning</div>
                                    <p className="text-xs mt-1 text-foreground/80">{e.reasoning}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-xl p-5 border border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-warning shrink-0" />
            <div>
              <div className="font-display font-semibold">2 bidders require human review before final award.</div>
              <p className="text-xs text-muted-foreground mt-1">Review queue contains 1 critical risk (Bidder C — turnover shortfall) and 1 escalated integrity flag (Bidder B — undisclosed debarment history).</p>
            </div>
            <Link to="/app/risk" className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-warning text-warning-foreground font-medium">Open review queue</Link>
          </div>
        </div>
      </div>
    </>
  );
}
