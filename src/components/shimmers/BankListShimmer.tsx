import React from "react";

export default function BankListShimmer() {
  return (
    <div className="rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-48 h-8 rounded bg-gray-200 animate-pulse" />
        <div className="w-8 h-6 rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-indigo-200 shadow p-5 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="w-32 h-6 rounded bg-gray-200 animate-pulse" />
              <div className="w-12 h-4 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="w-20 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-16 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-24 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-12 h-3 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
