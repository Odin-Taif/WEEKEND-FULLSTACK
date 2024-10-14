import http, { IncomingMessage, ServerResponse } from "http";
import { connectToDB, closeDB } from "./db/mongodb";
import { getAllSessions, saveSession } from "./lib/coreFunctions";

const PORT = 4000;
// handle post req -=-=-=-|
async function handlePostRequest(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    console.log("Received Data:", body);
    const parsedData = new URLSearchParams(body);
    const formData = {
      driver: parseInt(parsedData.get("driver") || "0", 10),
      navigator: parseInt(parsedData.get("navigator") || "0", 10),
      nextNavigator: parseInt(parsedData.get("nextNavigator") || "0", 10),
      facilitator: parseInt(parsedData.get("facilitator") || "0", 10),
    };
    //console.log("Parsed Data:", formData);
    await saveSession(formData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(formData));
  });
}
// handle get -=-=-=-=|
async function handleGetRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    const sessions = await getAllSessions(); // Fetch all sessions from the database
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(sessions));
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Failed to fetch sessions" }));
  }
}
// app -=-=-=-=|
export const app = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.statusCode = 200;
    if (req.method === "POST" && req.url === "/submit") {
      // Handle POST request
      await handlePostRequest(req, res);
    } else if (req.method === "GET" && req.url === "/submissions") {
      // Handle GET request
      await handleGetRequest(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found!!");
    }
  }
);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Close the DB connection on exit
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
