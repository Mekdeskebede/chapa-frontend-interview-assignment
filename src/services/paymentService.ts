// Fetch wallet balance from mock API
export async function fetchWalletBalance() {
    const res = await fetch("/api/user/wallet");
    if (!res.ok) throw new Error("Failed to fetch wallet balance");
    const data = await res.json();
    return data.balance;
}

// Fetch recent transactions from mock API
export async function fetchRecentTransactions() {
    const res = await fetch("/api/user/transactions");
    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data = await res.json();
    return data.transactions;
}
// Real payment service for API integration
export async function initializePayment(paymentData: any) {
    const res = await fetch("/api/user/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
    });
    if (!res.ok) throw new Error("Failed to initialize payment");
    return await res.json();
}

export async function verifyTransaction(tx_ref: string) {
    const res = await fetch("/api/user/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tx_ref }),
    });
    if (!res.ok) throw new Error("Failed to verify transaction");
    return await res.json();
}
