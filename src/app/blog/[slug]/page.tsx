"use client";

import { use } from "react";
import { Container, Section } from "@/components/ui/Layout";
import { useBlog } from "@/hooks/usePersistence";
import { ArrowLeft, Calendar, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: posts } = useBlog();

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h1 className="text-3xl font-serif mb-8">Post not found</h1>
        <Link href="/blog"><Button className="rounded-full">Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <Section className="pb-8">
        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Link href="/blog" className="inline-flex items-center gap-3 text-brand-stone/40 hover:text-brand-sage mb-12 transition-colors text-xs font-bold uppercase tracking-widest group">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Journal
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-6 text-[10px] text-brand-stone/40 uppercase tracking-[0.3em] font-bold mb-8">
                <span className="bg-brand-sage/10 text-brand-sage px-4 py-1.5 rounded-full">{post.category}</span>
                <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-serif mb-12 leading-[1.1] tracking-tight">
                {post.title}
              </h1>
            </div>
          </motion.div>
        </Container>
      </Section>

      <div className="w-full max-w-7xl mx-auto px-4 mb-24">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl relative"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-stone/10" />
        </motion.div>
      </div>

      <Section className="pt-0">
        <Container>
          <article className="max-w-3xl mx-auto">
            <div className="text-brand-stone/80 leading-[1.8] text-lg space-y-10">
              <p className="text-2xl md:text-3xl font-serif text-brand-stone italic border-l-4 border-brand-sage/30 pl-10 my-16 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="prose prose-stone prose-lg max-w-none">
                <p>
                  The journey of yoga is often described as a return home. It is a process of unlearning, of stripping away the layers of expectation and noise that we accumulate through our daily lives. At Aisel Yoga Studio, we believe that the breath is the primary bridge in this journey—a constant, rhythmic companion that anchors us in the present moment.
                </p>
                <h3 className="text-3xl font-serif text-brand-stone mt-16 mb-8">The Wisdom of Stillness</h3>
                <p>
                  In our modern world, we are conditioned to value movement and productivity above all else. But true transformation often happens in the spaces between. In the pause after an exhale. In the quiet minutes of Savasana.
                </p>
                <p>
                  When we allow ourselves to be still, we create the space necessary for our internal wisdom to emerge. This isn't just about physical rest; it's about neural integration and emotional processing.
                </p>
                <div className="my-16 p-10 bg-brand-cream/30 rounded-[2.5rem] border border-brand-beige">
                  <h4 className="text-xl font-serif mb-4 flex items-center gap-2"><Sparkles className="text-brand-sage" size={20} /> A Simple Practice for Today</h4>
                  <ul className="space-y-4 list-none pl-0">
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-2 shrink-0" /> Find a comfortable seat and close your eyes.</li>
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-2 shrink-0" /> Inhale for a count of four, feeling your ribs expand.</li>
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-2 shrink-0" /> Exhale for a count of six, letting your shoulders drop.</li>
                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-2 shrink-0" /> Repeat ten times, noticing the quality of the air.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-brand-beige flex justify-between items-center">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-beige" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-stone/40 font-bold mb-1">Written by</p>
                    <p className="font-serif italic">{post.author}</p>
                  </div>
               </div>
               <Link href="/blog">
                 <Button variant="outline" className="rounded-full px-8">All Posts</Button>
               </Link>
            </div>
          </article>
        </Container>
      </Section>
    </div>
  );
}
