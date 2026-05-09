import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TradeGraph } from "@/components/TradeGraph";
import { NodeInspector } from "@/components/NodeInspector";
import { EDGES, NODES, riskScore } from "@/data/tradeGraph";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Trade Graph — Global Logistics Risk Console" },
      {
        name: "description",
        content:
          "Interactive global trade network of seaports and airports with composite risk scoring and route inspection.",
      },
    ],
  }),
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-sm tabular-nums">{value}</span>
    </div>
  );
}

function LegendDot({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(${color})` }} />
      {children}
    </div>
  );
}

function Index() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const seaports = NODES.filter((n) => n.kind === "seaport").length;
    const airports = NODES.filter((n) => n.kind === "airport").length;
    const avgRisk =
      NODES.reduce((sum, n) => sum + riskScore(n), 0) / NODES.length;
    return { seaports, airports, edges: EDGES.length, avgRisk };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-sm font-semibold tracking-tight">
              TRADE.GRAPH
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Global logistics risk console
            </p>
          </div>
        </div>
        <div className="hidden gap-6 md:flex">
          <Stat label="Seaports" value={String(stats.seaports)} />
          <Stat label="Airports" value={String(stats.airports)} />
          <Stat label="Lanes" value={String(stats.edges)} />
          <Stat label="Avg risk" value={`${(stats.avgRisk * 100).toFixed(0)}%`} />
        </div>
      </header>

      {/* Main split */}
      <div className="flex flex-1 overflow-hidden">
        <main className="relative flex-1">
          <TradeGraph selectedId={selectedId} onSelect={setSelectedId} />

          {/* Legend overlay */}
          <div className="pointer-events-none absolute bottom-4 left-4 space-y-2 rounded-lg border border-border bg-card/80 p-3 backdrop-blur">
            <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
              Legend
            </div>
            <div className="flex flex-col gap-1.5">
              <LegendDot color="--seaport">Seaport (○)</LegendDot>
              <LegendDot color="--airport">Airport (◇)</LegendDot>
            </div>
            <div className="mt-2 border-t border-border pt-2">
              <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                Risk band
              </div>
              <div className="mt-1 flex flex-col gap-1.5">
                <LegendDot color="--risk-low">Low</LegendDot>
                <LegendDot color="--risk-medium">Medium</LegendDot>
                <LegendDot color="--risk-high">High</LegendDot>
                <LegendDot color="--risk-critical">Critical</LegendDot>
              </div>
            </div>
          </div>

          {/* Hint */}
          {!selectedId && (
            <div className="pointer-events-none absolute right-4 top-4 rounded-md border border-border bg-card/80 px-3 py-1.5 font-display text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Click a node · scroll to zoom · drag to pan
            </div>
          )}
        </main>

        <aside className="w-[360px] shrink-0 border-l border-border bg-card">
          <NodeInspector selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
      </div>
    </div>
  );
}
