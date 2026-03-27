import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface TestConnectionRequest {
  mongodbUser: string;
  mongodbPass: string;
  mongodbCluster: string;
  protocol: string;
}

export async function POST(req: NextRequest) {
  try {
    const { mongodbUser, mongodbPass, mongodbCluster, protocol }: TestConnectionRequest = await req.json();

    if (!mongodbUser || !mongodbPass || !mongodbCluster) {
      return NextResponse.json({ error: "Missing required connection parameters" }, { status: 400 });
    }

    // Construct connection string for testing
    const connectionString = `${protocol}://${mongodbUser}:${mongodbPass}@${mongodbCluster}/?retryWrites=true&w=majority`;

    // Test MongoDB connection
    const client = new MongoClient(connectionString);

    try {
      // Set a timeout for the connection test
      await client.connect();

      // Test that we can actually access the database
      const admin = client.db().admin();
      await admin.ping();

      return NextResponse.json({
        success: true,
        message: "Connection successful! MongoDB credentials are working correctly.",
        cluster: mongodbCluster,
        user: mongodbUser,
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Connection test error:", error);

    let errorMessage = "Connection failed";
    let details = "";

    if (error instanceof Error) {
      errorMessage = error.message;

      if (errorMessage.includes("ENOTFOUND") || errorMessage.includes("querySrv")) {
        details = "Cluster hostname not found. Check your cluster URL and ensure it exists in MongoDB Atlas.";
      } else if (errorMessage.includes("Authentication failed") || errorMessage.includes("auth")) {
        details = "Invalid username or password. Check your MongoDB Atlas database user credentials.";
      } else if (errorMessage.includes("network") || errorMessage.includes("timeout")) {
        details =
          "Network connection issue. Check your internet connection and MongoDB Atlas network settings.";
      } else {
        details = "Verify your MongoDB Atlas cluster is running and accessible.";
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details,
      },
      { status: 400 },
    );
  }
}

