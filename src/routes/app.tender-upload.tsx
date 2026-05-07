import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { criteria } from "@/data/mock";
import { UploadCloud, FileText, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/tender-upload")({
  component: TenderUpload,
});

function TenderUpload() {
  return (
    <>
      <Topbar title="Tender Upload" subtitle="Upload tender RFP, AI extracts eligibility criteria automatically." />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in-up">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold flex items-center gap-2"><UploadCloud className="h-4 w-4 text-primary" /> Upload Tender Document</h3>
            <div className="mt-4 relative rounded-xl border-2 border-dashed border-border bg-card/40 p-10 text-center scan-line">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 grid place-items-center glow-primary">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 font-medium">Drop the tender PDF here</div>
              <div className="text-xs text-muted-foreground mt-1">or click to browse · max 200MB · PDF, DOCX</div>
              <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-cyan text-primary-foreground text-sm font-medium glow-primary">Browse files</button>
            </div>

            {/* Pretend uploaded file */}
            <div className="mt-4 p-3 rounded-lg border border-border bg-card/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg grid place-items-center bg-primary/15 text-primary"><FileText className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">RFP_MetroRail_PhaseIV_CivilWorks.pdf</div>
                <div className="text-[11px] text-muted-foreground">128 pages · 14.2 MB · uploaded by R. Mehta</div>
              </div>
              <div className="text-[11px] text-success flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Parsed</div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold">Tender Metadata</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { l: "Tender ID", v: "TND-2026-0481" },
                { l: "Title", v: "Metro Rail Phase IV — Civil Works" },
                { l: "Issuing Agency", v: "Ministry of Urban Development" },
                { l: "Estimated Value", v: "₹ 2,450 Cr" },
                { l: "Submission Deadline", v: "12 June 2026, 17:00 IST" },
                { l: "Category", v: "Infrastructure / Civil" },
              ].map((f) => (
                <label key={f.l} className="block">
                  <span className="text-xs text-muted-foreground">{f.l}</span>
                  <input defaultValue={f.v} className="mt-1.5 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm outline-none focus:border-primary transition" />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan" /> AI Criteria Extraction</h3>
              <span className="text-[11px] px-2 py-1 rounded-full bg-success/15 text-success border border-success/30">7 found</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Structured eligibility rules detected from RFP body, Section 4.</p>
            <ul className="mt-4 space-y-2">
              {criteria.map((c) => (
                <li key={c.key} className="p-3 rounded-lg border border-border bg-card/40">
                  <div className="flex items-start gap-2">
                    <div className="text-sm font-medium flex-1">{c.label}</div>
                    {c.mandatory ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/30">Mandatory</span> : <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">Optional</span>}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.type}</span>
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${c.confidence}%` }} />
                    </div>
                    <span className="text-[11px] tabular-nums text-muted-foreground">{c.confidence}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-display font-semibold">Document Parsing</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { s: "Text extraction", d: "128/128 pages", ok: true },
                { s: "Table detection", d: "14 tables", ok: true },
                { s: "Clause segmentation", d: "342 clauses", ok: true },
                { s: "Embedding & indexing", d: "running", ok: false },
              ].map((p) => (
                <li key={p.s} className="flex items-center gap-3">
                  {p.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Loader2 className="h-4 w-4 text-cyan animate-spin" />}
                  <span className="flex-1">{p.s}</span>
                  <span className="text-xs text-muted-foreground">{p.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
