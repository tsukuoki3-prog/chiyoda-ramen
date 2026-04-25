import Link from "next/link";
import { Restaurant } from "@/types";
import TagBadge from "./TagBadge";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

interface FeatureIconsProps {
  features: Restaurant["features"];
}

function FeatureIcons({ features }: FeatureIconsProps) {
  const icons: { show: boolean; icon: string; label: string }[] = [
    { show: features.englishMenu, icon: "🇬🇧", label: "English Menu" },
    { show: features.vegOptions, icon: "🌿", label: "Vegan / Vegetarian" },
    { show: features.halalFriendly, icon: "☪️", label: "Halal-Friendly" },
    { show: features.ticketMachine, icon: "🎫", label: "Ticket Machine" },
    { show: features.wifi, icon: "📶", label: "Free WiFi" },
    { show: features.creditCard, icon: "💳", label: "Cards Accepted" },
    { show: features.soloCounter, icon: "🪑", label: "Solo Counter" },
  ];
  const visible = icons.filter((i) => i.show);

  // "No Pork" badge — only shown when not already implied by Vegan or Halal
  const showNoPork =
    features.noPork && !features.vegOptions && !features.halalFriendly;
  // "No Cooking Alcohol" badge — only shown when not already implied by Halal
  const showNoAlcohol = features.noAlcohol && !features.halalFriendly;

  if (visible.length === 0 && !showNoPork && !showNoAlcohol) return null;
  return (
    <div className="flex gap-1.5 flex-wrap items-center">
      {visible.map(({ icon, label }) => (
        <span key={label} title={label} className="text-base leading-none">
          {icon}
        </span>
      ))}
      {showNoPork && (
        <span
          title="No Pork"
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 leading-none"
        >
          No Pork
        </span>
      )}
      {showNoAlcohol && (
        <span
          title="No Cooking Alcohol"
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 leading-none"
        >
          No Alcohol
        </span>
      )}
    </div>
  );
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name.en}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Tag overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {restaurant.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag} tag={tag} size="sm" />
          ))}
        </div>
        {/* Area badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
            {restaurant.area}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {restaurant.name.en}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">{restaurant.name.ja}</p>
        </div>

        {/* Rating + price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <StarRating rating={restaurant.rating} />
            <span className="font-semibold text-gray-800 text-sm">
              {restaurant.rating}
            </span>
            <span className="text-gray-400 text-xs">
              ({restaurant.reviewCount.toLocaleString()})
            </span>
          </div>
          <span className="text-gray-600 text-sm font-medium">
            {restaurant.priceRange}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {restaurant.description.en}
        </p>

        {/* Feature icons */}
        <div className="mb-3">
          <FeatureIcons features={restaurant.features} />
        </div>

        {/* Station */}
        <p className="text-xs text-gray-400 mb-4">
          📍 {restaurant.nearestStation}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="block w-full text-center py-2.5 px-4 rounded-xl font-medium text-sm text-white transition-colors"
            style={{ backgroundColor: "var(--brand)" }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
