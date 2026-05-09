import { useEffect, useMemo, useRef } from "react";
import cytoscape, { Core, ElementDefinition, EventObject } from "cytoscape";
import { EDGES, NODES, riskBand, riskScore, TradeNode } from "@/data/tradeGraph";
import { WorldMapLayer } from "@/components/WorldMapLayer";

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

// Web Mercator-ish projection: just map lng/lat to screen-space.
// Cytoscape uses y-down, so we flip latitude.
const projectX = (lng: number) => (lng + 180) * 8;       // 0..2880
const projectY = (lat: number) => (90 - lat) * 8;        // 0..1440

const riskColorVar = (band: ReturnType<typeof riskBand>) =>
  ({
    low: "var(--risk-low)",
    medium: "var(--risk-medium)",
    high: "var(--risk-high)",
    critical: "var(--risk-critical)",
  }[band]);

function cssVar(name: string): string {
  if (typeof window === "undefined") return "#888";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888";
}

export function TradeGraph({ selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  const elements: ElementDefinition[] = useMemo(() => {
    const nodeMap = new Map<string, TradeNode>(NODES.map((n) => [n.id, n]));
    const ns: ElementDefinition[] = NODES.map((n) => {
      const score = riskScore(n);
      return {
        group: "nodes",
        data: {
          id: n.id,
          label: n.id,
          name: n.name,
          kind: n.kind,
          risk: score,
          band: riskBand(score),
          throughput: n.throughput,
        },
        position: { x: projectX(n.lng), y: projectY(n.lat) },
      };
    });
    const es: ElementDefinition[] = EDGES.filter(
      (e) => nodeMap.has(e.source) && nodeMap.has(e.target),
    ).map((e, i) => ({
      group: "edges",
      data: {
        id: `e${i}`,
        source: e.source,
        target: e.target,
        weight: e.trafficVolume,
        cost: e.costUsd,
        days: e.transitDays,
      },
    }));
    return [...ns, ...es];
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      wheelSensitivity: 0.2,
      minZoom: 0.15,
      maxZoom: 2.5,
      style: [
        {
          selector: "node",
          style: {
            "background-color": (ele: cytoscape.NodeSingular) =>
              riskColorVar(ele.data("band")) === "var(--risk-low)"
                ? cssVar("--risk-low")
                : cssVar(`--risk-${ele.data("band")}`),
            "border-width": 2,
            "border-color": (ele: cytoscape.NodeSingular) =>
              ele.data("kind") === "seaport" ? cssVar("--seaport") : cssVar("--airport"),
            shape: (ele: cytoscape.NodeSingular) =>
              ele.data("kind") === "seaport" ? "ellipse" : "diamond",
            width: (ele: cytoscape.NodeSingular) => 10 + (ele.data("throughput") as number) * 0.18,
            height: (ele: cytoscape.NodeSingular) => 10 + (ele.data("throughput") as number) * 0.18,
            label: "data(label)",
            "font-size": 8,
            "font-family": "JetBrains Mono, monospace",
            color: cssVar("--foreground"),
            "text-margin-y": -6,
            "text-outline-color": cssVar("--background"),
            "text-outline-width": 2,
            "min-zoomed-font-size": 9,
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": 4,
            "border-color": cssVar("--primary"),
            "overlay-color": cssVar("--primary"),
            "overlay-opacity": 0.15,
            "overlay-padding": 8,
          },
        },
        {
          selector: "edge",
          style: {
            width: (ele: cytoscape.EdgeSingular) => 0.6 + (ele.data("weight") as number) * 0.04,
            "line-color": cssVar("--border"),
            "curve-style": "haystack",
            "haystack-radius": 0.3,
            opacity: 0.55,
          },
        },
        {
          selector: "edge.highlight",
          style: {
            "line-color": cssVar("--primary"),
            opacity: 1,
            width: 3,
          },
        },
        {
          selector: "node.dimmed",
          style: { opacity: 0.25 },
        },
        {
          selector: "edge.dimmed",
          style: { opacity: 0.08 },
        },
      ],
      layout: { name: "preset" },
    });

    cyRef.current = cy;
    cy.fit(undefined, 40);

    cy.on("tap", "node", (evt: EventObject) => {
      onSelect(evt.target.id() as string);
    });
    cy.on("tap", (evt: EventObject) => {
      if (evt.target === cy) onSelect(null);
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
    // elements is stable per session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight neighborhood on selection
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.batch(() => {
      cy.elements().removeClass("highlight dimmed");
      if (!selectedId) return;
      const node = cy.getElementById(selectedId);
      if (node.empty()) return;
      const neighborhood = node.closedNeighborhood();
      cy.elements().not(neighborhood).addClass("dimmed");
      neighborhood.edges().addClass("highlight");
      node.select();
    });
  }, [selectedId]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-background"
      role="application"
      aria-label="Global trade network graph"
    />
  );
}
