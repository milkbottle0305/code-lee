import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, MessageSquare, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-orange-500 bg-clip-text text-transparent">
          코드 리뷰로 더 나은 개발자가 되세요
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          CodeLee는 개발자들이 코드 조각에 대해 리뷰를 남기고, PR처럼 커밋
          기반으로 diff를 제공하여 코드 개선을 돕는 웹 애플리케이션입니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-blue-900 hover:bg-blue-800 text-white"
            asChild
          >
            <Link href="/problems">문제 둘러보기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">주요 기능</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-900 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">GitHub 스타일 Diff 뷰</h3>
            <p className="text-gray-600 dark:text-gray-300">
              코드 변경사항을 GitHub 스타일의 diff 뷰로 확인하고, 특정 라인에
              코멘트를 남길 수 있습니다.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-900 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">코드 리뷰 및 토론</h3>
            <p className="text-gray-600 dark:text-gray-300">
              코드 라인별로 리뷰를 남기고, 다른 개발자들과 토론하며 더 나은
              코드를 작성할 수 있습니다.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-blue-900 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">리뷰 평가 시스템</h3>
            <p className="text-gray-600 dark:text-gray-300">
              유용한 리뷰에 평가를 남기고, 우수한 리뷰어로 인정받을 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="link"
            size="lg"
            className="text-blue-900 dark:text-orange-400"
            asChild
          >
            <Link href="/problems" className="flex items-center">
              모든 기능 살펴보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
