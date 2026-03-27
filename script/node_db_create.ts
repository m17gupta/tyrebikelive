import { MongoClient } from "mongodb";

// --- CONFIGURATION ---
// IMPORTANT: Replace this with your actual MongoDB Atlas Connection String.
// Example: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"
const CONNECTION_STRING = "YOUR_MONGODB_ATLAS_URI_HERE";

// Define the names for the new database and collection
const NEW_DB_NAME = "new_project_database";
const NEW_COLLECTION_NAME = "users_data";

// Sample document (Triggers DB and Collection creation)
const SAMPLE_DOCUMENT = {
  name: "AutoUser",
  status: "active",
  timestamp: "2025-01-01T12:00:00Z",
};
// ---------------------


async function createDbAndCollection() {
  let client;

  try {
    // 1. Connect to the MongoDB Atlas Cluster
    client = new MongoClient(CONNECTION_STRING);
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas cluster.");

    // 2. Access the new database (won't exist yet)
    const db = client.db(NEW_DB_NAME);
    console.log(`Attempting to access/create database: '${NEW_DB_NAME}'`);

    // 3. Access the new collection
    const collection = db.collection(NEW_COLLECTION_NAME);
    console.log(`Attempting to access/create collection: '${NEW_COLLECTION_NAME}'`);

    // 4. Insert a document (this implicitly creates DB & Collection)
    const insertResult = await collection.insertOne(SAMPLE_DOCUMENT);

    // 5. Confirm creation
    const dbList = await client.db().admin().listDatabases();
    const dbExists = dbList.databases.some(db => db.name === NEW_DB_NAME);

    if (dbExists) {
      console.log(`\n✨ SUCCESS! Database '${NEW_DB_NAME}' created.`);
      console.log(`✨ SUCCESS! Collection '${NEW_COLLECTION_NAME}' created and first document inserted.`);
      console.log(`Inserted Document ID: ${insertResult.insertedId}`);
    } else {
      console.log("\n❌ ERROR: Database creation confirmation failed.");
    }

  } catch (err) {
    console.error(`\n❌ An error occurred: ${err}`);
  } finally {
    // Close connection
    if (client) {
      await client.close();
    }
  }
}

createDbAndCollection();
