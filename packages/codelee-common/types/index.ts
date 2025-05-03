// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// Problem related types
export enum Difficulty {
  BEGINNER = "초급",
  INTERMEDIATE = "중급",
  ADVANCED = "고급",
}

export interface TechStack {
  id: string;
  name: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  techStacks: TechStack[];
  createdAt: Date;
  updatedAt: Date;
}

// Commit related types
export interface Commit {
  id: string;
  message: string;
  date: Date;
  author: User;
  files: CommitFile[];
}

export interface CommitFile {
  id: string;
  path: string;
  name: string;
  content: string;
  diff: string;
}

// Comment related types
export interface Comment {
  id: string;
  content: string;
  lineNumber: number;
  fileId: string;
  commitId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  commentId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
}
