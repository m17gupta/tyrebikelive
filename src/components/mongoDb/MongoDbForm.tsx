"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type FormStatus = "idle" | "loading" | "success" | "error";
type CollectionType = "userLogin" | "products" | "category";

interface DatabaseResponse {
  success?: boolean;
  error?: string;
  message?: string;
  database?: {
    name: string;
    connectionString: string;
  };
}

interface CollectionResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

interface TestConnectionResponse {
  success: boolean;
  error?: string;
  message?: string;
  cluster?: string;
  user?: string;
  details?: string;
}

interface ClusterResponse {
  success?: boolean;
  error?: string;
  cluster?: {
    name: string;
    connectionStrings?: {
      standardSrv?: string;
    };
  };
}

interface FormData {
  mongodbUser: string;
  mongodbPass: string;
  mongodbCluster: string;
  protocol: "mongodb" | "mongodb+srv";
  databaseName: string;
  selectedCollections: CollectionType[];
}

interface MongoDBModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser?: {
    id: string;
    name: string;
    email: string;
  };
}

const MongoDBForm = ({ isOpen, onClose, adminUser }: MongoDBModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    mongodbUser: "",
    mongodbPass: "",
    mongodbCluster: "",
    protocol: "mongodb+srv",
    databaseName: "",
    selectedCollections: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [connectionString, setConnectionString] = useState("");

  const handleClose = () => {
    setFormData({
      mongodbUser: "",
      mongodbPass: "",
      mongodbCluster: "",
      protocol: "mongodb+srv",
      databaseName: "",
      selectedCollections: [],
    });
    setStatus("idle");
    setMessage("");
    setConnectionString("");
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === "mongodbCluster" && typeof value === "string") {
      cleanedValue = value
        .replace(/^mongodb\+srv:\/\//, "")
        .replace(/^mongodb:\/\//, "")
        .replace(/^https?:\/\//, "")
        .trim();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const handleCollectionToggle = (collection: CollectionType) => {
    setFormData((prev) => ({
      ...prev,
      selectedCollections: prev.selectedCollections.includes(collection)
        ? prev.selectedCollections.filter((c) => c !== collection)
        : [...prev.selectedCollections, collection],
    }));
  };

  const handleTestAtlasCredentials = async () => {
    setStatus("loading");
    setMessage("🔍 Testing Atlas API credentials...");

    try {
      const res = await fetch("/api/admin/test-atlas-credentials", {
        method: "GET",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(
          `✅ Atlas API credentials are working!\n\nProject: ${data.project.name}\nProject ID: ${data.project.id}`,
        );
      } else {
        setStatus("error");
        let errorMsg = `❌ Atlas API Error (${res.status})\n\n`;

        if (
          data.error ===
          "Please update the placeholder values in your .env file with real Atlas API credentials"
        ) {
          errorMsg += "🔧 Please update your .env file with real MongoDB Atlas API credentials:\n";
          errorMsg += "1. Go to MongoDB Atlas → Organizations → Access Manager → API Keys\n";
          errorMsg += "2. Create API Key with 'Organization Owner' permissions\n";
          errorMsg += "3. Update MONGO_ATLAS_PUBLIC_KEY and MONGO_ATLAS_PRIVATE_KEY in .env\n";
          errorMsg += "4. Get Project ID from Atlas → Project → Settings";
        } else {
          errorMsg += data.error + "\n\n";
          if (data.troubleshooting && typeof data.troubleshooting === "object") {
            errorMsg += "Troubleshooting:\n";
            Object.entries(data.troubleshooting as Record<string, string>).forEach(([code, msg]) => {
              errorMsg += `• ${code}: ${msg}\n`;
            });
          }
        }

        setMessage(errorMsg);
      }
    } catch (err) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setMessage(`❌ Network error: ${errorMessage}`);
    }
  };

  const handleTestConnection = async () => {
    if (!formData.mongodbUser || !formData.mongodbPass || !formData.mongodbCluster) {
      setStatus("error");
      setMessage("❌ Please fill in all MongoDB credentials before testing connection");
      return;
    }

    setStatus("loading");
    setMessage("🔍 Testing MongoDB connection...");

    try {
      const res = await fetch("/api/admin/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: TestConnectionResponse = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(`✅ Connection successful to ${formData.mongodbCluster}`);
      } else {
        const errorMessage = data.error || "Connection failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setMessage(`❌ Test failed: ${errorMessage}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.databaseName.trim()) {
      setStatus("error");
      setMessage("Database name is required");
      return;
    }

    if (!formData.mongodbUser.trim() || !formData.mongodbPass.trim()) {
      setStatus("error");
      setMessage("MongoDB username and password are required");
      return;
    }

    setStatus("loading");
    setMessage("🚀 Creating new MongoDB cluster...");

    try {
      // 🧩 Step 1: Create cluster dynamically
      const clusterRes = await fetch("/api/admin/create-cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clusterName: `${formData.databaseName}-cluster`,
        }),
      });

      const clusterData: ClusterResponse = await clusterRes.json();
      if (!clusterRes.ok) throw new Error(clusterData.error || "Cluster creation failed");

      const clusterUrl =
        clusterData.cluster?.connectionStrings?.standardSrv ||
        `${formData.protocol}://${formData.mongodbCluster}`;

      setMessage(`✅ Cluster created successfully!\n🔗 ${clusterUrl}\n⏳ Waiting for provisioning...`);

      await new Promise((r) => setTimeout(r, 10000));

      // 🧩 Step 2: Create database
      setMessage("⚙️ Creating database in new cluster...");
      const dbRes = await fetch("/api/admin/create-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dbName: formData.databaseName,
          mongodbUser: formData.mongodbUser,
          mongodbPass: formData.mongodbPass,
          mongodbCluster: clusterUrl.replace("mongodb+srv://", "").replace("/", ""),
          protocol: "mongodb+srv",
        }),
      });

      const dbData: DatabaseResponse = await dbRes.json();
      if (!dbRes.ok) throw new Error(dbData.error || "Database creation failed");

      setConnectionString(dbData.database?.connectionString || "");
      let successMsg = `✅ Cluster & database "${formData.databaseName}" created successfully!\n`;

      // 🧩 Step 3: Create collections
      if (formData.selectedCollections.length > 0) {
        setMessage(`📂 Creating ${formData.selectedCollections.length} collections...`);
        for (const collection of formData.selectedCollections) {
          const colRes = await fetch("/api/admin/create-collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dbName: formData.databaseName,
              collectionName: collection,
              mongodbUser: formData.mongodbUser,
              mongodbPass: formData.mongodbPass,
              mongodbCluster: clusterUrl.replace("mongodb+srv://", "").replace("/", ""),
            }),
          });
          const colData: CollectionResponse = await colRes.json();
          successMsg += colData.success
            ? `✅ Collection "${collection}" created successfully\n`
            : `❌ Failed to create collection "${collection}" — ${colData.error}\n`;
        }
      }

      setStatus("success");
      setMessage(successMsg);
    } catch (err) {
      console.error("Error creating cluster/database:", err);
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setMessage(`❌ ${errorMessage}\n\nPlease check Atlas API keys and permissions.`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border bg-white shadow-lg">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            MongoDB Cluster & Database Manager
          </DialogTitle>
          <p className="mt-1 text-sm text-gray-600">
            Dynamically create Atlas clusters, databases, and collections
          </p>
        </DialogHeader>

        <div className="border-b bg-amber-50 px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-800">Setup Required</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>This feature requires MongoDB Atlas API credentials. Ensure you have:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>MongoDB Atlas account with API access</li>
                  <li>Project API Key with &quot;Project Owner&quot; permissions</li>
                  <li>
                    Environment variables: MONGO_ATLAS_PUBLIC_KEY, MONGO_ATLAS_PRIVATE_KEY,
                    MONGO_ATLAS_PROJECT_ID
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={handleTestAtlasCredentials}
                  disabled={status === "loading"}
                  className="mt-3 inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
                >
                  🧪 Test Atlas API Credentials
                </button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* Credentials Section */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 flex items-center text-lg font-medium text-gray-900">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                <span className="text-sm font-semibold text-blue-600">1</span>
              </div>
              MongoDB Credentials
            </h2>
            <p className="mb-4 text-sm text-gray-600">Enter your MongoDB Atlas database user credentials</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">MongoDB Username</label>
                <input
                  type="text"
                  name="mongodbUser"
                  placeholder="Enter MongoDB username"
                  value={formData.mongodbUser}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">MongoDB Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="mongodbPass"
                    placeholder="Enter MongoDB password"
                    value={formData.mongodbPass}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 pr-10 text-sm placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Test Connection Button */}
            {formData.mongodbUser && formData.mongodbPass && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={status === "loading"}
                  className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 hover:text-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:outline-none disabled:opacity-50"
                >
                  🔌 Test Connection
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Test your credentials before creating the database
                </p>
              </div>
            )}
          </div>

          {/* Database Configuration */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 flex items-center text-lg font-medium text-gray-900">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                <span className="text-sm font-semibold text-blue-600">2</span>
              </div>
              Database Configuration
            </h2>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Database Name</label>
              <input
                type="text"
                name="databaseName"
                placeholder="Enter database name (e.g., ecommerce_store)"
                value={formData.databaseName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Collections to Create (Optional)
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {["userLogin", "products", "category"].map((col) => (
                  <label
                    key={col}
                    className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedCollections.includes(col as CollectionType)}
                      onChange={() => handleCollectionToggle(col as CollectionType)}
                      disabled={status === "loading"}
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">{col}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          {status !== "idle" && (
            <div
              className={`rounded-lg p-4 text-sm ${
                status === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : status === "error"
                    ? "border border-red-200 bg-red-50 text-red-800"
                    : "border border-blue-200 bg-blue-50 text-blue-800"
              }`}
            >
              <p className="whitespace-pre-line">{message}</p>
            </div>
          )}

          {/* Connection string */}
          {connectionString && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs">
              <p className="mb-1 font-semibold text-blue-900">Connection String:</p>
              <code className="break-all text-blue-800">{connectionString}</code>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <Loader className="mr-2 h-5 w-5 animate-spin" /> Creating...
              </span>
            ) : (
              "🚀 Create Cluster + Database"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MongoDBForm;

