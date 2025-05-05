"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ThumbsUp, Send } from "lucide-react";
import CodeDiffViewer from "@/components/code-diff-viewer";
import FileTree from "@/components/file-tree";
import CommitSelector from "@/components/commit-selector";

// 커스텀 훅 import
import { useProblemDetail } from "@/hooks/api/useProblems";
import {
  useComments,
  useCreateComment,
  useReplyToComment,
  useLikeComment,
} from "@/hooks/api/useComments";

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  useEffect(() => {
    // 클라이언트에서 localStorage의 토큰 확인
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [router]);

  // 문제 상세정보 API 연동
  const { data: problem, isLoading: problemLoading } = useProblemDetail(
    params.id
  );

  // 커밋/파일 선택 상태
  const [selectedCommit, setSelectedCommit] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // 모바일 파일 선택 드롭다운 상태
  const [mobileFileDropdownOpen, setMobileFileDropdownOpen] = useState(false);

  // 커밋/파일 동기화: 문제 데이터가 로드되면 첫 커밋/파일 자동 선택
  useEffect(() => {
    if (problem && problem.commits && problem.commits.length > 0) {
      // 커밋이 바뀌면 첫 파일 자동 선택
      if (
        !selectedCommit ||
        !problem.commits.find((c: any) => c.id === selectedCommit.id)
      ) {
        setSelectedCommit(problem.commits[0]);
        setSelectedFile(problem.commits[0].files[0] ?? null);
      }
    }
  }, [problem]);

  // 커밋이 바뀌면 파일도 첫 파일로 자동 선택
  useEffect(() => {
    if (
      selectedCommit &&
      selectedCommit.files &&
      selectedCommit.files.length > 0
    ) {
      if (
        !selectedFile ||
        !selectedCommit.files.find((f: any) => f.id === selectedFile.id)
      ) {
        setSelectedFile(selectedCommit.files[0]);
      }
    }
  }, [selectedCommit]);

  // 댓글 목록 API 연동 (커밋/파일이 선택되어야 호출)
  const { data: commentsData, isLoading: commentsLoading } = useComments(
    selectedFile?.id ?? "",
    selectedCommit?.id ?? ""
  );

  // 댓글 작성, 답글 작성, 좋아요 훅
  const createComment = useCreateComment();
  const replyToComment = useReplyToComment();
  const likeComment = useLikeComment();

  // 댓글 입력 상태
  const [commentInput, setCommentInput] = useState("");
  const [activeCommentLine, setActiveCommentLine] = useState<number | null>(
    null
  );

  // 답글 입력 상태 (댓글 id별로 관리)
  const [replyInputs, setReplyInputs] = useState<{
    [commentId: string]: string;
  }>({});

  // 댓글 등록 핸들러
  const handleCommentSubmit = () => {
    if (
      !commentInput.trim() ||
      activeCommentLine === null ||
      !selectedFile ||
      !selectedCommit
    )
      return;
    createComment.mutate(
      {
        fileId: selectedFile.id,
        commitId: selectedCommit.id,
        lineNumber: activeCommentLine,
        content: commentInput,
      },
      {
        onSuccess: () => {
          setCommentInput("");
          setActiveCommentLine(null);
        },
      }
    );
  };

  // 답글 등록 핸들러
  const handleReplySubmit = (commentId: string) => {
    const reply = replyInputs[commentId];
    if (!reply?.trim()) return;
    replyToComment.mutate(
      {
        commentId,
        content: reply,
      },
      {
        onSuccess: () => {
          setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
        },
      }
    );
  };

  // 좋아요 핸들러
  const handleLike = (commentId: string) => {
    likeComment.mutate(commentId);
  };

  // 로딩 처리
  if (problemLoading || commentsLoading) {
    return <div>로딩중...</div>;
  }
  if (!problem) {
    return <div>문제를 찾을 수 없습니다.</div>;
  }

  // 커밋/파일/코드 diff/댓글 데이터는 실제 API 구조에 맞게 매핑 필요
  const commits = (problem.commits ?? []).map((commit: any) => ({
    ...commit,
    date:
      typeof commit.date === "string"
        ? commit.date
        : commit.date?.toISOString?.() ?? "",
  }));

  // 현재 선택된 커밋의 파일 목록
  const files = selectedCommit?.files ?? [];

  // 현재 선택된 파일의 diffContent
  const diffContent = selectedFile?.diff ?? "";

  // commentsData는 배열이므로 타입 변환 매핑 추가
  const comments = (commentsData ?? []).map((comment: any) => ({
    id: comment.id,
    lineNumber: comment.lineNumber,
    user: {
      name: comment.author?.name ?? "",
      avatar: comment.author?.avatar ?? "/placeholder.svg",
    },
    content: comment.content,
    timestamp: comment.createdAt,
    likes: comment.likes ?? 0,
    dislikes: comment.dislikes ?? 0,
    replies: (comment.replies ?? []).map((reply: any) => ({
      id: reply.id,
      content: reply.content,
      commentId: reply.commentId,
      user: {
        name: reply.author?.name ?? "",
        avatar: reply.author?.avatar ?? "/placeholder.svg",
      },
      timestamp: reply.createdAt,
      likes: reply.likes ?? 0,
      dislikes: reply.dislikes ?? 0,
    })),
  }));

  // 날짜 포맷 함수
  const formatDate = (date: Date | string) => {
    if (!date) return "";
    if (typeof date === "string") return date.slice(0, 10);
    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Problem Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800"
          >
            {problem.difficulty}
          </Badge>
          {problem.techStacks?.map((tech) => (
            <Badge
              key={tech.id}
              variant="outline"
              className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
            >
              {tech.name}
            </Badge>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {problem.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          최근 업데이트: {formatDate(problem.updatedAt)}
        </p>
      </div>

      {/* Commit Selector */}
      <CommitSelector
        commits={commits}
        selectedCommit={selectedCommit}
        onSelectCommit={(commit: any) => {
          setSelectedCommit(commit);
          setSelectedFile(commit.files[0] ?? null);
        }}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree Sidebar */}
        <div className="hidden lg:block">
          <FileTree
            files={files}
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
          />
        </div>

        {/* Code Diff Viewer */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="code">코드 변경사항</TabsTrigger>
              <TabsTrigger value="comments">
                코멘트 ({comments.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-0">
              {/* Mobile File Selector */}
              <div className="lg:hidden mb-4 relative">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  onClick={() => setMobileFileDropdownOpen((v) => !v)}
                >
                  {selectedFile?.name || "파일 선택"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {mobileFileDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border rounded shadow mt-1">
                    {files.map((file: any) => (
                      <div
                        key={file.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedFile?.id === file.id ? "font-bold" : ""
                        }`}
                        onClick={() => {
                          setSelectedFile(file);
                          setMobileFileDropdownOpen(false);
                        }}
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <CodeDiffViewer
                  diffContent={diffContent}
                  comments={comments}
                  activeCommentLine={activeCommentLine}
                  setActiveCommentLine={setActiveCommentLine}
                />
              </div>

              {/* Comment Input */}
              {activeCommentLine !== null && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <p className="text-sm font-medium mb-2">
                    라인 {activeCommentLine}에 코멘트 작성
                  </p>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="코멘트를 입력하세요..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleCommentSubmit}
                      className="bg-blue-900 hover:bg-blue-800 text-white"
                      disabled={createComment.isPending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="comments" className="mt-0">
              <ScrollArea className="h-[600px] rounded-lg border p-4">
                {comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="mb-6 pb-6 border-b last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={comment.user.avatar || "/placeholder.svg"}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{comment.user.name}</p>
                            <p className="text-xs text-gray-500">
                              라인 {comment.lineNumber} •{" "}
                              {formatDate(comment.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handleLike(comment.id)}
                              disabled={likeComment.isPending}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2">{comment.content}</p>

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                            {comment.replies.map((reply: any) => (
                              <div key={reply.id} className="mb-3 last:mb-0">
                                <div className="flex items-start gap-3">
                                  <img
                                    src={
                                      reply.user.avatar || "/placeholder.svg"
                                    }
                                    alt={reply.user.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">
                                          {reply.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {formatDate(reply.timestamp)}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 px-2"
                                          onClick={() => handleLike(reply.id)}
                                          disabled={likeComment.isPending}
                                        >
                                          <ThumbsUp className="h-3 w-3 mr-1" />
                                          {reply.likes}
                                        </Button>
                                      </div>
                                    </div>
                                    <p className="mt-1">{reply.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        <div className="mt-3 flex gap-2">
                          <Textarea
                            placeholder="답글 작성..."
                            className="flex-1 min-h-[40px] text-sm"
                            value={replyInputs[comment.id] || ""}
                            onChange={(e) =>
                              setReplyInputs((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            size="sm"
                            className="bg-blue-900 hover:bg-blue-800 text-white"
                            onClick={() => handleReplySubmit(comment.id)}
                            disabled={replyToComment.isPending}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
