import { useMutation } from "@tanstack/react-query";
import { register, login } from "@/api/auth";

export function useRegister() {
  return useMutation({ mutationFn: register });
}

export function useLogin() {
  return useMutation({ mutationFn: login });
}
