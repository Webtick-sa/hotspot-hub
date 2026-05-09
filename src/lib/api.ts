import type {
  ActiveSession,
  Advertisement,
  NotificationItem,
  Transaction,
  Voucher,
  WalletUser,
  Node,
} from "./mock-data";

export type RevenuePoint = { day: string; topups: number; vouchers: number; ads: number };
export type SessionsHourlyPoint = { h: string; v: number };

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`/api/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}

export function fetchNodes() {
  return request<Node[]>("nodes");
}

export function fetchUsers() {
  return request<WalletUser[]>("users");
}

export function fetchVouchers() {
  return request<Voucher[]>("vouchers");
}

export function fetchAds() {
  return request<Advertisement[]>("advertisements");
}

export function fetchTransactions() {
  return request<Transaction[]>("transactions");
}

export function fetchActiveSessions() {
  return request<ActiveSession[]>("activeSessions");
}

export function fetchNotifications() {
  return request<NotificationItem[]>("notifications");
}

export function fetchRevenue7d() {
  return request<RevenuePoint[]>("revenue7d");
}

export function fetchSessionsHourly() {
  return request<SessionsHourlyPoint[]>("sessionsHourly");
}

export function fetchDashboardData() {
  return request<{
    nodes: Node[];
    users: WalletUser[];
    activeSessions: ActiveSession[];
    transactions: Transaction[];
    revenue7d: RevenuePoint[];
    sessionsHourly: SessionsHourlyPoint[];
  }>("dashboard");
}
