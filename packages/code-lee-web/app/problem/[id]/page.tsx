import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, GitBranch, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeDiffView } from "@/components/code-diff-view"
import { CommitSelector } from "@/components/commit-selector"
import { CommentSection } from "@/components/comment-section"
import { getProblemById, formatDate } from "@/lib/data"

interface ProblemPageProps {
  params: {
    id: string
  }
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = getProblemById(params.id)

  if (!problem) {
    notFound()
  }

  // 난이도에 따른 배지 색상 설정
  const difficultyColor = {
    beginner: "bg-green-500",
    intermediate: "bg-orange-500",
    advanced: "bg-red-500",
  }

  // 난이도 한글 표시
  const difficultyLabel = {
    beginner: "초급",
    intermediate: "중급",
    advanced: "고급",
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              돌아가기
            </Button>
          </Link>
          <Badge className={difficultyColor[problem.difficulty]}>{difficultyLabel[problem.difficulty]}</Badge>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">{problem.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {problem.techStacks.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-blue-50">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span className="mr-4">작성자: {problem.authorName}</span>
            <span>최근 업데이트: {formatDate(problem.updatedAt)}</span>
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <p>{problem.description}</p>
        </div>

        <Separator />

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">코드 변경사항</h2>
                </div>
                <CommitSelector />
              </div>

              <Tabs defaultValue="diff">
                <TabsList>
                  <TabsTrigger value="diff">변경사항</TabsTrigger>
                  <TabsTrigger value="full">전체 코드</TabsTrigger>
                </TabsList>
                <TabsContent value="diff" className="mt-4">
                  <CodeDiffView />
                </TabsContent>
                <TabsContent value="full" className="mt-4">
                  <CodeDiffView showFull />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">리뷰 코멘트</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {problem.reviewCount}
                </Badge>
              </div>
              <Separator className="my-4" />
              <CommentSection problemId={problem.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
