import React from "react";

export default function UserWeeklyReportChartShimmer() {
    return (
        <div className="flex flex-col gap-4 h-full justify-center items-center">
            <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-2 w-full justify-center">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    );
}
