import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: "residential" | "commercial";
  service: string;
  beforeImage: string;
  afterImage: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Residential Home Pressure Washing",
    description: "Complete exterior pressure washing transformation for a residential home in Raleigh",
    category: "residential",
    service: "Pressure Washing",
    beforeImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-1-before-LNA5B4Fuofvc3JZUaatQHz.webp",
    afterImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-1-after-jGdWJjzc7k5kCpM3bBVLL8.webp",
  },
  {
    id: 2,
    title: "Commercial Roof Coating",
    description: "Professional silicone roof coating applied to commercial warehouse building",
    category: "commercial",
    service: "Roof Coating",
    beforeImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-2-before-7n8GejHBnoe4W3uqHcxopa.webp",
    afterImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-2-after-mQa7jshVfuipwTmhfMw2WJ.webp",
  },
  {
    id: 3,
    title: "Deck Cleaning & Staining",
    description: "Complete deck restoration with professional cleaning and premium stain application",
    category: "residential",
    service: "Deck Staining",
    beforeImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-3-before-KgLVAy3KiWTCCgFYVHxKGy.webp",
    afterImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-3-after-kmzizy6Y9cYYTvGPjQgaWT.webp",
  },
  {
    id: 4,
    title: "Commercial Silicone Roof Coating",
    description: "Professional silicone coating system applied to deteriorated commercial flat roof. Extends roof life and improves energy efficiency.",
    category: "commercial",
    service: "Roof Coating",
    beforeImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-4-before-NNVwKDxaLbcaWjLXPHuk4S.webp",
    afterImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-4-after-TkvHJuUnXzxSCjAW5WysDW.webp",
  },
  {
    id: 5,
    title: "Residential Home Pressure Washing",
    description: "Complete exterior pressure washing transformation. Removed algae, stains, and mold from vinyl siding. Home restored to like-new condition.",
    category: "residential",
    service: "Pressure Washing",
    beforeImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-5-before-Jj88m4gKSXLL2JtGBwfq6J.webp",
    afterImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-5-after-caG7Wz6R4DVi3jPQCkUExW.webp",
  },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "residential" | "commercial">("all");

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory
  );

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

        {/* Filter Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter size={20} className="text-gray-600" />
              <span className="text-sm font-semibold text-gray-600">Filter by type:</span>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setSelectedCategory("residential")}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === "residential"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setSelectedCategory("commercial")}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === "commercial"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No projects found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gray-50 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                          <CardDescription className="text-base">{project.description}</CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                          <Badge
                            style={{
                              backgroundColor: project.category === "residential" ? "#dbeafe" : "#fef3c7",
                              color: project.category === "residential" ? "#1e40af" : "#92400e",
                            }}
                          >
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                          </Badge>
                          <Badge
                            style={{
                              backgroundColor: "#dcfce7",
                              color: "#166534",
                            }}
                          >
                            {project.service}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Drag the slider left and right to see the before and after transformation
                        </p>
                        <BeforeAfterSlider
                          beforeImage={project.beforeImage}
                          afterImage={project.afterImage}
                          beforeLabel="Before"
                          afterLabel="After"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

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
