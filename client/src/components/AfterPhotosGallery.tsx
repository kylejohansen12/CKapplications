import { useState } from "react";
import { X } from "lucide-react";

interface AfterPhoto {
  id: number;
  title: string;
  service: string;
  image: string;
  category: "residential" | "commercial";
}

const AFTER_PHOTOS: AfterPhoto[] = [
  {
    id: 1,
    title: "Residential Pressure Washing",
    service: "Pressure Washing",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-1-after-mQa7jshVfuipwTmhfMw2WJ.webp",
    category: "residential",
  },
  {
    id: 2,
    title: "Commercial Roof Coating",
    service: "Roof Coating",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-2-after-mQa7jshVfuipwTmhfMw2WJ.webp",
    category: "commercial",
  },
  {
    id: 3,
    title: "Deck Cleaning & Staining",
    service: "Deck Staining",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-3-after-kmzizy6Y9cYYTvGPjQgaWT.webp",
    category: "residential",
  },
  {
    id: 4,
    title: "Metal Panel Roof Coating",
    service: "Roof Coating",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-4-after-hJH44MYMs6aNCphnm5m4nH.png",
    category: "commercial",
  },
  {
    id: 5,
    title: "Residential Home Pressure Washing",
    service: "Pressure Washing",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-5-after-caG7Wz6R4DVi3jPQCkUExW.webp",
    category: "residential",
  },
  {
    id: 6,
    title: "TPO Roof Coating",
    service: "Roof Coating",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663480175209/Z8aDEYZdckM2rAVWwdtYui/project-6-after-AYvhoYWQmRkTThsXeLPjrr.png",
    category: "commercial",
  },
];

export default function AfterPhotosGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<AfterPhoto | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | "residential" | "commercial">("all");

  const filteredPhotos = filterCategory === "all" 
    ? AFTER_PHOTOS 
    : AFTER_PHOTOS.filter(photo => photo.category === filterCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 pb-2 border-b-2" style={{ borderColor: "oklch(0.72 0.16 70)" }}>
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "oklch(0.72 0.16 70)" }}>
              Our Results
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#003D7A" }}>
            Completed Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our portfolio of finished projects showcasing professional transformations across residential and commercial properties.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filterCategory === "all"
                ? "text-white"
                : "text-gray-700 border-2 border-gray-300 hover:border-gray-400"
            }`}
            style={{
              backgroundColor: filterCategory === "all" ? "#003D7A" : "transparent",
            }}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilterCategory("residential")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filterCategory === "residential"
                ? "text-white"
                : "text-gray-700 border-2 border-gray-300 hover:border-gray-400"
            }`}
            style={{
              backgroundColor: filterCategory === "residential" ? "#003D7A" : "transparent",
            }}
          >
            Residential
          </button>
          <button
            onClick={() => setFilterCategory("commercial")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filterCategory === "commercial"
                ? "text-white"
                : "text-gray-700 border-2 border-gray-300 hover:border-gray-400"
            }`}
            style={{
              backgroundColor: filterCategory === "commercial" ? "#003D7A" : "transparent",
            }}
          >
            Commercial
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="relative overflow-hidden bg-gray-200 h-64">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="font-semibold text-lg">{photo.title}</p>
                    <p className="text-sm" style={{ color: "oklch(0.72 0.16 70)" }}>
                      {photo.service}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-gray-900 mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600">{photo.service}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 z-10"
              >
                <X size={24} className="text-gray-800" />
              </button>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#003D7A" }}>
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-600 mb-2">Service: {selectedPhoto.service}</p>
                <p className="text-gray-600">
                  Type: {selectedPhoto.category === "residential" ? "Residential" : "Commercial"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
