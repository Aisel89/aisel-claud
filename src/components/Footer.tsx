import Link from "next/link";
import { Container } from "./ui/Layout";
import { Mail, Globe, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-beige py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-serif tracking-tight text-brand-stone mb-6 block">
              Aisel<span className="text-brand-sage ml-1">Yoga</span>
            </span>
            <p className="text-brand-stone/70 leading-relaxed">
              Reconnect with your body, breath, and inner calm through vinyasa, breathwork, and community.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-brand-sage transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-sage transition-colors">About Aisel</Link></li>
              <li><Link href="/classes" className="hover:text-brand-sage transition-colors">Classes</Link></li>
              <li><Link href="/retreats" className="hover:text-brand-sage transition-colors">Retreats</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Classes</h4>
            <ul className="space-y-3">
              <li><Link href="/classes" className="hover:text-brand-sage transition-colors">Vinyasa Flow</Link></li>
              <li><Link href="/classes" className="hover:text-brand-sage transition-colors">Breathwork</Link></li>
              <li><Link href="/classes" className="hover:text-brand-sage transition-colors">Private Sessions</Link></li>
              <li><Link href="/classes" className="hover:text-brand-sage transition-colors">Sunday Yoga Club</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-white rounded-full text-brand-stone hover:text-brand-sage transition-colors shadow-sm">
                <Share2 size={20} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full text-brand-stone hover:text-brand-sage transition-colors shadow-sm">
                <Globe size={20} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full text-brand-stone hover:text-brand-sage transition-colors shadow-sm">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-brand-stone/60">
              123 Lake View Drive<br />
              Healing Valley, HV 54321
            </p>
          </div>
        </div>
        <div className="border-t border-brand-stone/10 mt-12 pt-8 text-center text-sm text-brand-stone/50">
          © {new Date().getFullYear()} Aisel Yoga Studio. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
