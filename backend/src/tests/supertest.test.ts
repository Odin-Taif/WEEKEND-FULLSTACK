import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "../server";
let server: any;
beforeAll(() => {
  // Start the server before running tests
  server = app.listen(3000);
});

afterAll(() => {
  // Close the server after tests to release the port
  server.close();
});

describe("GET /submissions", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).get("/submissions");
    // Assertions
    expect(response.status).toBe(200);
  });
});

describe("post /submit", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).post("/submit");
    // Assertions
    expect(response.status).toBe(200);
  });
});
