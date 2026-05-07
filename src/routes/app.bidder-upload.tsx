import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app/Topbar";
import { UploadCloud, FileText, ScanLine, Building2, CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/bidder-upload")({
  component: BidderUpload,
});

const bidders = [
  {
    name: "Apex Infrastructure Ltd.",
    cin: "L45200MH2002PLC131234",
    files: [
      { n: "Company_Profile.pdf", t: "Profile", st: "done", c: 98 },
      { n: "ISO_9001_Certificate.pdf", t: "Certification", st: "done", c: 96 },
      { n: "Audited_FS_FY24-25.pdf", t: "Financial", st: "done", c: 94 },
      { n: "GST_Returns_12mo.pdf", t: "Compliance", st: "done", c: 97 },
      { n: "Project_Experience.pdf", t: "Experience", st: "done", c: 92 },
    ],
  },
  {
    name: "Stellar Constructions Pvt.",
    cin: "U45209DL2005PTC139281",
    files: [
      { n: "Company_Profile.pdf", t: "Profile", st: "done", c: 95 },
      { n: "ISO_14001_Cert.pdf", t: "Certification", st: "ocr", c: 64 },
      { n: "Audited_FS_FY24-25.pdf", t: "Financial", st: "done", c: 89 },
      { n: "Manpower_Records.pdf", t: "Capacity", st: "done", c: 81 },
    ],
  },
  {
    name: "NorthBridge Engineering",
    cin: "U74999KA2010PTC082110",
    files: [
      { n: "Company_Profile.pdf", t: "Profile", st: "done", c: 91 },
      { n: "ISO_9001_Cert_Expired.pdf", t: "Certification", st: "warn", c: 71 },
      { n: "Audited_FS_FY24-25.pdf", t: "Financial", st: "done", c: 96 },
      { n: "GST_Returns.pdf", t: "Compliance", st: "ocr", c: 67 },
    ],
  },
];

function BidderUpload() {
  return (
    <>
      <Topbar title="Bidder Document Intake" subtitle="OCR + structured parsing across all bidder submissions." />
      <div className="p-6 space-y-6 fade-in-up">
        <div className="glass rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 relative rounded-xl border-2 border-dashed border-border bg-card/40 p-8 text-center scan-line">
            <UploadCloud className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-2 font-medium">Drop bidder document bundles</div>
            <div className="text-xs text-muted-foreground">ZIP / PDF / DOCX · auto-categorised by AI · OCR enabled</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="glass rounded-lg p-3"><div className="text-xl font-display font-semibold">3</div><div className="text-[11px] text-muted-foreground">Bidders</div></div>
            <div className="glass rounded-lg p-3"><div className="text-xl font-display font-semibold">13</div><div className="text-[11px] text-muted-foreground">Files</div></div>
            <div className="glass rounded-lg p-3"><div className="text-xl font-display font-semibold text-success">87%</div><div className="text-[11px] text-muted-foreground">OCR conf</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {bidders.map((b) => (
            <div key={b.name} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg grid place-items-center bg-gradient-to-br from-primary/30 to-cyan/30 border border-border"><Building2 className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{b.name}</div>
                  <div className="text-[11px] text-muted-foreground font-mono truncate">CIN {b.cin}</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {b.files.map((f) => (
                  <div key={f.n} className="p-2.5 rounded-lg border border-border bg-card/40">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div className="text-xs truncate flex-1">{f.n}</div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">{f.t}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {f.st === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                      {f.st === "ocr" && <Loader2 className="h-3.5 w-3.5 text-cyan animate-spin" />}
                      {f.st === "warn" && <ScanLine className="h-3.5 w-3.5 text-warning" />}
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${f.c >= 90 ? "bg-success" : f.c >= 75 ? "bg-cyan" : "bg-warning"}`} style={{ width: `${f.c}%` }} />
                      </div>
                      <span className="text-[10px] tabular-nums text-muted-foreground w-8 text-right">{f.c}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
