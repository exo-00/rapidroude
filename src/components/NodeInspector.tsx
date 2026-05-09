import { EDGES, NODES, riskBand, riskScore } from "@/data/tradeGraph";
import { useMemo } from "react";

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const bandClass: Record<string, string> = {
  low: "bg-risk-low/15 text-risk-low border-risk-low/40",
  medium: "bg-risk-medium/15 text-risk-medium border-risk-medium/40",
  high: "bg-risk-high/15 text-risk-high border-risk-high/40",
  critical: "bg-risk-critical/15 text-risk-critical border-risk-critical/40",
};

function Bar({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-display tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function NodeInspector({ selectedId, onSelect }: Props) {
  const node = useMemo(
    () => NODES.find((n) => n.id === selectedId) ?? null,
    [selectedId],
  );

  const connections = useMemo(() => {
    if (!selectedId) return [];
    return EDGES.filter((e) => e.source === selectedId || e.target === selectedId).map((e) => {
      const otherId = e.source === selectedId ? e.target : e.source;
      const other = NODES.find((n) => n.id === otherId);
      return { ...e, otherId, otherName: other?.name ?? otherId };
    });
  }, [selectedId]);

  if (!node) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="rounded-full border border-border bg-muted/40 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          Inspector
        </div>
        <p className="text-sm text-muted-foreground">
          Select a port or airport on the graph to view risk &amp; connections.
        </p>
      </div>
    );
  }

  const score = riskScore(node);
  const band = riskBand(score);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-border p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
              <span
                className={`rounded px-1.5 py-0.5 ${
                  node.kind === "seaport"
                    ? "bg-seaport/15 text-seaport"
                    : "bg-airport/15 text-airport"
                }`}
              >
                {node.kind}
              </span>
              <span>{node.id}</span>
            </div>
            <h2 className="mt-1 text-lg font-semibold leading-tight">{node.name}</h2>
            <p className="text-sm text-muted-foreground">
              {node.city}, {node.country}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted"
            aria-label="Clear selection"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
              Composite risk
            </div>
            <div className="font-display text-3xl tabular-nums">
              {(score * 100).toFixed(0)}
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <span
            className={`rounded-md border px-2 py-1 font-display text-[10px] uppercase tracking-widest ${bandClass[band]}`}
          >
            {band}
          </span>
        </div>
      </div>

      <div className="space-y-3 border-b border-border p-5">
        <Bar label="Congestion" value={node.congestion} />
        <Bar label="Geopolitical exposure" value={node.geopolitical} />
        <Bar label="Weather exposure" value={node.weather} />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
            Direct routes
          </div>
          <div className="font-display text-xs tabular-nums text-muted-foreground">
            {connections.length}
          </div>
        </div>
        <ul className="divide-y divide-border">
          {connections.map((c) => (
            <li key={c.otherId}>
              <button
                onClick={() => onSelect(c.otherId)}
                className="flex w-full items-center justify-between gap-3 py-2 text-left transition hover:bg-muted/50"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm">{c.otherName}</div>
                  <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c.otherId}
                  </div>
                </div>
                <div className="flex shrink-0 gap-3 text-right font-display text-xs tabular-nums">
                  <div>
                    <div className="text-foreground">${c.costUsd.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">cost</div>
                  </div>
                  <div>
                    <div className="text-foreground">{c.transitDays}d</div>
                    <div className="text-[10px] text-muted-foreground">transit</div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
