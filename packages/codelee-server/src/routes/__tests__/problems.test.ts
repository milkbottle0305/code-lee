import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import { prisma } from "../../prisma";
import { createProblemsRouter } from "../problems";
import { createAuthRouter } from "../auth";

const app = express();
app.use(express.json());
app.use("/problems", createProblemsRouter(prisma));
app.use("/auth", createAuthRouter(prisma));

let token: string;
let problemId: string;

describe("Problems routes", () => {
  beforeAll(async () => {
    // 테스트용 유저 생성 및 토큰 발급
    const email = `problems${Date.now()}@example.com`;
    const password = "password123";
    const name = "문제유저";
    const regRes = await request(app)
      .post("/auth/register")
      .send({ email, password, name });
    token = regRes.body.token;

    // 테스트용 문제 생성
    const problem = await prisma.problem.create({
      data: {
        title: "테스트 문제",
        description: "설명",
        difficulty: "easy",
      },
    });
    problemId = problem.id;
  });

  it("should get problems list", async () => {
    const res = await request(app).get("/problems");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("problems");
    expect(Array.isArray(res.body.problems)).toBe(true);
    expect(res.body.pagination).toHaveProperty("total");
  });

  it("should filter problems by difficulty", async () => {
    const res = await request(app).get("/problems?difficulty=easy");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.problems)).toBe(true);
  });

  it("should paginate problems", async () => {
    const res = await request(app).get("/problems?page=1&limit=1");
    expect(res.status).toBe(200);
    expect(res.body.pagination.limit).toBe(1);
  });

  it("should return 401 for detail without token", async () => {
    const res = await request(app).get(`/problems/${problemId}`);
    expect(res.status).toBe(401);
  });

  it("should get problem detail with token", async () => {
    const res = await request(app)
      .get(`/problems/${problemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(problemId);
  });

  it("should return 404 for not found problem", async () => {
    const res = await request(app)
      .get(`/problems/00000000-0000-0000-0000-000000000000`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});
