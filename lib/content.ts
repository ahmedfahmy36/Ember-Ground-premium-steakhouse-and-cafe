import menuData from "@/content/menu.json";
import galleryData from "@/content/gallery.json";
import hoursData from "@/content/hours.json";
import aboutData from "@/content/about.json";

// ---- Types ----
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  side: "steakhouse" | "cafe";
  cut?: string;
  weight?: string;
  category?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "food" | "interior" | "ambiance";
  span: "normal" | "wide" | "tall";
}

export interface DayHours {
  day: string;
  open: boolean;
  hours: string | null;
}

export interface HoursData {
  steakhouse: DayHours[];
  cafe: DayHours[];
}

export interface AboutData {
  headline: string;
  story: string[];
  philosophy: string[];
  stats: { value: string; label: string }[];
}

// ---- Loaders ----
export function getMenuItems(): { steakhouse: MenuItem[]; cafe: MenuItem[] } {
  return menuData as { steakhouse: MenuItem[]; cafe: MenuItem[] };
}

export function getGalleryItems(): GalleryItem[] {
  return galleryData as GalleryItem[];
}

export function getHours(): HoursData {
  return hoursData as HoursData;
}

export function getAbout(): AboutData {
  return aboutData as AboutData;
}
