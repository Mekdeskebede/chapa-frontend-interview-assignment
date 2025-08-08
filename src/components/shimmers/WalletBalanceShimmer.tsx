import React from "react";

export default function WalletBalanceShimmer() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-10 rounded bg-white/30 animate-pulse mb-2" />
            <div className="w-16 h-5 rounded bg-white/20 animate-pulse" />
        </div>
    );
}
