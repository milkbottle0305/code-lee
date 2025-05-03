import { api } from "@/lib/api";
import type {
  GetProblemsParams,
  GetProblemsResponse,
  GetProblemDetailResponse,
} from "codelee-common/types/api";

export async function getProblems(
  params?: GetProblemsParams
): Promise<GetProblemsResponse> {
  // params를 string으로 변환
  const searchParams = params
    ? Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    : undefined;
  return api.get("problems", { searchParams }).json();
}

export async function getProblemDetail(
  id: string
): Promise<GetProblemDetailResponse> {
  return api.get(`problems/${id}`).json();
}
