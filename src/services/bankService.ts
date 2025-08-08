
export async function fetchBanks() {
    const res = await fetch("/api/banks");
    if (!res.ok) throw new Error("Failed to fetch banks");
    const data = await res.json();
    return data.data;
}
