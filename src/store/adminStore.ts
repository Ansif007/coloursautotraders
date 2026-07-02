import { create } from "zustand";
import type { Part } from "@/types";
import { api } from "@/lib/api";

interface AdminStore {
  isAuthenticated: boolean;
  user: { role: string } | null;
  parts: Part[];
  loading: boolean;
  error: string | null;
  login: (pin: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  fetchParts: () => Promise<void>;
  addPart: (part: Omit<Part, "id" | "slug" | "createdAt" | "updatedAt" | "viewCount">) => Promise<void>;
  updatePart: (part: Part) => Promise<void>;
  deletePart: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  parts: [],
  loading: false,
  error: null,

  login: async (pin: string) => {
    try {
      await api.auth.login(pin);
      set({ isAuthenticated: true, user: { role: "admin" } });
      return true;
    } catch {
      return false;
    }
  },

  logout: async () => {
    try {
      await api.auth.logout();
    } catch {
      // ignore
    }
    set({ isAuthenticated: false, user: null, parts: [] });
  },

  checkAuth: async () => {
    try {
      const user = await api.auth.me();
      set({ isAuthenticated: true, user });
    } catch {
      set({ isAuthenticated: false, user: null });
    }
  },

  fetchParts: async () => {
    set({ loading: true, error: null });
    try {
      const parts = await api.parts.list();
      set({ parts, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addPart: async (part) => {
    try {
      await api.parts.create(part);
      await get().fetchParts();
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  updatePart: async (part) => {
    try {
      await api.parts.update(part.id, part);
      await get().fetchParts();
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deletePart: async (id: string) => {
    try {
      await api.parts.delete(id);
      await get().fetchParts();
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },
}));
