import { Bell, Search, ShieldCheck } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="min-w-0">
        <h1 className="text-lg font-display font-semibold truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-input/60 border border-border min-w-[320px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search tenders, bidders, criteria…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground" />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">⌘K</kbd>
        </div>
        <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-accent/50 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-warning ring-pulse" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-cyan grid place-items-center text-primary-foreground text-xs font-semibold">RM</div>
          <div className="hidden sm:block leading-tight">
            <div className="text-xs font-medium">R. Mehta</div>
            <div className="text-[10px] text-muted-foreground flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-success" /> Procurement Officer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
