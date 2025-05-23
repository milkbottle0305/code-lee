# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 패키지 매니저 파일 및 소스 복사
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY packages ./packages
COPY packages/codelee-server/prisma ./packages/codelee-server/prisma

# 의존성 설치 (devDependencies 포함)
RUN pnpm install --frozen-lockfile

# prisma generate (Alpine용 바이너리 생성)
RUN pnpm --filter codelee-server exec prisma generate

# prisma generate (수동 실행)
RUN pnpm --filter codelee-server exec prisma generate

# 빌드
RUN pnpm build

# 2단계: 런타임 스테이지 (불필요한 빌드 도구 제거)
FROM node:20-alpine

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 필수 라이브러리 설치 (Prisma musl 엔진용)
RUN apk add --no-cache openssl

# 빌드 산출물과 node_modules만 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
