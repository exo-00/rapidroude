// Curated global trade graph: major seaports (UN/LOCODE) + airports (IATA).
// Coordinates [lng, lat] for geo-style layout. Risk + congestion are 0-1.

export type NodeKind = "seaport" | "airport";

export interface TradeNode {
  id: string;          // UN/LOCODE for ports, IATA for airports
  name: string;
  city: string;
  country: string;
  kind: NodeKind;
  lng: number;
  lat: number;
  congestion: number;  // 0-1 (operational load)
  geopolitical: number; // 0-1 (regional instability exposure)
  weather: number;     // 0-1 (climate/weather risk exposure)
  throughput: number;  // relative annual volume
}

export interface TradeEdge {
  source: string;
  target: string;
  costUsd: number;     // per TEU or per ton-equiv
  transitDays: number;
  trafficVolume: number; // relative
}

// ---- Nodes ---------------------------------------------------------------
export const NODES: TradeNode[] = [
  // Seaports
  { id: "SGSIN", name: "Port of Singapore", city: "Singapore", country: "SG", kind: "seaport", lng: 103.85, lat: 1.29, congestion: 0.78, geopolitical: 0.15, weather: 0.35, throughput: 100 },
  { id: "CNSHA", name: "Port of Shanghai", city: "Shanghai", country: "CN", kind: "seaport", lng: 121.47, lat: 31.23, congestion: 0.82, geopolitical: 0.45, weather: 0.55, throughput: 100 },
  { id: "CNSZX", name: "Port of Shenzhen", city: "Shenzhen", country: "CN", kind: "seaport", lng: 114.06, lat: 22.54, congestion: 0.76, geopolitical: 0.45, weather: 0.6, throughput: 90 },
  { id: "CNNGB", name: "Ningbo-Zhoushan", city: "Ningbo", country: "CN", kind: "seaport", lng: 121.55, lat: 29.87, congestion: 0.74, geopolitical: 0.45, weather: 0.55, throughput: 88 },
  { id: "HKHKG", name: "Port of Hong Kong", city: "Hong Kong", country: "HK", kind: "seaport", lng: 114.17, lat: 22.32, congestion: 0.7, geopolitical: 0.4, weather: 0.6, throughput: 70 },
  { id: "KRPUS", name: "Port of Busan", city: "Busan", country: "KR", kind: "seaport", lng: 129.04, lat: 35.1, congestion: 0.7, geopolitical: 0.35, weather: 0.5, throughput: 80 },
  { id: "JPYOK", name: "Port of Yokohama", city: "Yokohama", country: "JP", kind: "seaport", lng: 139.65, lat: 35.45, congestion: 0.6, geopolitical: 0.2, weather: 0.65, throughput: 55 },
  { id: "AEDXB", name: "Jebel Ali Port", city: "Dubai", country: "AE", kind: "seaport", lng: 55.06, lat: 24.98, congestion: 0.65, geopolitical: 0.55, weather: 0.3, throughput: 75 },
  { id: "EGPSD", name: "Port Said (Suez N.)", city: "Port Said", country: "EG", kind: "seaport", lng: 32.3, lat: 31.27, congestion: 0.85, geopolitical: 0.7, weather: 0.25, throughput: 60 },
  { id: "EGSUZ", name: "Suez (S. Canal)", city: "Suez", country: "EG", kind: "seaport", lng: 32.55, lat: 29.97, congestion: 0.88, geopolitical: 0.7, weather: 0.25, throughput: 60 },
  { id: "NLRTM", name: "Port of Rotterdam", city: "Rotterdam", country: "NL", kind: "seaport", lng: 4.48, lat: 51.92, congestion: 0.7, geopolitical: 0.15, weather: 0.4, throughput: 95 },
  { id: "DEHAM", name: "Port of Hamburg", city: "Hamburg", country: "DE", kind: "seaport", lng: 9.99, lat: 53.55, congestion: 0.62, geopolitical: 0.15, weather: 0.4, throughput: 70 },
  { id: "BEANR", name: "Port of Antwerp", city: "Antwerp", country: "BE", kind: "seaport", lng: 4.4, lat: 51.22, congestion: 0.65, geopolitical: 0.15, weather: 0.4, throughput: 75 },
  { id: "ESALG", name: "Algeciras", city: "Algeciras", country: "ES", kind: "seaport", lng: -5.45, lat: 36.13, congestion: 0.55, geopolitical: 0.2, weather: 0.3, throughput: 50 },
  { id: "GRPIR", name: "Piraeus", city: "Piraeus", country: "GR", kind: "seaport", lng: 23.64, lat: 37.94, congestion: 0.55, geopolitical: 0.3, weather: 0.3, throughput: 45 },
  { id: "USLAX", name: "Port of Los Angeles", city: "Los Angeles", country: "US", kind: "seaport", lng: -118.27, lat: 33.74, congestion: 0.8, geopolitical: 0.1, weather: 0.4, throughput: 90 },
  { id: "USLGB", name: "Port of Long Beach", city: "Long Beach", country: "US", kind: "seaport", lng: -118.22, lat: 33.75, congestion: 0.78, geopolitical: 0.1, weather: 0.4, throughput: 85 },
  { id: "USNYC", name: "Port of NY/NJ", city: "New York", country: "US", kind: "seaport", lng: -74.04, lat: 40.67, congestion: 0.7, geopolitical: 0.1, weather: 0.5, throughput: 80 },
  { id: "USSAV", name: "Port of Savannah", city: "Savannah", country: "US", kind: "seaport", lng: -81.14, lat: 32.13, congestion: 0.6, geopolitical: 0.1, weather: 0.55, throughput: 60 },
  { id: "PAONX", name: "Colón (Panama)", city: "Colón", country: "PA", kind: "seaport", lng: -79.9, lat: 9.36, congestion: 0.75, geopolitical: 0.3, weather: 0.55, throughput: 65 },
  { id: "BRSSZ", name: "Port of Santos", city: "Santos", country: "BR", kind: "seaport", lng: -46.33, lat: -23.96, congestion: 0.6, geopolitical: 0.3, weather: 0.45, throughput: 55 },
  { id: "ZADUR", name: "Port of Durban", city: "Durban", country: "ZA", kind: "seaport", lng: 31.04, lat: -29.87, congestion: 0.55, geopolitical: 0.35, weather: 0.5, throughput: 45 },
  { id: "INMUN", name: "JNPT Mumbai", city: "Mumbai", country: "IN", kind: "seaport", lng: 72.95, lat: 18.95, congestion: 0.7, geopolitical: 0.4, weather: 0.55, throughput: 70 },
  { id: "INNSA", name: "Nhava Sheva", city: "Mumbai", country: "IN", kind: "seaport", lng: 72.94, lat: 18.95, congestion: 0.68, geopolitical: 0.4, weather: 0.55, throughput: 65 },
  { id: "AUMEL", name: "Port of Melbourne", city: "Melbourne", country: "AU", kind: "seaport", lng: 144.92, lat: -37.84, congestion: 0.5, geopolitical: 0.1, weather: 0.4, throughput: 45 },
  { id: "CLVAP", name: "Port of Valparaíso", city: "Valparaíso", country: "CL", kind: "seaport", lng: -71.62, lat: -33.04, congestion: 0.5, geopolitical: 0.25, weather: 0.45, throughput: 35 },
  { id: "TRMER", name: "Port of Mersin", city: "Mersin", country: "TR", kind: "seaport", lng: 34.64, lat: 36.79, congestion: 0.55, geopolitical: 0.5, weather: 0.3, throughput: 40 },
  { id: "MAPTM", name: "Tanger-Med", city: "Tangier", country: "MA", kind: "seaport", lng: -5.51, lat: 35.88, congestion: 0.6, geopolitical: 0.3, weather: 0.3, throughput: 55 },

  // Airports
  { id: "HKG", name: "Hong Kong Intl", city: "Hong Kong", country: "HK", kind: "airport", lng: 113.93, lat: 22.31, congestion: 0.7, geopolitical: 0.4, weather: 0.55, throughput: 95 },
  { id: "PVG", name: "Shanghai Pudong", city: "Shanghai", country: "CN", kind: "airport", lng: 121.81, lat: 31.14, congestion: 0.78, geopolitical: 0.45, weather: 0.55, throughput: 90 },
  { id: "ICN", name: "Incheon Intl", city: "Seoul", country: "KR", kind: "airport", lng: 126.45, lat: 37.46, congestion: 0.65, geopolitical: 0.35, weather: 0.45, throughput: 80 },
  { id: "NRT", name: "Narita Intl", city: "Tokyo", country: "JP", kind: "airport", lng: 140.39, lat: 35.77, congestion: 0.6, geopolitical: 0.2, weather: 0.6, throughput: 70 },
  { id: "SIN", name: "Changi", city: "Singapore", country: "SG", kind: "airport", lng: 103.99, lat: 1.36, congestion: 0.65, geopolitical: 0.15, weather: 0.4, throughput: 90 },
  { id: "DXB", name: "Dubai Intl", city: "Dubai", country: "AE", kind: "airport", lng: 55.36, lat: 25.25, congestion: 0.78, geopolitical: 0.55, weather: 0.3, throughput: 95 },
  { id: "DOH", name: "Hamad Intl", city: "Doha", country: "QA", kind: "airport", lng: 51.61, lat: 25.27, congestion: 0.6, geopolitical: 0.55, weather: 0.3, throughput: 70 },
  { id: "FRA", name: "Frankfurt", city: "Frankfurt", country: "DE", kind: "airport", lng: 8.57, lat: 50.04, congestion: 0.72, geopolitical: 0.15, weather: 0.4, throughput: 90 },
  { id: "AMS", name: "Schiphol", city: "Amsterdam", country: "NL", kind: "airport", lng: 4.76, lat: 52.31, congestion: 0.7, geopolitical: 0.15, weather: 0.4, throughput: 85 },
  { id: "CDG", name: "Charles de Gaulle", city: "Paris", country: "FR", kind: "airport", lng: 2.55, lat: 49.01, congestion: 0.7, geopolitical: 0.2, weather: 0.4, throughput: 85 },
  { id: "LHR", name: "Heathrow", city: "London", country: "GB", kind: "airport", lng: -0.45, lat: 51.47, congestion: 0.75, geopolitical: 0.2, weather: 0.45, throughput: 90 },
  { id: "MEM", name: "Memphis Intl (FedEx)", city: "Memphis", country: "US", kind: "airport", lng: -89.98, lat: 35.04, congestion: 0.6, geopolitical: 0.1, weather: 0.5, throughput: 95 },
  { id: "ANC", name: "Anchorage (Cargo)", city: "Anchorage", country: "US", kind: "airport", lng: -149.99, lat: 61.17, congestion: 0.55, geopolitical: 0.1, weather: 0.7, throughput: 80 },
  { id: "LAX", name: "Los Angeles Intl", city: "Los Angeles", country: "US", kind: "airport", lng: -118.41, lat: 33.94, congestion: 0.75, geopolitical: 0.1, weather: 0.4, throughput: 85 },
  { id: "JFK", name: "JFK Intl", city: "New York", country: "US", kind: "airport", lng: -73.78, lat: 40.64, congestion: 0.78, geopolitical: 0.1, weather: 0.55, throughput: 85 },
  { id: "ORD", name: "Chicago O'Hare", city: "Chicago", country: "US", kind: "airport", lng: -87.9, lat: 41.98, congestion: 0.72, geopolitical: 0.1, weather: 0.6, throughput: 80 },
  { id: "GRU", name: "São Paulo/Guarulhos", city: "São Paulo", country: "BR", kind: "airport", lng: -46.47, lat: -23.43, congestion: 0.6, geopolitical: 0.3, weather: 0.45, throughput: 60 },
  { id: "JNB", name: "OR Tambo", city: "Johannesburg", country: "ZA", kind: "airport", lng: 28.24, lat: -26.13, congestion: 0.55, geopolitical: 0.35, weather: 0.4, throughput: 55 },
  { id: "BOM", name: "Mumbai Intl", city: "Mumbai", country: "IN", kind: "airport", lng: 72.87, lat: 19.09, congestion: 0.78, geopolitical: 0.4, weather: 0.55, throughput: 75 },
  { id: "DEL", name: "Delhi IGI", city: "Delhi", country: "IN", kind: "airport", lng: 77.1, lat: 28.56, congestion: 0.75, geopolitical: 0.4, weather: 0.5, throughput: 75 },
  { id: "SYD", name: "Sydney Intl", city: "Sydney", country: "AU", kind: "airport", lng: 151.18, lat: -33.94, congestion: 0.6, geopolitical: 0.1, weather: 0.4, throughput: 65 },
  { id: "IST", name: "Istanbul", city: "Istanbul", country: "TR", kind: "airport", lng: 28.74, lat: 41.27, congestion: 0.7, geopolitical: 0.5, weather: 0.4, throughput: 80 },
];

// ---- Edges (undirected logical lanes) -----------------------------------
// Costs/days are illustrative. Maritime lanes are slow+cheap, air is fast+expensive.
const E = (source: string, target: string, costUsd: number, transitDays: number, trafficVolume: number): TradeEdge => ({
  source, target, costUsd, transitDays, trafficVolume,
});

export const EDGES: TradeEdge[] = [
  // Asia trans-Pacific (sea)
  E("CNSHA", "USLAX", 2400, 14, 95),
  E("CNSHA", "USLGB", 2350, 14, 90),
  E("CNSZX", "USLAX", 2450, 15, 88),
  E("CNNGB", "USLGB", 2380, 14, 80),
  E("KRPUS", "USLAX", 2500, 13, 70),
  E("JPYOK", "USLAX", 2600, 12, 60),
  // Asia hubs
  E("SGSIN", "CNSHA", 900, 5, 95),
  E("SGSIN", "CNSZX", 850, 4, 90),
  E("SGSIN", "HKHKG", 800, 3, 80),
  E("SGSIN", "INMUN", 1100, 6, 70),
  E("SGSIN", "INNSA", 1080, 6, 70),
  E("HKHKG", "CNSZX", 200, 1, 75),
  E("CNSHA", "KRPUS", 600, 3, 70),
  E("KRPUS", "JPYOK", 500, 2, 55),
  // Asia → Europe via Suez
  E("SGSIN", "EGSUZ", 2200, 14, 90),
  E("EGSUZ", "EGPSD", 80, 1, 95),
  E("EGPSD", "GRPIR", 700, 3, 60),
  E("EGPSD", "NLRTM", 2100, 12, 90),
  E("EGPSD", "DEHAM", 2200, 13, 75),
  E("EGPSD", "BEANR", 2150, 12, 80),
  E("EGPSD", "ESALG", 1300, 7, 60),
  // Middle East
  E("SGSIN", "AEDXB", 1700, 9, 75),
  E("AEDXB", "EGSUZ", 1100, 5, 60),
  E("AEDXB", "INMUN", 800, 4, 65),
  E("AEDXB", "INNSA", 800, 4, 60),
  // Europe inland
  E("NLRTM", "DEHAM", 250, 2, 80),
  E("NLRTM", "BEANR", 180, 1, 85),
  E("BEANR", "DEHAM", 280, 2, 70),
  E("ESALG", "MAPTM", 120, 1, 60),
  E("ESALG", "NLRTM", 1100, 6, 55),
  E("GRPIR", "TRMER", 600, 3, 40),
  // Atlantic
  E("NLRTM", "USNYC", 1900, 9, 75),
  E("DEHAM", "USNYC", 2000, 10, 60),
  E("NLRTM", "USSAV", 2100, 11, 60),
  E("USNYC", "USSAV", 600, 3, 55),
  // Panama corridor
  E("USLAX", "PAONX", 1500, 7, 60),
  E("PAONX", "USNYC", 1400, 7, 65),
  E("PAONX", "USSAV", 1300, 6, 55),
  E("PAONX", "BRSSZ", 1700, 9, 45),
  E("PAONX", "CLVAP", 1500, 7, 40),
  // Southern hemisphere
  E("BRSSZ", "ZADUR", 2400, 14, 35),
  E("ZADUR", "INMUN", 2500, 14, 40),
  E("ZADUR", "AUMEL", 3200, 18, 25),
  E("SGSIN", "AUMEL", 2400, 13, 45),
  // Air freight backbone
  E("HKG", "LAX", 9500, 1, 90),
  E("HKG", "ANC", 8500, 1, 75),
  E("ANC", "MEM", 5500, 1, 80),
  E("ANC", "ORD", 5400, 1, 70),
  E("PVG", "LAX", 9700, 1, 85),
  E("PVG", "ANC", 8600, 1, 75),
  E("ICN", "LAX", 9400, 1, 70),
  E("NRT", "LAX", 9200, 1, 65),
  E("SIN", "DXB", 6800, 1, 80),
  E("DXB", "FRA", 6500, 1, 85),
  E("DXB", "LHR", 6900, 1, 80),
  E("DOH", "FRA", 6400, 1, 60),
  E("FRA", "JFK", 7800, 1, 85),
  E("LHR", "JFK", 7600, 1, 85),
  E("CDG", "JFK", 7700, 1, 75),
  E("AMS", "JFK", 7700, 1, 75),
  E("FRA", "AMS", 900, 1, 60),
  E("FRA", "CDG", 1000, 1, 60),
  E("CDG", "LHR", 800, 1, 65),
  E("MEM", "JFK", 2200, 1, 70),
  E("MEM", "ORD", 1800, 1, 70),
  E("LAX", "JFK", 3500, 1, 80),
  E("LAX", "ORD", 3000, 1, 70),
  E("BOM", "DXB", 4500, 1, 70),
  E("DEL", "DXB", 4600, 1, 70),
  E("DEL", "FRA", 6800, 1, 60),
  E("BOM", "SIN", 4800, 1, 60),
  E("SIN", "SYD", 6600, 1, 60),
  E("HKG", "SYD", 7500, 1, 55),
  E("GRU", "JFK", 8400, 1, 55),
  E("GRU", "FRA", 9500, 1, 50),
  E("JNB", "DXB", 7300, 1, 50),
  E("JNB", "FRA", 8800, 1, 45),
  E("IST", "FRA", 2400, 1, 65),
  E("IST", "DXB", 3200, 1, 60),
  // Sea ↔ Air co-located transfer (intermodal)
  E("SGSIN", "SIN", 50, 1, 60),
  E("HKHKG", "HKG", 50, 1, 55),
  E("CNSHA", "PVG", 80, 1, 60),
  E("AEDXB", "DXB", 60, 1, 65),
  E("USLAX", "LAX", 60, 1, 70),
  E("USNYC", "JFK", 60, 1, 65),
  E("NLRTM", "AMS", 80, 1, 60),
  E("DEHAM", "FRA", 200, 1, 50),
  E("INMUN", "BOM", 50, 1, 55),
  E("ZADUR", "JNB", 250, 1, 40),
];

// Composite risk score 0-1
export function riskScore(n: TradeNode): number {
  return Math.min(
    1,
    0.45 * n.congestion + 0.35 * n.geopolitical + 0.2 * n.weather,
  );
}

export function riskBand(score: number): "low" | "medium" | "high" | "critical" {
  if (score >= 0.75) return "critical";
  if (score >= 0.55) return "high";
  if (score >= 0.35) return "medium";
  return "low";
}
