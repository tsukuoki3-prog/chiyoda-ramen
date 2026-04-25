"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import restaurantsData from "@/data/restaurants.json";

const RESTAURANTS = restaurantsData.map((r) => ({
  id: r.id,
  label: `${r.name.en} (${r.name.ja})`,
}));

const FEEDBACK_TYPES = [
  "Missing restaurant information",
  "Incorrect details (hours, address, price)",
  "Translation issue (Japanese/English)",
  "New restaurant suggestion",
  "UI / website issue",
  "Ticket machine guide unclear",
  "Accessibility concern",
  "Other",
];

const LANGUAGES = [
  "English",
  "Japanese",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Korean",
  "French",
  "Spanish",
  "Arabic",
  "Thai",
  "Other",
];

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const labels = [
    "",
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent",
  ];
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl leading-none transition-transform hover:scale-110"
          aria-label={`Rate ${n} stars`}
        >
          <span className={n <= (hover || value) ? "text-amber-400" : "text-gray-200"}>
            ★
          </span>
        </button>
      ))}
      {(hover || value) > 0 && (
        <span className="ml-2 text-sm text-gray-500">
          {labels[hover || value]}
        </span>
      )}
    </div>
  );
}

function FeedbackFormInner() {
  const searchParams = useSearchParams();
  const preselectedRestaurant = searchParams.get("restaurant") ?? "";

  const [form, setForm] = useState({
    restaurant: preselectedRestaurant,
    feedbackType: "",
    language: "English",
    rating: 0,
    message: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedRestaurant) {
      setForm((f) => ({ ...f, restaurant: preselectedRestaurant }));
    }
  }, [preselectedRestaurant]);

  const set = (key: string, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.feedbackType) e.feedbackType = "Please select a feedback type.";
    if (form.rating === 0) e.rating = "Please give a rating.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please write at least 10 characters.";
    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    )
      e.email = "Invalid email address.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // In production: POST to /api/feedback
    console.log("Feedback submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Thank you for your feedback!
        </h2>
        <p className="text-gray-500 mb-2">
          Your input helps us make this guide more useful for international
          visitors to Chiyoda Ward.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          We aim to review all submissions within 3–5 business days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            ← Back to Restaurant List
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                restaurant: "",
                feedbackType: "",
                language: "English",
                rating: 0,
                message: "",
                email: "",
              });
              setErrors({});
            }}
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6 inline-block"
        >
          ← Back to restaurants
        </Link>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: "#FEF3C7" }}
          >
            📝
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Give Feedback</h1>
            <p className="text-gray-500 mt-1 text-sm leading-relaxed">
              You&apos;re helping build the best ramen guide for international
              visitors. Your feedback is reviewed by our team and shapes future
              updates.
            </p>
          </div>
        </div>
        {/* Beta notice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-800 flex gap-2">
          <span className="flex-shrink-0">⚡</span>
          <p>
            <strong>Beta tester:</strong> This guide is actively being
            developed. Missing data, translation errors, and broken features are
            all useful to report — no detail is too small.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Restaurant (optional)
          </label>
          <select
            value={form.restaurant}
            onChange={(e) => set("restaurant", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 text-gray-800"
          >
            <option value="">— General feedback (not restaurant-specific) —</option>
            {RESTAURANTS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Feedback Type <span className="text-red-500">*</span>
          </label>
          <select
            value={form.feedbackType}
            onChange={(e) => {
              set("feedbackType", e.target.value);
              if (errors.feedbackType) setErrors((e) => ({ ...e, feedbackType: "" }));
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 text-gray-800"
          >
            <option value="">— Select a category —</option>
            {FEEDBACK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.feedbackType && (
            <p className="text-red-500 text-xs mt-1">{errors.feedbackType}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your language
          </label>
          <select
            value={form.language}
            onChange={(e) => set("language", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 text-gray-800"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Helps us understand what translation coverage to prioritize.
          </p>
        </div>

        {/* Overall rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How useful is this guide so far?{" "}
            <span className="text-red-500">*</span>
          </label>
          <StarPicker
            value={form.rating}
            onChange={(n) => {
              set("rating", n);
              if (errors.rating) setErrors((e) => ({ ...e, rating: "" }));
            }}
          />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => {
              set("message", e.target.value);
              if (errors.message) setErrors((err) => ({ ...err, message: "" }));
            }}
            rows={5}
            placeholder="E.g. The ticket machine guide for Kyushu Jangara is missing a photo. The Halal section needs more restaurants. The opening hours for X are incorrect..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 resize-none text-gray-800 placeholder-gray-400"
          />
          <div className="flex justify-between mt-1">
            {errors.message ? (
              <p className="text-red-500 text-xs">{errors.message}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-gray-400">{form.message.length} chars</p>
          </div>
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              set("email", e.target.value);
              if (errors.email) setErrors((err) => ({ ...err, email: "" }));
            }}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 text-gray-800 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Only used to follow up if we need clarification. Never shared.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white text-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Submit Feedback →
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            By submitting, you agree that your feedback may be used to improve
            this guide. No personal data is stored without consent.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-12 text-gray-400 text-sm">Loading…</div>}>
      <FeedbackFormInner />
    </Suspense>
  );
}
