import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { risks } from "@/data/mock";
import { ShieldAlert, Flame, AlertTriangle, Eye, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/risk")({
  component: Risk,
});

const sevStyles: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
  High: "bg-warning/15 text-warning border-warning/30",
  Medium: "bg-cyan/15 text-cyan border-cyan/30",
  Low: "bg-muted text-muted-foreground border-border",
};

function Risk() {
  return (
    <>
      <Topbar title="Risk Detection & Review Queue" subtitle="AI-flagged anomalies awaiting human governance." />
      <div className="p-6 space-y-6 fade-in-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Critical", v: 1, i: Flame, t: "text-destructive" },
            { l: "High", v: 2, i: ShieldAlert, t: "text-warning" },
            { l: "Medium", v: 3, i: AlertTriangle, t: "text-cyan" },
            { l: "In Review", v: 2, i: Eye, t: "text-primary" },
          ].map((s) => {
            const Icon = s.i;
            return (
              <div key={s.l} className="glass rounded-xl p-5 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg grid place-items-center bg-card border border-border ${s.t}`}><Icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-3xl font-display font-semibold tabular-nums">{s.v}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass rounded-xl p-5 border border-destructive/30 bg-destructive/5 flex items-start gap-3">
          <Flame className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <div className="font-display font-semibold">Critical risk requires immediate attention</div>
            <p className="text-xs text-muted-foreground mt-1">NorthBridge Engineering's annual turnover (₹ 178.3 Cr) is below the mandatory ₹ 250 Cr threshold for TND-2026-0481.</p>
          </div>
          <button className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground font-medium">Escalate</button>
        </div>

        <div className="glass rounded-xl">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold">Review Queue</h3>
              <p className="text-xs text-muted-foreground">6 items · sorted by severity</p>
            </div>
            <div className="flex gap-2 text-xs">
              {["All", "Open", "In Review", "Escalated"].map((t, i) => (
                <button key={t} className={`px-3 py-1.5 rounded-lg border ${i === 0 ? "bg-accent border-border text-foreground" : "border-border text-muted-foreground hover:bg-accent/50"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-card/40">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Bidder</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3">Severity</th>
                  <th className="px-3 py-3">Confidence</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-accent/30 transition">
                    <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">{r.id}</td>
                    <td className="px-3 py-3">{r.type}</td>
                    <td className="px-3 py-3">{r.bidder}</td>
                    <td className="px-3 py-3 text-muted-foreground max-w-[320px]">{r.desc}</td>
                    <td className="px-3 py-3"><span className={`text-[11px] px-2 py-1 rounded-md border ${sevStyles[r.severity]}`}>{r.severity}</span></td>
                    <td className="px-3 py-3 tabular-nums">{r.confidence}%</td>
                    <td className="px-3 py-3 text-xs">
                      <span className={`px-2 py-1 rounded-md border ${r.status === "Escalated" ? "bg-destructive/15 text-destructive border-destructive/30" : r.status === "In Review" ? "bg-primary/15 text-primary border-primary/30" : "bg-warning/15 text-warning border-warning/30"}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3"><button className="text-muted-foreground hover:text-foreground"><ChevronRight className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
