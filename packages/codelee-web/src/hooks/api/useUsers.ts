import { useQuery } from "@tanstack/react-query";
import { getMyProfile, getMyComments } from "@/api/users";

export function useMyProfile() {
  return useQuery({ queryKey: ["users", "me"], queryFn: getMyProfile });
}

export function useMyComments(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["users", "me", "comments", params],
    queryFn: () => getMyComments(params),
  });
}
