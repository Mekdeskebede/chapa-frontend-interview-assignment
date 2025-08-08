export async function fetchAdminUsers() {
    const res = await fetch("/api/admin/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data.users;
}
