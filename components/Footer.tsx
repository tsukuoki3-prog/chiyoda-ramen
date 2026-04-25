import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "var(--brand)" }}
              >
                麺
              </div>
              <span className="font-bold text-white">Chiyoda Ramen Guide</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping international visitors discover authentic ramen in
              Tokyo&apos;s Chiyoda Ward. Currently in beta — your feedback
              shapes this guide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Restaurant List
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="hover:text-white transition-colors"
                >
                  Give Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Beta notice */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Beta Notice
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              This is a prototype. Restaurant data is for demonstration purposes.
              Hours, prices, and features may differ from actual restaurants.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2026 Chiyoda Ramen Guide — Beta Version
          </p>
          <p className="text-xs text-gray-500">
            千代田区インバウンド向けラーメンガイド（ベータ版）
          </p>
        </div>
      </div>
    </footer>
  );
}
