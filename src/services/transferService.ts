// Transfer API integration for Chapa
export async function initializeTransfer({
    account_number,
    amount,
    bank_code,
}: {
    account_number: string;
    amount: number;
    bank_code: string;
}) {
    const res = await fetch("/api/user/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_number, amount, bank_code }),
    });
    if (!res.ok) throw new Error("Failed to initialize transfer");
    return await res.json();
}

export async function checkTransferStatus(reference: string) {
    const res = await fetch(`/api/user/transfer?reference=${reference}`);
    if (!res.ok) throw new Error("Failed to check transfer status");
    return await res.json();
}
