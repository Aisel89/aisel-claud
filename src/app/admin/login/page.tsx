"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aisel2025") {
      localStorage.setItem("aisel_admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <Container className="max-w-md">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center border border-brand-beige">
          <div className="w-16 h-16 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-serif mb-2">Admin Access</h1>
          <p className="text-brand-stone/60 mb-8 text-sm">Please enter your studio credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-medium text-brand-stone mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/20 transition-all"
                placeholder="••••••••"
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <Button className="w-full py-4" type="submit">Sign In</Button>
          </form>

          <p className="mt-8 text-xs text-brand-stone/40 uppercase tracking-widest">
            Aisel Yoga Studio Management
          </p>
        </div>
      </Container>
    </div>
  );
}
