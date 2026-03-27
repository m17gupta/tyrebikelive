import { MongoClient, Db } from "mongodb";
import dns from "node:dns/promises";

// Fix for Node.js 18+ DNS resolution issues on some Windows setups/networks
if (dns && (dns as any).setDefaultResultOrder) {
  (dns as any).setDefaultResultOrder("ipv4first");
}

// Ensure SRV records can be resolved reliably via public DNS
try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {
  console.warn("Failed to set custom DNS servers", e);
}

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoClient?: MongoClient;
}

const globalWithMongo = global as unknown as GlobalWithMongo;

/**
 * Connects to MongoDB and returns the MongoClient instance.
 * Uses a singleton pattern to reuse the connection across hot reloads in development.
 */
export async function connectToDatabase(): Promise<MongoClient> {
  const envSource = process.env.MONGO_URI
    ? "MONGO_URI"
    : process.env.MONGODB_URI
      ? "MONGODB_URI"
      : process.env.DATABASE_URI
        ? "DATABASE_URI"
        : "NONE";
  const MONGODB_URI =
    process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URI;

  if (!MONGODB_URI) {
    console.error(
      "CRITICAL: No connection string found (checked MONGO_URI, MONGODB_URI, and DATABASE_URI)",
    );
    throw new Error("Missing MongoDB connection string");
  }

  if (globalWithMongo._mongoClient) {
    return globalWithMongo._mongoClient;
  }

  if (!globalWithMongo._mongoClientPromise) {
    console.log(`[DB] Attempting to connect to MongoDB using ${envSource}...`);
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    globalWithMongo._mongoClientPromise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        console.log("[DB] MongoDB Connected successfully");
        globalWithMongo._mongoClient = client;
        return client;
      })
      .catch((err) => {
        console.error("[DB] MongoDB CONNECTION ERROR:", err.message);
        globalWithMongo._mongoClientPromise = undefined;
        throw err;
      });
  }

  return globalWithMongo._mongoClientPromise;
}

/**
 * Returns the Database instance for the current tenant.
 * The tenantKey is used as the database name to ensure strict data isolation.
 */
export async function getTenantDb(tenantKey?: string): Promise<Db> {
  const dbName = tenantKey || process.env.TENANT_DB_NAME || "ecommerce_tenant_db";
  const client = await connectToDatabase();

  return client.db(dbName);
}

/**
 * Returns the Database instance for the master agency data.
 */
export async function getMasterDb(): Promise<Db> {
  const masterDbName = process.env.MASTER_DB_NAME || "kalp_master";
  const client = await connectToDatabase();

  return client.db(masterDbName);
}

/**
 * Alias for getMasterDb to represent system-level operations.
 */
export async function getSystemDb(): Promise<Db> {
  return getMasterDb();
}
