import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  createComment,
  replyToComment,
  likeComment,
} from "@/api/comments";
import type {
  GetCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  ReplyToCommentRequest,
  ReplyToCommentResponse,
  LikeCommentResponse,
} from "codelee-common/types/api";

export function useComments(fileId: string, commitId: string) {
  return useQuery<GetCommentsResponse>({
    queryKey: ["comments", fileId, commitId],
    queryFn: () => getComments(fileId, commitId),
    enabled: !!fileId && !!commitId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation<CreateCommentResponse, unknown, CreateCommentRequest>({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.fileId, variables.commitId],
      });
    },
  });
}

export function useReplyToComment() {
  const queryClient = useQueryClient();
  return useMutation<ReplyToCommentResponse, unknown, ReplyToCommentRequest>({
    mutationFn: replyToComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}

export function useLikeComment() {
  const queryClient = useQueryClient();
  return useMutation<LikeCommentResponse, unknown, string>({
    mutationFn: likeComment,
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
