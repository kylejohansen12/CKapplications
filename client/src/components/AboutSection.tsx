/**
 * AboutSection — Rugged Americana / Blue-Collar Premium
 * Off-white background, animated stat counters, trust badges
 */
import { useEffect, useRef, useState } from "react";
import { Award, Users, MapPin, ThumbsUp } from "lucide-react";

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

function AnimatedCounter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 1000, suffix: "+", label: "Homes Served", sub: "Across the Triangle Area" },
  { icon: Award, value: 10, suffix: "+", label: "Years in Business", sub: "Trusted since day one" },
  { icon: MapPin, value: 10, suffix: "+", label: "Multiple Cities Served", sub: "Raleigh, Durham, Chapel Hill & more" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Satisfaction Goal", sub: "We don't leave until it's right" },
];

const values = [
  {
    title: "Locally Owned & Operated",
    body:
      "We're your neighbors. C&K Applications was founded right here in the Triangle Area and we take pride in serving our community with integrity.",
  },
  {
    title: "Licensed & Fully Insured",
    body:
      "Every job is backed by full liability insurance and proper licensing. You're protected, and so is our team, on every project.",
  },
  {
    title: "No Job Too Big or Small",
    body:
      "From a single-story home to a multi-building commercial complex, we bring the same professionalism and attention to detail to every project.",
  },
  {
    title: "Transparent Pricing",
    body:
      "No hidden fees, no surprise charges. We provide clear, detailed estimates before any work begins so you know exactly what to expect.",
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "white" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded" style={{ backgroundColor: "oklch(0.45 0.15 260)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.45 0.15 260)", fontFamily: "Oswald, sans-serif" }}
            >
              Who We Are
            </span>
          </div>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase",
              color: "oklch(0.22 0.02 255)",
            }}
          >
            The Triangle's Trusted
            <br />
            <span style={{ color: "oklch(0.28 0.12 260)" }}>Exterior Service Pros</span>
          </h2>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.2s" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-lg"
                style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "oklch(0.28 0.08 155 / 0.1)" }}
                >
                  <Icon size={22} style={{ color: "oklch(0.28 0.12 260)" }} />
                </div>
                <div
                  className="font-bold leading-none mb-1"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: "2.2rem",
                    color: "oklch(0.28 0.12 260)",
                  }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <div
                  className="font-semibold mb-1 text-sm"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "oklch(0.22 0.02 255)",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.02 255)", fontFamily: "Inter, sans-serif" }}
                >
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-column: story + values */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Our story */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <h3
              className="font-bold mb-5"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "1.6rem",
                textTransform: "uppercase",
                color: "oklch(0.22 0.02 255)",
              }}
            >
              Our Story
            </h3>
            <div className="space-y-4" style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.40 0.02 255)", lineHeight: 1.8 }}>
              <p>
                C&K Applications Pressure Washing & Roof Coatings was built on a simple belief: every home
                and business in the Triangle Area deserves professional-grade exterior care
                at a fair price. We started with a pressure washer and a truck, and we've
                grown into one of the region's most trusted exterior service companies.
              </p>
              <p>
                Over the years, we've expanded our services to meet the full range of needs
                our customers have — from dryer vent cleaning and handyman services for
                homeowners, to commercial roof coatings and large-scale pressure washing for
                property managers and business owners.
              </p>
              <p>
                With over 1,000 homes served and countless commercial projects completed,
                we've earned our reputation one job at a time. When you call CK Applications,
                you're not just hiring a contractor — you're working with a team that
                genuinely cares about your property.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div
            className={`grid sm:grid-cols-2 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                className="p-5 rounded-lg border"
                style={{
                  borderColor: "oklch(0.88 0.01 80)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "oklch(0.45 0.15 260)",
                }}
              >
                <h4
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    color: "oklch(0.28 0.12 260)",
                  }}
                >
                  {v.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.02 255)", fontFamily: "Inter, sans-serif" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
