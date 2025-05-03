import { useQuery } from "@tanstack/react-query";
import { getMyProfile, getMyComments } from "@/api/users";
import type {
  UsersMeResponse,
  UsersMeCommentsParams,
  UsersMeCommentsResponse,
} from "codelee-common/types/api";

export function useMyProfile() {
  return useQuery<UsersMeResponse>({
    queryKey: ["users", "me"],
    queryFn: getMyProfile,
  });
}

export function useMyComments(params?: UsersMeCommentsParams) {
  return useQuery<UsersMeCommentsResponse>({
    queryKey: ["users", "me", "comments", params],
    queryFn: () => getMyComments(params),
  });
}
