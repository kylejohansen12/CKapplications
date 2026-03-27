import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AfterPhotosGallery from "@/components/AfterPhotosGallery";

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8 text-center"
          style={{ backgroundColor: "oklch(0.22 0.08 155)" }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              Our Project Portfolio
            </h1>
            <p className="text-lg text-gray-200">
              See the transformation we bring to homes and businesses across the Triangle Area
            </p>
          </div>
        </section>

        {/* After Photos Gallery */}
        <AfterPhotosGallery />

        {/* CTA Section */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: "oklch(0.72 0.16 70)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              Ready to Transform Your Property?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get a free estimate from our team of professionals
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition-colors"
            >
              Request a Free Quote
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
