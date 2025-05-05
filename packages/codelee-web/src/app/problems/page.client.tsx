"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProblems } from "@/hooks/api/useProblems";

interface ProblemsListSectionProps {
  difficulty?: string;
  techStack?: string;
}

export default function ProblemsListSection({
  difficulty,
  techStack,
}: ProblemsListSectionProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useProblems({
    difficulty,
    techStack,
    page,
    limit: 9,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>문제 목록을 불러오지 못했습니다.</div>;

  const problems = data?.problems ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            문제가 없습니다.
          </div>
        ) : (
          problems.map((problem) => (
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
                      key={tech.name}
                      variant="outline"
                      className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  최근 업데이트:{" "}
                  {new Date(problem.updatedAt).toLocaleDateString()}
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
          ))
        )}
      </div>
      {/* Pagination */}
      {problems.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "outline" : "ghost"}
                className={
                  page === i + 1
                    ? "bg-blue-900 text-white hover:bg-blue-800"
                    : ""
                }
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
