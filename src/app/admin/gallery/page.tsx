"use client";

import { useGallery } from "@/hooks/usePersistence";
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { GalleryImage } from "@/data/mockData";

export default function AdminGalleryPage() {
  const { data: images, addItem, removeItem } = useGallery();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    url: "",
    caption: "",
    category: "Studio",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as GalleryImage);
    setIsAdding(false);
    setFormData({ url: "", caption: "", category: "Studio" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Gallery Management</h1>
          <p className="text-brand-stone/60">Upload and organize your studio photos.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Image
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4 max-w-2xl">
          <h2 className="text-xl font-medium mb-6">Add Gallery Image</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL (Mock Upload)</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Caption</label>
                <input
                  className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                  value={formData.caption}
                  onChange={e => setFormData({...formData, caption: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                  <option value="Studio">Studio</option>
                  <option value="Classes">Classes</option>
                  <option value="Retreats">Retreats</option>
                  <option value="Community">Community</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Add to Gallery</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-brand-beige">
            <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-brand-stone/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <button
                  onClick={() => removeItem(img.id)}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="text-white text-[10px] uppercase tracking-wider font-medium">
                {img.category}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setIsAdding(true)}
          className="aspect-square rounded-2xl border-2 border-dashed border-brand-beige flex flex-col items-center justify-center text-brand-stone/40 hover:text-brand-sage hover:border-brand-sage transition-all bg-brand-cream/10"
        >
          <Upload size={24} className="mb-2" />
          <span className="text-xs font-medium">Upload New</span>
        </button>
      </div>
    </div>
  );
}
