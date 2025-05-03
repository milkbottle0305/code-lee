import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth";

export function createProblemsRouter(prisma: PrismaClient) {
  const router = express.Router();

  // Get all problems with filtering
  router.get("/", async (req, res) => {
    try {
      const { difficulty, techStack, page = "1", limit = "10" } = req.query;

      const pageNumber = Number.parseInt(page as string);
      const limitNumber = Number.parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      // Build filter conditions
      const where: any = {};

      if (difficulty) {
        where.difficulty = difficulty;
      }

      if (techStack) {
        where.techStacks = {
          some: {
            name: {
              equals: techStack as string,
            },
          },
        };
      }

      // Get problems with pagination
      const [problems, totalCount] = await Promise.all([
        prisma.problem.findMany({
          where,
          include: {
            techStacks: true,
          },
          skip,
          take: limitNumber,
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.problem.count({ where }),
      ]);

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limitNumber);

      res.status(200).json({
        problems,
        pagination: {
          total: totalCount,
          page: pageNumber,
          limit: limitNumber,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Get problems error:", error);
      res
        .status(500)
        .json({ message: "문제 목록을 가져오는 중 오류가 발생했습니다." });
    }
  });

  // Get problem by ID
  router.get("/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;

      const problem = await prisma.problem.findUnique({
        where: { id },
        include: {
          techStacks: true,
          commits: {
            include: {
              files: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      if (!problem) {
        res.status(404).json({ message: "문제를 찾을 수 없습니다." });
        return;
      }

      res.status(200).json(problem);
    } catch (error) {
      console.error("Get problem error:", error);
      res
        .status(500)
        .json({ message: "문제를 가져오는 중 오류가 발생했습니다." });
    }
  });

  return router;
}
