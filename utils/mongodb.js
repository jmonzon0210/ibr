// utils/mongodb.js
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

let cachedClient = null;
let cachedDb = null;

if (!MONGO_URI) {
  throw new Error('Por favor, defina la variable de entorno MONGO_URI');
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
