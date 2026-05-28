"use client";

import { usePersistence } from "@/hooks/usePersistence";
import { Plus, Trash2, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Testimonial } from "@/data/mockData";

export default function AdminTestimonialsPage() {
  const { data: testimonials, addItem, removeItem } = usePersistence<Testimonial>('testimonials', []);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    role: "Member",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as Testimonial);
    setIsAdding(false);
    setFormData({ name: "", role: "Member", content: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Testimonials</h1>
          <p className="text-brand-stone/60">Manage student feedback and success stories.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Testimonial
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4 max-w-2xl">
          <h2 className="text-xl font-medium mb-6">Add Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full p-3 rounded-xl border border-brand-beige"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role/Title</label>
                <input
                  className="w-full p-3 rounded-xl border border-brand-beige"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="w-full p-3 rounded-xl border border-brand-beige h-32"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit">Save Testimonial</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-8 rounded-3xl border border-brand-beige relative group">
            <button
              onClick={() => removeItem(t.id)}
              className="absolute top-4 right-4 p-2 text-brand-stone/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <Quote className="text-brand-sage/20 mb-6" size={32} />
            <p className="text-brand-stone/70 italic mb-8 leading-relaxed">"{t.content}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-sage">
                 <User size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm">{t.name}</h4>
                <p className="text-xs text-brand-stone/40 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
