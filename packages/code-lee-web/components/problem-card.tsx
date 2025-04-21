import Link from "next/link";
import { Calendar, ChevronRight, Code2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate, type Problem } from "@/lib/data";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  // 난이도에 따른 배지 색상 설정
  const difficultyColor = {
    beginner: "bg-green-500 hover:bg-green-600",
    intermediate: "bg-orange-500 hover:bg-orange-600",
    advanced: "bg-red-500 hover:bg-red-600",
  };

  // 난이도 한글 표시
  const difficultyLabel = {
    beginner: "초급",
    intermediate: "중급",
    advanced: "고급",
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">코드 리뷰 문제</span>
        </div>
        <Badge className={difficultyColor[problem.difficulty]}>
          {difficultyLabel[problem.difficulty]}
        </Badge>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold line-clamp-1">{problem.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {problem.techStacks.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-blue-50">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          최근 업데이트: {formatDate(problem.updatedAt)}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/problem/${problem.id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90">
            상세보기
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
