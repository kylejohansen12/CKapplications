/**
 * ResidentialSection — C&K Applications
 * Off-white background, service cards with blue hover, gold accents
 */
import { useEffect, useRef, useState } from "react";
import { Droplets, Paintbrush, Wind, Wrench, Layers, Home } from "lucide-react";

const BEFORE_AFTER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/residential-services-6DQkqXGMXZGXEVqzdo4F74.webp";
const GUTTER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/gutter-cleaning-2MRxpK3QdXfB3Z9Pa5rXMJ.webp";
const DECK_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/deck-staining-c5rLmGMwWZyUFgYUKmm92q.webp";

const services = [
  {
    icon: Droplets,
    title: "Pressure Washing",
    description:
      "High-powered cleaning for driveways, siding, decks, patios, and walkways. We remove years of dirt, mold, and grime to restore your home's curb appeal.",
    image: null,
  },
  {
    icon: Paintbrush,
    title: "Painting",
    description:
      "Interior and exterior painting services with premium materials. Our skilled painters deliver clean, lasting finishes that protect and beautify your home.",
    image: null,
  },
  {
    icon: Home,
    title: "Gutter Cleaning",
    description:
      "Thorough gutter and downspout cleaning to prevent water damage, foundation issues, and pest infestations. We leave your gutters flowing freely.",
    image: GUTTER_IMAGE,
  },
  {
    icon: Wind,
    title: "Dryer Vent Cleaning",
    description:
      "Reduce fire risk and improve dryer efficiency with professional vent cleaning. Clogged dryer vents are a leading cause of home fires — don't wait.",
    image: null,
  },
  {
    icon: Wrench,
    title: "Handyman Services",
    description:
      "From minor repairs to small projects, our handyman team handles the tasks that pile up. Reliable, skilled, and ready to help around your home.",
    image: null,
  },
  {
    icon: Layers,
    title: "Deck Paint & Staining",
    description:
      "Protect and beautify your deck with professional paint or stain application. We prep, clean, and apply for a finish that lasts through every season.",
    image: DECK_IMAGE,
  },
];

function useInView(threshold = 0.15) {
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

export default function ResidentialSection() {
  const { ref, inView } = useInView();

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="residential"
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
    >
      <div className="container">
        {/* Section header */}
        <div
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded" style={{ backgroundColor: "oklch(0.72 0.16 70)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.45 0.15 260)", fontFamily: "Oswald, sans-serif" }}
            >
              For Homeowners
            </span>
          </div>
          <h2
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase",
              color: "oklch(0.22 0.02 255)",
            }}
          >
            Residential Home Services
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "oklch(0.45 0.02 255)", fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            From a thorough pressure wash to a fresh coat of paint, we handle every
            aspect of your home's exterior care. Trusted by over 1,000 Triangle Area
            homeowners.
          </p>
        </div>

        {/* Two-column layout: image left, services right */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
          {/* Before/After image */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={BEFORE_AFTER_IMAGE}
                alt="Before and after pressure washing"
                className="w-full h-auto"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: "linear-gradient(to top, oklch(0.15 0.10 260 / 0.85), transparent)" }}
              >
                <p
                  className="text-white font-semibold"
                  style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}
                >
                  Real Results, Real Homes
                </p>
                <p
                  className="text-white/70 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Triangle Area, NC
                </p>
              </div>
            </div>
          </div>

          {/* Service list */}
          <div
            className={`space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            {services.slice(0, 4).map((service, i) => (
              <ServiceCard key={service.title} service={service} delay={i * 0.05} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom row: remaining services + image cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(4).map((service, i) => (
            <ServiceImageCard key={service.title} service={service} delay={(i + 4) * 0.08} inView={inView} />
          ))}
          {/* CTA card */}
          <div
            className={`rounded-lg p-8 flex flex-col justify-between transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              backgroundColor: "oklch(0.28 0.12 260)",
              transitionDelay: "0.6s",
            }}
          >
            <div>
              <h3
                className="text-white font-bold mb-3"
                style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.4rem", textTransform: "uppercase" }}
              >
                Ready to Transform Your Home?
              </h3>
              <p
                className="text-white/70 text-sm mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Get a free, no-obligation estimate from our team today.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: "oklch(0.45 0.15 260)",
                color: "oklch(0.12 0.02 255)",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
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
      className={`flex gap-4 p-4 rounded-lg border transition-all duration-700 hover:shadow-md group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{
        borderColor: "oklch(0.88 0.01 80)",
        backgroundColor: "white",
        transitionDelay: `${delay}s`,
      }}
    >
      <div
        className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-blue-500"
        style={{ backgroundColor: "oklch(0.28 0.12 260 / 0.1)" }}
      >
        <Icon size={20} style={{ color: "oklch(0.28 0.12 260)" }} />
      </div>
      <div>
        <h3
          className="font-bold mb-1"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "1.05rem",
            textTransform: "uppercase",
            color: "oklch(0.22 0.02 255)",
          }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.50 0.02 255)", fontFamily: "Inter, sans-serif" }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

function ServiceImageCard({
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
      className={`rounded-lg border overflow-hidden transition-all duration-700 hover:shadow-xl hover:-translate-y-1 group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        borderColor: "oklch(0.88 0.01 80)",
        backgroundColor: "white",
        transitionDelay: `${delay}s`,
      }}
    >
      {service.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {!service.image && (
        <div
          className="h-44 flex items-center justify-center"
          style={{ backgroundColor: "oklch(0.28 0.08 155 / 0.06)" }}
        >
          <Icon size={48} style={{ color: "oklch(0.28 0.08 155 / 0.3)" }} />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Icon size={16} style={{ color: "oklch(0.45 0.15 260)" }} />
          <h3
            className="font-bold"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "1rem",
              textTransform: "uppercase",
              color: "oklch(0.22 0.02 255)",
            }}
          >
            {service.title}
          </h3>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.50 0.02 255)", fontFamily: "Inter, sans-serif" }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}
