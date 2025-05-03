import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import { prisma } from "../../prisma";
import { createCommentsRouter } from "../comments";
import { createAuthRouter } from "../auth";

const app = express();
app.use(express.json());
app.use("/comments", createCommentsRouter(prisma));
app.use("/auth", createAuthRouter(prisma));

let token: string;
let fileId: string;
let commitId: string;
let commentId: string;

describe("Comments routes", () => {
  beforeAll(async () => {
    // 유저, 커밋, 파일 생성
    const email = `comments${Date.now()}@example.com`;
    const password = "password123";
    const name = "댓글유저";
    const regRes = await request(app)
      .post("/auth/register")
      .send({ email, password, name });
    token = regRes.body.token;

    const problem = await prisma.problem.create({
      data: { title: "문제", description: "설명", difficulty: "easy" },
    });
    const commit = await prisma.commit.create({
      data: {
        message: "커밋",
        date: new Date(),
        problemId: problem.id,
      },
    });
    commitId = commit.id;
    const file = await prisma.commitFile.create({
      data: {
        path: "test.ts",
        name: "test.ts",
        content: "console.log('hi')",
        diff: "+console.log('hi')",
        commitId: commit.id,
      },
    });
    fileId = file.id;
  });

  it("should return 400 for invalid comment creation", async () => {
    const res = await request(app)
      .post("/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "", lineNumber: 1, fileId, commitId });
    expect(res.status).toBe(400);
  });

  it("should return 401 for creating comment without token", async () => {
    const res = await request(app)
      .post("/comments")
      .send({ content: "test", lineNumber: 1, fileId, commitId });
    expect(res.status).toBe(401);
  });

  it("should create a comment", async () => {
    const res = await request(app)
      .post("/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "댓글", lineNumber: 1, fileId, commitId });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    commentId = res.body.id;
  });

  it("should get comments for file/commit", async () => {
    const res = await request(app).get(
      `/comments/file/${fileId}/commit/${commitId}`
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 400 for invalid reply creation", async () => {
    const res = await request(app)
      .post("/comments/reply")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "", commentId });
    expect(res.status).toBe(400);
  });

  it("should return 401 for creating reply without token", async () => {
    const res = await request(app)
      .post("/comments/reply")
      .send({ content: "답글", commentId });
    expect(res.status).toBe(401);
  });

  it("should create a reply", async () => {
    const res = await request(app)
      .post("/comments/reply")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "답글", commentId });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should return 401 for liking comment without token", async () => {
    const res = await request(app).post(`/comments/${commentId}/like`);
    expect(res.status).toBe(401);
  });

  it("should like a comment", async () => {
    const res = await request(app)
      .post(`/comments/${commentId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should not like a comment twice", async () => {
    const res = await request(app)
      .post(`/comments/${commentId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
  });
});
