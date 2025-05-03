"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 로그인 상태를 localStorage의 토큰으로 판단
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // 인증 체크 완료 여부

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setIsAuthChecked(true); // 인증 체크 완료
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-orange-500 bg-clip-text text-transparent">
            CodeLee
          </span>
        </Link>

        {/* Desktop Navigation */}
        {isAuthChecked && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/problems"
              className={`text-sm font-medium ${
                pathname === "/problems"
                  ? "text-blue-900 dark:text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              문제 목록
            </Link>
            {isLoggedIn && (
              <Link
                href="/my-reviews"
                className={`text-sm font-medium ${
                  pathname === "/my-reviews"
                    ? "text-blue-900 dark:text-orange-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                내 리뷰
              </Link>
            )}
            <div className="flex items-center gap-2">
              <ModeToggle />
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-900 hover:bg-blue-800 text-white"
                    asChild
                  >
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isAuthChecked && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/problems"
              className={`text-sm font-medium ${
                pathname === "/problems"
                  ? "text-blue-900 dark:text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              문제 목록
            </Link>
            {isLoggedIn && (
              <Link
                href="/my-reviews"
                className={`text-sm font-medium ${
                  pathname === "/my-reviews"
                    ? "text-blue-900 dark:text-orange-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                내 리뷰
              </Link>
            )}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                로그아웃
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/login">로그인</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/signup">회원가입</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
