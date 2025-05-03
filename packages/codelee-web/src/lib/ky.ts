import ky from "ky";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  // ...기타 옵션...
});

export default api;
