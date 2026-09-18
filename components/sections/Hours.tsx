"use client";

import { Section } from "@/components/ui/Section";
import { SectionLoader, SectionError } from "@/components/ui/SectionLoader";
import { useFetch } from "@/lib/hooks/useFetch";
import { HoursData } from "@/lib/content";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getTodayName(): string {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

export function Hours() {
  const { data, loading, error } = useFetch<HoursData>("/api/hours");
  const today = getTodayName();

  return (
    <Section id="hours" tone="linen">
      <div className="mb-12">
        <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-3">
          When To Come
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
          Opening Hours
        </h2>
      </div>

      {loading && <SectionLoader tone="light" />}
      {error && <SectionError />}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-bronze border-b border-border-ink pb-3 mb-4">
              Ember — The Steakhouse
            </p>
            <p className="font-body text-xs text-ink-muted mb-6 leading-relaxed">
              Reservations strongly recommended. Walk-ins seated at the bar only, subject to availability.
            </p>
            <ul className="space-y-0">
              {data.steakhouse.map((row) => {
                const isToday = row.day === today;
                return (
                  <li
                    key={row.day}
                    className={`
                      flex justify-between items-center py-3 border-b border-border-ink transition-colors
                      ${isToday ? "text-ink" : row.open ? "text-ink-dark" : "text-ink-muted"}
                    `}
                  >
                    <span className={`font-body text-sm ${isToday ? "font-medium" : ""}`}>
                      {isToday && (
                        <span className="inline-block w-1.5 h-1.5 bg-bronze rounded-full mr-2 align-middle" />
                      )}
                      {row.day}
                    </span>
                    <span className="font-body text-sm">
                      {row.open ? row.hours : "Closed"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-terracotta border-b border-border-ink pb-3 mb-4">
              The Ground — Café
            </p>
            <p className="font-body text-xs text-ink-muted mb-6 leading-relaxed">
              Walk-ins only. Coffee service ends 30 minutes before close. Last food orders 15 minutes before close.
            </p>
            <ul className="space-y-0">
              {data.cafe.map((row) => {
                const isToday = row.day === today;
                return (
                  <li
                    key={row.day}
                    className={`
                      flex justify-between items-center py-3 border-b border-border-ink transition-colors
                      ${isToday ? "text-ink" : row.open ? "text-ink-dark" : "text-ink-muted"}
                    `}
                  >
                    <span className={`font-body text-sm ${isToday ? "font-medium" : ""}`}>
                      {isToday && (
                        <span className="inline-block w-1.5 h-1.5 bg-terracotta rounded-full mr-2 align-middle" />
                      )}
                      {row.day}
                    </span>
                    <span className="font-body text-sm">
                      {row.open ? row.hours : "Closed"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
}
