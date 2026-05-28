"use client";

import { useBlog } from "@/hooks/usePersistence";
import { Plus, Trash2, Edit2, Eye, Calendar, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BlogPost } from "@/data/mockData";
import Link from "next/link";

export default function AdminBlogPage() {
  const { data: posts, addItem, removeItem, editItem } = useBlog();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "Aisel",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    image: "",
    category: "Wellness",
    slug: "",
  });

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, slug: formData.slug || generateSlug(formData.title || "") };
    if (editingId) {
      editItem(editingId, finalData);
      setEditingId(null);
    } else {
      addItem(finalData as BlogPost);
    }
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "Aisel",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: "",
      category: "Wellness",
      slug: "",
    });
  };

  const startEdit = (post: BlogPost) => {
    setFormData(post);
    setEditingId(post.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Blog Management</h1>
          <p className="text-brand-stone/60">Write and publish articles for your community.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus size={18} /> New Post
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-medium mb-6">{editingId ? "Edit Post" : "Compose New Post"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Post Title</label>
                <input
                  className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input
                  className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Image URL</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt (Short Summary)</label>
              <textarea
                className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none h-20"
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Post Content (HTML/Rich Text supported in real app)</label>
              <textarea
                className="w-full p-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-sage/20 outline-none h-64 font-mono text-sm"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit">{editingId ? "Update Post" : "Publish Post"}</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-brand-beige overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-brand-cream/30 border-b border-brand-beige">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-brand-stone/60">Post</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-brand-stone/60">Category</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-brand-stone/60">Author</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-brand-stone/60">Date</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-brand-stone/60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-beige">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-brand-cream/10 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-beige overflow-hidden shrink-0">
                      <img src={post.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-brand-stone">{post.title}</div>
                      <div className="text-[10px] text-brand-stone/40 font-mono">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs bg-brand-sage/10 text-brand-sage px-2 py-1 rounded-full">{post.category}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-brand-stone/60">
                    <UserIcon size={14} /> {post.author}
                  </div>
                </td>
                <td className="p-4 text-sm text-brand-stone/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> {post.date}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-brand-stone/40 hover:text-brand-sage transition-colors">
                      <Eye size={18} />
                    </Link>
                    <button onClick={() => startEdit(post)} className="p-2 text-brand-stone/40 hover:text-brand-sage transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => removeItem(post.id)} className="p-2 text-brand-stone/40 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
