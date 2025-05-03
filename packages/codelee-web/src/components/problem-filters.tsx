"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import {
  DIFFICULTY_LABELS,
  TECH_STACKS,
  TechStackName,
} from "codelee-common/types";

export default function ProblemFilters() {
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStackName[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleTechStackChange = (tech: TechStackName) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedDifficulties([]);
    setSelectedTechStacks([]);
  };

  const applyFilters = () => {
    // In a real app, this would trigger a fetch with the selected filters
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          필터
          {(selectedDifficulties.length > 0 ||
            selectedTechStacks.length > 0) && (
            <span className="ml-1 bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {selectedDifficulties.length + selectedTechStacks.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>문제 필터링</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-sm font-medium mb-3">난이도</h3>
            <div className="grid grid-cols-1 gap-2">
              {DIFFICULTY_LABELS.map((difficulty) => (
                <div key={difficulty} className="flex items-center gap-2">
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={selectedDifficulties.includes(difficulty)}
                    onCheckedChange={() => handleDifficultyChange(difficulty)}
                  />
                  <Label htmlFor={`difficulty-${difficulty}`}>
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">기술 스택</h3>
            <div className="grid grid-cols-2 gap-2">
              {TECH_STACKS.map((tech) => (
                <div key={tech} className="flex items-center gap-2">
                  <Checkbox
                    id={`tech-${tech}`}
                    checked={selectedTechStacks.includes(tech)}
                    onCheckedChange={() => handleTechStackChange(tech)}
                  />
                  <Label htmlFor={`tech-${tech}`}>{tech}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              초기화
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
