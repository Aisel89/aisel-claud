"use client";

import { useState, useEffect } from 'react';
import * as initialData from '@/data/mockData';

type DataKeys = 'classes' | 'schedule' | 'pricing' | 'testimonials' | 'blog' | 'gallery' | 'videos' | 'retreats';

const STORAGE_PREFIX = 'aisel_yoga_';

export function usePersistence<T>(key: DataKeys, initialValue: T[]) {
  const [data, setData] = useState<T[]>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  const storageKey = STORAGE_PREFIX + key;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data for', key, e);
      }
    }
    setIsLoaded(true);
  }, [storageKey, key]);

  // Save to localStorage whenever data changes
  const updateData = (newData: T[] | ((prev: T[]) => T[])) => {
    setData((prev) => {
      const next = typeof newData === 'function' ? (newData as any)(prev) : newData;
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const addItem = (item: T) => {
    updateData((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const removeItem = (id: string) => {
    updateData((prev) => prev.filter((item: any) => item.id !== id));
  };

  const editItem = (id: string, updatedItem: Partial<T>) => {
    updateData((prev) =>
      prev.map((item: any) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  return {
    data,
    updateData,
    addItem,
    removeItem,
    editItem,
    isLoaded,
  };
}

// Convenience hooks for specific data types
export function useClasses() { return usePersistence('classes', initialData.initialClasses); }
export function useSchedule() { return usePersistence('schedule', initialData.initialSchedule); }
export function usePricing() { return usePersistence('pricing', initialData.initialPricing); }
export function useTestimonials() { return usePersistence('testimonials', initialData.initialTestimonials); }
export function useBlog() { return usePersistence('blog', initialData.initialBlogPosts); }
export function useGallery() { return usePersistence('gallery', initialData.initialGallery); }
export function useVideos() { return usePersistence('videos', initialData.initialVideos); }
export function useRetreats() { return usePersistence('retreats', initialData.initialRetreats); }
