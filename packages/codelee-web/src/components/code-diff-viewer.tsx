"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface Comment {
  id: number
  lineNumber: number
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies: any[]
}

interface CodeDiffViewerProps {
  diffContent: string
  comments: Comment[]
  activeCommentLine: number | null
  setActiveCommentLine: (lineNumber: number | null) => void
}

export default function CodeDiffViewer({
  diffContent,
  comments,
  activeCommentLine,
  setActiveCommentLine,
}: CodeDiffViewerProps) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)

  // Parse diff content
  const lines = diffContent.trim().split("\n")

  const parsedLines = lines.map((line, index) => {
    let type = "normal"
    const content = line

    if (line.startsWith("+")) {
      type = "addition"
    } else if (line.startsWith("-")) {
      type = "deletion"
    } else if (line.startsWith("@@")) {
      type = "info"
    }

    // Line numbers start from 1
    const lineNumber = index + 1

    // Check if there are comments for this line
    const lineComments = comments.filter((comment) => comment.lineNumber === lineNumber)

    return {
      lineNumber,
      content,
      type,
      hasComments: lineComments.length > 0,
      comments: lineComments,
    }
  })

  const handleLineClick = (lineNumber: number) => {
    setActiveCommentLine(activeCommentLine === lineNumber ? null : lineNumber)
  }

  return (
    <div className="font-mono text-sm">
      {parsedLines.map((line) => (
        <div
          key={line.lineNumber}
          className={`flex group ${
            line.type === "addition"
              ? "bg-green-50 dark:bg-green-900/20"
              : line.type === "deletion"
                ? "bg-red-50 dark:bg-red-900/20"
                : line.type === "info"
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : ""
          } ${activeCommentLine === line.lineNumber ? "bg-yellow-100 dark:bg-yellow-900/30" : ""}`}
          onMouseEnter={() => setHoveredLine(line.lineNumber)}
          onMouseLeave={() => setHoveredLine(null)}
        >
          <div className="w-10 text-right pr-2 select-none text-gray-500 border-r border-gray-200 dark:border-gray-700">
            {line.lineNumber}
          </div>
          <div
            className="flex-1 px-4 py-0.5 whitespace-pre cursor-pointer"
            onClick={() => handleLineClick(line.lineNumber)}
          >
            <span
              className={`${
                line.type === "addition"
                  ? "text-green-700 dark:text-green-400"
                  : line.type === "deletion"
                    ? "text-red-700 dark:text-red-400"
                    : line.type === "info"
                      ? "text-blue-700 dark:text-blue-400"
                      : ""
              }`}
            >
              {line.content}
            </span>
          </div>
          <div className="w-10 flex items-center justify-center">
            {(line.hasComments || hoveredLine === line.lineNumber) && (
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 ${
                  line.hasComments
                    ? "text-blue-900 dark:text-orange-400"
                    : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
                onClick={() => handleLineClick(line.lineNumber)}
              >
                <MessageSquare className="h-4 w-4" />
                {line.hasComments && (
                  <span className="absolute -top-1 -right-1 bg-blue-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {line.comments.length}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
