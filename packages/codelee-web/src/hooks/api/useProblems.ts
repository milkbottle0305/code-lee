import { useQuery } from "@tanstack/react-query";
import { getProblems, getProblemDetail } from "@/api/problems";

export function useProblems(params?: {
  difficulty?: string;
  techStack?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["problems", params],
    queryFn: () => getProblems(params),
  });
}

export function useProblemDetail(id: string) {
  return useQuery({
    queryKey: ["problems", id],
    queryFn: () => getProblemDetail(id),
    enabled: !!id,
  });
}
