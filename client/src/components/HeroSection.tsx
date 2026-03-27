/**
 * HeroSection — C&K Applications
 * Full-bleed hero with asymmetric text layout, diagonal clip, gold CTA
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/hero-pressure-wash-AS6f5vAg5vaUfRe5yor8dh.webp";

const stats = [
  { value: "1,000+", label: "Homes Served" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction" },
  { value: "Triangle", label: "Area Experts" },
];

const highlights = [
  "Licensed & Insured",
  "Free Estimates",
  "Residential & Commercial",
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Professional pressure washing"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay — left side heavier for text readability */}
        <div
          className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.15 0.10 260 / 0.92) 0%, oklch(0.15 0.10 260 / 0.80) 45%, oklch(0.15 0.10 260 / 0.30) 100%)",
        }}
        />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0.1s" }}
          >
          <div
            className="h-0.5 w-12"
            style={{ backgroundColor: "oklch(0.45 0.15 260)" }}
          />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.45 0.15 260)", fontFamily: "Oswald, sans-serif" }}
            >
              Triangle Area, NC
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-white font-bold leading-none mb-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              transitionDelay: "0.2s",
            }}
          >
            Professional
            <br />
            <span style={{ color: "oklch(0.45 0.15 260)" }}>Roof Coatings</span>
            <br />
            & Power Washing
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg mb-6 leading-relaxed transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              color: "oklch(0.88 0.02 80)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              maxWidth: "480px",
              transitionDelay: "0.3s",
            }}
          >
            Over 1,000 homes and countless commercial properties cleaned,
            protected, and restored across the Triangle Area. Residential and
            commercial services you can trust.
          </p>

          {/* Highlights */}
          <div
            className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 px-3 py-1 rounded" style={{ borderLeft: "3px solid oklch(0.72 0.16 70)" }}>
                <CheckCircle2 size={16} style={{ color: "oklch(0.45 0.15 260)" }} />
                <span
                  className="text-sm text-white/90"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: "oklch(0.45 0.15 260)",
                color: "oklch(0.12 0.02 255)",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.95rem",
              }}
            >
              Get a Free Quote
              <ArrowRight size={16} />
            </button>
            <a
              href="tel:+19196215375"
              className="flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm transition-all hover:bg-white/20"
              style={{
                border: "2px solid rgba(255,255,255,0.6)",
                color: "white",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.95rem",
              }}
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Stats row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.6s" }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded p-3"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
              >
                <div
                  className="font-bold leading-none mb-1"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: "1.6rem",
                    color: "oklch(0.45 0.15 260)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs text-white/70 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal bottom cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-10"
        style={{
          background: "oklch(0.97 0.01 80)",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </section>
  );
}
