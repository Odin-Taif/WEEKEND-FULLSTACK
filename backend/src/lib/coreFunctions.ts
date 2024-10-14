import { db } from "../db/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.uri!;
console.log(uri);
const client = new MongoClient(uri);

interface SessionData {
  driver: number;
  navigator: number;
  nextNavigator: number;
  facilitator: number;
}

export async function saveSession(sessionData: SessionData) {
  const sessionsCollection = db.collection("sessions"); // Collection name can be adjusted
  const result = await sessionsCollection.insertOne(sessionData);
  return result;
}

export async function getAllSessions() {
  await client.connect();
  const database = client.db("mop-track"); // Replace with your database name
  const sessionsCollection = database.collection("sessions"); // Replace with your collection name

  return await sessionsCollection.find({}).toArray(); // Fetch all documents
}
