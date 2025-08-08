export async function fetchAdminList() {
  const res = await fetch("/api/superadmin/admins");
  if (!res.ok) throw new Error("Failed to fetch admin list");
  const data = await res.json();
  return data.admins;
}
export async function fetchSystemStats() {
  const res = await fetch("/api/superadmin/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return await res.json();
}

export async function addAdminUser(name: string) {
  return new Promise<{ success: boolean; id: number }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: Math.floor(Math.random() * 1000) });
    }, 800);
  });
}

export async function removeAdminUser(id: number) {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 800);
  });
}
