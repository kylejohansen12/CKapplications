/**
 * CommercialSection — C&K Applications
 * Dark blue background (reversed colors), gold accents
 * Full-bleed commercial roof coating image
 */
import { useEffect, useRef, useState } from "react";
import { Droplets, Paintbrush, Home, Wrench, Shield, Layers } from "lucide-react";
import { ArrowRight } from "lucide-react";

const COMMERCIAL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/commercial-roof-coating-Y5kR3itueTqYVDnWgLiTCC.webp";

const services = [
  {
    icon: Droplets,
    title: "Pressure Washing",
    description:
      "Commercial-grade pressure washing for parking lots, building facades, loading docks, and more. We handle large-scale jobs with professional equipment.",
  },
  {
    icon: Paintbrush,
    title: "Commercial Painting",
    description:
      "Interior and exterior commercial painting for offices, warehouses, retail spaces, and industrial facilities. Minimal disruption to your operations.",
  },
  {
    icon: Home,
    title: "Gutter Cleaning",
    description:
      "Keep your commercial property's drainage systems clear and functional. We service gutters, downspouts, and drainage systems on buildings of all sizes.",
  },
  {
    icon: Wrench,
    title: "Roof Cleaning",
    description:
      "Soft-wash and pressure-wash roof cleaning to remove algae, moss, lichen, and debris. Extends roof life and improves building appearance.",
  },
  {
    icon: Shield,
    title: "Roof Repairs",
    description:
      "Targeted commercial roof repairs to address leaks, seam failures, and membrane damage before they become costly problems.",
  },
  {
    icon: Layers,
    title: "Roof Coatings",
    description:
      "Elastomeric and silicone roof coating systems that extend roof life by 10–20 years, reduce energy costs, and provide seamless waterproofing.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function CommercialSection() {
  const { ref, inView } = useInView();

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="commercial"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.20 0.12 260)" }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded" style={{ backgroundColor: "oklch(0.72 0.16 70)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Oswald, sans-serif" }}
            >
              For Business Owners
            </span>
          </div>
          <h2
            className="font-bold leading-tight mb-4 text-white"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase",
            }}
          >
            Commercial Building Services
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "oklch(0.75 0.03 80)", fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            We protect your commercial investment with industrial-grade cleaning, coating,
            and maintenance services. From small retail shops to large commercial complexes
            across the Triangle Area.
          </p>
        </div>

        {/* Main content: services grid + image */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Services grid — 3 columns on left */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <CommercialCard
                key={service.title}
                service={service}
                delay={i * 0.08}
                inView={inView}
              />
            ))}
          </div>

          {/* Right column: image + CTA */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={COMMERCIAL_IMAGE}
                alt="Commercial roof coating application"
                className="w-full h-auto"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.15 0.10 260 / 0.7) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="text-white font-bold mb-1"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", textTransform: "uppercase" }}
                >
                  Roof Coating Specialists
                </p>
                <p
                  className="text-white/70 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Extend your roof's life by 10–20 years
                </p>
              </div>
            </div>

            {/* Roof coating highlight box */}
            <div
              className="rounded-lg p-6"
              style={{ backgroundColor: "oklch(0.28 0.12 260)", border: "1px solid oklch(0.40 0.12 260)" }}
            >
              <div
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Oswald, sans-serif" }}
              >
                Why Roof Coatings?
              </div>
              <ul className="space-y-2">
                {[
                  "Extends roof life 10–20 years",
                  "Reduces energy costs up to 30%",
                  "Seamless waterproofing",
                  "No tear-off required",
                  "Reflective — reduces heat gain",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(0.80 0.03 80)", fontFamily: "Inter, sans-serif" }}
                  >
                    <ArrowRight size={14} style={{ color: "oklch(0.72 0.16 70)", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3.5 rounded font-semibold text-sm transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: "oklch(0.72 0.16 70)",
                color: "oklch(0.12 0.02 255)",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Request Commercial Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommercialCard({
  service,
  delay,
  inView,
}: {
  service: (typeof services)[0];
  delay: number;
  inView: boolean;
}) {
  const Icon = service.icon;
  return (
    <div
      className={`p-5 rounded-lg transition-all duration-700 hover:shadow-xl group cursor-default ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        backgroundColor: "oklch(0.28 0.12 260)",
        border: "1px solid oklch(0.40 0.12 260)",
        transitionDelay: `${delay}s`,
      }}
    >
      <div
        className="w-10 h-10 rounded flex items-center justify-center mb-3 transition-colors"
        style={{ backgroundColor: "oklch(0.72 0.16 70 / 0.15)" }}
      >
        <Icon size={20} style={{ color: "oklch(0.72 0.16 70)" }} />
      </div>
      <h3
        className="font-bold mb-2 text-white"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {service.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.70 0.03 80)", fontFamily: "Inter, sans-serif" }}
      >
        {service.description}
      </p>
    </div>
  );
}
