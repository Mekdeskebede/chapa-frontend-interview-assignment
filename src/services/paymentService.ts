export async function fetchCustomerData() {
    const res = await fetch("/api/user/customer");
    if (!res.ok) throw new Error("Failed to fetch customer data");
    return await res.json();
}
export async function fetchWalletBalance() {
  const res = await fetch("/api/user/wallet");
  if (!res.ok) throw new Error("Failed to fetch wallet balance");
  const data = await res.json();
  return data.balance;
}

export async function fetchRecentTransactions() {
  const res = await fetch("/api/user/transactions");
  if (!res.ok) throw new Error("Failed to fetch transactions");
  const data = await res.json();
  return data.transactions;
}
interface PaymentData {
  amount: number | string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  phone_number: string;
  customization: {
    title: string;
    description: string;
  };
}

export async function initializePayment(paymentData: PaymentData) {
  const data = {
    amount: paymentData.amount,
    currency: paymentData.currency,
    email: paymentData.email,
    first_name: paymentData.first_name,
    last_name: paymentData.last_name,
    tx_ref: paymentData.tx_ref,
    callback_url: paymentData.callback_url,
    return_url: paymentData.return_url,
    phone_number: paymentData.phone_number,
    customization: {
      title: paymentData.customization.title,
      description: paymentData.customization.description,
    },
  };

  const res = await fetch("/api/user/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  console.log("----------response----------", response);

  if (!res.ok) throw new Error("Failed to initialize payment");
  return response;
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
