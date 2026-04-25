import { Restaurant } from "@/types";
import restaurantsData from "@/data/restaurants.json";
import RestaurantList from "@/components/RestaurantList";

export default function HomePage() {
  const restaurants = restaurantsData as Restaurant[];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1A0508 0%, #2D0A0F 50%, #C41E3A 100%)",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              BETA VERSION — Help us improve this guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
              千代田ラーメンガイド
            </h1>
            <p className="text-xl sm:text-2xl text-red-200 font-medium mb-4">
              Chiyoda Ramen Guide
            </p>
            <p className="text-red-100 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Discover authentic ramen in Tokyo&apos;s Chiyoda Ward — curated
              for international visitors. Vegan, halal-friendly, and
              English-menu options included.
            </p>
            <div className="flex flex-wrap gap-8">
              {[
                { value: "6", label: "Restaurants" },
                { value: "3", label: "Areas in Chiyoda" },
                { value: "4+", label: "Dietary options" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-red-200">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <div className="bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-amber-800">
          <span className="flex items-center gap-2">
            <span>🎫</span>
            <strong>Ticket machine (券売機)?</strong>&nbsp;Most shops use
            vending machines to order. Each restaurant page has a step-by-step
            guide.
          </span>
          <span className="hidden sm:block text-amber-300">|</span>
          <span className="flex items-center gap-2">
            <span>📝</span>
            This is a beta — found an error?&nbsp;
            <a
              href="/feedback"
              className="font-semibold underline underline-offset-2"
            >
              Tell us
            </a>
          </span>
        </div>
      </div>

      {/* Restaurants */}
      <RestaurantList restaurants={restaurants} />
    </>
  );
}
