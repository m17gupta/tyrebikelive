#!/usr/bin/env node

// MongoDB Atlas API Credential Test Script
// This will help us debug the 401 authentication issue

const PROJECT_ID = "68c16409996759167fd1d3bc";
const PUBLIC_KEY = "vkvsvvxw";
const PRIVATE_KEY = "d9d62c65-e3d0-4605-b1d2-b36d5ca04c81";
async function testAtlasAPI() {
  console.log("🧪 Testing MongoDB Atlas API Credentials...\n");

  console.log("Credentials being used:");
  console.log("- Project ID:", PROJECT_ID);
  console.log("- Public Key:", PUBLIC_KEY);
  console.log("- Private Key:", PRIVATE_KEY.substring(0, 8) + "****");
  console.log("");

  const auth = Buffer.from(`${PUBLIC_KEY}:${PRIVATE_KEY}`).toString("base64");
  console.log("Auth string (base64):", auth.substring(0, 20) + "****");
  console.log("");

  try {
    // Test 1: Get project information
    console.log("📝 Test 1: Getting project information...");
    const projectRes = await fetch(`https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Response status:", projectRes.status, projectRes.statusText);

    if (projectRes.ok) {
      const projectData = await projectRes.json();
      console.log("✅ SUCCESS! Project found:");
      console.log("- Project Name:", projectData.name);
      console.log("- Organization ID:", projectData.orgId);
      console.log("- Created:", new Date(projectData.created).toLocaleString());
      console.log("");

      // Test 2: List existing clusters
      console.log("📝 Test 2: Listing existing clusters...");
      const clustersRes = await fetch(
        `https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}/clusters`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (clustersRes.ok) {
        const clustersData = await clustersRes.json();
        console.log("✅ SUCCESS! Clusters accessible:");
        console.log("- Total clusters:", clustersData.totalCount || 0);
        if (clustersData.results && clustersData.results.length > 0) {
          clustersData.results.forEach((cluster, i) => {
            console.log(`- Cluster ${i + 1}: ${cluster.name} (${cluster.stateName})`);
          });
        } else {
          console.log("- No clusters found in this project");
        }
        console.log("");

        console.log("🎉 API credentials are working perfectly!");
        console.log("The issue might be elsewhere. Let's check permissions for cluster creation...");
      } else {
        const errorData = await clustersRes.json();
        console.log("❌ FAILED to list clusters:");
        console.log("Status:", clustersRes.status);
        console.log("Error:", errorData);
      }
    } else {
      const errorData = await projectRes.json();
      console.log("❌ FAILED to get project:");
      console.log("Status:", projectRes.status);
      console.log("Error:", JSON.stringify(errorData, null, 2));
      console.log("");

      // Provide specific troubleshooting based on status code
      if (projectRes.status === 401) {
        console.log("🔧 TROUBLESHOOTING 401 Unauthorized:");
        console.log("1. Check if your API keys are correct");
        console.log("2. Verify the keys haven't expired");
        console.log("3. Make sure the API key is enabled");
        console.log("4. Check if IP access list includes your server IP");
      } else if (projectRes.status === 403) {
        console.log("🔧 TROUBLESHOOTING 403 Forbidden:");
        console.log("1. API key needs 'Organization Owner' or 'Project Owner' permissions");
        console.log("2. Check the role assigned to your API key");
      } else if (projectRes.status === 404) {
        console.log("🔧 TROUBLESHOOTING 404 Not Found:");
        console.log("1. Check if the Project ID is correct");
        console.log("2. Verify you have access to this project");
      }
    }
  } catch (error) {
    console.log("❌ NETWORK ERROR:");
    console.log(error.message);
  }
}

testAtlasAPI().catch(console.error);
