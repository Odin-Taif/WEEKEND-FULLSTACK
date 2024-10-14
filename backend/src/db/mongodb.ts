// db.ts
import { MongoClient } from "mongodb";
require("dotenv").config();
const uri = process.env.uri!;
console.log(uri);

const client = new MongoClient(uri);

export async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export async function closeDB() {
  await client.close();
  console.log("Disconnected from MongoDB");
}

export const db = client.db("mop-track"); // Replace with your database name
