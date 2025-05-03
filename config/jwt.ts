const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
}
export default jwtSecret as string;
