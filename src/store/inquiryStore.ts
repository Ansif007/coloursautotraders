import { create } from "zustand";
import type { Part, InquiryItem } from "@/types";

interface InquiryStore {
  items: InquiryItem[];
  addItem: (part: Part, quantity?: number) => void;
  removeItem: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearItems: () => void;
  totalItems: () => number;
}

const loadFromStorage = (): InquiryItem[] => {
  try {
    const stored = localStorage.getItem("colours-auto-traders-inquiry");
    if (stored) return JSON.parse(stored) as InquiryItem[];
  } catch {
    // ignore
  }
  return [];
};

const saveToStorage = (items: InquiryItem[]) => {
  try {
    localStorage.setItem("colours-auto-traders-inquiry", JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const useInquiryStore = create<InquiryStore>((set, get) => ({
  items: loadFromStorage(),

  addItem: (part, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.part.id === part.id);
      if (existing) {
        const updated = state.items.map((i) =>
          i.part.id === part.id ? { ...i, quantity: i.quantity + quantity } : i
        );
        saveToStorage(updated);
        return { items: updated };
      }
      const updated = [...state.items, { part, quantity, note: undefined }];
      saveToStorage(updated);
      return { items: updated };
    });
  },

  removeItem: (partId) => {
    set((state) => {
      const updated = state.items.filter((i) => i.part.id !== partId);
      saveToStorage(updated);
      return { items: updated };
    });
  },

  updateQuantity: (partId, quantity) => {
    set((state) => {
      const updated = state.items.map((i) =>
        i.part.id === partId ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      saveToStorage(updated);
      return { items: updated };
    });
  },

  clearItems: () => {
    saveToStorage([]);
    set({ items: [] });
  },

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
