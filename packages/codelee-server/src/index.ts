import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./.env.production"
      : "./.env.development",
});

import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import { createAuthRouter } from "./routes/auth";
import { createProblemsRouter } from "./routes/problems";
import { createCommentsRouter } from "./routes/comments";
import { createUsersRouter } from "./routes/users";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", createAuthRouter(prisma));
app.use("/api/problems", createProblemsRouter(prisma));
app.use("/api/comments", createCommentsRouter(prisma));
app.use("/api/users", createUsersRouter(prisma));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});
