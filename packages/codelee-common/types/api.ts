import type {
  User,
  Problem,
  Comment,
  Reply,
  Commit,
  CommitFile,
  TechStack,
} from "./index";

// ---------- Auth ----------
export interface AuthRegisterRequest {
  name: string;
  email: string;
  password: string;
}
export interface AuthRegisterResponse {
  user: Pick<User, "id" | "name" | "email">;
  token: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}
export interface AuthLoginResponse {
  user: Pick<User, "id" | "name" | "email">;
  token: string;
}

// ---------- Users ----------
export interface UsersMeResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UsersMeCommentsParams {
  page?: number;
  limit?: number;
}
export interface UsersMeCommentsResponse {
  comments: Array<{
    id: string;
    content: string;
    lineNumber: number;
    file: { name: string; path: string };
    commit: { message: string; date: string };
    replies: { id: string }[];
    createdAt: string;
    updatedAt: string;
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ---------- Problems ----------
export interface GetProblemsParams {
  difficulty?: string;
  techStack?: string;
  page?: number;
  limit?: number;
}
export interface GetProblemsResponse {
  problems: Array<Problem & { techStacks: TechStack[] }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetProblemDetailResponse extends Problem {
  techStacks: TechStack[];
  commits: Array<Commit & { files: CommitFile[] }>;
}

// ---------- Comments ----------
export interface GetCommentsParams {
  fileId: string;
  commitId: string;
}
export type GetCommentsResponse = Array<
  Comment & {
    author: Pick<User, "id" | "name" | "email">;
    replies: Array<Reply & { author: Pick<User, "id" | "name" | "email"> }>;
  }
>;

export interface CreateCommentRequest {
  content: string;
  lineNumber: number;
  fileId: string;
  commitId: string;
}
export interface CreateCommentResponse
  extends Pick<
    Comment,
    "id" | "content" | "lineNumber" | "createdAt" | "updatedAt"
  > {
  author: Pick<User, "id" | "name" | "email">;
}

export interface ReplyToCommentRequest {
  content: string;
  commentId: string;
}
export interface ReplyToCommentResponse
  extends Pick<Reply, "id" | "content" | "createdAt" | "updatedAt"> {
  author: Pick<User, "id" | "name" | "email">;
}

export interface LikeCommentResponse {
  message: string;
}
