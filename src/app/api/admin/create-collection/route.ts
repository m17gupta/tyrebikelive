import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface CollectionRequest {
  dbName: string;
  collectionName: string;
  mongodbUser: string;
  mongodbPass: string;
  mongodbCluster: string;
}

export async function POST(req: NextRequest) {
  try {
    const { dbName, collectionName, mongodbUser, mongodbPass, mongodbCluster }: CollectionRequest =
      await req.json();

    if (!dbName || !collectionName || !mongodbUser || !mongodbPass || !mongodbCluster) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Construct connection string
    const connectionString = `mongodb+srv://${mongodbUser}:${mongodbPass}@${mongodbCluster}/${dbName}?retryWrites=true&w=majority`;

    // Connect to MongoDB and create collection
    const client = new MongoClient(connectionString);

    try {
      await client.connect();

      const db = client.db(dbName);

      // Create collection with initial document structure based on type
      let initialDoc: Record<string, any>;
      switch (collectionName) {
        case "userLogin":
          initialDoc = {
            username: "example_user",
            email: "user@example.com",
            password: "hashed_password",
            role: "user",
            createdAt: new Date(),
            isActive: true,
          };
          break;
        case "products":
          initialDoc = {
            name: "Sample Product",
            description: "Product description",
            price: 99.99,
            category: "electronics",
            inStock: true,
            createdAt: new Date(),
          };
          break;
        case "category":
          initialDoc = {
            name: "Sample Category",
            description: "Category description",
            slug: "sample-category",
            createdAt: new Date(),
            isActive: true,
          };
          break;
        default:
          initialDoc = { createdAt: new Date(), type: collectionName };
      }

      const collection = db.collection(collectionName);
      const insertResult = await collection.insertOne(initialDoc);

      // Remove the sample document
      await collection.deleteOne({ _id: insertResult.insertedId });

      return NextResponse.json({
        success: true,
        message: `Collection "${collectionName}" created successfully in database "${dbName}"`,
        collection: {
          name: collectionName,
          database: dbName,
        },
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Collection creation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create collection",
        details: "Check your MongoDB credentials and ensure the database exists",
      },
      { status: 500 },
    );
  }
}

