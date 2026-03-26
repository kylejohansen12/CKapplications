/**
 * Navbar — C&K Applications
 * Deep blue background, gold accent, Oswald typography
 * Sticky with scroll-aware shadow, mobile hamburger menu
 */
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "Residential",
    href: "#residential",
    children: [
      { label: "Pressure Washing", href: "#residential" },
      { label: "Painting", href: "#residential" },
      { label: "Gutter Cleaning", href: "#residential" },
      { label: "Dryer Vent Cleaning", href: "#residential" },
      { label: "Handyman Services", href: "#residential" },
      { label: "Deck Paint & Staining", href: "#residential" },
    ],
  },
  {
    label: "Commercial",
    href: "#commercial",
    children: [
      { label: "Pressure Washing", href: "#commercial" },
      { label: "Painting", href: "#commercial" },
      { label: "Gutter Cleaning", href: "#commercial" },
      { label: "Roof Cleaning", href: "#commercial" },
      { label: "Roof Repairs", href: "#commercial" },
      { label: "Roof Coatings", href: "#commercial" },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl" : ""
      }`}
      style={{ backgroundColor: "oklch(0.28 0.12 260)" }}
    >
      {/* Top bar */}
      <div
        className="hidden md:flex items-center justify-end px-6 py-1.5 text-sm"
        style={{ backgroundColor: "oklch(0.18 0.12 260)", color: "oklch(0.85 0.05 0)" }}
      >
        <a
          href="tel:+19195550100"
          className="flex items-center gap-2 hover:text-white transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <Phone size={13} />
          <span>(831) 588-1034</span>
        </a>
        <span className="mx-3 opacity-40">|</span>
        <span>Serving Raleigh, Durham, Chapel Hill & the Triangle Area</span>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded flex items-center justify-center font-bold text-lg"
            style={{
              backgroundColor: "oklch(0.72 0.16 70)",
              color: "oklch(0.15 0.02 255)",
              fontFamily: "Oswald, sans-serif",
            }}
          >
            C
          </div>
          <div className="text-left">
            <div
              className="text-white font-bold leading-tight"
              style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}
            >
              C&K APPLICATIONS
            </div>
            <div
              className="leading-tight"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.65rem",
                color: "oklch(0.72 0.16 70)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Residential & Commercial Building Services
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
                  style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 min-w-48 rounded shadow-2xl py-1 z-50"
                    style={{ backgroundColor: "oklch(0.28 0.12 260)", border: "1px solid oklch(0.40 0.12 260)" }}
                  >
                    {link.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="block w-full text-left px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
                style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => handleNavClick("#contact")}
            className="ml-3 px-5 py-2 rounded font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: "oklch(0.72 0.16 70)",
              color: "oklch(0.15 0.02 255)",
              fontFamily: "Oswald, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Free Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t"
          style={{ backgroundColor: "oklch(0.20 0.12 260)", borderColor: "oklch(0.40 0.12 260)" }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-3 py-2.5 text-white/90 hover:text-white font-medium text-sm"
                  style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {link.label}
                </button>
                {link.children && (
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="block w-full text-left px-3 py-2 text-white/60 hover:text-white/90 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        — {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 pb-1">
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full py-3 rounded font-semibold text-sm"
                style={{
                  backgroundColor: "oklch(0.72 0.16 70)",
                  color: "oklch(0.15 0.02 255)",
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Get a Free Quote
              </button>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 text-sm"
              style={{ color: "oklch(0.72 0.16 70)", fontFamily: "Inter, sans-serif" }}
            >
              <Phone size={14} />
              <a href="tel:+19195550100">(919) 555-0100</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
