/**
 * ServiceAreaMap — CK Applications
 * Interactive Google Map showing service area coverage
 * Blue and gold design theme
 */
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { MapView } from "@/components/Map";

const SERVICE_AREAS = [
  // Primary cities
  { name: "Raleigh", lat: 35.7796, lng: -78.6382, type: "primary" },
  { name: "Durham", lat: 35.9940, lng: -78.8986, type: "primary" },
  { name: "Chapel Hill", lat: 35.9132, lng: -79.0558, type: "primary" },
  
  // Secondary cities
  { name: "Cary", lat: 35.7915, lng: -78.7811, type: "secondary" },
  { name: "Morrisville", lat: 35.8367, lng: -78.8217, type: "secondary" },
  { name: "Apex", lat: 35.7325, lng: -78.8502, type: "secondary" },
  { name: "Garner", lat: 35.6954, lng: -78.6302, type: "secondary" },
  { name: "Knightdale", lat: 35.7686, lng: -78.5129, type: "secondary" },
  { name: "Zebulon", lat: 35.8224, lng: -78.5016, type: "secondary" },
  { name: "Wake Forest", lat: 35.9778, lng: -78.5096, type: "secondary" },
  { name: "Rolesville", lat: 35.9542, lng: -78.3931, type: "secondary" },
  { name: "Wendell", lat: 35.7755, lng: -78.4236, type: "secondary" },
];

export default function ServiceAreaMap() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Add markers for each service area
    SERVICE_AREAS.forEach((area) => {
      const markerColor = area.type === "primary" ? "#D4AF37" : "#003D7A";
      const marker = new window.google.maps.Marker({
        position: { lat: area.lat, lng: area.lng },
        map: map,
        title: area.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: area.type === "primary" ? 12 : 8,
          fillColor: markerColor,
          fillOpacity: 0.9,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="color: #003d7a; font-family: Oswald, sans-serif; font-weight: bold;">${area.name}</div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    // Add service area polygon (approximate coverage)
    const serviceAreaBounds = [
      { lat: 35.5, lng: -79.2 },
      { lat: 36.2, lng: -79.2 },
      { lat: 36.2, lng: -78.2 },
      { lat: 35.5, lng: -78.2 },
    ];

    new window.google.maps.Polygon({
      paths: serviceAreaBounds,
      geodesic: true,
      strokeColor: "#D4AF37",
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: "#D4AF37",
      fillOpacity: 0.08,
      map: map,
    });
  };

  return (
    <section className="py-24 bg-white" id="service-area">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <div
            className="text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Oswald, sans-serif" }}
          >
            Service Coverage
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.20 0.12 260)", fontFamily: "Oswald, sans-serif" }}
          >
            We Serve the Triangle Area
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "oklch(0.40 0.03 80)", fontFamily: "Inter, sans-serif" }}
          >
            From Raleigh to Durham, Chapel Hill to Cary, and beyond. Click on any city marker to see if we serve your neighborhood.
          </p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <MapView
              initialCenter={{ lat: 35.8801, lng: -78.7880 }}
              initialZoom={10}
              onMapReady={handleMapReady}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Service Areas List */}
          <div>
            <div
              className="rounded-lg p-6"
              style={{ backgroundColor: "oklch(0.98 0.001 286.375)" }}
            >
              <div
                className="text-sm font-bold tracking-widest uppercase mb-4"
                style={{ color: "oklch(0.20 0.12 260)", fontFamily: "Oswald, sans-serif" }}
              >
                Primary Service Areas
              </div>
              <div className="space-y-3 mb-6">
                {SERVICE_AREAS.filter((a) => a.type === "primary").map((area) => (
                  <div key={area.name} className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      style={{ color: "oklch(0.72 0.16 70)", flexShrink: 0 }}
                    />
                    <span
                      style={{ color: "oklch(0.20 0.12 260)", fontFamily: "Inter, sans-serif" }}
                    >
                      {area.name}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="text-sm font-bold tracking-widest uppercase mb-4"
                style={{ color: "oklch(0.20 0.12 260)", fontFamily: "Oswald, sans-serif" }}
              >
                Also Serving
              </div>
              <div className="space-y-2">
                {SERVICE_AREAS.filter((a) => a.type === "secondary").map((area) => (
                  <div key={area.name} className="flex items-center gap-2 text-sm">
                    <MapPin
                      size={14}
                      style={{ color: "oklch(0.72 0.16 70)", flexShrink: 0 }}
                    />
                    <span
                      style={{ color: "oklch(0.40 0.03 80)", fontFamily: "Inter, sans-serif" }}
                    >
                      {area.name}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-6 border-t"
                style={{ borderColor: "oklch(0.92 0.004 286.32)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.40 0.03 80)", fontFamily: "Inter, sans-serif" }}
                >
                  Don't see your area? <strong>Call us</strong> at{" "}
                  <a
                    href="tel:+19196215375"
                    style={{ color: "oklch(0.72 0.16 70)" }}
                    className="hover:underline"
                  >
                    (919) 621-5375
                  </a>{" "}
                  — we may still be able to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
