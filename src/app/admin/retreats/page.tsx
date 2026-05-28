"use client";

import { useRetreats } from "@/hooks/usePersistence";
import { Plus, Trash2, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Retreat } from "@/data/mockData";

export default function AdminRetreatsPage() {
  const { data: retreats, addItem, removeItem } = useRetreats();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Retreat>>({
    title: "",
    date: "",
    location: "",
    description: "",
    price: "From $",
    image: "",
    status: "Upcoming",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as Retreat);
    setIsAdding(false);
    setFormData({ title: "", date: "", location: "", description: "", price: "From $", image: "", status: "Upcoming" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Retreats & Events</h1>
          <p className="text-brand-stone/60">Manage your special retreats, workshops, and circles.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Retreat
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4 max-w-4xl">
          <h2 className="text-xl font-medium mb-6">Create New Retreat</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Retreat Title</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                placeholder="e.g. October 12-15, 2025"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Past">Past</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full p-3 rounded-xl border border-brand-beige h-24"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex gap-3 pt-4">
              <Button type="submit">Create Retreat</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {retreats.map((retreat) => (
          <div key={retreat.id} className="bg-white rounded-3xl border border-brand-beige overflow-hidden flex flex-col md:flex-row group shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full md:w-48 h-48 shrink-0 bg-brand-cream relative">
               <img src={retreat.image} alt="" className="w-full h-full object-cover" />
               <div className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                 retreat.status === "Upcoming" ? "bg-brand-sage text-white" : "bg-brand-stone/40 text-white"
               }`}>
                 {retreat.status}
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{retreat.title}</h3>
                  <button onClick={() => removeItem(retreat.id)} className="text-brand-stone/20 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center gap-2 text-xs text-brand-stone/60">
                    <Calendar size={14} className="text-brand-sage" /> {retreat.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-stone/60">
                    <MapPin size={14} className="text-brand-sage" /> {retreat.location}
                  </div>
                </div>
                <p className="text-xs text-brand-stone/50 line-clamp-2">{retreat.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-beige flex justify-between items-center">
                <span className="font-serif text-brand-stone">{retreat.price}</span>
                <span className="text-[10px] text-brand-stone/40 flex items-center gap-1 uppercase tracking-widest">
                  <Users size={12} /> Public listing active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
