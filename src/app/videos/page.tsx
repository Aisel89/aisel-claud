"use client";

import { Container, Section } from "@/components/ui/Layout";
import { useVideos } from "@/hooks/usePersistence";
import { Play, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function VideosPage() {
  const { data: videos } = useVideos();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="pb-20 text-center relative overflow-hidden">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-sage mb-6 block">Online Practice</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">Video <span className="italic">Library</span></h1>
            <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-light leading-relaxed">
              Experience Aisel's guidance from the comfort of your home. A curated collection of flows and meditations for every mood.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-brand-beige hover:shadow-2xl hover:shadow-brand-sage/5 transition-all duration-500"
              >
                <div
                  className="relative aspect-video bg-brand-stone overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(video.videoUrl)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-brand-stone/20 transition-opacity group-hover:opacity-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-sage scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl border border-brand-sage/10">
                      <Play size={40} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-brand-stone/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Clock size={12} /> {video.duration}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-sage font-bold mb-3 block">
                    {video.category}
                  </span>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-brand-sage transition-colors">{video.title}</h3>
                  <p className="text-brand-stone/60 leading-relaxed mb-6 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-stone/98 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
               <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              onClick={() => setActiveVideo(null)}
            >
               <Play size={48} className="rotate-45" strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
