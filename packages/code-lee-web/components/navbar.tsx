"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/providers/auth-provider"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/",
      label: "문제 목록",
    },
    {
      href: "/my-reviews",
      label: "내 리뷰",
      auth: true,
    },
    {
      href: "/my-problems",
      label: "내 문제",
      auth: true,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">코드리뷰</span>
        </Link>
        <nav className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex gap-6">
            {routes.map((route) => {
              // Skip auth-required routes if not logged in
              if (route.auth && !user) return null

              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">프로필</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-reviews">내 리뷰</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-problems">내 문제</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    logout()
                  }}
                >
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/login">로그인</Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Code2 className="h-6 w-6" />
                  <span className="font-bold">코드리뷰</span>
                </Link>
                {routes.map((route) => {
                  // Skip auth-required routes if not logged in
                  if (route.auth && !user) return null

                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`transition-colors hover:text-primary ${
                        pathname === route.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {route.label}
                    </Link>
                  )
                })}
                {!user && (
                  <>
                    <Link href="/login" className="text-primary">
                      로그인
                    </Link>
                    <Link href="/register" className="text-muted-foreground">
                      회원가입
                    </Link>
                  </>
                )}
                {user && (
                  <Button variant="ghost" className="justify-start px-2" onClick={() => logout()}>
                    로그아웃
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
