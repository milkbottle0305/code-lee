"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitCommit } from "lucide-react"

interface Commit {
  id: string
  message: string
  date: string
}

interface CommitSelectorProps {
  commits: Commit[]
  selectedCommit: Commit
  onSelectCommit: (commit: Commit) => void
}

export default function CommitSelector({ commits, selectedCommit, onSelectCommit }: CommitSelectorProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <GitCommit className="h-5 w-5 text-blue-900 dark:text-orange-400" />
        <span className="font-medium">커밋 선택:</span>
      </div>
      <Select
        value={selectedCommit.id}
        onValueChange={(value) => {
          const commit = commits.find((c) => c.id === value)
          if (commit) onSelectCommit(commit)
        }}
      >
        <SelectTrigger className="w-full sm:w-[300px]">
          <SelectValue placeholder="커밋을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {commits.map((commit) => (
            <SelectItem key={commit.id} value={commit.id}>
              <div className="flex flex-col">
                <span>{commit.message}</span>
                <span className="text-xs text-gray-500">{commit.date}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
