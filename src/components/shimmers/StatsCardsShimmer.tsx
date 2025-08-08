import React from "react";

export default function StatsCardsShimmer() {
  return (
    <div className="mb-8">
      <div className="w-48 h-8 rounded bg-gray-200 animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
              <div className="w-16 h-6 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div>
              <div className="w-24 h-4 rounded bg-gray-200 animate-pulse mb-2" />
              <div className="w-32 h-8 rounded bg-gray-200 animate-pulse mb-2" />
              <div className="w-40 h-3 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
