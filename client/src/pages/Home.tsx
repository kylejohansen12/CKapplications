/**
 * Home Page — Triangle Pro Wash & Roof Coatings
 * Design: Rugged Americana / Blue-Collar Premium
 * All sections assembled in order
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ResidentialSection from "@/components/ResidentialSection";
import CommercialSection from "@/components/CommercialSection";
import WhyUsSection from "@/components/WhyUsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ResidentialSection />
        <CommercialSection />
        <WhyUsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
