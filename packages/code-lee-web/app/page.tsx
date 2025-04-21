"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProblemCard } from "@/components/problem-card";
import { MobileFilters } from "@/components/mobile-filters";
import { Pagination } from "@/components/pagination";
import {
  mockProblems,
  difficulties,
  techStacks,
  sortOptions,
  type Difficulty,
  type TechStack,
  type Problem,
} from "@/lib/data";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack | "all">(
    "all"
  );
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProblems, setFilteredProblems] =
    useState<Problem[]>(mockProblems);

  const itemsPerPage = 9;

  // 필터링 및 정렬 로직
  useEffect(() => {
    let result = [...mockProblems];

    // 검색어 필터링
    if (searchQuery) {
      result = result.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 난이도 필터링
    if (selectedDifficulty !== "all") {
      result = result.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    // 기술 스택 필터링
    if (selectedTechStack !== "all") {
      result = result.filter((problem) =>
        problem.techStacks.includes(selectedTechStack)
      );
    }

    // 정렬
    switch (sortType) {
      case "latest":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "difficulty-asc":
        result.sort((a, b) => {
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        break;
      case "difficulty-desc":
        result.sort((a, b) => {
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        });
        break;
    }

    setFilteredProblems(result);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [searchQuery, selectedDifficulty, selectedTechStack, sortType]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const currentProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
    setSelectedTechStack("all");
    setSortType("latest");
  };

  // 필터 적용 여부 확인
  const isFiltered =
    selectedDifficulty !== "all" ||
    selectedTechStack !== "all" ||
    searchQuery !== "";

  // 난이도 레이블 가져오기
  const getDifficultyLabel = (value: Difficulty | "all") => {
    if (value === "all") return "모든 난이도";
    return difficulties.find((d) => d.value === value)?.label || value;
  };

  // 기술 스택 레이블 가져오기
  const getTechStackLabel = (value: TechStack | "all") => {
    if (value === "all") return "모든 기술 스택";
    return techStacks.find((t) => t.value === value)?.label || value;
  };

  // 정렬 레이블 가져오기
  const getSortLabel = (value: string) => {
    return sortOptions.find((s) => s.value === value)?.label || value;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              코드 리뷰 문제
            </h1>
            <p className="text-muted-foreground">
              코드 리뷰 연습을 위한 문제 목록입니다.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="문제 검색..."
                  className="w-[200px] pl-8 md:w-[260px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <MobileFilters
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedTechStack={selectedTechStack}
              setSelectedTechStack={setSelectedTechStack}
              sortType={sortType}
              setSortType={setSortType}
            />
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="문제 검색..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedDifficulty === "all" ? "default" : "outline"}
            className="rounded-md cursor-pointer"
            onClick={() => setSelectedDifficulty("all")}
          >
            {getDifficultyLabel(selectedDifficulty)}
          </Badge>
          <Badge
            variant={selectedTechStack === "all" ? "default" : "outline"}
            className="rounded-md cursor-pointer"
            onClick={() => setSelectedTechStack("all")}
          >
            {getTechStackLabel(selectedTechStack)}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-md cursor-pointer"
            onClick={() =>
              setSortType(
                sortType === "latest"
                  ? "difficulty-asc"
                  : sortType === "difficulty-asc"
                    ? "difficulty-desc"
                    : "latest"
              )
            }
          >
            {getSortLabel(sortType)}
          </Badge>
          {isFiltered && (
            <Badge
              variant="outline"
              className="rounded-md cursor-pointer bg-red-50 hover:bg-red-100"
              onClick={resetFilters}
            >
              필터 초기화
            </Badge>
          )}
        </div>

        <Separator />

        {currentProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">
              검색 결과가 없습니다.
            </p>
            <Button variant="link" onClick={resetFilters} className="mt-2">
              필터 초기화
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}

        {filteredProblems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
