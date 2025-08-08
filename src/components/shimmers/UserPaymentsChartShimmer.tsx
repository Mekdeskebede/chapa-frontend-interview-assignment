import React from "react";

export default function UserPaymentsChartShimmer() {
  return (
    <div className="rounded-lg flex justify-start items-start px-8">
      <div className="w-full">
        {/* Title shimmer */}
        <div className="w-64 h-6 rounded bg-gray-200 animate-pulse mb-6" />

        {/* Chart container shimmer */}
        <div className="w-full h-80 bg-gray-100 rounded-lg p-6">
          {/* Chart area shimmer */}
          <div className="w-full h-full flex items-end justify-between gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {/* Bar shimmer */}
                <div
                  className="w-12 bg-gray-200 animate-pulse rounded-t"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                />
                {/* Label shimmer */}
                <div className="w-16 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
