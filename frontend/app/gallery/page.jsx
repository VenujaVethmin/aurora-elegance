"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      alt: "Professional Hair Styling",
      category: "hair",
    },
    {
      src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800",
      alt: "Beauty Treatment",
      category: "makeup",
    },
    {
      src: "https://images.unsplash.com/photo-1595497803262-c4dbe1d58d08?q=80&w=800",
      alt: "Bridal Makeup",
      category: "bridal",
    },
    {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800",
      alt: "Makeup Session",
      category: "makeup",
    },
    {
      src: "https://images.unsplash.com/photo-1560869713-da86a9ec4523?q=80&w=800",
      alt: "Hair Treatment",
      category: "hair",
    },
    {
      src: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=800",
      alt: "Wedding Makeup",
      category: "bridal",
    },
  ];

  const categories = [
    { id: "all", name: "All" },
    { id: "bridal", name: "Bridal" },
    { id: "hair", name: "Hair" },
    { id: "makeup", name: "Makeup" },
  ];

  const filteredImages = galleryImages.filter(
    (img) => filter === "all" || img.category === filter
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold gold-text text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Gallery
          </motion.h1>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full ${
                  filter === category.id
                    ? "gold-bg text-black"
                    : "gold-border text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative h-[400px] rounded-xl overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <p className="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-50 p-4 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
              >
                <motion.button
                  className="absolute top-6 right-6 text-white/80 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={32} />
                </motion.button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl aspect-[3/2] rounded-xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    quality={95}
                    sizes="90vw"
                  />
                </motion.div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="text-white/90 text-lg">{selectedImage.alt}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
