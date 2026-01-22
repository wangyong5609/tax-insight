import { TaxCalculator } from "@/components/TaxCalculator";
import { NewsCard } from "@/components/NewsCard";
import { mockNews } from "@/data/mock-news";
import { Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 个税计算器区域 */}
      <section className="mb-12">
        <TaxCalculator />
      </section>

      {/* 税务新闻区域 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">最新税务资讯</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </div>
  );
}
