import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: "var(--brand)" }}
          >
            麺
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-tight text-sm sm:text-base">
              Chiyoda Ramen Guide
            </div>
            <div className="text-xs text-gray-400 leading-tight hidden sm:block">
              千代田ラーメンガイド
            </div>
          </div>
        </Link>

        {/* Center: Beta badge */}
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-amber-300 bg-amber-50 text-amber-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          BETA — Help us improve
        </span>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Restaurants
          </Link>
          <Link
            href="/feedback"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Give Feedback
          </Link>
        </nav>
      </div>
    </header>
  );
}
