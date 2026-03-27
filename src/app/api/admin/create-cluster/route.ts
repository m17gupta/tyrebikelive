import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clusterName } = await req.json();

  if (!clusterName) {
    return NextResponse.json({ error: "Cluster name required" }, { status: 400 });
  }

  const PROJECT_ID = process.env.MONGO_ATLAS_PROJECT_ID;
  const PUBLIC_KEY = process.env.MONGO_ATLAS_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.MONGO_ATLAS_PRIVATE_KEY;

  // Validate environment variables
  if (!PROJECT_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    console.error("Missing Atlas API credentials:", {
      hasProjectId: !!PROJECT_ID,
      hasPublicKey: !!PUBLIC_KEY,
      hasPrivateKey: !!PRIVATE_KEY,
    });
    return NextResponse.json(
      { error: "MongoDB Atlas API credentials not configured properly" },
      { status: 500 },
    );
  }

  const auth = Buffer.from(`${PUBLIC_KEY}:${PRIVATE_KEY}`).toString("base64");

  console.log("Atlas API Request:", {
    projectId: PROJECT_ID,
    publicKey: PUBLIC_KEY.substring(0, 4) + "****", // Log partial key for debugging
    clusterName,
  });

  try {
    const clusterConfig = {
      name: clusterName,
      clusterType: "REPLICASET",
      replicationSpecs: [
        {
          numShards: 1,
          regionsConfig: {
            AP_SOUTH_1: {
              electableNodes: 3,
              priority: 7,
              readOnlyNodes: 0,
            },
          },
        },
      ],
      providerSettings: {
        providerName: "AWS",
        regionName: "AP_SOUTH_1",
        instanceSizeName: "M0", // Free tier
      },
      diskSizeGB: 0.5, // Minimum for M0
      mongoDBMajorVersion: "7.0",
    };

    console.log("Sending cluster creation request to Atlas API...");

    const res = await fetch(`https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}/clusters`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clusterConfig),
    });

    const data = await res.json();

    console.log("Atlas API Response:", {
      status: res.status,
      statusText: res.statusText,
      success: res.ok,
      data,
    });

    if (!res.ok) {
      // Enhanced error handling for different status codes
      if (res.status === 401) {
        return NextResponse.json(
          {
            error: "Authentication failed - check your Atlas API keys",
            details: "Verify that your MONGO_ATLAS_PUBLIC_KEY and MONGO_ATLAS_PRIVATE_KEY are correct",
            atlasError: data,
          },
          { status: 401 },
        );
      } else if (res.status === 403) {
        return NextResponse.json(
          {
            error: "Access forbidden - insufficient permissions",
            details: "Your API key may not have cluster creation permissions",
            atlasError: data,
          },
          { status: 403 },
        );
      } else if (res.status === 409) {
        return NextResponse.json(
          {
            error: "Cluster already exists",
            details: `A cluster named "${clusterName}" already exists in this project`,
            atlasError: data,
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        {
          error: `Atlas API error (${res.status})`,
          details: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      success: true,
      cluster: data,
      message: `Cluster "${clusterName}" is being created. This may take several minutes.`,
    });
  } catch (err) {
    console.error("Cluster creation error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Network or server error",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

