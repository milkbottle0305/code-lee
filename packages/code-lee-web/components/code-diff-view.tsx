"use client";

import { useState } from "react";
import { MessageSquare, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineCommentForm } from "@/components/line-comment-form";

interface CodeDiffViewProps {
  showFull?: boolean;
}

export function CodeDiffView({ showFull = false }: CodeDiffViewProps) {
  const [activeCommentLine, setActiveCommentLine] = useState<number | null>(
    null
  );

  const toggleCommentForm = (lineNumber: number) => {
    setActiveCommentLine(activeCommentLine === lineNumber ? null : lineNumber);
  };

  // 예시 코드 데이터
  const codeLines = [
    {
      type: "context",
      number: 1,
      content: "import React, { useState, useEffect } from 'react';",
    },
    { type: "context", number: 2, content: "import axios from 'axios';" },
    { type: "context", number: 3, content: "" },
    { type: "context", number: 4, content: "interface User {" },
    { type: "context", number: 5, content: "  id: number;" },
    { type: "context", number: 6, content: "  name: string;" },
    { type: "context", number: 7, content: "  email: string;" },
    { type: "context", number: 8, content: "}" },
    { type: "context", number: 9, content: "" },
    { type: "deletion", number: 10, content: "const UserList = () => {" },
    {
      type: "addition",
      number: 10,
      content: "const UserList = React.memo(() => {",
    },
    {
      type: "context",
      number: 11,
      content: "  const [users, setUsers] = useState<User[]>([]);",
    },
    {
      type: "context",
      number: 12,
      content: "  const [loading, setLoading] = useState(true);",
    },
    { type: "context", number: 13, content: "" },
    {
      type: "deletion",
      number: 14,
      content: "  const fetchUsers = async () => {",
    },
    { type: "deletion", number: 15, content: "    try {" },
    {
      type: "deletion",
      number: 16,
      content:
        "      const response = await axios.get('https://api.example.com/users');",
    },
    { type: "deletion", number: 17, content: "      setUsers(response.data);" },
    { type: "deletion", number: 18, content: "      setLoading(false);" },
    { type: "deletion", number: 19, content: "    } catch (error) {" },
    {
      type: "deletion",
      number: 20,
      content: "      console.error('Error fetching users:', error);",
    },
    { type: "deletion", number: 21, content: "      setLoading(false);" },
    { type: "deletion", number: 22, content: "    }" },
    { type: "deletion", number: 23, content: "  };" },
    {
      type: "addition",
      number: 14,
      content: "  const fetchUsers = React.useCallback(async () => {",
    },
    { type: "addition", number: 15, content: "    try {" },
    { type: "addition", number: 16, content: "      // 캐시 키 생성" },
    {
      type: "addition",
      number: 17,
      content: "      const cacheKey = 'users_cache';",
    },
    {
      type: "addition",
      number: 18,
      content: "      const cachedData = localStorage.getItem(cacheKey);",
    },
    {
      type: "addition",
      number: 19,
      content:
        "      const cacheExpiry = localStorage.getItem(`${cacheKey}_expiry`);",
    },
    { type: "addition", number: 20, content: "" },
    { type: "addition", number: 21, content: "      // 캐시가 유효한지 확인" },
    {
      type: "addition",
      number: 22,
      content:
        "      if (cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry)) {",
    },
    {
      type: "addition",
      number: 23,
      content: "        setUsers(JSON.parse(cachedData));",
    },
    { type: "addition", number: 24, content: "        setLoading(false);" },
    { type: "addition", number: 25, content: "        return;" },
    { type: "addition", number: 26, content: "      }" },
    { type: "addition", number: 27, content: "" },
    {
      type: "addition",
      number: 28,
      content: "      // 캐시가 없거나 만료된 경우 API 호출",
    },
    {
      type: "addition",
      number: 29,
      content:
        "      const response = await axios.get('https://api.example.com/users');",
    },
    {
      type: "addition",
      number: 30,
      content: "      const data = response.data;",
    },
    { type: "addition", number: 31, content: "" },
    { type: "addition", number: 32, content: "      // 데이터 캐싱 (30분)" },
    {
      type: "addition",
      number: 33,
      content: "      localStorage.setItem(cacheKey, JSON.stringify(data));",
    },
    {
      type: "addition",
      number: 34,
      content:
        "      localStorage.setItem(`${cacheKey}_expiry`, (Date.now() + 30 * 60 * 1000).toString());",
    },
    { type: "addition", number: 35, content: "" },
    { type: "addition", number: 36, content: "      setUsers(data);" },
    { type: "addition", number: 37, content: "      setLoading(false);" },
    { type: "addition", number: 38, content: "    } catch (error) {" },
    {
      type: "addition",
      number: 39,
      content: "      console.error('Error fetching users:', error);",
    },
    { type: "addition", number: 40, content: "      setLoading(false);" },
    { type: "addition", number: 41, content: "    }" },
    { type: "addition", number: 42, content: "  }, []);" },
    { type: "context", number: 43, content: "" },
    { type: "context", number: 44, content: "  useEffect(() => {" },
    { type: "context", number: 45, content: "    fetchUsers();" },
    { type: "deletion", number: 46, content: "  }, []);" },
    { type: "addition", number: 46, content: "  }, [fetchUsers]);" },
    { type: "context", number: 47, content: "" },
    { type: "context", number: 48, content: "  if (loading) {" },
    {
      type: "context",
      number: 49,
      content: "    return <div>Loading...</div>;",
    },
    { type: "context", number: 50, content: "  }" },
  ];

  return (
    <div className="rounded-lg border">
      <ScrollArea className="h-[500px] w-full">
        <div className="relative font-mono text-sm">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, index) => {
                // 삭제된 줄과 추가된 줄이 연속으로 나타나는 경우 쌍으로 표시
                if (
                  line.type === "deletion" &&
                  index + 1 < codeLines.length &&
                  codeLines[index + 1].type === "addition" &&
                  line.number === codeLines[index + 1].number
                ) {
                  return (
                    <tr
                      key={`${index}-deletion`}
                      className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30"
                    >
                      <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                        {line.number}
                      </td>
                      <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                        <Minus className="h-3 w-3 text-red-500" />
                      </td>
                      <td className="whitespace-pre px-4 py-1">
                        {line.content}
                      </td>
                      <td className="w-10 px-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100"
                          onClick={() => toggleCommentForm(line.number)}
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  );
                }

                // 추가된 줄이 이전 줄의 삭제와 쌍을 이루는 경우 건너뜀
                if (
                  line.type === "addition" &&
                  index > 0 &&
                  codeLines[index - 1].type === "deletion" &&
                  line.number === codeLines[index - 1].number
                ) {
                  return (
                    <tr
                      key={`${index}-addition`}
                      className="bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30"
                    >
                      <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                        {line.number}
                      </td>
                      <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                        <Plus className="h-3 w-3 text-green-500" />
                      </td>
                      <td className="whitespace-pre px-4 py-1">
                        {line.content}
                      </td>
                      <td className="w-10 px-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100"
                          onClick={() => toggleCommentForm(line.number)}
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  );
                }

                // 일반적인 줄 렌더링
                return (
                  <tr
                    key={index}
                    className={`group ${
                      line.type === "deletion"
                        ? "bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30"
                        : line.type === "addition"
                          ? "bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30"
                          : "hover:bg-muted/50"
                    }`}
                  >
                    <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                      {line.number}
                    </td>
                    <td className="w-12 select-none border-r px-2 text-right text-muted-foreground">
                      {line.type === "deletion" && (
                        <Minus className="h-3 w-3 text-red-500" />
                      )}
                      {line.type === "addition" && (
                        <Plus className="h-3 w-3 text-green-500" />
                      )}
                    </td>
                    <td className="whitespace-pre px-4 py-1">{line.content}</td>
                    <td className="w-10 px-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100"
                        onClick={() => toggleCommentForm(line.number)}
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {activeCommentLine !== null && (
            <div className="border-t bg-muted/50 p-4">
              <LineCommentForm
                lineNumber={activeCommentLine}
                onCancel={() => setActiveCommentLine(null)}
              />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
