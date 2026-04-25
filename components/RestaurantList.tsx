"use client";

import { useState, useMemo } from "react";
import { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";

const FILTER_TAGS = [
  "Vegan",
  "Halal-Friendly",
  "Spicy",
  "English Menu",
  "Tsukemen",
  "Tonkotsu",
  "Miso",
  "Shoyu",
  "Traditional",
  "Ticket Machine",
  "Solo Counter",
];

const TAG_ICONS: Record<string, string> = {
  Vegan: "🌿",
  "Halal-Friendly": "☪️",
  Spicy: "🌶️",
  "English Menu": "🇬🇧",
  Tsukemen: "🍜",
  Tonkotsu: "🥣",
  Miso: "🫙",
  Shoyu: "🍶",
  Traditional: "🏮",
  "Ticket Machine": "🎫",
  "Solo Counter": "🪑",
};

export default function RestaurantList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const toggle = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (activeTags.size === 0) return restaurants;
    return restaurants.filter((r) =>
      [...activeTags].some((t) => r.tags.includes(t))
    );
  }, [restaurants, activeTags]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Filter bar */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
          Filter by
        </p>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setActiveTags(new Set())}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              activeTags.size === 0
                ? "text-white border-transparent shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
            style={
              activeTags.size === 0
                ? { backgroundColor: "var(--brand)", borderColor: "var(--brand)" }
                : {}
            }
          >
            All Restaurants
          </button>
          {FILTER_TAGS.map((tag) => {
            const active = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggle(tag)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
                style={
                  active
                    ? { backgroundColor: "var(--brand)", borderColor: "var(--brand)" }
                    : {}
                }
              >
                <span>{TAG_ICONS[tag]}</span>
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {filtered.length === restaurants.length ? (
            <>
              Showing <strong>{filtered.length}</strong> restaurants in Chiyoda Ward
            </>
          ) : (
            <>
              <strong>{filtered.length}</strong> of {restaurants.length} restaurants match
            </>
          )}
        </p>
        {activeTags.size > 0 && (
          <button
            onClick={() => setActiveTags(new Set())}
            className="text-xs text-gray-400 hover:text-gray-700 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🍜</p>
          <p className="text-gray-500 text-lg font-medium">No restaurants match these filters</p>
          <p className="text-gray-400 text-sm mt-1">Try removing a filter or selecting a different combination.</p>
          <button
            onClick={() => setActiveTags(new Set())}
            className="mt-6 px-6 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Show all restaurants
          </button>
        </div>
      )}
    </section>
  );
}
