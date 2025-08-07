import React, { useEffect, useState } from "react";
import { fetchBanks } from "@/services/bankService";

interface Bank {
    id: number;
    name: string;
    slug: string;
    swift: string;
    acct_length: number;
    currency: string;
    is_active: number;
    is_rtgs: number;
    is_24hrs: number | null;
}

export default function BankList() {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBanks()
            .then((data) => {
                setBanks(data || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load banks");
                setLoading(false);
            });
    }, []);

    return (
        <div className="rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6 flex items-center gap-2">
                Supported Banks
                <span className="text-xs bg-indigo-200 text-primary px-2 py-1 rounded-full">
                    {banks.length}
                </span>
            </h2>
            {loading ? (
                <p className="text-blue-500">Loading banks...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banks.map((bank) => (
                        <div
                            key={bank.id}
                            className="bg-white rounded-xl border border-indigo-200 shadow p-5 flex flex-col gap-2 hover:scale-[1.03] transition"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-primary text-lg">
                                    {bank.name}
                                </span>
                                {bank.is_active ? (
                                    <span className="text-green-500 text-xs font-bold">
                                        Active
                                    </span>
                                ) : (
                                    <span className="text-red-500 text-xs font-bold">
                                        Inactive
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                <span>SWIFT: {bank.swift}</span>
                                <span>Currency: {bank.currency}</span>
                                <span>Account Length: {bank.acct_length}</span>
                                {bank.is_rtgs ? (
                                    <span className="bg-green-100 text-green-700 px-2 rounded">
                                        RTGS
                                    </span>
                                ) : null}
                                {bank.is_24hrs ? (
                                    <span className="bg-blue-100 text-primary-dark px-2 rounded">
                                        24hrs
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
