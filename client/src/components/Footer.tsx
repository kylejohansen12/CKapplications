/**
 * Footer — Rugged Americana / Blue-Collar Premium
 * Dark green background, amber accents, clean link layout
 */
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const residentialServices = [
  "Pressure Washing",
  "Painting",
  "Gutter Cleaning",
  "Dryer Vent Cleaning",
  "Handyman Services",
  "Deck Paint & Staining",
];

const commercialServices = [
  "Pressure Washing",
  "Painting",
  "Gutter Cleaning",
  "Roof Cleaning",
  "Roof Repairs",
  "Roof Coatings",
];

const serviceAreas = [
  "Raleigh, NC",
  "Durham, NC",
  "Chapel Hill, NC",
  "Cary, NC",
  "Apex, NC",
  "Wake Forest, NC",
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "oklch(0.15 0.07 155)" }}>
      {/* CTA Banner */}
      <div
        className="py-10"
        style={{ backgroundColor: "oklch(0.72 0.16 70)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="font-bold text-xl"
              style={{ fontFamily: "Oswald, sans-serif", textTransform: "uppercase", color: "oklch(0.12 0.02 255)" }}
            >
              Ready to Get Started?
            </p>
            <p
              className="text-sm"
              style={{ color: "oklch(0.25 0.04 255)", fontFamily: "Inter, sans-serif" }}
            >
              Free estimates for all residential and commercial services.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-3 rounded font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: "oklch(0.20 0.12 260)",
                color: "white",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Get Free Quote
            </button>
            <a
              href="tel:+19195550100"
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all hover:bg-black/10"
              style={{
                border: "2px solid oklch(0.20 0.12 260)",
                color: "oklch(0.12 0.02 255)",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <Phone size={14} />
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded flex items-center justify-center font-bold text-lg"
                style={{
                  backgroundColor: "oklch(0.72 0.16 70)",
                  color: "oklch(0.15 0.02 255)",
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                CK
              </div>
              <div>
                <div
                  className="text-white font-bold leading-tight"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "0.95rem", letterSpacing: "0.05em" }}
                >
                  CK APPLICATIONS
                </div>
                <div
                  className="leading-tight"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6rem",
                    color: "oklch(0.72 0.16 70)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Pressure Washing & Roof Coatings
                </div>
              </div>
            </div>
            <p
              className="text-sm mb-5 leading-relaxed"
              style={{ color: "oklch(0.65 0.03 80)", fontFamily: "Inter, sans-serif" }}
            >
              Serving the Triangle Area with professional pressure washing,
              roof coatings, and exterior home services since day one.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+19196215375"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Inter, sans-serif" }}
              >
                <Phone size={13} />
                (919) 621-5375
              </a>
              <a
                href="mailto:info@ckapplications.com"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Inter, sans-serif" }}
              >
                <Mail size={13} />
                info@ckapplications.com
              </a>
              <div
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.65 0.03 80)", fontFamily: "Inter, sans-serif" }}
              >
                <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: "oklch(0.72 0.16 70)" }} />
                Triangle Area, NC
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: "oklch(0.28 0.12 260)", color: "oklch(0.72 0.16 70)" }}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: "oklch(0.28 0.12 260)", color: "oklch(0.72 0.16 70)" }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Residential */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.72 0.16 70)" }}
            >
              Residential
            </h4>
            <ul className="space-y-2">
              {residentialServices.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#residential")}
                    className="text-sm hover:text-white transition-colors text-left"
                    style={{ color: "oklch(0.65 0.03 80)", fontFamily: "Inter, sans-serif" }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.72 0.16 70)" }}
            >
              Commercial
            </h4>
            <ul className="space-y-2">
              {commercialServices.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#commercial")}
                    className="text-sm hover:text-white transition-colors text-left"
                    style={{ color: "oklch(0.65 0.03 80)", fontFamily: "Inter, sans-serif" }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.72 0.16 70)" }}
            >
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.03 80)", fontFamily: "Inter, sans-serif" }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-4"
        style={{ borderTop: "1px solid oklch(0.28 0.12 260)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.03 80)", fontFamily: "Inter, sans-serif" }}
          >
            © {new Date().getFullYear()} C&K Applications Pressure Washing & Coatings. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.03 80)", fontFamily: "Inter, sans-serif" }}
          >
            Licensed & Insured | Triangle Area, NC
          </p>
        </div>
      </div>
    </footer>
  );
}
