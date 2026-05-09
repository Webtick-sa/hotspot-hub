// Mock data powering the NOC dashboard demo.

export interface Node {
  id: string;
  name: string;
  type: "AP" | "Backhaul";
  location: string;
  status: "online" | "offline" | "degraded";
  ip: string;
  mac: string;
  clients: number;
  uptime: string;
  signal: number; // dBm
  throughputMbps: number;
  cpu: number;
  memory: number;
  firmware: string;
  lastSeen: string;
}

export interface WalletUser {
  id: string;
  mac: string;
  device: string;
  balance: number;
  lifetimeSpend: number;
  status: "active" | "suspended" | "expired";
  lastSeen: string;
  node: string;
  dataUsedMb: number;
}

export interface Voucher {
  id: string;
  code: string;
  plan: string;
  amount: number;
  durationHours: number;
  status: "unused" | "active" | "redeemed" | "expired";
  createdAt: string;
  redeemedBy?: string;
}

export interface Ad {
  id: string;
  name: string;
  advertiser: string;
  type: "banner" | "video" | "interstitial";
  placement: "portal-login" | "post-login" | "session-end";
  impressions: number;
  clicks: number;
  ctr: number;
  status: "active" | "paused" | "draft";
  budget: number;
  spent: number;
}

export interface Transaction {
  id: string;
  mac: string;
  amount: number;
  type: "topup" | "voucher" | "session";
  method: "mpesa" | "card" | "voucher" | "wallet";
  node: string;
  timestamp: string;
}

export interface ActiveSession {
  id: string;
  mac: string;
  device: string;
  node: string;
  ip: string;
  startedAt: string;
  durationMin: number;
  dataMb: number;
  rateMbps: number;
  plan: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  audience: "all" | "active" | "low-balance" | string;
  channel: "portal" | "push" | "sms";
  sentAt: string;
  delivered: number;
  opened: number;
}

export const nodes: Node[] = [
  { id: "n1", name: "AP-CBD-01", type: "AP", location: "CBD / Rooftop A", status: "online", ip: "10.10.0.11", mac: "B8:27:EB:A1:11:01", clients: 38, uptime: "23d 4h", signal: -52, throughputMbps: 184, cpu: 28, memory: 41, firmware: "7.13.4", lastSeen: "now" },
  { id: "n2", name: "AP-CBD-02", type: "AP", location: "CBD / Plaza", status: "online", ip: "10.10.0.12", mac: "B8:27:EB:A1:11:02", clients: 24, uptime: "12d 9h", signal: -58, throughputMbps: 96, cpu: 19, memory: 33, firmware: "7.13.4", lastSeen: "now" },
  { id: "n3", name: "AP-WST-07", type: "AP", location: "Westlands / Mall", status: "degraded", ip: "10.10.0.27", mac: "B8:27:EB:A1:11:07", clients: 11, uptime: "2d 1h", signal: -71, throughputMbps: 22, cpu: 67, memory: 78, firmware: "7.12.1", lastSeen: "2m ago" },
  { id: "n4", name: "AP-EST-03", type: "AP", location: "Eastleigh / Block C", status: "online", ip: "10.10.0.43", mac: "B8:27:EB:A1:11:03", clients: 52, uptime: "41d 12h", signal: -49, throughputMbps: 240, cpu: 44, memory: 52, firmware: "7.13.4", lastSeen: "now" },
  { id: "n5", name: "AP-KAR-09", type: "AP", location: "Karen / Cafe", status: "offline", ip: "10.10.0.59", mac: "B8:27:EB:A1:11:09", clients: 0, uptime: "—", signal: 0, throughputMbps: 0, cpu: 0, memory: 0, firmware: "7.11.8", lastSeen: "1h 14m ago" },
  { id: "b1", name: "BH-CORE-01", type: "Backhaul", location: "Core / DC", status: "online", ip: "10.0.0.1", mac: "AA:BB:CC:00:00:01", clients: 0, uptime: "187d", signal: -38, throughputMbps: 942, cpu: 12, memory: 28, firmware: "7.14.0", lastSeen: "now" },
  { id: "b2", name: "BH-WST-02", type: "Backhaul", location: "Westlands / Tower", status: "online", ip: "10.0.0.2", mac: "AA:BB:CC:00:00:02", clients: 0, uptime: "94d", signal: -42, throughputMbps: 612, cpu: 18, memory: 31, firmware: "7.14.0", lastSeen: "now" },
  { id: "b3", name: "BH-EST-03", type: "Backhaul", location: "Eastleigh / Mast", status: "degraded", ip: "10.0.0.3", mac: "AA:BB:CC:00:00:03", clients: 0, uptime: "9d", signal: -68, throughputMbps: 188, cpu: 51, memory: 60, firmware: "7.13.4", lastSeen: "now" },
];

export const users: WalletUser[] = [
  { id: "w1", mac: "A4:5E:60:11:22:01", device: "iPhone 14", balance: 124.5, lifetimeSpend: 980, status: "active", lastSeen: "2m ago", node: "AP-CBD-01", dataUsedMb: 1240 },
  { id: "w2", mac: "A4:5E:60:11:22:02", device: "Samsung S23", balance: 12.0, lifetimeSpend: 410, status: "active", lastSeen: "now", node: "AP-CBD-01", dataUsedMb: 320 },
  { id: "w3", mac: "A4:5E:60:11:22:03", device: "Tecno Spark", balance: 0, lifetimeSpend: 220, status: "expired", lastSeen: "3h ago", node: "AP-EST-03", dataUsedMb: 80 },
  { id: "w4", mac: "A4:5E:60:11:22:04", device: "MacBook Pro", balance: 540, lifetimeSpend: 2100, status: "active", lastSeen: "now", node: "AP-WST-07", dataUsedMb: 4012 },
  { id: "w5", mac: "A4:5E:60:11:22:05", device: "Xiaomi Redmi", balance: 5.0, lifetimeSpend: 89, status: "active", lastSeen: "11m ago", node: "AP-CBD-02", dataUsedMb: 65 },
  { id: "w6", mac: "A4:5E:60:11:22:06", device: "iPad Air", balance: 0, lifetimeSpend: 1340, status: "suspended", lastSeen: "2d ago", node: "AP-EST-03", dataUsedMb: 0 },
  { id: "w7", mac: "A4:5E:60:11:22:07", device: "OnePlus 11", balance: 76, lifetimeSpend: 612, status: "active", lastSeen: "now", node: "AP-EST-03", dataUsedMb: 880 },
  { id: "w8", mac: "A4:5E:60:11:22:08", device: "Huawei P50", balance: 30, lifetimeSpend: 145, status: "active", lastSeen: "47m ago", node: "AP-CBD-01", dataUsedMb: 210 },
];

export const vouchers: Voucher[] = [
  { id: "v1", code: "WIFI-7H2K-9PXM", plan: "1 Hour / 500MB", amount: 20, durationHours: 1, status: "unused", createdAt: "2026-05-08" },
  { id: "v2", code: "WIFI-3J4D-K2NA", plan: "1 Day / 2GB", amount: 100, durationHours: 24, status: "active", createdAt: "2026-05-08", redeemedBy: "A4:5E:60:11:22:02" },
  { id: "v3", code: "WIFI-88BC-MM01", plan: "1 Week / 10GB", amount: 500, durationHours: 168, status: "redeemed", createdAt: "2026-05-01", redeemedBy: "A4:5E:60:11:22:04" },
  { id: "v4", code: "WIFI-XPP9-ALPK", plan: "1 Hour / 500MB", amount: 20, durationHours: 1, status: "unused", createdAt: "2026-05-09" },
  { id: "v5", code: "WIFI-22ZZ-PLMN", plan: "1 Month / 50GB", amount: 1500, durationHours: 720, status: "expired", createdAt: "2026-04-01", redeemedBy: "A4:5E:60:11:22:06" },
  { id: "v6", code: "WIFI-AB12-XX99", plan: "1 Day / 2GB", amount: 100, durationHours: 24, status: "unused", createdAt: "2026-05-09" },
];

export const ads: Ad[] = [
  { id: "a1", name: "Safaricom Daily Promo", advertiser: "Safaricom", type: "banner", placement: "portal-login", impressions: 18420, clicks: 612, ctr: 3.32, status: "active", budget: 5000, spent: 2340 },
  { id: "a2", name: "Naivas Weekend Deals", advertiser: "Naivas", type: "video", placement: "post-login", impressions: 9210, clicks: 388, ctr: 4.21, status: "active", budget: 3000, spent: 1780 },
  { id: "a3", name: "Bolt Ride Credit", advertiser: "Bolt", type: "interstitial", placement: "session-end", impressions: 12000, clicks: 902, ctr: 7.51, status: "paused", budget: 4000, spent: 4000 },
  { id: "a4", name: "Local Cafe Banner", advertiser: "Java House", type: "banner", placement: "portal-login", impressions: 4310, clicks: 102, ctr: 2.36, status: "active", budget: 800, spent: 290 },
  { id: "a5", name: "Insurance Spot", advertiser: "Britam", type: "video", placement: "post-login", impressions: 0, clicks: 0, ctr: 0, status: "draft", budget: 2000, spent: 0 },
];

export const transactions: Transaction[] = [
  { id: "t1", mac: "A4:5E:60:11:22:01", amount: 100, type: "topup", method: "mpesa", node: "AP-CBD-01", timestamp: "2026-05-09 11:32" },
  { id: "t2", mac: "A4:5E:60:11:22:04", amount: 500, type: "voucher", method: "voucher", node: "AP-WST-07", timestamp: "2026-05-09 11:18" },
  { id: "t3", mac: "A4:5E:60:11:22:02", amount: 20, type: "session", method: "wallet", node: "AP-CBD-01", timestamp: "2026-05-09 11:10" },
  { id: "t4", mac: "A4:5E:60:11:22:07", amount: 50, type: "topup", method: "card", node: "AP-EST-03", timestamp: "2026-05-09 10:54" },
  { id: "t5", mac: "A4:5E:60:11:22:08", amount: 30, type: "topup", method: "mpesa", node: "AP-CBD-01", timestamp: "2026-05-09 10:41" },
  { id: "t6", mac: "A4:5E:60:11:22:05", amount: 5, type: "session", method: "wallet", node: "AP-CBD-02", timestamp: "2026-05-09 10:29" },
  { id: "t7", mac: "A4:5E:60:11:22:01", amount: 200, type: "topup", method: "mpesa", node: "AP-CBD-01", timestamp: "2026-05-09 09:51" },
];

export const activeSessions: ActiveSession[] = [
  { id: "s1", mac: "A4:5E:60:11:22:01", device: "iPhone 14", node: "AP-CBD-01", ip: "10.20.0.41", startedAt: "11:01", durationMin: 41, dataMb: 184, rateMbps: 12.4, plan: "1 Hour" },
  { id: "s2", mac: "A4:5E:60:11:22:02", device: "Samsung S23", node: "AP-CBD-01", ip: "10.20.0.42", startedAt: "11:18", durationMin: 24, dataMb: 92, rateMbps: 6.2, plan: "1 Day" },
  { id: "s3", mac: "A4:5E:60:11:22:04", device: "MacBook Pro", node: "AP-WST-07", ip: "10.20.0.78", startedAt: "10:12", durationMin: 90, dataMb: 612, rateMbps: 28.1, plan: "1 Week" },
  { id: "s4", mac: "A4:5E:60:11:22:05", device: "Xiaomi Redmi", node: "AP-CBD-02", ip: "10.20.0.55", startedAt: "11:31", durationMin: 11, dataMb: 14, rateMbps: 2.1, plan: "1 Hour" },
  { id: "s5", mac: "A4:5E:60:11:22:07", device: "OnePlus 11", node: "AP-EST-03", ip: "10.20.0.91", startedAt: "10:48", durationMin: 54, dataMb: 240, rateMbps: 18.6, plan: "1 Day" },
  { id: "s6", mac: "A4:5E:60:11:22:08", device: "Huawei P50", node: "AP-CBD-01", ip: "10.20.0.44", startedAt: "11:25", durationMin: 17, dataMb: 38, rateMbps: 4.4, plan: "1 Hour" },
];

export const notifications: NotificationItem[] = [
  { id: "no1", title: "New plan available", body: "Get 24h unlimited for KES 100. Tap to upgrade.", audience: "all", channel: "portal", sentAt: "2026-05-09 09:00", delivered: 1240, opened: 412 },
  { id: "no2", title: "Low balance reminder", body: "Your wallet balance is below KES 10.", audience: "low-balance", channel: "portal", sentAt: "2026-05-08 18:00", delivered: 312, opened: 188 },
  { id: "no3", title: "Maintenance window tonight", body: "Brief outage 02:00–02:30 EAT on West nodes.", audience: "active", channel: "push", sentAt: "2026-05-07 17:30", delivered: 980, opened: 740 },
];

// Time series for charts
export const revenue7d = [
  { day: "Mon", topups: 4800, vouchers: 2200, ads: 1100 },
  { day: "Tue", topups: 5200, vouchers: 1900, ads: 1300 },
  { day: "Wed", topups: 6100, vouchers: 2700, ads: 1450 },
  { day: "Thu", topups: 5800, vouchers: 3100, ads: 1620 },
  { day: "Fri", topups: 7400, vouchers: 3600, ads: 2100 },
  { day: "Sat", topups: 8900, vouchers: 4200, ads: 2400 },
  { day: "Sun", topups: 7100, vouchers: 3300, ads: 1900 },
];

export const sessionsHourly = [
  { h: "00", v: 42 }, { h: "02", v: 28 }, { h: "04", v: 22 }, { h: "06", v: 51 },
  { h: "08", v: 138 }, { h: "10", v: 192 }, { h: "12", v: 224 }, { h: "14", v: 198 },
  { h: "16", v: 241 }, { h: "18", v: 286 }, { h: "20", v: 312 }, { h: "22", v: 188 },
];

export const fmtCurrency = (n: number) => `KES ${n.toLocaleString()}`;
