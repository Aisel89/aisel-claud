"use client";

import { Container, Section } from "@/components/ui/Layout";
import { usePricing } from "@/hooks/usePersistence";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function PricingPage() {
  const { data: pricing } = usePricing();

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="sage" className="text-center pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-sage opacity-50" />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-6 block">Your Investment</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white">Memberships & <span className="italic text-white/80">Pricing</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Choose the path that resonates with your commitment and lifestyle. We have options for every stage of your practice.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section className="-mt-20 relative z-20 pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative bg-white p-10 md:p-12 rounded-[3rem] border-2 transition-all hover:shadow-2xl flex flex-col ${
                  plan.isPopular ? "border-brand-sage shadow-xl scale-105 z-10" : "border-brand-beige"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-sage text-white px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                    <Sparkles size={14} /> Most Loved
                  </div>
                )}
                <div className="mb-12">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-stone/40 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif text-brand-stone">{plan.price}</span>
                    <span className="text-brand-stone/40 text-sm font-medium italic">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-6 mb-12 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-brand-stone/70">
                      <div className="h-6 w-6 rounded-full bg-brand-sage/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-brand-sage" />
                      </div>
                      <span className="text-lg leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-16 rounded-full text-lg ${plan.isPopular ? "shadow-lg shadow-brand-sage/20" : ""}`}
                  variant={plan.isPopular ? "primary" : "outline"}
                >
                  Choose {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 bg-brand-cream/50 p-12 md:p-20 rounded-[4rem] text-center max-w-5xl mx-auto border border-brand-beige relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif mb-6">Corporate & Bespoke Programs</h3>
              <p className="text-xl text-brand-stone/60 mb-12 max-w-2xl mx-auto">
                Elevate your team's wellbeing. We offer personalized yoga and mindfulness programs for offices, groups, and private events.
              </p>
              <Button variant="outline" className="h-14 px-12 rounded-full text-sm font-bold uppercase tracking-widest border-brand-stone/20 bg-white/50">
                Enquire for your Group
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
