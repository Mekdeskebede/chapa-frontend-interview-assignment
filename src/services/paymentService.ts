// Fetch customer data from mock API
export async function fetchCustomerData() {
    const res = await fetch("/api/user/customer");
    if (!res.ok) throw new Error("Failed to fetch customer data");
    return await res.json();
}
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
// Payment data type for API integration
interface PaymentData {
    amount: number | string;
    currency: string;
    email: string;
    first_name: string;
    last_name: string;
    tx_ref: string;
    callback_url: string;
    // Add other fields as needed
}

// Real payment service for API integration
export async function initializePayment(paymentData: PaymentData) {
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
