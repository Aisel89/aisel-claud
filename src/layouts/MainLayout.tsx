"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { Container } from "@/components/ui/Layout";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
        {/* Global Newsletter section before footer on main pages */}
        <div className="bg-white py-20">
          <Container>
            <Newsletter />
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}
