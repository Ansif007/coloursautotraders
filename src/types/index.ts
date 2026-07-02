export interface PartImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

export interface Compatibility {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  engineCode?: string;
  notes?: string;
}

export type Category =
  | "engine"
  | "transmission"
  | "suspension"
  | "brakes"
  | "electrical"
  | "body"
  | "hydraulics"
  | "filters"
  | "belts_chains"
  | "cooling"
  | "exhaust"
  | "industrial";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Part {
  id: string;
  slug: string;
  name: string;
  partNumber: string;
  oemNumbers: string[];
  brand: string;
  category: Category;
  subcategory: string;
  description: string;
  shortDescription: string;
  images: PartImage[];
  specifications: Specification[];
  compatibility: Compatibility[];
  stockStatus: StockStatus;
  stockNote?: string;
  tags: string[];
  viewCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryItem {
  part: Part;
  quantity: number;
  note?: string;
}

export interface InquiryForm {
  contactName: string;
  phone: string;
  email?: string;
  companyName?: string;
  notes?: string;
  preferredContact: "whatsapp" | "email" | "call";
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  make: string;
  model: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  partCount?: number;
}

export interface AdminState {
  parts: Part[];
  isAuthenticated: boolean;
}
