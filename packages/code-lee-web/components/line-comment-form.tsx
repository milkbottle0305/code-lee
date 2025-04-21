"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface LineCommentFormProps {
  lineNumber: number
  onCancel: () => void
}

export function LineCommentForm({ lineNumber, onCancel }: LineCommentFormProps) {
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 코멘트 제출 로직 추가
    console.log(`Line ${lineNumber} comment: ${comment}`)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-sm font-medium">라인 {lineNumber}에 코멘트 작성</div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="이 라인에 대한 코멘트를 작성하세요..."
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          코멘트 작성
        </Button>
      </div>
    </form>
  )
}
