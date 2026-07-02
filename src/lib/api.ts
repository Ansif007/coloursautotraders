const BASE = "/api";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || res.statusText, res.status);
  }
  return res.json();
}

export const api = {
  auth: {
    login: (pin: string) =>
      request<{ ok: boolean }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ pin }),
      }),
    logout: () =>
      request<{ ok: boolean }>("/auth/logout", { method: "POST" }),
    me: () => request<{ role: string }>("/auth/me"),
  },

  parts: {
    list: () => request<any[]>("/parts"),
    get: (slug: string) => request<any>(`/parts/${slug}`),
    create: (part: any) =>
      request<any>("/parts", {
        method: "POST",
        body: JSON.stringify(part),
      }),
    update: (id: string, part: any) =>
      request<any>(`/parts/${id}`, {
        method: "PUT",
        body: JSON.stringify(part),
      }),
    delete: (id: string) =>
      request<{ ok: boolean }>(`/parts/${id}`, { method: "DELETE" }),
  },

  vehicles: {
    list: () => request<any[]>("/vehicles"),
    get: (slug: string) => request<any>(`/vehicles/${slug}`),
    getParts: (slug: string) => request<any[]>(`/vehicles/${slug}/parts`),
    create: (vehicle: any) =>
      request<any>("/vehicles", {
        method: "POST",
        body: JSON.stringify(vehicle),
      }),
    update: (id: string, vehicle: any) =>
      request<any>(`/vehicles/${id}`, {
        method: "PUT",
        body: JSON.stringify(vehicle),
      }),
    delete: (id: string) =>
      request<{ ok: boolean }>(`/vehicles/${id}`, { method: "DELETE" }),
    addPart: (vehicleId: string, partId: string) =>
      request<{ ok: boolean }>(`/vehicles/${vehicleId}/parts`, {
        method: "POST",
        body: JSON.stringify({ partId }),
      }),
    removePart: (vehicleId: string, partId: string) =>
      request<{ ok: boolean }>(`/vehicles/${vehicleId}/parts/${partId}`, { method: "DELETE" }),
  },

  inquiries: {
    submit: (data: {
      contactName: string;
      phone: string;
      email?: string;
      companyName?: string;
      notes?: string;
      preferredContact: string;
      items: { partId: string; quantity: number; note?: string }[];
    }) =>
      request<{ ok: boolean; id: string }>("/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    list: () => request<any[]>("/inquiries"),
  },
};
