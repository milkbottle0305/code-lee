import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import { prisma } from "../../prisma";
import { createUsersRouter } from "../users";
import { createAuthRouter } from "../auth";

const app = express();
app.use(express.json());
app.use("/users", createUsersRouter(prisma));
app.use("/auth", createAuthRouter(prisma));

let token: string;
let userId: string;

describe("Users routes", () => {
  beforeAll(async () => {
    const email = `users${Date.now()}@example.com`;
    const password = "password123";
    const name = "유저";
    const regRes = await request(app)
      .post("/auth/register")
      .send({ email, password, name });
    token = regRes.body.token;
    userId = regRes.body.user.id;
  });

  it("should return 401 for /me without token", async () => {
    const res = await request(app).get("/users/me");
    expect(res.status).toBe(401);
  });

  it("should return 401 for /me/comments without token", async () => {
    const res = await request(app).get("/users/me/comments");
    expect(res.status).toBe(401);
  });

  it("should get my profile with token", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(userId);
  });

  it("should get my comments with token", async () => {
    const res = await request(app)
      .get("/users/me/comments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("comments");
    expect(res.body.pagination).toHaveProperty("totalPages");
  });

  it("should paginate my comments", async () => {
    const res = await request(app)
      .get("/users/me/comments?page=1&limit=1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.pagination.limit).toBe(1);
  });
});
