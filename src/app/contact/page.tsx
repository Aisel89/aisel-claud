"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { AnimatePresence, Transition, Variants, motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Mock API
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="pb-12 text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Get in Touch</h1>
          <p className="text-brand-stone/60 max-w-2xl mx-auto text-lg">
            Whether you have a question about our classes, private sessions, or retreats, we'd love to hear from you.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info */}
            <div className="w-full lg:w-1/3 space-y-12">
              <div>
                <h3 className="text-2xl font-serif mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-brand-stone/40 font-bold mb-1">Email</p>
                      <p className="text-brand-stone">hello@aiselyoga.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-brand-stone/40 font-bold mb-1">Phone</p>
                      <p className="text-brand-stone">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-brand-stone/40 font-bold mb-1">Studio</p>
                      <p className="text-brand-stone">123 Healing Valley, Lake Side, CA 90210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-brand-cream rounded-3xl border border-brand-beige">
                <h4 className="font-medium mb-4">Studio Hours</h4>
                <ul className="space-y-2 text-sm text-brand-stone/70">
                  <li className="flex justify-between"><span>Mon - Fri</span> <span>7:00 AM - 8:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday</span> <span>8:00 AM - 4:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span>8:00 AM - 2:00 PM</span></li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:flex-1">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-brand-beige shadow-sm">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-serif mb-2">Message Sent</h3>
                      <p className="text-brand-stone/60">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <Button
                        variant="outline"
                        className="mt-8"
                        onClick={() => setStatus("idle")}
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-brand-stone">Your Name</label>
                          <input
                            required
                            className="w-full p-4 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none transition-all"
                            placeholder="Aisel"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-brand-stone">Email Address</label>
                          <input
                            required
                            type="email"
                            className="w-full p-4 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none transition-all"
                            placeholder="hello@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-stone">Subject</label>
                        <select
                          className="w-full p-4 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none transition-all"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        >
                          <option>General Inquiry</option>
                          <option>Private Session Booking</option>
                          <option>Sunday Yoga Club</option>
                          <option>Retreat Information</option>
                          <option>Membership Question</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-stone">Your Message</label>
                        <textarea
                          required
                          className="w-full p-4 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none transition-all h-40"
                          placeholder="How can we help you on your journey?"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-16 text-lg shadow-lg shadow-brand-sage/10"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Sending..." : <>Send Message <Send size={18} className="ml-2" /></>}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
