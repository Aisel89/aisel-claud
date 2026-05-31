"use client";

import { Container, Section } from "@/components/ui/Layout";
import { useBlog } from "@/hooks/usePersistence";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { Transition, Variants, motion } from "framer-motion";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export default function BlogPage() {
  const { data: posts } = useBlog();

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="pb-20 text-center relative overflow-hidden">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-sage mb-6 block">Mindful Insights</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">The <span className="italic">Journal</span></h1>
            <p className="text-xl text-brand-stone/60 max-w-2xl mx-auto font-light leading-relaxed">
              Reflections on yoga, wellness, and living a life of conscious presence.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{  delay: idx * 0.1, duration: 0.8  } as Transition}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full flex flex-col">
                    <div className="aspect-[16/10] bg-brand-beige rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-sage/5 transition-all duration-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-brand-stone/40 uppercase tracking-[0.2em] font-bold mb-4">
                      <span className="text-brand-sage">{post.category}</span>
                      <div className="w-1 h-1 rounded-full bg-brand-beige" />
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                    <h2 className="text-3xl font-serif mb-6 group-hover:text-brand-sage transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-brand-stone/60 mb-8 flex-grow leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-3 text-brand-stone font-bold text-xs uppercase tracking-widest border-b-2 border-brand-sage/20 pb-1 w-fit group-hover:border-brand-sage transition-all">
                      Read Post <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
