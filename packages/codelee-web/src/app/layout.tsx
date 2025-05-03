import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import QueryClientProviderWrapper from "@/providers/query-client-provider";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeLee - 코드 리뷰 플랫폼",
  description: "개발자를 위한 코드 리뷰 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
              {children}
            </main>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
