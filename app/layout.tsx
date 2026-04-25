import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chiyoda Ramen Guide | 千代田ラーメンガイド",
  description:
    "Discover the best ramen restaurants in Chiyoda Ward, Tokyo. Vegan, Halal-friendly, and English-menu options curated for international visitors. Beta version.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ background: "var(--background)" }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
