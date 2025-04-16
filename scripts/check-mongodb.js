// MongoDB connection check script
// Run with: node scripts/check-mongodb.js

const { MongoClient } = require('mongodb');

// Connection URL and Database Name from the devcontainer environment
const url = 'mongodb://mongodb:27017';
const dbName = 'portfolio';

async function checkConnection() {
  let client;

  try {
    // Connect to MongoDB
    client = new MongoClient(url);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB server');

    // Get database reference
    const db = client.db(dbName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('\nAvailable collections:');
    if (collections.length === 0) {
      console.log('No collections found. Run "npm run seed-db" to populate the database.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }

    // Check document counts in each collection
    console.log('\nDocument counts:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
    }

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('\nMongoDB connection closed');
    }
  }
}

// Run the check function
checkConnection().catch(console.error);
