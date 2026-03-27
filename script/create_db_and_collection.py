from pymongo import MongoClient

# --- CONFIGURATION ---
# IMPORTANT: Replace this with your actual MongoDB Atlas Connection String.
# Example format: "mongodb+srv://<username>:<password>@cluster0.uppmgtg.mongodb.net/?retryWrites=true&w=majority"
CONNECTION_STRING = "YOUR_MONGODB_ATLAS_URI_HERE"

# Define the names for the new database and collection
NEW_DB_NAME = "new_project_database"
NEW_COLLECTION_NAME = "users_data"

# A sample document to insert. This action *triggers* the creation
# of both the database and the collection.
SAMPLE_DOCUMENT = {
    "name": "AutoUser",
    "status": "active",
    "timestamp": "2025-01-01T12:00:00Z"
}
# ---------------------


def create_db_and_collection():
    """
    Connects to the Atlas cluster and creates a database and collection implicitly.
    """
    try:
        # 1. Connect to the MongoDB Atlas Cluster
        client = MongoClient(CONNECTION_STRING)
        print("✅ Successfully connected to MongoDB Atlas cluster.")
        
        # 2. Access the new database (it won't exist yet)
        db = client[NEW_DB_NAME]
        print(f"Attempting to access/create database: '{NEW_DB_NAME}'")

        # 3. Access the new collection within that database
        # (This line gives you a reference, but the collection is not created yet)
        collection = db[NEW_COLLECTION_NAME]
        print(f"Attempting to access/create collection: '{NEW_COLLECTION_NAME}'")

        # 4. Insert a document to implicitly create the database AND collection
        insert_result = collection.insert_one(SAMPLE_DOCUMENT)
        
        # Check if the database/collection is now listed
        if NEW_DB_NAME in client.list_database_names():
            print(f"\n✨ SUCCESS! Database '{NEW_DB_NAME}' created.")
            print(f"✨ SUCCESS! Collection '{NEW_COLLECTION_NAME}' created and first document inserted.")
            print(f"Inserted Document ID: {insert_result.inserted_id}")
        else:
            print("\n❌ ERROR: Database creation confirmation failed.")

    except Exception as e:
        print(f"\n❌ An error occurred during connection or operation: {e}")
    finally:
        # Close the connection
        if 'client' in locals() and client:
            client.close()

if __name__ == "__main__":
    create_db_and_collection()