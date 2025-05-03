import { api } from "@/lib/api";
import type {
  GetCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  ReplyToCommentRequest,
  ReplyToCommentResponse,
  LikeCommentResponse,
} from "codelee-common/types/api";

export async function getComments(
  fileId: string,
  commitId: string
): Promise<GetCommentsResponse> {
  return api.get("comments", { searchParams: { fileId, commitId } }).json();
}

export async function createComment(
  data: CreateCommentRequest
): Promise<CreateCommentResponse> {
  return api.post("comments", { json: data }).json();
}

export async function replyToComment(
  data: ReplyToCommentRequest
): Promise<ReplyToCommentResponse> {
  return api.post("comments/reply", { json: data }).json();
}

export async function likeComment(
  commentId: string
): Promise<LikeCommentResponse> {
  return api.post(`comments/${commentId}/like`).json();
}
