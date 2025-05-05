"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ProblemFilters from "@/components/problem-filters";

const ProblemsListSection = dynamic(() => import("./page.client"), {
  ssr: false,
});

export default function ProblemsPage() {
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [techStack, setTechStack] = useState<string | undefined>(undefined);

  const handleApplyFilters = (filters: {
    difficulty?: string;
    techStack?: string;
  }) => {
    setDifficulty(filters.difficulty);
    setTechStack(filters.techStack);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">문제 목록</h1>
        <ProblemFilters onApply={handleApplyFilters} />
      </div>
      {/* 문제 목록 및 페이지네이션만 클라이언트 컴포넌트로 분리 */}
      <ProblemsListSection difficulty={difficulty} techStack={techStack} />
    </div>
  );
}
