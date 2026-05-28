"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Video,
  FileText,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Users,
  MessageSquare
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("aisel_admin_auth");
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("aisel_admin_auth");
    router.push("/admin/login");
  };

  if (!isAuthenticated && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const navItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Classes & Schedule", icon: <Calendar size={20} />, href: "/admin/classes" },
    { name: "Pricing & Plans", icon: <CreditCard size={20} />, href: "/admin/pricing" },
    { name: "Gallery", icon: <ImageIcon size={20} />, href: "/admin/gallery" },
    { name: "Videos", icon: <Video size={20} />, href: "/admin/videos" },
    { name: "Blog Posts", icon: <FileText size={20} />, href: "/admin/blog" },
    { name: "Retreats & Events", icon: <Users size={20} />, href: "/admin/retreats" },
    { name: "Testimonials", icon: <MessageSquare size={20} />, href: "/admin/testimonials" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-beige transition-transform md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-brand-beige">
            <Link href="/" className="text-2xl font-serif text-brand-stone">
              Aisel<span className="text-brand-sage/60">Yoga</span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-stone/40 mt-1">Admin Dashboard</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors group ${
                  pathname === item.href ? "bg-brand-sage text-white shadow-md" : "text-brand-stone/60 hover:bg-brand-cream hover:text-brand-stone"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform ${pathname === item.href ? "translate-x-0" : "opacity-0 group-hover:opacity-100"}`} />
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-brand-beige">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 text-brand-stone/60 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-brand-beige flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-brand-stone">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:block">
             <h2 className="text-brand-stone font-medium">Welcome back, Aisel</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-brand-sage font-medium hover:underline">View Live Site</Link>
            <div className="w-8 h-8 rounded-full bg-brand-sage/20 border border-brand-sage/40 flex items-center justify-center text-brand-sage text-xs font-bold">
              AS
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
