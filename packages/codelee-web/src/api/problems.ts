import { api } from "@/lib/api";

export async function getProblems(params?: {
  difficulty?: string;
  techStack?: string;
  page?: number;
  limit?: number;
}) {
  return api.get("problems", { searchParams: params }).json();
}

export async function getProblemDetail(id: string) {
  return api.get(`problems/${id}`).json();
}
