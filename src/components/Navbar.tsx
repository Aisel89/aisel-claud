"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wind } from "lucide-react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Layout";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Classes", href: "/classes" },
  { name: "Schedule", href: "/schedule" },
  { name: "Retreats", href: "/retreats" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-sage rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-500">
               <Wind size={20} />
            </div>
            <span className="text-2xl font-serif text-brand-stone tracking-tight">
              Aisel<span className="text-brand-sage/60">Yoga</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-brand-sage ${
                  pathname === link.href ? "text-brand-sage" : "text-brand-stone/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/schedule">
              <Button size="sm" className="px-6 rounded-full">Book Now</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-brand-stone hover:text-brand-sage transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white fixed inset-0 top-0 pt-24 px-6 z-40 overflow-hidden"
          >
            <div className="flex flex-col gap-8 items-center text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-serif transition-colors ${
                    pathname === link.href ? "text-brand-sage italic" : "text-brand-stone"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/schedule" className="w-full max-w-xs mt-4">
                <Button size="lg" className="w-full rounded-full">Book Your Class</Button>
              </Link>

              <div className="mt-12 space-y-4">
                <p className="text-brand-stone/40 text-xs uppercase tracking-widest">Connect with us</p>
                <div className="flex gap-6 justify-center text-brand-sage">
                  <Link href="#" className="hover:scale-110 transition-transform">Instagram</Link>
                  <Link href="#" className="hover:scale-110 transition-transform">Facebook</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
