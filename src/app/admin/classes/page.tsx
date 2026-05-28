"use client";

import { useClasses, useSchedule } from "@/hooks/usePersistence";
import { Plus, Trash2, Edit2, Calendar as CalendarIcon, Clock, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { YogaClass } from "@/data/mockData";
import Link from "next/link";

export default function AdminClassesPage() {
  const { data: classes, addItem, removeItem, editItem } = useClasses();
  const { data: schedule } = useSchedule();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<YogaClass>>({
    title: "",
    instructor: "Aisel",
    duration: "60 min",
    level: "All Levels",
    category: "Vinyasa",
    price: 35,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      editItem(editingId, formData);
      setEditingId(null);
    } else {
      addItem(formData as YogaClass);
    }
    setIsAdding(false);
    setFormData({ title: "", instructor: "Aisel", duration: "60 min", level: "All Levels", category: "Vinyasa", price: 35 });
  };

  const startEdit = (cls: YogaClass) => {
    setFormData(cls);
    setEditingId(cls.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Manage Classes</h1>
          <p className="text-brand-stone/60">Add, edit or remove yoga classes from your studio.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus size={18} /> New Class
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-medium mb-6">{editingId ? "Edit Class" : "Create New Class"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instructor</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.instructor}
                onChange={e => setFormData({...formData, instructor: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <input
                type="number"
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div className="md:col-span-2 flex gap-3 mt-4">
              <Button type="submit">{editingId ? "Save Changes" : "Add Class"}</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white p-6 rounded-2xl border border-brand-beige shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-brand-sage/10 text-brand-sage px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                {cls.category}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(cls)} className="p-2 text-brand-stone hover:text-brand-sage transition-colors">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => removeItem(cls.id)} className="p-2 text-brand-stone hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">{cls.title}</h3>
            <p className="text-sm text-brand-stone/60 mb-6 line-clamp-2">{cls.description}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-beige/50">
              <div className="flex items-center gap-2 text-xs text-brand-stone/50">
                <User size={14} /> {cls.instructor}
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-stone/50">
                <Clock size={14} /> {cls.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12">
        <div className="flex items-center gap-3 mb-6">
          <CalendarIcon className="text-brand-sage" size={24} />
          <h2 className="text-xl font-serif">Quick Schedule Glance</h2>
        </div>
        <div className="bg-white rounded-2xl border border-brand-beige overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-cream/50 border-b border-brand-beige">
              <tr>
                <th className="p-4 text-xs font-medium uppercase tracking-wider">Day</th>
                <th className="p-4 text-xs font-medium uppercase tracking-wider">Time</th>
                <th className="p-4 text-xs font-medium uppercase tracking-wider">Class</th>
                <th className="p-4 text-xs font-medium uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-beige">
              {schedule.slice(0, 5).map(item => (
                <tr key={item.id}>
                  <td className="p-4 text-sm font-medium">{item.day}</td>
                  <td className="p-4 text-sm text-brand-stone/60">{item.startTime}</td>
                  <td className="p-4 text-sm">{classes.find(c => c.id === item.classId)?.title || "Unknown"}</td>
                  <td className="p-4 text-sm text-brand-stone/60 flex items-center gap-1">
                    <MapPin size={14} /> {item.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-brand-cream/20 text-center">
            <Link href="/admin/schedule" className="text-sm text-brand-sage font-medium hover:underline">
              Manage Full Schedule →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
