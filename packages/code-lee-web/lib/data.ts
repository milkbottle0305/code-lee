export type Difficulty = "beginner" | "intermediate" | "advanced";
export type TechStack =
  | "react"
  | "typescript"
  | "javascript"
  | "node"
  | "python"
  | "java"
  | "go"
  | "rust";

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  techStacks: TechStack[];
  updatedAt: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  reviewCount: number;
}

export const difficulties: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "초급" },
  { value: "intermediate", label: "중급" },
  { value: "advanced", label: "고급" },
];

export const techStacks: { value: TechStack; label: string }[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "node", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "difficulty-asc", label: "난이도 오름차순" },
  { value: "difficulty-desc", label: "난이도 내림차순" },
];

export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "API 응답 캐싱 최적화하기",
    description:
      "이 문제는 React 애플리케이션에서 API 응답을 효율적으로 캐싱하는 방법에 관한 것입니다. 현재 코드는 API 호출을 중복으로 수행하고 있어 성능 문제가 발생하고 있습니다. 코드를 리뷰하고 최적화하는 방법을 제안해주세요.",
    difficulty: "intermediate",
    techStacks: ["react", "typescript", "javascript"],
    updatedAt: "2023-04-15T12:00:00Z",
    createdAt: "2023-04-10T09:30:00Z",
    authorId: "user-1",
    authorName: "김개발",
    reviewCount: 12,
  },
  {
    id: "2",
    title: "비동기 상태 관리 개선하기",
    description:
      "이 문제는 React 애플리케이션에서 비동기 상태 관리를 개선하는 방법에 관한 것입니다. 현재 코드는 로딩, 에러, 성공 상태를 개별적으로 관리하고 있어 코드가 복잡해지고 있습니다. 더 나은 상태 관리 방법을 제안해주세요.",
    difficulty: "advanced",
    techStacks: ["react", "typescript"],
    updatedAt: "2023-04-18T14:20:00Z",
    createdAt: "2023-04-12T10:15:00Z",
    authorId: "user-2",
    authorName: "이프론트",
    reviewCount: 8,
  },
  {
    id: "3",
    title: "메모리 누수 해결하기",
    description:
      "이 문제는 Node.js 애플리케이션에서 발생하는 메모리 누수를 해결하는 방법에 관한 것입니다. 현재 코드는 메모리 사용량이 지속적으로 증가하는 문제가 있습니다. 코드를 분석하고 메모리 누수의 원인을 찾아 해결해주세요.",
    difficulty: "advanced",
    techStacks: ["node", "javascript"],
    updatedAt: "2023-04-20T09:45:00Z",
    createdAt: "2023-04-15T16:30:00Z",
    authorId: "user-3",
    authorName: "박백엔드",
    reviewCount: 15,
  },
  {
    id: "4",
    title: "타입스크립트 타입 개선하기",
    description:
      "이 문제는 TypeScript 프로젝트에서 타입 정의를 개선하는 방법에 관한 것입니다. 현재 코드는 any 타입을 과도하게 사용하고 있어 타입 안정성이 떨어집니다. 더 구체적인 타입을 정의하여 코드의 안정성을 높여주세요.",
    difficulty: "intermediate",
    techStacks: ["typescript"],
    updatedAt: "2023-04-22T11:30:00Z",
    createdAt: "2023-04-18T13:45:00Z",
    authorId: "user-4",
    authorName: "최타입",
    reviewCount: 6,
  },
  {
    id: "5",
    title: "React 컴포넌트 리팩토링",
    description:
      "이 문제는 React 컴포넌트를 리팩토링하는 방법에 관한 것입니다. 현재 코드는 하나의 컴포넌트가 너무 많은 책임을 가지고 있어 유지보수가 어렵습니다. 컴포넌트를 더 작고 재사용 가능한 단위로 분리해주세요.",
    difficulty: "beginner",
    techStacks: ["react", "javascript"],
    updatedAt: "2023-04-25T15:20:00Z",
    createdAt: "2023-04-20T10:00:00Z",
    authorId: "user-5",
    authorName: "정리액트",
    reviewCount: 10,
  },
  {
    id: "6",
    title: "데이터베이스 쿼리 최적화",
    description:
      "이 문제는 SQL 쿼리를 최적화하는 방법에 관한 것입니다. 현재 쿼리는 실행 시간이 오래 걸리고 리소스를 많이 사용합니다. 쿼리를 분석하고 성능을 개선해주세요.",
    difficulty: "advanced",
    techStacks: ["node", "javascript"],
    updatedAt: "2023-04-28T09:15:00Z",
    createdAt: "2023-04-22T14:30:00Z",
    authorId: "user-6",
    authorName: "강디비",
    reviewCount: 18,
  },
  {
    id: "7",
    title: "CSS 레이아웃 개선하기",
    description:
      "이 문제는 웹 페이지의 CSS 레이아웃을 개선하는 방법에 관한 것입니다. 현재 레이아웃은 다양한 화면 크기에 대응하지 못하고 있습니다. 반응형 디자인을 적용하여 모든 기기에서 잘 보이도록 개선해주세요.",
    difficulty: "beginner",
    techStacks: ["javascript"],
    updatedAt: "2023-05-01T13:45:00Z",
    createdAt: "2023-04-25T11:20:00Z",
    authorId: "user-7",
    authorName: "한프론트",
    reviewCount: 5,
  },
  {
    id: "8",
    title: "보안 취약점 해결하기",
    description:
      "이 문제는 웹 애플리케이션의 보안 취약점을 해결하는 방법에 관한 것입니다. 현재 코드는 XSS와 CSRF 공격에 취약합니다. 코드를 분석하고 보안 취약점을 해결해주세요.",
    difficulty: "advanced",
    techStacks: ["node", "javascript"],
    updatedAt: "2023-05-05T10:30:00Z",
    createdAt: "2023-04-28T15:45:00Z",
    authorId: "user-8",
    authorName: "윤보안",
    reviewCount: 20,
  },
  {
    id: "9",
    title: "성능 최적화하기",
    description:
      "이 문제는 React 애플리케이션의 성능을 최적화하는 방법에 관한 것입니다. 현재 애플리케이션은 렌더링 성능이 좋지 않아 사용자 경험이 떨어집니다. 렌더링 성능을 분석하고 최적화해주세요.",
    difficulty: "intermediate",
    techStacks: ["react", "javascript"],
    updatedAt: "2023-05-08T14:15:00Z",
    createdAt: "2023-05-01T09:30:00Z",
    authorId: "user-9",
    authorName: "조성능",
    reviewCount: 14,
  },
  {
    id: "10",
    title: "테스트 코드 작성하기",
    description:
      "이 문제는 JavaScript 함수에 대한 테스트 코드를 작성하는 방법에 관한 것입니다. 현재 코드는 테스트가 없어 기능 변경 시 문제가 발생할 수 있습니다. Jest를 사용하여 테스트 코드를 작성해주세요.",
    difficulty: "beginner",
    techStacks: ["javascript", "typescript"],
    updatedAt: "2023-05-10T11:00:00Z",
    createdAt: "2023-05-05T13:20:00Z",
    authorId: "user-10",
    authorName: "신테스트",
    reviewCount: 7,
  },
  {
    id: "11",
    title: "코드 중복 제거하기",
    description:
      "이 문제는 코드 중복을 제거하는 방법에 관한 것입니다. 현재 코드는 여러 곳에서 비슷한 로직을 반복하고 있어 유지보수가 어렵습니다. 중복 코드를 분석하고 재사용 가능한 함수로 리팩토링해주세요.",
    difficulty: "beginner",
    techStacks: ["javascript", "typescript"],
    updatedAt: "2023-05-12T15:30:00Z",
    createdAt: "2023-05-08T10:45:00Z",
    authorId: "user-11",
    authorName: "임클린",
    reviewCount: 9,
  },
  {
    id: "12",
    title: "에러 처리 개선하기",
    description:
      "이 문제는 JavaScript 애플리케이션의 에러 처리를 개선하는 방법에 관한 것입니다. 현재 코드는 에러 처리가 미흡하여 예상치 못한 동작이 발생할 수 있습니다. 더 견고한 에러 처리 방법을 적용해주세요.",
    difficulty: "intermediate",
    techStacks: ["javascript", "node"],
    updatedAt: "2023-05-15T09:20:00Z",
    createdAt: "2023-05-10T14:00:00Z",
    authorId: "user-12",
    authorName: "오에러",
    reviewCount: 11,
  },
];

export function getProblemById(id: string): Problem | undefined {
  return mockProblems.find((problem) => problem.id === id);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
