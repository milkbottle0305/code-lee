import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  createComment,
  replyToComment,
  likeComment,
} from "@/api/comments";

export function useComments(fileId: string, commitId: string) {
  return useQuery({
    queryKey: ["comments", fileId, commitId],
    queryFn: () => getComments(fileId, commitId),
    enabled: !!fileId && !!commitId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
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
  return useMutation({
    mutationFn: replyToComment,
    onSuccess: (_, variables) => {
      // 댓글 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}

export function useLikeComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeComment,
    onSuccess: (_, commentId) => {
      // 댓글 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
