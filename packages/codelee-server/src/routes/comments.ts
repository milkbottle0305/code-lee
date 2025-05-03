import express from "express";
import { authenticate } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Validation schemas
const commentSchema = z.object({
  content: z.string().min(1),
  lineNumber: z.number().int().positive(),
  fileId: z.string().uuid(),
  commitId: z.string().uuid(),
});

const replySchema = z.object({
  content: z.string().min(1),
  commentId: z.string().uuid(),
});

export function createCommentsRouter(prisma: PrismaClient) {
  const router = express.Router();

  // Get comments for a file in a commit
  router.get("/file/:fileId/commit/:commitId", async (req, res) => {
    try {
      const { fileId, commitId } = req.params;
      const comments = await prisma.comment.findMany({
        where: { fileId, commitId },
        include: {
          author: { select: { id: true, name: true, email: true } },
          replies: {
            include: {
              author: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { lineNumber: "asc" },
      });
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Get comments error:", error);
      return res
        .status(500)
        .json({ message: "댓글을 가져오는 중 오류가 발생했습니다." });
    }
  });

  // Create a new comment
  router.post("/", authenticate, async (req, res) => {
    try {
      const validation = commentSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }
      const { content, lineNumber, fileId, commitId } = req.body;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const comment = await prisma.comment.create({
        data: { content, lineNumber, fileId, commitId, authorId: userId },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Create comment error:", error);
      return res
        .status(500)
        .json({ message: "댓글을 작성하는 중 오류가 발생했습니다." });
    }
  });

  // Create a reply to a comment
  router.post("/reply", authenticate, async (req, res) => {
    try {
      const validation = replySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
      }
      const { content, commentId } = req.body;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const reply = await prisma.reply.create({
        data: { content, commentId, authorId: userId },
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      return res.status(201).json(reply);
    } catch (error) {
      console.error("Create reply error:", error);
      return res
        .status(500)
        .json({ message: "답글을 작성하는 중 오류가 발생했습니다." });
    }
  });

  // Like a comment
  router.post("/:id/like", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // 이미 좋아요를 눌렀는지 확인
      const existingLike = await prisma.commentLike.findFirst({
        where: { commentId: id, userId },
      });
      if (existingLike) {
        return res
          .status(400)
          .json({ message: "이미 좋아요를 누른 댓글입니다." });
      }
      // 트랜잭션으로 좋아요 추가 및 카운트 증가
      await prisma.$transaction([
        prisma.commentLike.create({ data: { commentId: id, userId } }),
        prisma.comment.update({
          where: { id },
          data: { likes: { increment: 1 } },
        }),
      ]);
      return res.status(200).json({ message: "좋아요가 추가되었습니다." });
    } catch (error) {
      console.error("Like comment error:", error);
      return res
        .status(500)
        .json({ message: "좋아요를 추가하는 중 오류가 발생했습니다." });
    }
  });

  return router;
}
