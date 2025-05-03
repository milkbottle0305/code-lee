import { api } from "@/lib/api";

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api.post("auth/register", { json: data }).json();
}

export async function login(data: { email: string; password: string }) {
  return api.post("auth/login", { json: data }).json();
}
