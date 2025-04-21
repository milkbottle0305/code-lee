"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CommitSelector() {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">커밋:</span>
      <Select defaultValue="latest">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="커밋 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">최신 커밋 (2023-04-15)</SelectItem>
          <SelectItem value="previous1">이전 커밋 (2023-04-10)</SelectItem>
          <SelectItem value="previous2">초기 커밋 (2023-04-05)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
