"use client";

import { usePricing } from "@/hooks/usePersistence";
import { Plus, Trash2, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { PricingPlan } from "@/data/mockData";

export default function AdminPricingPage() {
  const { data: plans, addItem, removeItem } = usePricing();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: "",
    price: "$",
    period: "per month",
    features: [],
    isPopular: false,
  });
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (idx: number) => {
    setFormData({ ...formData, features: formData.features?.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData as PricingPlan);
    setIsAdding(false);
    setFormData({ name: "", price: "$", period: "per month", features: [], isPopular: false });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif text-brand-stone">Pricing Management</h1>
          <p className="text-brand-stone/60">Manage your studio memberships and class packs.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Plan
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-brand-sage shadow-lg animate-in fade-in slide-in-from-top-4 max-w-3xl">
          <h2 className="text-xl font-medium mb-6">Create Pricing Plan</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-stone">Plan Name</label>
              <input
                className="w-full p-3 rounded-xl border border-brand-beige"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-stone">Price & Period</label>
              <div className="flex gap-2">
                <input
                  className="w-24 p-3 rounded-xl border border-brand-beige"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  required
                />
                <input
                  className="flex-1 p-3 rounded-xl border border-brand-beige"
                  value={formData.period}
                  onChange={e => setFormData({...formData, period: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-sm font-medium text-brand-stone">Features</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border border-brand-beige"
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  placeholder="e.g. Unlimited classes"
                />
                <Button type="button" onClick={addFeature} variant="outline">Add</Button>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.features?.map((f, i) => (
                  <li key={i} className="flex items-center justify-between p-2 bg-brand-cream/30 rounded-lg text-sm">
                    <span className="flex items-center gap-2"><Check size={14} className="text-brand-sage" /> {f}</span>
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">×</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPopular"
                checked={formData.isPopular}
                onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                className="w-4 h-4 text-brand-sage focus:ring-brand-sage"
              />
              <label htmlFor="isPopular" className="text-sm font-medium">Mark as "Most Popular"</label>
            </div>

            <div className="md:col-span-2 flex gap-3 pt-4 border-t border-brand-beige">
              <Button type="submit">Publish Plan</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`bg-white p-8 rounded-3xl border-2 relative ${plan.isPopular ? "border-brand-sage shadow-md" : "border-brand-beige"}`}>
            <button
              onClick={() => removeItem(plan.id)}
              className="absolute top-4 right-4 p-2 text-brand-stone/20 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            <div className="mb-6">
               <CreditCard size={32} className="text-brand-sage/40 mb-4" />
               <h3 className="text-xl font-medium">{plan.name}</h3>
               <div className="text-2xl font-serif mt-2">{plan.price} <span className="text-sm text-brand-stone/50 font-sans italic">{plan.period}</span></div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-stone/60">
                   <Check size={14} className="text-brand-sage mt-1" /> {f}
                </li>
              ))}
            </ul>
            {plan.isPopular && <div className="text-[10px] uppercase tracking-widest text-brand-sage font-bold">Featured Plan</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
