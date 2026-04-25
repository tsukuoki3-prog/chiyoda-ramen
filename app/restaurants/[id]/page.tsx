import { notFound } from "next/navigation";
import Link from "next/link";
import { Restaurant } from "@/types";
import restaurantsData from "@/data/restaurants.json";
import TagBadge from "@/components/TagBadge";

const restaurants = restaurantsData as Restaurant[];

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return {};
  return {
    title: `${restaurant.name.en} | Chiyoda Ramen Guide`,
    description: restaurant.description.en,
  };
}

function FeatureRow({ features }: { features: Restaurant["features"] }) {
  const items: { show: boolean; icon: string; label: string; note?: string }[] =
    [
      {
        show: features.englishMenu,
        icon: "🇬🇧",
        label: "English Menu",
        note: "Staff can assist in English",
      },
      {
        show: features.vegOptions,
        icon: "🌿",
        label: "Vegan / Vegetarian Options",
        note: "Plant-based choices available",
      },
      {
        show: features.halalFriendly,
        icon: "☪️",
        label: "Halal-Friendly",
        note: "No pork or alcohol in broth",
      },
      {
        show: features.ticketMachine,
        icon: "🎫",
        label: "Ticket Machine",
        note: "Order via vending machine",
      },
      {
        show: features.wifi,
        icon: "📶",
        label: "Free WiFi",
        note: "Available for customers",
      },
      {
        show: features.creditCard,
        icon: "💳",
        label: "Credit Cards Accepted",
        note: "Visa / MC / AMEX accepted",
      },
      {
        show: features.soloCounter,
        icon: "🪑",
        label: "Solo Counter Seats",
        note: "Great for solo diners",
      },
      {
        show: features.noPork,
        icon: "🚫",
        label: "Pork-Free",
        note: "No pork in broth or toppings",
      },
      {
        show: features.noAlcohol,
        icon: "🍶",
        label: "No Cooking Alcohol",
        note: "No mirin / sake used in cooking",
      },
    ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map(({ show, icon, label, note }) => (
        <div
          key={label}
          className={`flex items-start gap-2.5 p-3 rounded-xl border text-sm ${
            show
              ? "bg-green-50 border-green-100 text-green-900"
              : "bg-gray-50 border-gray-100 text-gray-400"
          }`}
        >
          <span className="text-xl leading-none mt-0.5">{icon}</span>
          <div>
            <div className="font-medium text-xs">{label}</div>
            {show && note && (
              <div className="text-xs opacity-70 mt-0.5">{note}</div>
            )}
            {!show && (
              <div className="text-xs mt-0.5">Not available</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TicketGuide({ guide }: { guide: Restaurant["ticketMachineGuide"] }) {
  if (!guide) return null;
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
          🎫
        </div>
        <div>
          <h3 className="font-bold text-gray-900">How to Use the Ticket Machine</h3>
          <p className="text-sm text-gray-500">券売機の使い方 — Step-by-step guide</p>
        </div>
      </div>
      <ol className="space-y-4">
        {guide.steps.map((s) => (
          <li key={s.step} className="flex gap-4">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {s.step}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-gray-800 text-sm leading-relaxed">{s.en}</p>
              <p className="text-gray-400 text-xs mt-1">{s.ja}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Placeholder machine image */}
      <div className="mt-6 rounded-xl overflow-hidden bg-gray-200 aspect-video flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm font-medium">Photo: Ticket machine at this restaurant</p>
          <p className="text-xs">(placeholder — photo coming soon)</p>
        </div>
      </div>
    </div>
  );
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) notFound();

  return (
    <div style={{ background: "var(--background)" }}>
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-200">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name.en}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium hover:bg-white transition-colors"
          >
            ← All Restaurants
          </Link>
        </div>

        {/* Restaurant name overlay */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {restaurant.name.en}
          </h1>
          <p className="text-red-200 text-lg">{restaurant.name.ja}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { icon: "⭐", label: "Rating", value: `${restaurant.rating} (${restaurant.reviewCount.toLocaleString()} reviews)` },
            { icon: "💰", label: "Price Range", value: restaurant.priceRange },
            { icon: "🕐", label: "Hours", value: restaurant.hours },
            { icon: "📅", label: "Closed", value: restaurant.closed },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs text-gray-400 mb-0.5">{label}</div>
              <div className="text-sm font-medium text-gray-800 leading-snug">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Address & Getting there */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📍</span> How to Get There
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Address</p>
              <p className="text-gray-800">{restaurant.address}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Nearest Station</p>
              <p className="text-gray-800">{restaurant.nearestStation}</p>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="mt-4 rounded-xl overflow-hidden bg-gray-100 h-36 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-2xl mb-1">🗺️</p>
              <p className="text-sm">Map placeholder — Google Maps embed coming soon</p>
            </div>
          </div>
        </div>

        {/* Dietary notices — shown when the relevant feature is true */}
        {restaurant.features.vegOptions && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-4 flex gap-4">
            <span className="text-3xl">🌿</span>
            <div>
              <h3 className="font-bold text-emerald-900">Vegan / Vegetarian Friendly</h3>
              <p className="text-emerald-700 text-sm mt-1">
                This restaurant offers certified plant-based options. All vegan
                menu items are clearly marked. Please inform staff of any
                allergies when ordering.
              </p>
            </div>
          </div>
        )}

        {restaurant.features.halalFriendly && (
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-4 flex gap-4">
            <span className="text-3xl">☪️</span>
            <div>
              <h3 className="font-bold text-teal-900">Halal-Friendly</h3>
              <p className="text-teal-700 text-sm mt-1">
                Broth and toppings are prepared without pork or alcohol. Staff
                can explain ingredients in detail. Please confirm with staff if
                you have specific requirements.
              </p>
            </div>
          </div>
        )}

        {restaurant.features.noPork && !restaurant.features.vegOptions && !restaurant.features.halalFriendly && (
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-4 flex gap-4">
            <span className="text-3xl">🚫</span>
            <div>
              <h3 className="font-bold text-orange-900">Pork-Free</h3>
              <p className="text-orange-700 text-sm mt-1">
                No pork is used in the broth or toppings. Suitable for those
                who avoid pork for dietary, religious, or personal reasons.
                Always confirm with staff for allergy-specific needs.
              </p>
            </div>
          </div>
        )}

        {restaurant.features.noAlcohol && !restaurant.features.halalFriendly && (
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 mb-4 flex gap-4">
            <span className="text-3xl">🍶</span>
            <div>
              <h3 className="font-bold text-purple-900">No Cooking Alcohol</h3>
              <p className="text-purple-700 text-sm mt-1">
                This restaurant does not use mirin, sake, or other
                alcohol-based ingredients in cooking. Please confirm with staff
                if you have strict requirements.
              </p>
            </div>
          </div>
        )}

        <div className="mb-8" />

        {/* Description */}
        <div className="mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{restaurant.description.en}</p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">{restaurant.description.ja}</p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-4">Restaurant Features</h2>
          <FeatureRow features={restaurant.features} />
        </div>

        {/* Languages */}
        {restaurant.languages.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-gray-900 text-xl mb-3">
              Languages Spoken by Staff
            </h2>
            <div className="flex flex-wrap gap-2">
              {restaurant.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        <div className="mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-4">
            Photo Gallery
            <span className="ml-2 text-sm text-gray-400 font-normal">
              (placeholder images)
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {restaurant.images.map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-gray-200"
              >
                <img
                  src={img}
                  alt={`${restaurant.name.en} photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Machine Guide */}
        <div className="mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-4">How to Order</h2>
          {restaurant.ticketMachineGuide ? (
            <TicketGuide guide={restaurant.ticketMachineGuide} />
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
              <p className="text-gray-500 text-sm">
                This restaurant takes orders directly at the counter or table.
                Staff speak English and can help you order.
              </p>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-4">
            Menu Highlights
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {restaurant.menu.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex"
              >
                <div className="w-24 flex-shrink-0 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name.en}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.name.en}
                      </p>
                      <p className="text-xs text-gray-400">{item.name.ja}</p>
                    </div>
                    <span
                      className="font-bold text-sm flex-shrink-0"
                      style={{ color: "var(--brand)" }}
                    >
                      ¥{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((t) => (
                      <TagBadge key={t} tag={t} size="sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Useful Phrases */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>💬</span> Useful Japanese Phrases
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { en: "One bowl of ramen, please.", ja: "ラーメンひとつください。", romaji: "Rāmen hitotsu kudasai." },
              { en: "What do you recommend?", ja: "おすすめは何ですか？", romaji: "Osusume wa nan desu ka?" },
              { en: "Less spicy, please.", ja: "辛さ控えめでお願いします。", romaji: "Karasa hikaeme de onegai shimasu." },
              { en: "Can I pay by card?", ja: "カードで払えますか？", romaji: "Kādo de haraemasu ka?" },
              { en: "Extra noodles, please. (Tsukemen)", ja: "替え玉ください。", romaji: "Kaedama kudasai." },
              { en: "Soup split, please. (Tsukemen finish)", ja: "スープ割りください。", romaji: "Sūpu-wari kudasai." },
            ].map(({ en, ja, romaji }) => (
              <div key={en} className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-300 text-xs mb-1">{en}</p>
                <p className="font-medium text-white">{ja}</p>
                <p className="text-gray-400 text-xs mt-0.5 italic">{romaji}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback CTA */}
        <div
          className="rounded-2xl p-8 text-center text-white"
          style={{
            background:
              "linear-gradient(135deg, #1A0508 0%, #C41E3A 100%)",
          }}
        >
          <p className="text-2xl mb-2">📝</p>
          <h3 className="font-bold text-xl mb-2">
            Visited {restaurant.name.en}?
          </h3>
          <p className="text-red-100 text-sm mb-6">
            Missing information, wrong details, or a suggestion? Help us
            improve this guide for future visitors.
          </p>
          <Link
            href={`/feedback?restaurant=${restaurant.id}`}
            className="inline-block px-6 py-3 bg-white rounded-xl font-semibold text-sm transition-colors hover:bg-red-50"
            style={{ color: "var(--brand)" }}
          >
            Give Feedback about this Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}
