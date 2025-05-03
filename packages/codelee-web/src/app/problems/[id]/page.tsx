"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import CodeDiffViewer from "@/components/code-diff-viewer";
import FileTree from "@/components/file-tree";
import CommitSelector from "@/components/commit-selector";

// Mock problem data
const problem = {
  id: 1,
  title: "React 컴포넌트 최적화하기",
  difficulty: "중급",
  techStacks: ["React", "JavaScript"],
  description:
    "이 문제는 React 컴포넌트의 성능을 최적화하는 방법을 연습하는 문제입니다. 불필요한 렌더링을 줄이고, 메모이제이션을 활용하여 성능을 개선해보세요.",
  updatedAt: "2023-05-01",
};

// Mock commits data
const commits = [
  { id: "c1", message: "Initial commit", date: "2023-04-28" },
  { id: "c2", message: "Add memoization", date: "2023-04-29" },
  { id: "c3", message: "Optimize rendering", date: "2023-04-30" },
];

// Mock files data
const files = [
  { id: "f1", name: "App.js", path: "src/App.js" },
  { id: "f2", name: "Component.js", path: "src/components/Component.js" },
  { id: "f3", name: "utils.js", path: "src/utils/utils.js" },
];

// Mock diff data
const diffContent = `
@@ -1,7 +1,7 @@
 import React from 'react';
 
-function ExpensiveComponent({ data }) {
+function ExpensiveComponent({ data }) {
   // Some expensive calculation
   const processedData = data.map(item => {
     return {
@@ -10,10 +10,10 @@
     };
   });
 
   return (
     <div>
-      {processedData.map(item => (
-        <div key={item.id}>{item.value}</div>
+      {processedData.map(item => (
+        <div key={item.id}>{item.value}</div>
       ))}
     </div>
   );
 }
 
-export default ExpensiveComponent;
+export default React.memo(ExpensiveComponent);
`;

// Mock comments data
const comments = [
  {
    id: 1,
    lineNumber: 13,
    user: { name: "김개발", avatar: "/placeholder.svg?height=40&width=40" },
    content:
      "여기서 React.memo를 사용하면 불필요한 리렌더링을 방지할 수 있습니다.",
    timestamp: "2023-05-01 14:30",
    likes: 5,
    dislikes: 1,
    replies: [
      {
        id: 101,
        user: { name: "이코딩", avatar: "/placeholder.svg?height=40&width=40" },
        content:
          "맞습니다. props가 변경되지 않으면 리렌더링을 건너뛰게 됩니다.",
        timestamp: "2023-05-01 15:45",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    lineNumber: 5,
    user: { name: "박리액트", avatar: "/placeholder.svg?height=40&width=40" },
    content: "이 부분에서 useMemo를 사용하면 계산 비용을 줄일 수 있습니다.",
    timestamp: "2023-05-02 09:15",
    likes: 7,
    dislikes: 2,
    replies: [],
  },
];

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedCommit, setSelectedCommit] = useState(commits[2]);
  const [selectedFile, setSelectedFile] = useState(files[1]);
  const [commentInput, setCommentInput] = useState("");
  const [activeCommentLine, setActiveCommentLine] = useState<number | null>(
    null
  );

  const handleCommentSubmit = () => {
    if (!commentInput.trim() || activeCommentLine === null) return;
    // In a real app, this would send the comment to the server
    alert(
      `코멘트가 제출되었습니다: 라인 ${activeCommentLine}, 내용: ${commentInput}`
    );
    setCommentInput("");
    setActiveCommentLine(null);
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
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {problem.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          최근 업데이트: {problem.updatedAt}
        </p>
      </div>

      {/* Commit Selector */}
      <CommitSelector
        commits={commits}
        selectedCommit={selectedCommit}
        onSelectCommit={setSelectedCommit}
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
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  {selectedFile.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
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
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="comments" className="mt-0">
              <ScrollArea className="h-[600px] rounded-lg border p-4">
                {comments.map((comment) => (
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
                              라인 {comment.lineNumber} • {comment.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {comment.dislikes}
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2">{comment.content}</p>

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                            {comment.replies.map((reply) => (
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
                                          {reply.timestamp}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 px-2"
                                        >
                                          <ThumbsUp className="h-3 w-3 mr-1" />
                                          {reply.likes}
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 px-2"
                                        >
                                          <ThumbsDown className="h-3 w-3 mr-1" />
                                          {reply.dislikes}
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
                          />
                          <Button
                            size="sm"
                            className="bg-blue-900 hover:bg-blue-800 text-white"
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
