/**
 * WhyUsSection — Rugged Americana / Blue-Collar Premium
 * Dark green background, process steps, trust indicators
 */
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Calendar, Hammer, ThumbsUp } from "lucide-react";

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

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Request a Free Estimate",
    description:
      "Contact us online or by phone. We'll gather details about your property and the services you need.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "We Come to You",
    description:
      "A member of our team will visit your property to assess the job and provide a detailed, no-obligation quote.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "We Get to Work",
    description:
      "Our trained crew arrives on schedule with professional equipment and completes the job to the highest standard.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "You're Satisfied",
    description:
      "We don't consider a job done until you're completely happy. We follow up to ensure everything meets your expectations.",
  },
];

export default function WhyUsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.22 0.08 155)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(1 0 0) 0, oklch(1 0 0) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 rounded" style={{ backgroundColor: "oklch(0.68 0.18 65)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.68 0.18 65)", fontFamily: "Oswald, sans-serif" }}
            >
              Our Process
            </span>
            <div className="w-8 h-0.5 rounded" style={{ backgroundColor: "oklch(0.68 0.18 65)" }} />
          </div>
          <h2
            className="font-bold leading-tight text-white"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase",
            }}
          >
            How It Works
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: "oklch(0.72 0.03 80)", fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            Getting your home or business cleaned and protected is simple. Here's
            what to expect when you work with Triangle Pro Wash.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={`relative p-6 rounded-lg transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  backgroundColor: "oklch(0.28 0.08 155)",
                  border: "1px solid oklch(0.35 0.08 155)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Step number */}
                <div
                  className="absolute top-4 right-4 font-bold opacity-20"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: "3rem",
                    color: "oklch(0.68 0.18 65)",
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </div>

                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.68 0.18 65 / 0.15)" }}
                >
                  <Icon size={22} style={{ color: "oklch(0.68 0.18 65)" }} />
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
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.03 80)", fontFamily: "Inter, sans-serif" }}
                >
                  {step.description}
                </p>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 z-10"
                    style={{ backgroundColor: "oklch(0.68 0.18 65 / 0.4)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Service area callout */}
        <div
          className={`rounded-xl p-8 lg:p-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            backgroundColor: "oklch(0.15 0.07 155)",
            border: "1px solid oklch(0.35 0.08 155)",
            transitionDelay: "0.5s",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3
                className="font-bold text-white mb-3"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                Proudly Serving the Triangle Area
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.03 80)", fontFamily: "Inter, sans-serif" }}
              >
                From Raleigh to Durham, Chapel Hill to Wake Forest, and everywhere in
                between — Triangle Pro Wash is your local exterior service expert. We
                know the Triangle's climate, architecture, and the unique challenges that
                come with maintaining properties in our region.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Raleigh", "Durham", "Chapel Hill", "Cary", "Apex", "Wake Forest", "Morrisville", "Hillsborough", "Pittsboro"].map(
                (city) => (
                  <div
                    key={city}
                    className="text-center py-2 px-3 rounded text-xs"
                    style={{
                      backgroundColor: "oklch(0.28 0.08 155)",
                      color: "oklch(0.80 0.03 80)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {city}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
