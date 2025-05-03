import { api } from "@/lib/api";
import type {
  UsersMeResponse,
  UsersMeCommentsParams,
  UsersMeCommentsResponse,
} from "codelee-common/types/api";

export async function getMyProfile(): Promise<UsersMeResponse> {
  return api.get("users/me").json();
}

export async function getMyComments(
  params?: UsersMeCommentsParams
): Promise<UsersMeCommentsResponse> {
  // params를 string으로 변환
  const searchParams = params
    ? Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    : undefined;
  return api.get("users/me/comments", { searchParams }).json();
}
