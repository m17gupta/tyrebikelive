import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface DatabaseRequest {
  dbName: string;
  mongodbUser: string;
  mongodbPass: string;
  mongodbCluster: string;
  protocol: string;
}

export async function POST(req: NextRequest) {
  try {
    const { dbName, mongodbUser, mongodbPass, mongodbCluster, protocol }: DatabaseRequest = await req.json();

    if (!dbName || !mongodbUser || !mongodbPass || !mongodbCluster) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Construct connection string
    const connectionString = `${protocol}://${mongodbUser}:${mongodbPass}@${mongodbCluster}/${dbName}?retryWrites=true&w=majority`;

    // Connect to MongoDB and create database
    const client = new MongoClient(connectionString);

    try {
      await client.connect();

      // Get database reference (this creates the database when first document is inserted)
      const db = client.db(dbName);

      // Create a dummy collection to ensure the database is created
      const tempCollection = db.collection("_temp");
      await tempCollection.insertOne({ created: new Date() });
      await tempCollection.deleteOne({ created: { $exists: true } });

      return NextResponse.json({
        success: true,
        message: `Database "${dbName}" created successfully`,
        database: {
          name: dbName,
          connectionString: connectionString.replace(String(mongodbPass), "***"),
        },
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Database creation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create database",
        details: "Check your MongoDB credentials and cluster URL",
      },
      { status: 500 },
    );
  }
}

