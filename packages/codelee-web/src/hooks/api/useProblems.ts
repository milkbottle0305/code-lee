import { useQuery } from "@tanstack/react-query";
import { getProblems, getProblemDetail } from "@/api/problems";
import type {
  GetProblemsParams,
  GetProblemsResponse,
  GetProblemDetailResponse,
} from "codelee-common/types/api";

export function useProblems(params?: GetProblemsParams) {
  return useQuery<GetProblemsResponse>({
    queryKey: ["problems", params],
    queryFn: () => getProblems(params),
  });
}

export function useProblemDetail(id: string) {
  return useQuery<GetProblemDetailResponse>({
    queryKey: ["problems", id],
    queryFn: () => getProblemDetail(id),
    enabled: !!id,
  });
}
