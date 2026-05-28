"use client";

import { useVideos } from "@/hooks/usePersistence";
import { Plus, Trash2, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Video } from "@/data/mockData";

export default function AdminVideosPage() {
  const { data: videos, addItem, removeItem } = useVideos();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Video>>({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    duration: "10:00",
    category: "Flow",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as Video);
    setIsAdding(false);
    setFormData({ title: "", description: "", thumbnail: "", videoUrl: "", duration: "10:00", category: "Flow" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Video Management</h1>
          <p className="text-brand-stone/60">Manage your video library and online classes.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Video
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg max-w-3xl animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-medium mb-6">Add New Video</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Video Title</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">YouTube Video ID</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                placeholder="e.g. dQw4w9WgXcQ"
                value={formData.videoUrl}
                onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Thumbnail URL</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                value={formData.thumbnail}
                onChange={e => setFormData({...formData, thumbnail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (MM:SS)</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Short Description</label>
              <textarea
                className="w-full p-3 rounded-xl border border-brand-beige outline-none focus:ring-2 focus:ring-brand-sage/20 h-24"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button type="submit">Save Video</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl border border-brand-beige overflow-hidden group">
            <div className="relative aspect-video bg-brand-stone">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Play size={40} className="text-white opacity-80" />
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => removeItem(video.id)}
                  className="p-2 bg-white/90 text-brand-stone hover:text-red-500 rounded-lg shadow-sm transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-brand-stone">{video.title}</h3>
                <span className="text-[10px] bg-brand-cream px-2 py-1 rounded text-brand-stone/60 uppercase font-bold">{video.duration}</span>
              </div>
              <p className="text-xs text-brand-stone/50 line-clamp-2 mb-4">{video.description}</p>
              <a
                href={`https://youtube.com/watch?v=${video.videoUrl}`}
                target="_blank"
                className="text-xs text-brand-sage font-medium flex items-center gap-1 hover:underline"
              >
                View on YouTube <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
