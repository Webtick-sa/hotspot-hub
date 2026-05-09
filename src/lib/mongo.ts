import type { Db, Collection, Document, MongoClient, OptionalUnlessRequiredId } from "mongodb";
import {
  activeSessions,
  ads,
  nodes,
  notifications,
  revenue7d,
  sessionsHourly,
  transactions,
  users,
  vouchers,
} from "./mock-data";

interface EnvBindings {
  MONGODB_URI?: string;
  MONGODB_DB?: string;
  [key: string]: unknown;
}

declare global {
  var __mongodbClientPromise: Promise<MongoClient> | undefined;
}

const DEFAULT_MONGODB_URI = "mongodb+srv://oxeansa:oxeanpass1@cluster0.sh0vm.mongodb.net/?appName=Cluster0";
const DEFAULT_DB_NAME = "linkdb";

function getEnvBindings(env: unknown): EnvBindings | undefined {
  if (!env || typeof env !== "object") return undefined;
  return env as EnvBindings;
}

function getProcessEnv(): NodeJS.ProcessEnv | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env;
}

function getMongoUri(env?: EnvBindings): string {
  const envUri = env?.MONGODB_URI ?? getProcessEnv()?.MONGODB_URI;
  return typeof envUri === "string" && envUri.length > 0 ? envUri : DEFAULT_MONGODB_URI;
}

function getDbName(env?: EnvBindings): string {
  return (env?.MONGODB_DB as string) || getProcessEnv()?.MONGODB_DB || DEFAULT_DB_NAME;
}

export async function getDb(env?: unknown): Promise<Db> {
  const bindings = getEnvBindings(env);
  const uri = getMongoUri(bindings);
  const { MongoClient: MongoClientRuntime } = await import("mongodb");

  if (!globalThis.__mongodbClientPromise) {
    globalThis.__mongodbClientPromise = new MongoClientRuntime(uri).connect();
  }
  const client = await globalThis.__mongodbClientPromise;
  return client.db(getDbName(bindings));
}

async function ensureCollectionSeeded<T>(db: Db, name: string, docs: T[]) {
  const collection = db.collection(name) as Collection<T & Document>;
  const count = await collection.estimatedDocumentCount();
  if (count === 0 && docs.length > 0) {
    await collection.insertMany(docs as OptionalUnlessRequiredId<T & Document>[]);
  }
}

export async function ensureDbSeeded(env?: unknown) {
  const db = await getDb(env);
  await Promise.all([
    ensureCollectionSeeded(db, "nodes", nodes),
    ensureCollectionSeeded(db, "users", users),
    ensureCollectionSeeded(db, "vouchers", vouchers),
    ensureCollectionSeeded(db, "advertisements", ads),
    ensureCollectionSeeded(db, "transactions", transactions),
    ensureCollectionSeeded(db, "activeSessions", activeSessions),
    ensureCollectionSeeded(db, "notifications", notifications),
    ensureCollectionSeeded(db, "revenue7d", revenue7d),
    ensureCollectionSeeded(db, "sessionsHourly", sessionsHourly),
  ]);
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function handleApiRequest(request: Request, env: unknown): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, "").replace(/\/$/, "");

  if (request.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    await ensureDbSeeded(env);
    const db = await getDb(env);

    if (path === "" || path === "status") {
      return jsonResponse({ status: "ok" });
    }

    if (path === "dashboard") {
      return jsonResponse({
        nodes: await db.collection("nodes").find().toArray(),
        users: await db.collection("users").find().toArray(),
        activeSessions: await db.collection("activeSessions").find().toArray(),
        transactions: await db.collection("transactions").find().toArray(),
        revenue7d: await db.collection("revenue7d").find().toArray(),
        sessionsHourly: await db.collection("sessionsHourly").find().toArray(),
      });
    }

    const validCollections = new Set([
      "nodes",
      "users",
      "vouchers",
      "advertisements",
      "transactions",
      "activeSessions",
      "notifications",
      "revenue7d",
      "sessionsHourly",
    ]);

    const collectionName = path === "ads" ? "advertisements" : path;

    if (!validCollections.has(collectionName)) {
      return jsonResponse({ error: "Not found" }, 404);
    }

    return jsonResponse(await db.collection(collectionName).find().toArray());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return jsonResponse({ error: message }, 500);
  }
}
