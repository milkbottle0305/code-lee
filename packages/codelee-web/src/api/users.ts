import { api } from "@/lib/api";

export async function getMyProfile() {
  return api.get("users/me").json();
}

export async function getMyComments(params?: {
  page?: number;
  limit?: number;
}) {
  return api.get("users/me/comments", { searchParams: params }).json();
}
