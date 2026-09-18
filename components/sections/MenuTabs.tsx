"use client";

import { useState, useEffect } from "react";
import { Steakhouse } from "./Steakhouse";
import { Cafe } from "./Cafe";
import { useFetch } from "@/lib/hooks/useFetch";
import { SectionLoader, SectionError } from "@/components/ui/SectionLoader";
import { MenuItem } from "@/lib/content";

interface MenuData {
  steakhouse: MenuItem[];
  cafe: MenuItem[];
}

export function MenuTabs() {
  const [activeTab, setActiveTab] = useState<"steakhouse" | "cafe">("steakhouse");
  const { data, loading, error } = useFetch<MenuData>("/api/menu");

  // Sync tab with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#cafe") setActiveTab("cafe");
      if (window.location.hash === "#steakhouse") setActiveTab("steakhouse");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div id="menus" className="w-full">
      <div
        className={`transition-colors duration-500 py-6 border-y ${
          activeTab === "steakhouse"
            ? "bg-linen-muted border-border-ink"
            : "bg-[#F2EBD9] border-border-ink"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center gap-8">
          <button
            id="tab-steakhouse"
            onClick={() => {
              setActiveTab("steakhouse");
              window.history.pushState(null, "", "#steakhouse");
            }}
            className={`font-body text-sm tracking-widest uppercase transition-all duration-300 ${
              activeTab === "steakhouse"
                ? "text-bronze border-b-2 border-bronze pb-1"
                : "text-ink-muted hover:text-ink pb-1 border-b-2 border-transparent"
            }`}
          >
            The Cuts
          </button>
          <button
            id="tab-cafe"
            onClick={() => {
              setActiveTab("cafe");
              window.history.pushState(null, "", "#cafe");
            }}
            className={`font-body text-sm tracking-widest uppercase transition-all duration-300 ${
              activeTab === "cafe"
                ? "text-terracotta border-b-2 border-terracotta pb-1"
                : "text-ink-muted hover:text-ink pb-1 border-b-2 border-transparent"
            }`}
          >
            The Café
          </button>
        </div>
      </div>

      {loading && <SectionLoader tone="light" />}
      {error && <SectionError />}

      {data && (
        <div className="w-full">
          <div className={activeTab === "steakhouse" ? "block" : "hidden"}>
            <Steakhouse items={data.steakhouse} />
          </div>
          <div className={activeTab === "cafe" ? "block" : "hidden"}>
            <Cafe items={data.cafe} />
          </div>
        </div>
      )}
    </div>
  );
}
