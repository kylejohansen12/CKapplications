/**
 * TestimonialsSection — Rugged Americana / Blue-Collar Premium
 * Light off-white background, star ratings, quote cards
 */
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

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

const testimonials = [
  {
    name: "Sarah M.",
    location: "Raleigh, NC",
    service: "Pressure Washing",
    rating: 5,
    text: "Triangle Pro Wash did an incredible job on our driveway and house siding. The difference was night and day — years of grime gone in a few hours. They were professional, on time, and priced fairly. Will absolutely use them again.",
  },
  {
    name: "James T.",
    location: "Durham, NC",
    service: "Commercial Roof Coating",
    rating: 5,
    text: "We had a large commercial building with a failing flat roof. Triangle Pro Wash came out, assessed the situation, and applied a full elastomeric coating system. The work was done on schedule and our energy bills have noticeably dropped. Highly recommend for any commercial property owner.",
  },
  {
    name: "Linda R.",
    location: "Chapel Hill, NC",
    service: "Gutter Cleaning & Deck Staining",
    rating: 5,
    text: "I hired them for gutter cleaning and ended up having them stain my deck too. Both jobs were done beautifully. The deck looks brand new. The team was courteous, cleaned up after themselves, and the price was very reasonable.",
  },
  {
    name: "Mike D.",
    location: "Cary, NC",
    service: "Handyman & Pressure Washing",
    rating: 5,
    text: "Used Triangle Pro Wash for a combination of handyman repairs and pressure washing before putting our house on the market. The house looked amazing — our realtor said the curb appeal made a real difference. Sold above asking price!",
  },
  {
    name: "Patricia K.",
    location: "Wake Forest, NC",
    service: "Dryer Vent Cleaning",
    rating: 5,
    text: "I didn't realize how clogged my dryer vent was until they showed me what came out. My dryer now works so much better and I feel a lot safer knowing the fire risk is gone. Quick, professional, and thorough.",
  },
  {
    name: "Robert H.",
    location: "Apex, NC",
    service: "Roof Cleaning",
    rating: 5,
    text: "The black streaks on our roof were embarrassing. Triangle Pro Wash used a soft-wash method that removed all the algae without damaging the shingles. The roof looks like it was just installed. Great communication throughout.",
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded" style={{ backgroundColor: "oklch(0.68 0.18 65)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.68 0.18 65)", fontFamily: "Oswald, sans-serif" }}
            >
              What Our Customers Say
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
            Trusted Across the Triangle
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-6 rounded-lg border bg-white transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                borderColor: "oklch(0.88 0.01 80)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/* Quote icon */}
              <Quote
                size={24}
                className="mb-3"
                style={{ color: "oklch(0.68 0.18 65 / 0.5)" }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill="oklch(0.68 0.18 65)"
                    style={{ color: "oklch(0.68 0.18 65)" }}
                  />
                ))}
              </div>

              {/* Review text */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.40 0.02 255)", fontFamily: "Inter, sans-serif" }}
              >
                "{t.text}"
              </p>

              {/* Reviewer info */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid oklch(0.92 0.01 80)" }}>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.22 0.02 255)", textTransform: "uppercase" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.02 255)", fontFamily: "Inter, sans-serif" }}
                  >
                    {t.location}
                  </div>
                </div>
                <div
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: "oklch(0.28 0.08 155 / 0.08)",
                    color: "oklch(0.28 0.08 155)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
