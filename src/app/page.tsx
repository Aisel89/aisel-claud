"use client";

import { Transition, Variants, motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Wind, Heart, Users, Sparkles } from "lucide-react";
import Link from "next/link";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

const staggerContainer: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{  duration: 1.5, ease: "easeOut"  } as Transition}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-brand-cream/30 backdrop-blur-[1px]" />
        </motion.div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{  duration: 1, delay: 0.5, ease: "easeOut"  } as Transition}
          >
            <div className="flex items-center justify-center gap-2 mb-6 text-brand-sage">
              <Sparkles size={18} />
              <span className="uppercase tracking-[0.3em] text-xs font-semibold">Welcome to your Sanctuary</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tight">
              Reconnect with your <br />
              <span className="italic">body and breath</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-stone/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the transformative power of Vinyasa, mindful movement, and deep community connection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/schedule">
                <Button size="lg" className="px-10 h-16 text-lg shadow-2xl shadow-brand-sage/20 hover:-translate-y-1 transition-transform duration-300">
                  Book Your Class
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-10 h-16 text-lg bg-white/40 backdrop-blur-md hover:bg-white transition-all duration-300">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{  delay: 1.5, duration: 1  } as Transition}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-stone/40">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-sage to-transparent" />
        </motion.div>
      </section>

      {/* Featured Classes Preview */}
      <Section variant="beige" className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl" />

        <Container>
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{  duration: 0.8, ease: "easeOut"  } as Transition}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl mb-6 font-serif">Core Practices</h2>
            <p className="text-brand-stone/50 max-w-xl mx-auto text-lg">
              Curated experiences designed to nurture your physical strength and mental clarity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Vinyasa Flow",
                description: "Harmonize breath and movement in this fluid, energetic practice that builds heat and focus.",
                icon: <Wind className="text-brand-sage" size={32} />,
                color: "bg-brand-sage/5"
              },
              {
                title: "Private Guidance",
                description: "Personalized 1-on-1 sessions tailored specifically to your unique physical needs and goals.",
                icon: <Heart className="text-brand-blush" size={32} />,
                color: "bg-brand-blush/5"
              },
              {
                title: "Sunday Yoga Club",
                description: "Celebrate community with morning lake-side practice followed by shared reflection.",
                icon: <Users className="text-brand-sage" size={32} />,
                color: "bg-brand-beige"
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{  duration: 0.8, ease: "easeOut"  } as Transition}
                className="group bg-white p-10 rounded-[2.5rem] border border-brand-beige hover:border-brand-sage/30 hover:shadow-2xl hover:shadow-brand-sage/5 transition-all duration-500"
              >
                <div className={`mb-8 w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl mb-4 font-serif">{item.title}</h3>
                <p className="text-brand-stone/60 mb-8 leading-relaxed">{item.description}</p>
                <Link href="/classes" className="text-brand-sage font-semibold inline-flex items-center group/link">
                  Explore <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Sunday Yoga Club Highlight */}
      <Section>
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{  duration: 1  } as Transition}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
               <div className="relative">
                 <div className="absolute -inset-4 border border-brand-sage/20 rounded-3xl translate-x-4 translate-y-4 -z-10" />
                 <div className="aspect-[4/5] bg-brand-beige rounded-2xl overflow-hidden shadow-2xl">
                   <img
                     src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80"
                     alt="Sunday Yoga Club by the lake"
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                   />
                 </div>
               </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{  duration: 1  } as Transition}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="inline-block px-4 py-1 bg-brand-sage/10 text-brand-sage rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Signature Experience
              </div>
              <h2 className="text-4xl md:text-5xl mb-8 font-serif">Sunday Yoga Club</h2>
              <p className="text-2xl text-brand-stone/80 mb-10 leading-relaxed font-serif italic border-l-4 border-brand-sage/20 pl-8">
                “A peaceful morning practice by the lake, followed by connection, reflection, and community.”
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "Every Sunday at 8:00 AM",
                  "Healing Valley Lake Side",
                  "Meditation & Community Circle included"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-brand-stone/70">
                    <div className="w-2 h-2 rounded-full bg-brand-sage" />
                    <span className="text-lg">{text}</span>
                  </div>
                ))}
              </div>
              <Link href="/schedule">
                <Button size="lg" className="rounded-full px-10">Reserve Your Spot</Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Testimonial Preview */}
      <Section variant="sage" className="py-32">
        <Container className="text-center">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{  duration: 0.8, ease: "easeOut"  } as Transition}
          >
            <div className="text-6xl md:text-8xl text-white/40 font-serif mb-8 leading-none italic">“</div>
            <div className="max-w-4xl mx-auto">
              <p className="text-3xl md:text-5xl font-serif italic leading-tight text-white mb-12">
                Aisel's classes are more than movement. It's a journey back to your truest self.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-white/30" />
                <span className="font-medium tracking-[0.3em] uppercase text-xs text-white/80">Elena R., Member</span>
                <div className="h-[1px] w-12 bg-white/30" />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="pb-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{  duration: 0.8, ease: "easeOut"  } as Transition}
            className="bg-brand-beige/50 pt-20 px-8 rounded-[3rem] text-center border border-brand-beige overflow-hidden"
          >
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-6xl mb-8 font-serif leading-tight">Begin your <span className="italic">transformation</span></h2>
              <p className="text-xl text-brand-stone/60 mb-12">
                Join our sanctuary and discover the profound power of mindful movement and collective breath.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/schedule"><Button size="lg" className="w-full sm:w-auto h-16 px-12">View Schedule</Button></Link>
                <Link href="/contact"><Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 bg-white/50">Contact Us</Button></Link>
              </div>
            </div>

            <div className="flex justify-center -mb-2">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                alt="Yoga practice"
                className="w-full max-w-4xl rounded-t-[3rem] shadow-2xl opacity-90"
              />
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
