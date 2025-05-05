"use client";

import { useState } from "react";

const DIFFICULTIES = [
  { label: "전체", value: undefined },
  { label: "쉬움", value: "easy" },
  { label: "보통", value: "medium" },
  { label: "어려움", value: "hard" },
];

const TECH_STACKS = [
  { label: "전체", value: undefined },
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
  { label: "Node.js", value: "Node.js" },
  { label: "TypeScript", value: "TypeScript" },
  // ...필요한 기술스택 추가...
];

interface ProblemFiltersProps {
  onApply: (filters: { difficulty?: string; techStack?: string }) => void;
}

export default function ProblemFilters({ onApply }: ProblemFiltersProps) {
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [techStack, setTechStack] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center bg-white dark:bg-zinc-900 rounded-lg px-4 py-3 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
        <span className="font-semibold text-zinc-700 dark:text-zinc-200 mr-2">
          난이도
        </span>
        <div className="flex gap-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.label}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-medium transition
                ${
                  difficulty === d.value
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700"
                }
              `}
              onClick={() => setDifficulty(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
        <span className="font-semibold text-zinc-700 dark:text-zinc-200 mr-2">
          기술스택
        </span>
        <div className="flex gap-1 flex-wrap">
          {TECH_STACKS.map((t) => (
            <button
              key={t.label}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-medium transition
                ${
                  techStack === t.value
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-orange-50 dark:hover:bg-zinc-700"
                }
              `}
              onClick={() => setTechStack(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <button
        className="ml-auto mt-2 md:mt-0 px-4 py-1.5 rounded-md bg-blue-900 text-white font-semibold hover:bg-blue-800 transition"
        onClick={() => onApply({ difficulty, techStack })}
      >
        적용
      </button>
    </div>
  );
}
