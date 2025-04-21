"use client"

import { useState } from "react"
import { MoreHorizontal, ThumbsUp, ThumbsDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface CommentSectionProps {
  problemId?: string
}

export function CommentSection({ problemId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")

  // 문제 ID에 따라 다른 댓글 목록을 보여주기 위한 목업 데이터
  const getComments = (id?: string) => {
    // 기본 댓글 목록
    const defaultComments = [
      {
        id: 1,
        author: "김개발",
        avatar: "/placeholder.svg",
        content:
          "localStorage를 사용한 캐싱 방식은 좋은 접근이지만, 대용량 데이터의 경우 IndexedDB를 고려해보는 것이 좋을 것 같습니다.",
        timestamp: "10분 전",
        line: 33,
        likes: 5,
        dislikes: 0,
        isBestComment: true,
      },
      {
        id: 2,
        author: "이코더",
        avatar: "/placeholder.svg",
        content:
          "useCallback을 사용한 것은 좋은 최적화입니다. 하지만 의존성 배열이 비어있는데, 이 함수가 다른 상태나 props에 의존하지 않는지 확인해보세요.",
        timestamp: "30분 전",
        line: 42,
        likes: 3,
        dislikes: 1,
        isBestComment: false,
      },
      {
        id: 3,
        author: "박프론트",
        avatar: "/placeholder.svg",
        content:
          "캐시 만료 시간을 30분으로 설정했는데, 이 값은 API 데이터의 변경 빈도에 따라 조정하는 것이 좋을 것 같습니다.",
        timestamp: "1시간 전",
        line: 34,
        likes: 2,
        dislikes: 0,
        isBestComment: false,
      },
    ]

    // 문제 ID에 따라 다른 댓글 목록 반환
    if (id === "2") {
      return [
        {
          id: 1,
          author: "최상태",
          avatar: "/placeholder.svg",
          content:
            "비동기 상태 관리를 위해 React Query나 SWR 같은 라이브러리를 사용하면 더 깔끔하게 코드를 작성할 수 있을 것 같습니다.",
          timestamp: "5분 전",
          line: 15,
          likes: 7,
          dislikes: 0,
          isBestComment: true,
        },
        {
          id: 2,
          author: "정리액트",
          avatar: "/placeholder.svg",
          content: "상태 관리 로직을 커스텀 훅으로 분리하면 컴포넌트가 더 깔끔해질 것 같습니다.",
          timestamp: "20분 전",
          line: 28,
          likes: 4,
          dislikes: 1,
          isBestComment: false,
        },
      ]
    } else if (id === "3") {
      return [
        {
          id: 1,
          author: "박백엔드",
          avatar: "/placeholder.svg",
          content:
            "메모리 누수의 주요 원인은 이벤트 리스너가 제대로 정리되지 않은 것으로 보입니다. 컴포넌트 언마운트 시 정리 함수를 추가해보세요.",
          timestamp: "15분 전",
          line: 42,
          likes: 9,
          dislikes: 0,
          isBestComment: true,
        },
        {
          id: 2,
          author: "김노드",
          avatar: "/placeholder.svg",
          content: "대용량 데이터를 처리할 때는 스트림을 사용하는 것이 메모리 효율성을 높일 수 있습니다.",
          timestamp: "1시간 전",
          line: 56,
          likes: 6,
          dislikes: 1,
          isBestComment: false,
        },
        {
          id: 3,
          author: "이서버",
          avatar: "/placeholder.svg",
          content: "Node.js의 메모리 누수를 디버깅하려면 heapdump를 사용해보는 것이 좋을 것 같습니다.",
          timestamp: "2시간 전",
          line: 78,
          likes: 5,
          dislikes: 0,
          isBestComment: false,
        },
      ]
    }

    return defaultComments
  }

  const comments = getComments(problemId)

  return (
    <div className="flex flex-col space-y-4">
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                    <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{comment.author}</span>
                      {comment.isBestComment && <Badge className="bg-orange-500 text-xs">베스트 리뷰</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {comment.timestamp} • 라인 {comment.line}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">메뉴</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>수정</DropdownMenuItem>
                    <DropdownMenuItem>삭제</DropdownMenuItem>
                    <DropdownMenuItem>신고</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  <ThumbsUp className="h-3 w-3" />
                  {comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  <ThumbsDown className="h-3 w-3" />
                  {comment.dislikes}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  답글
                </Button>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-2">
        <Textarea
          placeholder="코멘트를 작성하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90">코멘트 작성</Button>
        </div>
      </div>
    </div>
  )
}
