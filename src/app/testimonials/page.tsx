"use client";

import { Container, Section } from "@/components/ui/Layout";
import { usePersistence } from "@/hooks/usePersistence";
import { Quote, Sparkles } from "lucide-react";
import { Transition, Variants, motion } from "framer-motion";
import { Testimonial } from "@/data/mockData";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function TestimonialsPage() {
  const { data: testimonials } = usePersistence<Testimonial>('testimonials', []);

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="sage" className="text-center pb-20 relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{  duration: 1  } as Transition}>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-6 block">Our Community</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white">Student <span className="italic text-white/80">Voices</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Stories of transformation, healing, and the profound peace found within our sanctuary.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section className="-mt-16 relative z-20 pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{  delay: idx * 0.1, duration: 0.8  } as Transition}
                viewport={{ once: true }}
                className="bg-brand-cream/50 p-12 md:p-16 rounded-[3.5rem] relative border border-brand-beige shadow-sm hover:shadow-2xl hover:shadow-brand-sage/5 transition-all duration-700"
              >
                <Quote className="text-brand-sage/10 absolute top-12 right-12" size={80} strokeWidth={1} />
                <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-relaxed text-brand-stone relative z-10">
                  “{t.content}”
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-brand-sage text-white flex items-center justify-center text-2xl font-serif shadow-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-widest text-brand-stone">{t.name}</h4>
                    <p className="text-sm text-brand-stone/40 font-medium italic">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-32 text-center bg-white border border-brand-beige py-24 px-8 rounded-[4rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-sage/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Sparkles className="text-brand-sage mx-auto mb-8" size={40} />
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Share Your Journey</h2>
              <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                Has your practice at Aisel Yoga Studio helped you find balance or strength? We would be honored to hear your story.
              </p>
              <button className="bg-brand-stone text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Submit a Testimonial
              </button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
