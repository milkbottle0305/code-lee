import { api } from "@/lib/api";

export async function getComments(fileId: string, commitId: string) {
  return api.get("comments", { searchParams: { fileId, commitId } }).json();
}

export async function createComment(data: {
  content: string;
  lineNumber: number;
  fileId: string;
  commitId: string;
}) {
  return api.post("comments", { json: data }).json();
}

export async function replyToComment(data: {
  content: string;
  commentId: string;
}) {
  return api.post("comments/reply", { json: data }).json();
}

export async function likeComment(commentId: string) {
  return api.post(`comments/${commentId}/like`).json();
}
