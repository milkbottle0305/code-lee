import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for problems
const problems = [
  {
    id: 1,
    title: "React 컴포넌트 최적화하기",
    difficulty: "중급",
    techStacks: ["React", "JavaScript"],
    updatedAt: "2023-05-01",
  },
  {
    id: 2,
    title: "Express.js API 엔드포인트 구현",
    difficulty: "초급",
    techStacks: ["Node.js", "Express", "TypeScript"],
    updatedAt: "2023-05-02",
  },
  {
    id: 3,
    title: "PostgreSQL 데이터베이스 스키마 설계",
    difficulty: "고급",
    techStacks: ["SQL", "PostgreSQL"],
    updatedAt: "2023-05-03",
  },
  {
    id: 4,
    title: "Next.js 서버 컴포넌트 구현",
    difficulty: "중급",
    techStacks: ["Next.js", "React", "TypeScript"],
    updatedAt: "2023-05-04",
  },
  {
    id: 5,
    title: "Redux 상태 관리 리팩토링",
    difficulty: "중급",
    techStacks: ["React", "Redux", "JavaScript"],
    updatedAt: "2023-05-05",
  },
  {
    id: 6,
    title: "GraphQL API 구현하기",
    difficulty: "고급",
    techStacks: ["GraphQL", "Node.js", "TypeScript"],
    updatedAt: "2023-05-06",
  },
];

export default function ProblemsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">문제 목록</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          필터
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <Card key={problem.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800"
                >
                  {problem.difficulty}
                </Badge>
                {problem.techStacks.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                최근 업데이트: {problem.updatedAt}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                asChild
              >
                <Link href={`/problems/${problem.id}`}>상세보기</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-blue-900 text-white hover:bg-blue-800"
          >
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
