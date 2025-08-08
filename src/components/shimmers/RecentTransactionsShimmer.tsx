import React from "react";

export default function RecentTransactionsShimmer() {
    return (
        <div className="space-y-2 py-6">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex flex-col gap-1">
                            <div className="w-16 h-4 rounded bg-gray-200 animate-pulse" />
                            <div className="w-12 h-3 rounded bg-gray-100 animate-pulse" />
                        </div>
                    </div>
                    <div className="w-14 h-4 rounded bg-gray-200 animate-pulse" />
                    <div className="w-12 h-4 rounded bg-gray-200 animate-pulse" />
                </div>
            ))}
        </div>
    );
}
