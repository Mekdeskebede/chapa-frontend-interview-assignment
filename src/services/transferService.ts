export async function initializeTransfer({
  account_number,
  amount,
  bank_code,
  currency,
  reference,
}: {
    account_number: string;
    amount: number;
    bank_code: string;
    currency: string;
    reference: string;
}) {
    const res = await fetch("/api/user/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_number, amount, bank_code }),
    });

    const response = await res.json();
    console.log("---response-------", response);
    if (!res.ok) throw new Error(response.message);
    return response;
}

export async function checkTransferStatus(reference: string) {
  const res = await fetch(`/api/user/transfer?reference=${reference}`);
  if (!res.ok) throw new Error("Failed to check transfer status");
  return await res.json();
}
