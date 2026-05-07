import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { criteria, bidders, evaluation } from "@/data/mock";
import { StatusBadge } from "@/components/app/StatusBadge";
import { useState } from "react";
import { FileText, MapPin, Sparkles, ScanSearch } from "lucide-react";

export const Route = createFileRoute("/app/explainability")({
  component: Explainability,
});

function Explainability() {
  const [bidderId, setBidderId] = useState("B1");
  const [criterionKey, setCriterionKey] = useState("iso9001");

  const criterion = criteria.find((c) => c.key === criterionKey)!;
  const bidder = bidders.find((b) => b.id === bidderId)!;
  const e = evaluation[bidderId][criterionKey];

  return (
    <>
      <Topbar title="Explainable AI" subtitle="Source-traceable evidence behind every AI decision." />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 fade-in-up">
        {/* Selectors */}
        <div className="xl:col-span-3 space-y-4">
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Bidder</div>
            <div className="mt-2 space-y-1">
              {bidders.map((b) => (
                <button key={b.id} onClick={() => setBidderId(b.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${bidderId === b.id ? "bg-primary/15 border border-primary/30 text-foreground" : "text-muted-foreground hover:bg-accent/40"}`}>{b.name}</button>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Criterion</div>
            <div className="mt-2 space-y-1">
              {criteria.map((c) => {
                const ev = evaluation[bidderId][c.key];
                return (
                  <button key={c.key} onClick={() => setCriterionKey(c.key)} className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition ${criterionKey === c.key ? "bg-accent border border-border" : "hover:bg-accent/40 text-muted-foreground"}`}>
                    <span className={`h-2 w-2 rounded-full ${ev.status === "PASS" ? "bg-success" : ev.status === "FAIL" ? "bg-destructive" : "bg-warning"}`} />
                    <span className="flex-1 truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Document viewer */}
        <div className="xl:col-span-5 glass rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-primary" /> {bidder.name} — Bundle.pdf</div>
            <span className="text-[11px] text-muted-foreground">Page {e.page} of 64</span>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-[oklch(0.96_0.01_240)] text-[oklch(0.18_0.02_258)] p-6 min-h-[480px] font-mono text-[12px] leading-relaxed relative">
            <div className="absolute top-3 right-3 text-[10px] text-[oklch(0.4_0.02_258)] font-sans">Page {e.page}</div>
            <div className="font-semibold text-sm mb-2 font-sans">CERTIFICATE OF COMPLIANCE</div>
            <p>This is to certify that <strong>{bidder.name}</strong> has been assessed and registered against the requirements of the standard set out below.</p>
            <p className="mt-3">Standard: <mark className="bg-[oklch(0.85_0.16_95)] px-1 rounded">{e.evidence}</mark></p>
            <p className="mt-3">Scope of Registration: Design, engineering, procurement and construction services for civil infrastructure projects including metro rail and highways.</p>
            <p className="mt-3">Issued under accreditation by the National Accreditation Board for Certification Bodies (NABCB).</p>
            <p className="mt-3">Original Issue: 2018-08-14 · Latest Issue: 2024-08-14 · Expiry: 2027-08-14</p>
            <p className="mt-3">Registration Number: <strong>QMS-IN-44128</strong></p>
            <div className="absolute bottom-4 right-4 text-[10px] text-[oklch(0.4_0.02_258)] font-sans">Source confidence {e.confidence}%</div>
          </div>
        </div>

        {/* AI reasoning */}
        <div className="xl:col-span-4 space-y-4">
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">AI Decision</div>
              <StatusBadge status={e.status} />
            </div>
            <div className="mt-3 font-display font-semibold">{criterion.label}</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg p-2 border border-border bg-card/40">
                <div className="text-lg font-display font-semibold text-gradient">{e.confidence}%</div>
                <div className="text-[10px] text-muted-foreground">Confidence</div>
              </div>
              <div className="rounded-lg p-2 border border-border bg-card/40">
                <div className="text-lg font-display font-semibold">p.{e.page}</div>
                <div className="text-[10px] text-muted-foreground">Source page</div>
              </div>
              <div className="rounded-lg p-2 border border-border bg-card/40">
                <div className="text-lg font-display font-semibold">v3.2</div>
                <div className="text-[10px] text-muted-foreground">Model</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-cyan" /> Reasoning</div>
            <p className="text-sm mt-3 text-foreground/85 leading-relaxed">{e.reasoning}</p>

            <div className="mt-5 text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Source trace</div>
            <ol className="mt-2 space-y-2">
              {[
                { s: "RFP §4.2.1 — Quality Management Requirements", c: "match" },
                { s: `Bidder document, page ${e.page} — Certificate body`, c: "match" },
                { s: "Cross-check: NABCB registry lookup", c: "verified" },
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <span className="h-5 w-5 rounded-md bg-primary/15 text-primary grid place-items-center text-[10px] font-semibold">{i+1}</span>
                  <span className="flex-1">{step.s}</span>
                  <span className="text-[10px] text-success">{step.c}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass rounded-xl p-5 border border-cyan/20">
            <div className="flex items-center gap-2 text-sm font-medium"><ScanSearch className="h-4 w-4 text-cyan" /> Counterfactual</div>
            <p className="text-xs mt-2 text-muted-foreground">If the certificate expiry were before 2026-06-12 (submission deadline), this criterion would flip to <span className="text-warning font-medium">REVIEW</span>.</p>
          </div>
        </div>
      </div>
    </>
  );
}
