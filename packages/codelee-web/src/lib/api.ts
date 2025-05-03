import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  hooks: {
    beforeRequest: [
      (request) => {
        // 토큰이 있다면 Authorization 헤더 추가
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      },
    ],
  },
});

export const fetcher = (url: string, options?: any) => api(url, options).json();
