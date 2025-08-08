import React, { useEffect, useState } from "react";
import { fetchWalletBalance } from "@/services/paymentService";
import { fetchCustomerData } from "@/services/paymentService";
import { CreditCard, Eye, EyeOff, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import WalletBalanceShimmer from "@/components/shimmers/WalletBalanceShimmer";

export default function WalletBalance() {
    const [balance, setBalance] = useState<number | null>(null);
    const [customerData, setCustomerData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCardDetails, setShowCardDetails] = useState(false);
    const cardNumber = "**** 1234";
    const currency = "ETB";

    useEffect(() => {
        Promise.all([fetchWalletBalance(), fetchCustomerData()])
            .then(([bal, customer]) => {
                setBalance(bal);
                setCustomerData(customer);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load wallet or customer data");
                setLoading(false);
            });
    }, []);

    const toggleCardDetails = () => {
        setShowCardDetails(!showCardDetails);
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-lg p-6 w-full ">
                {/* Header with customer info and toggle */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {loading ? (
                                <div className="w-12 h-12 rounded-full bg-white/30 animate-pulse" />
                            ) : customerData ? (
                                <Image
                                    width={48}
                                    height={48}
                                    src={customerData.avatar}
                                    alt={customerData.name}
                                    className="w-12 h-12 rounded-full border-2 border-white/20 object-cover"
                                />
                            ) : null}
                            {!loading && customerData && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            {loading ? (
                                <div className="w-24 h-6 rounded bg-white/30 animate-pulse mb-2" />
                            ) : customerData ? (
                                <h3 className="text-white font-semibold text-lg">
                                    {customerData.name}
                                </h3>
                            ) : null}
                            <p className="text-white/70 text-sm">Customer</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleCardDetails}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                        disabled={loading}
                    >
                        {showCardDetails ? (
                            <EyeOff className="w-5 h-5 text-white" />
                        ) : (
                            <Eye className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>

                {/* Balance Section */}
                <div className="text-center mb-2">
                    <div className="text-xs text-white/70 mb-2">
                        Wallet Balance
                    </div>
                    {loading ? (
                        <WalletBalanceShimmer />
                    ) : error ? (
                        <p className="text-red-200">{error}</p>
                    ) : (
                        <div className="text-4xl font-bold text-white mb-2">
                            {balance?.toLocaleString()}{" "}
                            <span className="text-xl font-normal">
                                {currency}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-white/70 text-sm mb-6">
                        {cardNumber}
                    </span>
                </div>

                {/* Card Details Section - Hidden by default */}
                {showCardDetails && !loading && customerData && (
                    <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <CreditCard className="w-5 h-5 text-white" />
                                <span className="text-white font-medium">
                                    Card Details
                                </span>
                            </div>
                            <div className="text-xs text-white/60">Visa</div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">
                                    Card Number
                                </span>
                                <span className="text-white font-mono">
                                    {cardNumber}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">
                                    Expiry Date
                                </span>
                                <span className="text-white">12/25</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">
                                    CVV
                                </span>
                                <span className="text-white">***</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Customer Details Section - Always visible */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Mail className="w-4 h-4 text-white/70" />
                        <div>
                            {loading ? (
                                <div className="w-24 h-4 rounded bg-white/30 animate-pulse" />
                            ) : customerData ? (
                                <>
                                    <p className="text-white/70 text-xs">
                                        Email
                                    </p>
                                    <p className="text-white text-sm">
                                        {customerData.email}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Phone className="w-4 h-4 text-white/70" />
                        <div>
                            {loading ? (
                                <div className="w-20 h-4 rounded bg-white/30 animate-pulse" />
                            ) : customerData ? (
                                <>
                                    <p className="text-white/70 text-xs">
                                        Phone
                                    </p>
                                    <p className="text-white text-sm">
                                        {customerData.phone}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <MapPin className="w-4 h-4 text-white/70" />
                        <div>
                            {loading ? (
                                <div className="w-28 h-4 rounded bg-white/30 animate-pulse" />
                            ) : customerData ? (
                                <>
                                    <p className="text-white/70 text-xs">
                                        Location
                                    </p>
                                    <p className="text-white text-sm">
                                        {customerData.location}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
