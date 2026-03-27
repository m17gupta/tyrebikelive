import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { connectionString, dbName = "new_project_database", collectionName = "users_data" } = body;

    if (!connectionString) {
      return NextResponse.json(
        { error: "Missing connectionString in request body" },
        { status: 400 }
      );
    }

    const SAMPLE_DOCUMENT = {
      name: "AutoUser",
      status: "active",
      timestamp: new Date().toISOString(),
    };

    const client = new MongoClient(connectionString);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(SAMPLE_DOCUMENT);

    await client.close();

    return NextResponse.json({
      success: true,
      message: "Database and collection created successfully.",
      insertedId: result.insertedId,
      db: dbName,
      collection: collectionName,
    });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

