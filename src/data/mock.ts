export const stats = {
  totalTenders: 1284,
  activeEvaluations: 47,
  pendingReviews: 23,
  highRisk: 8,
  avgConfidence: 92.4,
};

export const recentActivity = [
  { id: 1, time: "2m ago", actor: "AI Engine", action: "Completed eligibility evaluation", target: "TND-2026-0481", level: "info" },
  { id: 2, time: "14m ago", actor: "R. Mehta", action: "Approved bidder review", target: "Apex Infrastructure Ltd.", level: "success" },
  { id: 3, time: "37m ago", actor: "AI Engine", action: "Flagged financial inconsistency", target: "Stellar Constructions Pvt", level: "warning" },
  { id: 4, time: "1h ago", actor: "S. Iyer", action: "Uploaded tender document", target: "TND-2026-0480", level: "info" },
  { id: 5, time: "2h ago", actor: "AI Engine", action: "Detected missing certification", target: "NorthBridge Engineering", level: "danger" },
  { id: 6, time: "3h ago", actor: "Audit System", action: "Generated compliance report", target: "TND-2026-0473", level: "info" },
];

export const tenders = [
  { id: "TND-2026-0481", title: "Metro Rail Phase IV — Civil Works", agency: "Ministry of Urban Development", value: "₹ 2,450 Cr", deadline: "2026-06-12", bidders: 7, status: "Evaluating", confidence: 94 },
  { id: "TND-2026-0480", title: "National Highway Expansion NH-44", agency: "NHAI", value: "₹ 1,820 Cr", deadline: "2026-05-30", bidders: 5, status: "Review", confidence: 88 },
  { id: "TND-2026-0479", title: "Smart City Surveillance Grid", agency: "MeitY", value: "₹ 612 Cr", deadline: "2026-05-22", bidders: 9, status: "Completed", confidence: 96 },
  { id: "TND-2026-0478", title: "Hospital Modernization Programme", agency: "MoHFW", value: "₹ 940 Cr", deadline: "2026-06-04", bidders: 6, status: "Evaluating", confidence: 91 },
  { id: "TND-2026-0477", title: "Renewable Energy Grid Integration", agency: "MNRE", value: "₹ 3,120 Cr", deadline: "2026-07-01", bidders: 8, status: "Review", confidence: 82 },
];

export const criteria = [
  { key: "turnover", label: "Min. annual turnover ≥ ₹ 250 Cr", type: "financial", mandatory: true, confidence: 98 },
  { key: "iso9001", label: "ISO 9001:2015 Certification", type: "compliance", mandatory: true, confidence: 96 },
  { key: "iso14001", label: "ISO 14001 Environmental Mgmt.", type: "compliance", mandatory: false, confidence: 94 },
  { key: "experience", label: "5+ years in similar civil projects", type: "experience", mandatory: true, confidence: 92 },
  { key: "manpower", label: "Min. 200 technical personnel on payroll", type: "capacity", mandatory: true, confidence: 89 },
  { key: "blacklist", label: "No active blacklisting/debarment", type: "legal", mandatory: true, confidence: 99 },
  { key: "gst", label: "Active GST registration & filings", type: "compliance", mandatory: true, confidence: 97 },
];

export type EvalStatus = "PASS" | "FAIL" | "REVIEW";

export const bidders = [
  { id: "B1", name: "Apex Infrastructure Ltd.", country: "IN", risk: 12 },
  { id: "B2", name: "Stellar Constructions Pvt.", country: "IN", risk: 47 },
  { id: "B3", name: "NorthBridge Engineering", country: "IN", risk: 71 },
];

export const evaluation: Record<string, Record<string, { status: EvalStatus; confidence: number; evidence: string; page: number; reasoning: string }>> = {
  B1: {
    turnover: { status: "PASS", confidence: 97, evidence: "Annual turnover FY24-25: ₹ 412.6 Cr (Audited)", page: 12, reasoning: "Audited financial statement reports turnover comfortably exceeding the ₹250 Cr threshold across the last 3 fiscal years." },
    iso9001: { status: "PASS", confidence: 96, evidence: "ISO 9001:2015 Certified — Cert. No. QMS-IN-44128", page: 4, reasoning: "Valid certificate from accredited body, expiry 2027-08-14." },
    iso14001: { status: "PASS", confidence: 91, evidence: "ISO 14001:2015 — Cert. No. EMS-IN-00921", page: 6, reasoning: "Environmental management certification verified." },
    experience: { status: "PASS", confidence: 93, evidence: "Completed 14 metro/civil projects since 2014", page: 22, reasoning: "Project register lists 14 comparable projects with completion certificates." },
    manpower: { status: "PASS", confidence: 88, evidence: "PF returns reflect 412 technical staff", page: 31, reasoning: "EPFO filings cross-verified with HR roster." },
    blacklist: { status: "PASS", confidence: 99, evidence: "No records found across CVC/CBI debarment lists", page: 1, reasoning: "Checked against 7 government registries, no active proceedings." },
    gst: { status: "PASS", confidence: 98, evidence: "GSTIN 27AAACA1234F1Z5 — Active, filings up to date", page: 9, reasoning: "Last 12 months GSTR-3B filings confirmed." },
  },
  B2: {
    turnover: { status: "PASS", confidence: 89, evidence: "Turnover FY24-25: ₹ 268.1 Cr", page: 8, reasoning: "Marginally exceeds threshold; FY23-24 was ₹ 241 Cr — borderline trend." },
    iso9001: { status: "PASS", confidence: 94, evidence: "ISO 9001:2015 Certified — Cert. No. QMS-IN-50217", page: 3, reasoning: "Valid until 2026-11-02." },
    iso14001: { status: "REVIEW", confidence: 64, evidence: "Certificate scan partially illegible (OCR conf. 61%)", page: 7, reasoning: "Optional criterion — recommend manual verification of expiry date." },
    experience: { status: "PASS", confidence: 86, evidence: "8 comparable projects (2016–2024)", page: 19, reasoning: "Sufficient experience although 3 projects had time overruns >12 months." },
    manpower: { status: "REVIEW", confidence: 58, evidence: "HR roster lists 184 technical personnel", page: 27, reasoning: "Falls short of 200 by 8%; bidder claims 24 contractors not in payroll." },
    blacklist: { status: "FAIL", confidence: 92, evidence: "Debarred by State PWD (Maharashtra) — 2023, 6 months", page: 2, reasoning: "Historic debarment now lapsed but undisclosed in declaration form, triggering integrity flag." },
    gst: { status: "PASS", confidence: 95, evidence: "GSTIN active; 1 late filing in last 12 months", page: 11, reasoning: "Compliant overall, single delayed filing noted." },
  },
  B3: {
    turnover: { status: "FAIL", confidence: 96, evidence: "Turnover FY24-25: ₹ 178.3 Cr", page: 10, reasoning: "Falls ₹ 71.7 Cr short of mandatory ₹ 250 Cr minimum." },
    iso9001: { status: "REVIEW", confidence: 71, evidence: "Certificate found, expired on 2024-12-30", page: 5, reasoning: "Renewal application submitted but no valid live certificate available." },
    iso14001: { status: "FAIL", confidence: 90, evidence: "No ISO 14001 documentation submitted", page: 0, reasoning: "Document not present in submission package." },
    experience: { status: "PASS", confidence: 84, evidence: "6 comparable projects since 2018", page: 17, reasoning: "Meets 5-year threshold with documented evidence." },
    manpower: { status: "PASS", confidence: 81, evidence: "PF returns: 231 technical employees", page: 24, reasoning: "Above the 200 minimum." },
    blacklist: { status: "PASS", confidence: 97, evidence: "No active debarment records", page: 1, reasoning: "Clean across government registries." },
    gst: { status: "REVIEW", confidence: 67, evidence: "GSTIN active; GSTR-9 not filed for FY23-24", page: 13, reasoning: "Annual return overdue — recommend clarification." },
  },
};

export const risks = [
  { id: "R-1042", bidder: "NorthBridge Engineering", tender: "TND-2026-0481", type: "Financial Threshold", severity: "Critical", confidence: 96, status: "Open", desc: "Turnover ₹ 178.3 Cr below mandatory ₹ 250 Cr." },
  { id: "R-1041", bidder: "Stellar Constructions", tender: "TND-2026-0481", type: "Integrity Disclosure", severity: "High", confidence: 92, status: "Escalated", desc: "Past PWD debarment not disclosed in bidder declaration." },
  { id: "R-1040", bidder: "NorthBridge Engineering", tender: "TND-2026-0481", type: "Missing Document", severity: "High", confidence: 90, status: "Open", desc: "ISO 14001 certificate not present in submission." },
  { id: "R-1039", bidder: "Stellar Constructions", tender: "TND-2026-0481", type: "OCR Low Confidence", severity: "Medium", confidence: 64, status: "In Review", desc: "ISO 14001 certificate scan partially illegible." },
  { id: "R-1038", bidder: "Stellar Constructions", tender: "TND-2026-0481", type: "Capacity Shortfall", severity: "Medium", confidence: 58, status: "In Review", desc: "Manpower 184 vs 200 required (-8%)." },
  { id: "R-1037", bidder: "NorthBridge Engineering", tender: "TND-2026-0481", type: "Compliance Lapse", severity: "Medium", confidence: 67, status: "Open", desc: "GSTR-9 annual return overdue." },
];

export const auditTrail = [
  { ts: "2026-05-06 10:14:22", actor: "S. Iyer", event: "Tender document uploaded", hash: "0x9f3a…b21d" },
  { ts: "2026-05-06 10:14:48", actor: "AI Engine v3.2", event: "Criteria extraction completed (7 criteria)", hash: "0x14ce…77a2" },
  { ts: "2026-05-06 10:32:11", actor: "S. Iyer", event: "Bidder documents uploaded (3 bidders, 24 files)", hash: "0x82bb…1190" },
  { ts: "2026-05-06 10:33:02", actor: "OCR Pipeline", event: "Document parsing & OCR completed", hash: "0x55e1…ac3f" },
  { ts: "2026-05-06 10:34:17", actor: "AI Engine v3.2", event: "Eligibility evaluation completed", hash: "0xa221…0044" },
  { ts: "2026-05-06 10:34:19", actor: "Risk Module", event: "6 risks detected, 2 escalated", hash: "0x3ddc…91ef" },
  { ts: "2026-05-06 11:02:55", actor: "R. Mehta", event: "Reviewed Bidder B — request clarification", hash: "0xf012…44b8" },
  { ts: "2026-05-06 11:18:30", actor: "Audit Module", event: "Compliance report generated", hash: "0x77a9…dd1c" },
];
