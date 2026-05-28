"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Mock API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="bg-brand-sage p-8 md:p-12 rounded-3xl text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-serif mb-4">Join Our Community</h3>
        <p className="opacity-80 mb-8">
          Receive mindful notes, early access to retreats, and studio updates directly in your inbox.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <CheckCircle2 size={40} className="text-white" />
              <p className="font-medium">Thank you for joining our circle!</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
              exit={{ opacity: 0, y: -10 }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
              <Button
                type="submit"
                className="bg-white text-brand-sage hover:bg-brand-cream border-white px-8 h-14 rounded-full whitespace-nowrap flex items-center justify-center gap-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : <>Subscribe <Send size={16} /></>}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
