import { readFileSync, writeFileSync } from "fs";

// Provided Unsplash hero image map (restaurant-id → base URL without size params)
const PROVIDED = {
  "kyushu-jangara":
    "https://images.unsplash.com/photo-1591814448473-7af27fe3f9ff",
  "soranoiro-artisan":
    "https://images.unsplash.com/photo-1552611052-33e04de081de",
  kikanbo: "https://images.unsplash.com/photo-1618453292459-53424b66bb6a",
  rokurinsha: "https://images.unsplash.com/photo-1623341214825-9f4f963727da",
  "kanda-katsumoto":
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
  "menya-musashi":
    "https://images.unsplash.com/photo-1591814252471-068b545dff62",
  // Unmatched IDs — assigned to the 5 remaining restaurants
  "motenashi-kuroki":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd",
  "kanda-wise": "https://images.unsplash.com/photo-1557872240-50d2bb80c974",
  tsujita: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43",
  "kudan-madara":
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d",
  "kyudai-banpaku":
    "https://images.unsplash.com/photo-1526318896980-cf78c088247c",
};

// Map the 5 unmatched provided URLs to our 5 remaining restaurant IDs
const FALLBACK_ASSIGNMENT = {
  "vegan-ramen-zen": PROVIDED["motenashi-kuroki"],
  "kanda-spice": PROVIDED["kanda-wise"],
  "halal-ramen-akiba": PROVIDED["tsujita"],
  "tsukemen-nami": PROVIDED["kudan-madara"],
  "hokkaido-miso": PROVIDED["kyudai-banpaku"],
};

// Merge into one complete map
const URL_MAP = { ...PROVIDED, ...FALLBACK_ASSIGNMENT };

// Build a URL with size params
function unsplashUrl(base, w, h, crop = "center") {
  return `${base}?auto=format&fit=crop&crop=${crop}&q=80&w=${w}&h=${h}`;
}

const data = JSON.parse(readFileSync("data/restaurants.json", "utf8"));

data.forEach((r) => {
  const base = URL_MAP[r.id];
  if (!base) {
    console.warn(`  ⚠ No URL mapping for: ${r.id}`);
    return;
  }

  // Hero: wide landscape
  r.heroImage = unsplashUrl(base, 1200, 600, "center");

  // Gallery: same photo, varied crop positions to simulate multiple shots
  const crops = ["center", "top", "bottom", "left"];
  r.images = r.images.map((_, i) =>
    unsplashUrl(base, 800, 600, crops[i % crops.length])
  );

  // Menu item thumbnails
  r.menu = r.menu.map((item) => ({
    ...item,
    image: unsplashUrl(base, 400, 300, "center"),
  }));

  console.log(`  ✓ ${r.id}`);
});

writeFileSync("data/restaurants.json", JSON.stringify(data, null, 2));
console.log("\nDone — all image URLs updated to Unsplash.");
