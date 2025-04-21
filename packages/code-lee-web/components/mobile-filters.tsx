"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  difficulties,
  techStacks,
  sortOptions,
  type Difficulty,
  type TechStack,
} from "@/lib/data";

interface MobileFiltersProps {
  selectedDifficulty: Difficulty | "all";
  setSelectedDifficulty: (difficulty: Difficulty | "all") => void;
  selectedTechStack: TechStack | "all";
  setSelectedTechStack: (techStack: TechStack | "all") => void;
  sortType: string;
  setSortType: (sortType: string) => void;
}

export function MobileFilters({
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTechStack,
  setSelectedTechStack,
  sortType,
  setSortType,
}: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const [tempDifficulty, setTempDifficulty] = useState<Difficulty | "all">(
    selectedDifficulty
  );
  const [tempTechStack, setTempTechStack] = useState<TechStack | "all">(
    selectedTechStack
  );
  const [tempSortType, setTempSortType] = useState(sortType);

  const handleApply = () => {
    setSelectedDifficulty(tempDifficulty);
    setSelectedTechStack(tempTechStack);
    setSortType(tempSortType);
    setOpen(false);
  };

  const handleReset = () => {
    setTempDifficulty("all");
    setTempTechStack("all");
    setTempSortType("latest");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          필터
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="difficulty">난이도</Label>
            <Select
              value={tempDifficulty}
              onValueChange={(value) =>
                setTempDifficulty(value as Difficulty | "all")
              }
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="난이도 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 난이도</SelectItem>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tech">기술 스택</Label>
            <Select
              value={tempTechStack}
              onValueChange={(value) =>
                setTempTechStack(value as TechStack | "all")
              }
            >
              <SelectTrigger id="tech">
                <SelectValue placeholder="기술 스택 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 기술 스택</SelectItem>
                {techStacks.map((tech) => (
                  <SelectItem key={tech.value} value={tech.value}>
                    {tech.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sort">정렬</Label>
            <Select value={tempSortType} onValueChange={setTempSortType}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="정렬 방식 선택" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              초기화
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              적용하기
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
