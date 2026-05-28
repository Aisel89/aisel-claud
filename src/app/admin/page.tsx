"use client";

import { useClasses, useBlog, usePersistence, useGallery } from "@/hooks/usePersistence";
import {
  Users,
  Calendar,
  FileText,
  Image as ImageIcon,
  ArrowUpRight,
  TrendingUp,
  Activity,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Testimonial } from "@/data/mockData";

export default function AdminDashboardOverview() {
  const { data: classes } = useClasses();
  const { data: blog } = useBlog();
  const { data: testimonials } = usePersistence<Testimonial>('testimonials', []);
  const { data: gallery } = useGallery();

  const stats = [
    { label: "Total Classes", value: classes.length, icon: <Calendar className="text-blue-500" />, href: "/admin/classes" },
    { label: "Blog Posts", value: blog.length, icon: <FileText className="text-orange-500" />, href: "/admin/blog" },
    { label: "Testimonials", value: testimonials.length, icon: <MessageSquare className="text-green-500" />, href: "/admin/testimonials" },
    { label: "Gallery Items", value: gallery.length, icon: <ImageIcon className="text-purple-500" />, href: "/admin/gallery" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brand-stone">Dashboard Overview</h1>
        <p className="text-brand-stone/60">Manage your studio's digital presence and content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white p-6 rounded-2xl border border-brand-beige shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-brand-cream/50">
                {stat.icon}
              </div>
              <ArrowUpRight size={16} className="text-brand-stone/20 group-hover:text-brand-sage transition-colors" />
            </div>
            <p className="text-3xl font-serif text-brand-stone mb-1">{stat.value}</p>
            <p className="text-sm text-brand-stone/50 font-medium uppercase tracking-wider">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-3xl border border-brand-beige shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-brand-sage" size={20} />
            <h2 className="text-lg font-medium">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/classes" className="p-4 bg-brand-cream/30 rounded-xl text-brand-stone hover:bg-brand-sage hover:text-white transition-all text-center font-medium border border-brand-beige">
              Add New Class
            </Link>
            <Link href="/admin/blog" className="p-4 bg-brand-cream/30 rounded-xl text-brand-stone hover:bg-brand-sage hover:text-white transition-all text-center font-medium border border-brand-beige">
              Write Blog Post
            </Link>
            <Link href="/admin/gallery" className="p-4 bg-brand-cream/30 rounded-xl text-brand-stone hover:bg-brand-sage hover:text-white transition-all text-center font-medium border border-brand-beige">
              Upload Photos
            </Link>
            <Link href="/admin/retreats" className="p-4 bg-brand-cream/30 rounded-xl text-brand-stone hover:bg-brand-sage hover:text-white transition-all text-center font-medium border border-brand-beige">
              Create Event
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-8 rounded-3xl border border-brand-beige shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-brand-sage" size={20} />
            <h2 className="text-lg font-medium">Site Status</h2>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-brand-beige/50">
              <span className="text-brand-stone/60">Frontend Status</span>
              <span className="flex items-center gap-2 text-green-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-brand-beige/50">
              <span className="text-brand-stone/60">Database (Local)</span>
              <span className="text-brand-stone font-medium">Synchronized</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-brand-beige/50">
              <span className="text-brand-stone/60">Enterprise License</span>
              <span className="text-brand-stone font-medium">Active</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-beige text-[10px] uppercase tracking-widest text-brand-stone/30 text-center">
            Managed by Aisel Yoga Admin v1.0
          </div>
        </div>
      </div>
    </div>
  );
}
