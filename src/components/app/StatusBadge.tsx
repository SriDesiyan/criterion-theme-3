import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function StatusBadge({ status }: { status: "PASS" | "FAIL" | "REVIEW" }) {
  if (status === "PASS")
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-success/15 text-success border border-success/30"><CheckCircle2 className="h-3 w-3" /> PASS</span>;
  if (status === "FAIL")
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-destructive/15 text-destructive border border-destructive/30"><XCircle className="h-3 w-3" /> FAIL</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-warning/15 text-warning border border-warning/30"><AlertTriangle className="h-3 w-3" /> REVIEW</span>;
}

export function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-success" : value >= 75 ? "bg-cyan" : value >= 60 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[11px] tabular-nums text-muted-foreground w-8 text-right">{value}%</span>
    </div>
  );
}
