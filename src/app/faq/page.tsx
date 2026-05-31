"use client";

import { Container, Section } from "@/components/ui/Layout";
import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { AnimatePresence, Transition, Variants, motion } from "framer-motion";

const FAQS = [
  {
    q: "What should I bring to my first class?",
    a: "Please bring a yoga mat, a water bottle, and comfortable clothing that allows you to move freely. We have mats available for rent if you don't have your own."
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, we highly recommend booking your spot in advance through our website as classes often fill up, especially the Sunday Yoga Club."
  },
  {
    q: "I'm a complete beginner. Which class is right for me?",
    a: "Our 'Gentle Hatha' is perfect for beginners. However, most of our 'Vinyasa Flow' classes are 'All Levels' and our instructors provide modifications for every stage of your practice."
  },
  {
    q: "What is your cancellation policy?",
    a: "Classes can be cancelled up to 12 hours before the start time for a full credit. Late cancellations and no-shows will be charged the full class fee."
  },
  {
    q: "Do you offer private sessions?",
    a: "Yes! We offer 1-on-1 sessions tailored to your specific goals. You can book these through our 'Private Sessions' page or by contacting us directly."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="text-center pb-20 relative overflow-hidden">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-sage mb-6 block">Support & Clarity</span>
             <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">Common <span className="italic">Questions</span></h1>
             <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-light leading-relaxed">
               Everything you need to know about starting or deepening your practice at Aisel Yoga Studio.
             </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{  delay: idx * 0.1  } as Transition}
                viewport={{ once: true }}
                className="border border-brand-beige rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-xl hover:shadow-brand-sage/5 transition-all duration-500"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left transition-colors"
                >
                  <span className="text-2xl font-serif">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIdx === idx ? "bg-brand-sage text-white rotate-180" : "bg-brand-cream text-brand-stone"}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-10 pb-10 text-brand-stone/70 text-lg leading-relaxed max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center bg-brand-cream/30 p-16 rounded-[3rem] border border-brand-beige"
          >
            <Sparkles className="text-brand-sage mx-auto mb-6" size={32} />
            <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
            <p className="text-brand-stone/60 mb-10 max-w-lg mx-auto">Our team is always here to help you navigate your journey. Feel free to reach out directly.</p>
            <a href="/contact" className="inline-block bg-brand-sage text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:-translate-y-1 transition-transform">
              Contact our team
            </a>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
