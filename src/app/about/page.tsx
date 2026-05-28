"use client";

import { motion, Variants, Transition } from "framer-motion";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

const transitionProps: Transition = { duration: 0.8, ease: "easeOut" };

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <Section className="relative overflow-hidden">
        {/* Background blobs for premium feeling */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blush/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <Container>
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 border border-brand-sage/20 rounded-[3rem] translate-x-4 translate-y-4" />
                <div className="aspect-[3/4] bg-brand-beige rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1594759844614-3c277bc0bd5a?auto=format&fit=crop&q=80"
                    alt="Aisel - Founder"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            <div className="w-full md:w-1/2">
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={transitionProps}
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-sage mb-6 block">Our Story</span>
                <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Meet <span className="italic">Aisel</span></h1>
                <p className="text-xl text-brand-stone/80 mb-8 leading-relaxed font-serif italic border-l-4 border-brand-sage/10 pl-6">
                  "Yoga found me in a moment of silence, and it became my loudest expression of love and healing."
                </p>
                <div className="space-y-6 text-brand-stone/70 text-lg leading-relaxed mb-10">
                  <p>
                    With over a decade of practice and teaching, Aisel has dedicated her life to creating spaces where individuals can reconnect with their essential nature.
                  </p>
                  <p>
                    Her approach blends the dynamic energy of Vinyasa with the profound stillness of meditation and breathwork, creating a balanced practice that transcends the mat.
                  </p>
                </div>
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-10 h-16 shadow-lg shadow-brand-sage/10">Work with Aisel</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section variant="beige" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cream/30 opacity-50" />
        <Container className="relative z-10">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={transitionProps}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-brand-stone">The Studio <span className="italic">Philosophy</span></h2>
            <p className="text-xl text-brand-stone/60 leading-relaxed font-light">
              Aisel Yoga Studio is more than a place for movement; it is a sanctuary for the soul. We believe in the power of intention and the wisdom of the body.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Mindful Presence",
                desc: "We prioritize being fully here, now. Every breath and movement is an invitation to inhabit the present moment.",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80"
              },
              {
                title: "Holistic Healing",
                desc: "Our practices address the physical, emotional, and spiritual layers of your being, fostering true transformation.",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
              },
              {
                title: "Deep Connection",
                desc: "We believe we rise together. Our studio is built on the foundations of empathy, community, and shared growth.",
                img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-square bg-brand-cream rounded-[2.5rem] overflow-hidden mb-8 shadow-xl border border-brand-beige">
                  <img src={item.img} alt="" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                </div>
                <h3 className="text-3xl font-serif mb-4 text-brand-stone">{item.title}</h3>
                <p className="text-brand-stone/60 leading-relaxed text-lg font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
