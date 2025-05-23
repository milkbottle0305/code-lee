import { api } from "@/lib/api";
import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "codelee-common/types/api";

export async function register(
  data: AuthRegisterRequest
): Promise<AuthRegisterResponse> {
  return api.post("auth/register", { json: data }).json();
}

export async function login(
  data: AuthLoginRequest
): Promise<AuthLoginResponse> {
  return api.post("auth/login", { json: data }).json();
}
