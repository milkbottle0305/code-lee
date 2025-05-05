"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitCommit } from "lucide-react";
import React from "react";

interface Commit {
  id: string;
  message: string;
  date: string;
}

interface CommitSelectorProps {
  commits: Commit[];
  selectedCommit: Commit;
  onSelectCommit: (commit: Commit) => void;
}

export default function CommitSelector({
  commits,
  selectedCommit,
  onSelectCommit,
}: CommitSelectorProps) {
  // selectedCommit이 없으면 가장 최근 커밋(첫 번째)을 기본값으로 설정
  const effectiveSelectedCommit = selectedCommit ?? commits[0];

  // selectedCommit이 없고 커밋이 존재하면 최초 렌더링 시 자동 선택
  React.useEffect(() => {
    if (!selectedCommit && commits.length > 0) {
      onSelectCommit(commits[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCommit, commits]);

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <GitCommit className="h-5 w-5 text-blue-900 dark:text-orange-400" />
        <span className="font-medium">커밋 선택:</span>
      </div>
      <Select
        value={effectiveSelectedCommit?.id ?? ""}
        onValueChange={(value) => {
          const commit = commits.find((c) => c.id === value);
          if (commit) onSelectCommit(commit);
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
  );
}
