import { NewsItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(news.date)}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {news.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {news.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
