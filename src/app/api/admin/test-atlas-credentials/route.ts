import { NextResponse } from "next/server";

export async function GET() {
  const PROJECT_ID = process.env.MONGO_ATLAS_PROJECT_ID;
  const PUBLIC_KEY = process.env.MONGO_ATLAS_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.MONGO_ATLAS_PRIVATE_KEY;

  // Check if credentials are configured
  if (!PROJECT_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    return NextResponse.json(
      {
        error: "Atlas credentials not configured",
        missing: {
          projectId: !PROJECT_ID,
          publicKey: !PUBLIC_KEY,
          privateKey: !PRIVATE_KEY,
        },
      },
      { status: 400 },
    );
  }

  // Check if they're still placeholder values
  if (
    PUBLIC_KEY === "your_public_key_here" ||
    PRIVATE_KEY === "your_private_key_here" ||
    PROJECT_ID === "your_project_id_here"
  ) {
    return NextResponse.json(
      {
        error: "Please update the placeholder values in your .env file with real Atlas API credentials",
        setup_guide: "https://www.mongodb.com/docs/atlas/configure-api-access/",
      },
      { status: 400 },
    );
  }

  const auth = Buffer.from(`${PUBLIC_KEY}:${PRIVATE_KEY}`).toString("base64");

  try {
    // Test API access by getting project info
    const res = await fetch(`https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Atlas API authentication failed",
          status: res.status,
          response: data,
          troubleshooting: {
            401: "Invalid API keys - regenerate them in Atlas",
            403: "Insufficient permissions - need 'Organization Owner' role",
            404: "Invalid Project ID - check your project settings",
          },
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Atlas API credentials are working!",
      project: {
        name: data.name,
        id: data.id,
        orgId: data.orgId,
      },
      credentials_status: "✅ Valid",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Network error testing Atlas API",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

