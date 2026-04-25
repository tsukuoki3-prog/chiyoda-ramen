const TAG_STYLES: Record<string, string> = {
  Vegan: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Vegetarian: "bg-green-100 text-green-800 border-green-200",
  Spicy: "bg-red-100 text-red-800 border-red-200",
  "Halal-Friendly": "bg-teal-100 text-teal-800 border-teal-200",
  "English Menu": "bg-blue-100 text-blue-800 border-blue-200",
  Tsukemen: "bg-violet-100 text-violet-800 border-violet-200",
  Tonkotsu: "bg-amber-100 text-amber-800 border-amber-200",
  Miso: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Ticket Machine": "bg-gray-100 text-gray-700 border-gray-200",
  "Solo Counter": "bg-slate-100 text-slate-700 border-slate-200",
  "Seafood Broth": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Chicken Broth": "bg-orange-100 text-orange-800 border-orange-200",
  Tantanmen: "bg-rose-100 text-rose-800 border-rose-200",
  "Hokkaido-Style": "bg-sky-100 text-sky-800 border-sky-200",
  "Gluten-Free Option": "bg-lime-100 text-lime-800 border-lime-200",
  "Unique Theme": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  Popular: "bg-pink-100 text-pink-800 border-pink-200",
  Traditional: "bg-stone-100 text-stone-700 border-stone-200",
  Sophisticated: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Shoyu: "bg-orange-100 text-orange-800 border-orange-200",
  "Thick Soup": "bg-amber-200 text-amber-900 border-amber-300",
};

const DEFAULT_STYLE = "bg-gray-100 text-gray-700 border-gray-200";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
}

export default function TagBadge({ tag, size = "md" }: TagBadgeProps) {
  const style = TAG_STYLES[tag] ?? DEFAULT_STYLE;
  const sizeClass =
    size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${style} ${sizeClass}`}
    >
      {tag}
    </span>
  );
}
