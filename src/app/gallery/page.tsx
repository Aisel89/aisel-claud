"use client";

import { Container, Section } from "@/components/ui/Layout";
import { useGallery } from "@/hooks/usePersistence";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, Transition, Variants, motion } from "framer-motion";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function GalleryPage() {
  const { data: images } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map(img => img.category)))];
  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <div className="pt-24 min-h-screen">
      <Section className="text-center pb-20 bg-brand-cream/30">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-sage mb-6 block">Visual Journey</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">Our <span className="italic">Sanctuary</span></h1>
            <p className="text-xl text-brand-stone/60 max-w-3xl mx-auto font-light leading-relaxed">
              A curated collection of moments, energy, and connection within our sacred studio and the natural landscapes we explore together.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full border transition-all text-xs font-bold uppercase tracking-widest ${
                  filter === cat
                    ? "bg-brand-sage border-brand-sage text-white shadow-lg"
                    : "border-brand-beige text-brand-stone/60 hover:bg-white hover:text-brand-sage"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{  delay: idx * 0.05  } as Transition}
                className="group relative aspect-square bg-brand-beige rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-brand-stone/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 backdrop-blur-[2px]">
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 scale-90 group-hover:scale-100 transition-transform">
                     <ZoomIn size={32} />
                   </div>
                   <p className="text-white font-serif italic text-2xl text-center">{img.caption}</p>
                   <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-stone/98 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              className="absolute top-10 right-10 text-white/60 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} strokeWidth={1} />
            </motion.button>
            <motion.img
              layoutId={selectedImage}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[85vh] rounded-[2rem] shadow-2xl object-contain border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
