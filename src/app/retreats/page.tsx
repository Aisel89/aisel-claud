"use client";

import { motion, Variants } from "framer-motion";
import { Container, Section } from "@/components/ui/Layout";
import { useRetreats } from "@/hooks/usePersistence";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function RetreatsPage() {
  const { data: retreats } = useRetreats();

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="sage" className="pb-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />

        <Container className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 mb-6 block">Beyond the Studio</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white">Retreats & <br /><span className="italic">Sacred Circles</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Immersive experiences designed to deepen your practice and reconnect with your inner wisdom in nature's most beautiful settings.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section className="-mt-16 relative z-20 pt-0">
        <Container>
          <div className="space-y-20">
            {retreats.map((retreat, idx) => (
              <motion.div
                key={retreat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-brand-beige flex flex-col lg:flex-row"
              >
                <div className="w-full lg:w-[45%] aspect-square lg:aspect-auto bg-brand-cream relative">
                   <img src={retreat.image} alt="" className="w-full h-full object-cover" />
                   <div className="absolute top-8 left-8">
                     <span className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                       retreat.status === "Upcoming" ? "bg-white text-brand-sage" : "bg-brand-stone text-white"
                     } shadow-xl`}>
                       {retreat.status}
                     </span>
                   </div>
                </div>

                <div className="flex-1 p-10 md:p-16 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-8 mb-8 text-sm uppercase tracking-widest font-semibold text-brand-stone/40">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-brand-sage" /> {retreat.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-brand-sage" /> {retreat.location}
                      </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif mb-6">{retreat.title}</h2>
                    <p className="text-lg text-brand-stone/60 leading-relaxed mb-10">
                      {retreat.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                      <div className="p-6 bg-brand-cream/30 rounded-3xl border border-brand-beige">
                        <p className="text-[10px] uppercase tracking-widest text-brand-sage font-bold mb-2">Investment</p>
                        <p className="text-2xl font-serif">{retreat.price}</p>
                      </div>
                      <div className="p-6 bg-brand-cream/30 rounded-3xl border border-brand-beige">
                        <p className="text-[10px] uppercase tracking-widest text-brand-sage font-bold mb-2">Availability</p>
                        <p className="text-2xl font-serif">{retreat.status === "Upcoming" ? "Limited Spots" : retreat.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="px-12 h-16 text-lg rounded-full" disabled={retreat.status !== "Upcoming"}>
                      Enquire about Retreat
                    </Button>
                    <Button size="lg" variant="outline" className="px-12 h-16 text-lg rounded-full">
                      Full Itinerary <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="beige" className="py-32">
        <Container>
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-10">Women's Circles</h2>
            <p className="text-xl text-brand-stone/60 mb-16 leading-relaxed">
              Join us for intimate monthly gatherings focused on seasonal attunement, ritual, and shared wisdom. A safe harbor for reflection and connection.
            </p>
            <Button variant="outline" size="lg" className="bg-white px-12 h-16 rounded-full border-brand-sage/20 text-brand-sage font-bold uppercase tracking-widest">
              View Circle Calendar
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
