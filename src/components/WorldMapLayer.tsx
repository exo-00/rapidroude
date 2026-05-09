import { useMemo } from "react";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, MultiPolygon, Polygon } from "geojson";

// Same equirectangular projection used by TradeGraph
const projectX = (lng: number) => (lng + 180) * 8;
const projectY = (lat: number) => (90 - lat) * 8;

function ringToPath(ring: number[][]): string {
  return ring
    .map(([lng, lat], i) => `${i === 0 ? "M" : "L"}${projectX(lng).toFixed(1)},${projectY(lat).toFixed(1)}`)
    .join("") + "Z";
}

function geometryToPath(geom: Polygon | MultiPolygon): string {
  if (geom.type === "Polygon") {
    return geom.coordinates.map(ringToPath).join("");
  }
  return geom.coordinates.flatMap((poly) => poly.map(ringToPath)).join("");
}

/**
 * Static SVG world map in "model" coordinates (0..2880 × 0..1440).
 * Parent should apply Cytoscape's pan/zoom transform to keep it aligned.
 */
export function WorldMapLayer() {
  const path = useMemo(() => {
    const topo = worldData as unknown as Topology;
    const geo = feature(topo, topo.objects.countries as GeometryCollection);
    const features = (geo as unknown as { features: Feature<Polygon | MultiPolygon>[] }).features;
    return features.map((f) => geometryToPath(f.geometry)).join("");
  }, []);

  return (
    <svg
      width={2880}
      height={1440}
      viewBox="0 0 2880 1440"
      style={{ display: "block" }}
      aria-hidden
    >
      {/* Ocean */}
      <rect width={2880} height={1440} fill="var(--background)" />
      {/* Subtle graticule */}
      <g stroke="var(--border)" strokeWidth={0.5} opacity={0.25} fill="none">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`m${i}`} x1={i * 240} y1={0} x2={i * 240} y2={1440} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`p${i}`} x1={0} y1={i * 240} x2={2880} y2={i * 240} />
        ))}
      </g>
      {/* Land */}
      <path
        d={path}
        fill="var(--muted)"
        stroke="var(--border)"
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}
