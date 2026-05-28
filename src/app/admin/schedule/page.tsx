"use client";

import { useSchedule, useClasses } from "@/hooks/usePersistence";
import { Plus, Trash2, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ScheduleItem } from "@/data/mockData";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export default function AdminSchedulePage() {
  const { data: schedule, addItem, removeItem } = useSchedule();
  const { data: classes } = useClasses();
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<ScheduleItem>>({
    classId: classes[0]?.id || "",
    day: "Monday",
    startTime: "08:00",
    endTime: "09:00",
    instructor: "Aisel",
    location: "Main Studio",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as ScheduleItem);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Manage Schedule</h1>
          <p className="text-brand-stone/60">Organize your weekly studio timetable.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Slot
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-medium mb-6">Add Schedule Slot</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Class</label>
              <select
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.classId}
                onChange={e => setFormData({...formData, classId: e.target.value})}
              >
                {classes.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Day</label>
              <select
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.day}
                onChange={e => setFormData({...formData, day: e.target.value as any})}
              >
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.startTime}
                onChange={e => setFormData({...formData, startTime: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Time</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.endTime}
                onChange={e => setFormData({...formData, endTime: e.target.value})}
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
              <label className="text-sm font-medium">Location</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="lg:col-span-3 flex gap-3 mt-4">
              <Button type="submit">Add to Schedule</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-12">
        {DAYS.map(day => {
          const items = schedule.filter(s => s.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
          if (items.length === 0) return null;

          return (
            <div key={day}>
              <h2 className="text-lg font-medium text-brand-stone mb-4 border-b border-brand-beige pb-2">{day}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border border-brand-beige shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-brand-sage font-medium">
                          <Clock size={16} /> {item.startTime} - {item.endTime}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-brand-stone/30 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <h3 className="text-xl font-serif mb-4">
                        {classes.find(c => c.id === item.classId)?.title || "Untitled Session"}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-beige/50 text-xs text-brand-stone/50">
                      <div className="flex items-center gap-1">
                        <User size={14} /> {item.instructor}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {item.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
