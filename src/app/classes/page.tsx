"use client";

import { motion, Variants } from "framer-motion";
import { Container, Section } from "@/components/ui/Layout";
import { useClasses } from "@/hooks/usePersistence";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function ClassesPage() {
  const { data: classes } = useClasses();

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-sage)_0%,_transparent_70%)]" />
        </div>

        <Container className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
             <h1 className="text-5xl md:text-7xl font-serif mb-6">Our <span className="italic">Practices</span></h1>
             <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-light">
               Whether you are looking for a vigorous flow or a moment of profound stillness, we have a space for your journey.
             </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-32">
            {classes.map((cls, idx) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16 md:gap-24`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-2 border border-brand-sage/10 rounded-[2.5rem] scale-105 group-hover:scale-110 transition-transform duration-700" />
                    <div className="aspect-[16/10] bg-brand-beige rounded-[2rem] overflow-hidden shadow-2xl">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="bg-brand-sage/10 text-brand-sage px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{cls.category}</span>
                    <span className="text-brand-stone/40 text-xs font-medium uppercase tracking-widest">{cls.level}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif">{cls.title}</h2>
                  <p className="text-lg text-brand-stone/70 leading-relaxed">
                    {cls.description}
                  </p>
                  <div className="flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-semibold text-brand-stone/50">
                    <div>
                      <p className="text-[10px] text-brand-sage mb-1">Duration</p>
                      <p>{cls.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-sage mb-1">Price</p>
                      <p>${cls.price}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-sage mb-1">Guide</p>
                      <p>{cls.instructor}</p>
                    </div>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link href="/schedule"><Button size="lg" className="rounded-full shadow-lg">Reserve Spot</Button></Link>
                    <Link href="/contact"><Button size="lg" variant="outline" className="rounded-full">Ask a Question</Button></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-32 bg-brand-cream/50 p-12 md:p-20 rounded-[3rem] text-center border border-brand-beige"
          >
            <Sparkles className="text-brand-sage mx-auto mb-8" size={32} />
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Unsure where to begin?</h2>
            <p className="text-brand-stone/60 max-w-xl mx-auto mb-10 text-lg">
              We're here to guide you. Contact us for a personalized recommendation based on your energy and experience.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="h-14 px-10 text-lg bg-white/50 border-brand-stone/20">Let's talk</Button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
