"use client";

import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Heart, Sparkles, Target, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Transition, Variants, motion } from "framer-motion";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function PrivateSessionsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Section className="relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-beige/20 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-20 lg:gap-32">
            <div className="w-full md:w-1/2">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{  duration: 1  } as Transition}>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-sage mb-6 block">Personalized Practice</span>
                <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-tight">Guided <br/><span className="italic text-brand-sage/80">for You</span></h1>
                <p className="text-2xl text-brand-stone/70 mb-12 leading-relaxed font-light">
                  Deepen your practice, address specific physical needs, or begin your journey with undivided professional attention in a sanctuary of support.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/contact" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full text-lg shadow-xl shadow-brand-sage/10">Enquire Now</Button></Link>
                  <Link href="/pricing" className="w-full sm:w-auto"><Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full text-lg bg-white/50">View Rates</Button></Link>
                </div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 transition={{  duration: 1.2, ease: "easeOut"  } as Transition}
                 className="relative"
              >
                <div className="absolute -inset-4 border border-brand-sage/10 rounded-[3.5rem] translate-x-4 translate-y-4 -z-10" />
                <div className="aspect-[4/5] bg-brand-cream rounded-[3rem] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80"
                    alt="Private Yoga Session"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="beige" className="py-32">
        <Container>
          <motion.div {...fadeInUp} className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Why Private Sessions?</h2>
            <p className="text-xl text-brand-stone/60 leading-relaxed">
              Experience a tailored approach that respects your unique physiology, goals, and the rhythm of your life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Custom Pace", icon: <Zap className="text-brand-sage" />, desc: "Progress at a speed that feels right for your body and mind, without the pressure of a group environment." },
              { title: "Targeted Goals", icon: <Target className="text-brand-sage" />, desc: "Focus specifically on your objectives, whether it's building strength, increasing flexibility, or mastering a pose." },
              { title: "Beginner Friendly", icon: <Sparkles className="text-brand-sage" />, desc: "Build a rock-solid foundation and gain confidence in your alignment before joining our group classes." },
              { title: "Deep Connection", icon: <Heart className="text-brand-sage" />, desc: "Receive hands-on adjustments and the undivided attention necessary for a truly transformative practice." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{  delay: idx * 0.1  } as Transition}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] border border-brand-beige shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="mb-8 w-16 h-16 rounded-[1.25rem] bg-brand-sage/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                <p className="text-brand-stone/60 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-32">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-brand-sage text-white p-16 md:p-24 rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Ready to begin your <br/><span className="italic">personalized journey?</span></h2>
              <p className="text-xl opacity-80 mb-16 max-w-2xl mx-auto">
                Book a discovery call or your first session today and let's design a practice that truly honors your essence.
              </p>
              <Button className="bg-white text-brand-sage hover:bg-brand-cream border-white h-16 px-12 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl">
                Book Your First Session
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
