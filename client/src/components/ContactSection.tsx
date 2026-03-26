/**
 * ContactSection — Rugged Americana / Blue-Collar Premium
 * Split layout: contact info left, form right
 * Forest green sidebar, off-white form area
 */
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

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

const serviceOptions = [
  "Pressure Washing",
  "Painting",
  "Gutter Cleaning",
  "Dryer Vent Cleaning",
  "Handyman Services",
  "Deck Paint & Staining",
  "Commercial Pressure Washing",
  "Commercial Painting",
  "Roof Cleaning",
  "Roof Repairs",
  "Roof Coatings",
  "Other",
];

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    propertyType: "residential",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded" style={{ backgroundColor: "oklch(0.68 0.18 65)" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.68 0.18 65)", fontFamily: "Oswald, sans-serif" }}
            >
              Get in Touch
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
            Request a Free Estimate
          </h2>
        </div>

        <div
          className={`grid lg:grid-cols-5 gap-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Left sidebar — contact info */}
          <div
            className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between"
            style={{ backgroundColor: "oklch(0.28 0.08 155)" }}
          >
            <div>
              <h3
                className="text-white font-bold mb-2"
                style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.4rem", textTransform: "uppercase" }}
              >
                Contact Us
              </h3>
              <p
                className="text-sm mb-8"
                style={{ color: "oklch(0.75 0.03 80)", fontFamily: "Inter, sans-serif" }}
              >
                We respond to all inquiries within one business day. For urgent
                requests, call us directly.
              </p>

              <div className="space-y-5">
                <ContactItem
                  icon={Phone}
                  label="Phone"
                  value="(919) 555-0100"
                  href="tel:+19195550100"
                />
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value="info@triangleprowash.com"
                  href="mailto:info@triangleprowash.com"
                />
                <ContactItem
                  icon={MapPin}
                  label="Service Area"
                  value="Raleigh, Durham, Chapel Hill & Triangle Area, NC"
                />
                <ContactItem
                  icon={Clock}
                  label="Hours"
                  value="Mon–Fri: 7am–6pm | Sat: 8am–4pm"
                />
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid oklch(0.38 0.08 155)" }}>
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.60 0.03 80)", fontFamily: "Oswald, sans-serif" }}
              >
                Why Choose Us
              </p>
              <div className="space-y-2">
                {[
                  "Licensed & Fully Insured",
                  "Free, No-Obligation Estimates",
                  "Locally Owned & Operated",
                  "1,000+ Satisfied Customers",
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <CheckCircle2 size={14} style={{ color: "oklch(0.68 0.18 65)", flexShrink: 0 }} />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.80 0.03 80)", fontFamily: "Inter, sans-serif" }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 p-8 lg:p-10 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: "oklch(0.28 0.08 155 / 0.1)" }}
                >
                  <CheckCircle2 size={32} style={{ color: "oklch(0.28 0.08 155)" }} />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.6rem", textTransform: "uppercase", color: "oklch(0.22 0.02 255)" }}
                >
                  Request Received!
                </h3>
                <p
                  className="text-sm max-w-sm"
                  style={{ color: "oklch(0.50 0.02 255)", fontFamily: "Inter, sans-serif" }}
                >
                  Thank you, {form.name}! We'll review your request and get back to
                  you within one business day with a free estimate.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline"
                  style={{ color: "oklch(0.28 0.08 155)", fontFamily: "Inter, sans-serif" }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Full Name *" required>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow"
                      style={{
                        borderColor: "oklch(0.88 0.01 80)",
                        fontFamily: "Inter, sans-serif",
                        color: "oklch(0.22 0.02 255)",
                      }}
                    />
                  </FormField>
                  <FormField label="Phone Number">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="(919) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow"
                      style={{
                        borderColor: "oklch(0.88 0.01 80)",
                        fontFamily: "Inter, sans-serif",
                        color: "oklch(0.22 0.02 255)",
                      }}
                    />
                  </FormField>
                </div>

                <FormField label="Email Address *" required>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow"
                    style={{
                      borderColor: "oklch(0.88 0.01 80)",
                      fontFamily: "Inter, sans-serif",
                      color: "oklch(0.22 0.02 255)",
                    }}
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Property Type">
                    <div className="flex gap-4">
                      {["residential", "commercial"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                          style={{ fontFamily: "Inter, sans-serif", color: "oklch(0.40 0.02 255)" }}
                        >
                          <input
                            type="radio"
                            name="propertyType"
                            value={type}
                            checked={form.propertyType === type}
                            onChange={handleChange}
                            style={{ accentColor: "oklch(0.28 0.08 155)" }}
                          />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="Service Needed">
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow"
                      style={{
                        borderColor: "oklch(0.88 0.01 80)",
                        fontFamily: "Inter, sans-serif",
                        color: form.service ? "oklch(0.22 0.02 255)" : "oklch(0.60 0.02 255)",
                      }}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Tell Us About Your Project">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your property, the work needed, and any specific concerns..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded border text-sm focus:outline-none focus:ring-2 transition-shadow resize-none"
                    style={{
                      borderColor: "oklch(0.88 0.01 80)",
                      fontFamily: "Inter, sans-serif",
                      color: "oklch(0.22 0.02 255)",
                    }}
                  />
                </FormField>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "oklch(0.28 0.08 155)",
                    color: "white",
                    fontFamily: "Oswald, sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <Send size={16} />
                  Send My Free Estimate Request
                </button>

                <p
                  className="text-xs text-center"
                  style={{ color: "oklch(0.60 0.02 255)", fontFamily: "Inter, sans-serif" }}
                >
                  No spam. No obligation. We'll respond within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: "oklch(0.68 0.18 65 / 0.15)" }}
      >
        <Icon size={16} style={{ color: "oklch(0.68 0.18 65)" }} />
      </div>
      <div>
        <div
          className="text-xs uppercase tracking-wider mb-0.5"
          style={{ color: "oklch(0.60 0.03 80)", fontFamily: "Oswald, sans-serif" }}
        >
          {label}
        </div>
        <div
          className="text-sm"
          style={{ color: "oklch(0.90 0.02 80)", fontFamily: "Inter, sans-serif" }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
        style={{ color: "oklch(0.40 0.02 255)", fontFamily: "Oswald, sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
