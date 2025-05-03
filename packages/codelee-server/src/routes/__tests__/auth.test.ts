import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { prisma } from "../../prisma";
import { createAuthRouter } from "../auth";

const app = express();
app.use(express.json());
app.use("/auth", createAuthRouter(prisma));

describe("Auth routes", () => {
  let email: string;
  let password = "password123";
  let name = "테스트유저";
  let token: string;

  beforeAll(async () => {
    email = `test${Date.now()}@example.com`;
  });

  it("should return 400 for invalid register input", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "invalid", password: "123" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should register a user and return correct user data", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email, password, name });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.name).toBe(name);
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).not.toHaveProperty("password");
    token = res.body.token;
  });

  it("should not register with duplicate email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email, password, name });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/이미 등록된 이메일/);
  });

  it("should return 400 for invalid login input", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "invalid" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should login with correct credentials and return user info", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(email);
    expect(res.body.user).not.toHaveProperty("password");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/이메일 또는 비밀번호/);
  });

  it("should not login with non-existent email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "notfound@example.com", password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/이메일 또는 비밀번호/);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });
});
