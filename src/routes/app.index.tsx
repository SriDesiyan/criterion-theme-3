import { createFileRoute, Link } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { stats, recentActivity, tenders } from "@/data/mock";
import { Activity, ArrowUpRight, BrainCircuit, FileStack, ShieldAlert, Timer, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const kpis = [
  { label: "Tenders Processed", value: stats.totalTenders.toLocaleString(), delta: "+8.2%", icon: FileStack, tone: "text-cyan" },
  { label: "Active Evaluations", value: stats.activeEvaluations, delta: "+3 today", icon: BrainCircuit, tone: "text-primary" },
  { label: "Pending Reviews", value: stats.pendingReviews, delta: "4 urgent", icon: Timer, tone: "text-warning" },
  { label: "High-Risk Submissions", value: stats.highRisk, delta: "+2 this week", icon: ShieldAlert, tone: "text-destructive" },
];

function Dashboard() {
  return (
    <>
      <Topbar title="Procurement Command Center" subtitle="Real-time AI evaluation pipeline · Updated just now" />
      <div className="p-6 space-y-6 fade-in-up">
        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="glass rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{k.label}</div>
                    <div className="mt-2 text-3xl font-display font-semibold tabular-nums">{k.value}</div>
                  </div>
                  <div className={`h-9 w-9 rounded-lg grid place-items-center bg-card border border-border ${k.tone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-success"><TrendingUp className="h-3 w-3" /> {k.delta}</div>
              </div>
            );
          })}
        </div>

        {/* Pipeline + Confidence */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold">AI Evaluation Pipeline</h3>
                <p className="text-xs text-muted-foreground">End-to-end transparency from upload to audit.</p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-success/15 text-success border border-success/30">Live</span>
            </div>
            <div className="mt-5 grid grid-cols-4 md:grid-cols-8 gap-2">
              {["Tender Upload","Criteria Extraction","Bidder Parsing","Eligibility AI","Evidence Mapping","Risk Detection","Human Review","Audit Report"].map((s, i) => (
                <div key={s} className="relative">
                  <div className={`h-1.5 rounded-full ${i < 6 ? "bg-gradient-to-r from-primary to-cyan" : "bg-muted"}`} />
                  <div className="mt-2 text-[10px] text-muted-foreground leading-tight">{s}</div>
                </div>
              ))}
            </div>

            {/* Throughput chart */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Throughput · last 14 days</span>
                <span className="text-foreground tabular-nums">avg conf {stats.avgConfidence}%</span>
              </div>
              <div className="mt-3 h-32 flex items-end gap-2">
                {[34,41,38,52,47,60,55,68,72,64,78,71,84,92].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-cyan/80 hover:opacity-80 transition" style={{ height: `${v}%` }} title={`Day ${i+1}: ${v}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">AI Confidence</h3>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 grid place-items-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" stroke="oklch(0.28 0.025 258)" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="52" stroke="url(#g1)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${2*Math.PI*52*0.924} ${2*Math.PI*52}`} />
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="oklch(0.68 0.17 235)" />
                      <stop offset="1" stopColor="oklch(0.78 0.14 200)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-3xl font-display font-semibold text-gradient">92.4%</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">avg model conf.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div><div className="text-success text-sm font-semibold">81%</div><div className="text-[10px] text-muted-foreground">PASS</div></div>
              <div><div className="text-warning text-sm font-semibold">12%</div><div className="text-[10px] text-muted-foreground">REVIEW</div></div>
              <div><div className="text-destructive text-sm font-semibold">7%</div><div className="text-[10px] text-muted-foreground">FAIL</div></div>
            </div>
          </div>
        </div>

        {/* Tenders + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass rounded-xl">
            <div className="p-5 flex items-center justify-between border-b border-border">
              <div>
                <h3 className="font-display font-semibold">Active Tenders</h3>
                <p className="text-xs text-muted-foreground">Live evaluations across departments.</p>
              </div>
              <Link to="/app/evaluation" className="text-xs text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">Tender</th>
                    <th className="px-3 py-3">Agency</th>
                    <th className="px-3 py-3">Value</th>
                    <th className="px-3 py-3">Bidders</th>
                    <th className="px-3 py-3">Confidence</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {tenders.map((t) => (
                    <tr key={t.id} className="border-t border-border hover:bg-accent/30 transition">
                      <td className="px-5 py-3">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{t.id}</div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{t.agency}</td>
                      <td className="px-3 py-3 tabular-nums">{t.value}</td>
                      <td className="px-3 py-3 tabular-nums">{t.bidders}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${t.confidence}%` }} />
                          </div>
                          <span className="text-[11px] tabular-nums w-7">{t.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-[11px] px-2 py-1 rounded-md border ${t.status === "Completed" ? "bg-success/15 text-success border-success/30" : t.status === "Review" ? "bg-warning/15 text-warning border-warning/30" : "bg-primary/15 text-primary border-primary/30"}`}>{t.status}</span>
                      </td>
                      <td className="px-5 py-3"><Link to="/app/evaluation" className="text-muted-foreground hover:text-foreground"><ArrowUpRight className="h-4 w-4" /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">Activity Timeline</h3>
              <span className="text-[11px] text-muted-foreground">Live</span>
            </div>
            <ol className="mt-4 space-y-4 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
              {recentActivity.map((a) => (
                <li key={a.id} className="relative pl-6">
                  <span className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background ${a.level === "success" ? "bg-success" : a.level === "warning" ? "bg-warning" : a.level === "danger" ? "bg-destructive" : "bg-primary"}`} />
                  <div className="text-sm"><span className="font-medium">{a.actor}</span> <span className="text-muted-foreground">{a.action}</span></div>
                  <div className="text-[11px] text-muted-foreground font-mono">{a.target} · {a.time}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
