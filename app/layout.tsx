import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BarChart3 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tax-Insight | 个人税务与财务情报看板",
  description: "专业的个人税务情报平台，提供最新税务新闻和个税计算工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Tax-Insight</h1>
                    <p className="text-xs text-muted-foreground">
                      个人税务与财务情报看板
                    </p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </header>
            <main>{children}</main>
            <footer className="border-t border-border mt-16">
              <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                <p>© 2026 Tax-Insight. 数据仅供参考，请以官方为准。</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
