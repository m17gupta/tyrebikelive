#!/usr/bin/env node

// Enhanced MongoDB Atlas API Diagnostic Script
const PROJECT_ID = "68c16409996759167fd1d3bc";
const PUBLIC_KEY = "vkvsvvxw";
const PRIVATE_KEY = "d9d62c65-e3d0-4605-b1d2-b36d5ca04c81";

async function comprehensiveDiagnostic() {
  console.log("🔍 COMPREHENSIVE MONGODB ATLAS API DIAGNOSTIC");
  console.log("=".repeat(60));

  const auth = Buffer.from(`${PUBLIC_KEY}:${PRIVATE_KEY}`).toString("base64");

  console.log("📊 CREDENTIALS INFO:");
  console.log("- Public Key Length:", PUBLIC_KEY.length, "(should be 8)");
  console.log(
    "- Private Key Format:",
    PRIVATE_KEY.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
      ? "✅ Valid UUID"
      : "❌ Invalid UUID",
  );
  console.log("- Project ID Length:", PROJECT_ID.length, "(should be 24)");
  console.log("");

  // Test 1: Basic authentication test
  console.log("🧪 TEST 1: Basic Atlas API Authentication");
  try {
    const response = await fetch("https://cloud.mongodb.com/api/atlas/v1.0/whoami", {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    console.log("Status:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Authentication successful!");
      console.log("- User ID:", data.id);
      console.log("- Username:", data.username);
      console.log("- Roles:", data.roles?.map((r) => `${r.roleName} (${r.orgId})`).join(", ") || "None");
    } else {
      const errorData = await response.json();
      console.log("❌ Authentication failed:");
      console.log(JSON.stringify(errorData, null, 2));
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }

  console.log("");

  // Test 2: Organization access
  console.log("🧪 TEST 2: Organization Access Check");
  try {
    const response = await fetch("https://cloud.mongodb.com/api/atlas/v1.0/orgs", {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    console.log("Status:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Organization access successful!");
      console.log("- Total orgs:", data.totalCount);
      data.results?.forEach((org, i) => {
        console.log(`- Org ${i + 1}: ${org.name} (${org.id})`);
      });
    } else {
      const errorData = await response.json();
      console.log("❌ Organization access failed:");
      console.log(JSON.stringify(errorData, null, 2));
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }

  console.log("");

  // Test 3: Specific project access
  console.log("🧪 TEST 3: Project Access Check");
  try {
    const response = await fetch(`https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    console.log("Status:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Project access successful!");
      console.log("- Project Name:", data.name);
      console.log("- Organization ID:", data.orgId);
      console.log("- Created:", new Date(data.created).toLocaleString());

      // Test cluster access if project access works
      console.log("\n🧪 TEST 4: Cluster Access Check");
      const clustersRes = await fetch(
        `https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}/clusters`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        },
      );

      if (clustersRes.ok) {
        const clustersData = await clustersRes.json();
        console.log("✅ Cluster access successful!");
        console.log("- Can list clusters: Yes");
        console.log("- Existing clusters:", clustersData.totalCount || 0);
        console.log("\n🎉 ALL TESTS PASSED! API credentials are working correctly.");
      } else {
        const clusterError = await clustersRes.json();
        console.log("❌ Cluster access failed:");
        console.log(JSON.stringify(clusterError, null, 2));
      }
    } else {
      const errorData = await response.json();
      console.log("❌ Project access failed:");
      console.log(JSON.stringify(errorData, null, 2));

      if (response.status === 403) {
        console.log("\n💡 LIKELY ISSUE: API key doesn't have access to this specific project");
        console.log("SOLUTION: Make sure API key has 'Organization Owner' permissions");
      } else if (response.status === 404) {
        console.log("\n💡 LIKELY ISSUE: Project ID is incorrect or project doesn't exist");
        console.log("SOLUTION: Verify project ID in Atlas dashboard → Settings");
      }
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }

  console.log("\n" + "=".repeat(60));
  console.log("🔧 NEXT STEPS:");
  console.log("1. If authentication failed: Check IP access list in Atlas");
  console.log("2. If org access failed: Verify API key permissions");
  console.log("3. If project access failed: Check project ID or permissions");
  console.log("4. If all passed: Cluster creation should work!");
}

comprehensiveDiagnostic().catch(console.error);
