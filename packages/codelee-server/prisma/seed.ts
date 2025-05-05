import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const problems = [
    {
      title: "1부터 100까지 합 구하기",
      description: "1부터 100까지의 합을 구하는 프로그램을 작성하세요.",
      difficulty: "easy",
    },
    {
      title: "소수 판별",
      description: "주어진 수가 소수인지 판별하는 함수를 작성하세요.",
      difficulty: "easy",
    },
    {
      title: "피보나치 수열",
      description: "n번째 피보나치 수를 반환하는 함수를 작성하세요.",
      difficulty: "easy",
    },
    {
      title: "문자열 뒤집기",
      description: "주어진 문자열을 뒤집는 함수를 작성하세요.",
      difficulty: "easy",
    },
    {
      title: "중복 문자 제거",
      description: "문자열에서 중복된 문자를 제거하는 함수를 작성하세요.",
      difficulty: "medium",
    },
    {
      title: "괄호 유효성 검사",
      description: "괄호로 이루어진 문자열의 유효성을 검사하세요.",
      difficulty: "medium",
    },
    {
      title: "최대공약수(GCD) 구하기",
      description: "두 수의 최대공약수를 구하는 함수를 작성하세요.",
      difficulty: "medium",
    },
    {
      title: "이진 탐색 구현",
      description: "정렬된 배열에서 이진 탐색을 구현하세요.",
      difficulty: "medium",
    },
    {
      title: "DFS/BFS 탐색",
      description: "그래프를 DFS와 BFS로 탐색하는 함수를 작성하세요.",
      difficulty: "hard",
    },
    {
      title: "최단 경로 알고리즘",
      description: "다익스트라 알고리즘을 구현하세요.",
      difficulty: "hard",
    },
  ];

  for (const [idx, problem] of problems.entries()) {
    const createdProblem = await prisma.problem.create({
      data: {
        ...problem,
        // 필요시 techStacks 등 추가
      },
    });

    // 각 문제마다 커밋 1개 생성
    const commit = await prisma.commit.create({
      data: {
        message: `${problem.title} - 초기 커밋`,
        date: new Date(),
        problemId: createdProblem.id,
      },
    });

    // 각 커밋마다 파일 1개 생성
    await prisma.commitFile.create({
      data: {
        path: `solution${idx + 1}.ts`,
        name: `solution${idx + 1}.ts`,
        content: `// ${problem.title}\nconsole.log("Hello, world!");`,
        diff: '+console.log("Hello, world!");',
        commitId: commit.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
