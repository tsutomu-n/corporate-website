import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { News } from "@db/schema";

export default function NewsSection() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news/recent"],
  });

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">お知らせ</h2>
            <p className="text-muted-foreground">
              企業情報やお知らせをご覧いただけます
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </CardHeader>
                  </Card>
                ))
            : news?.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <time className="text-sm text-muted-foreground w-24">
                        {format(new Date(item.date), "yyyy年MM月dd日", {
                          locale: ja,
                        })}
                      </time>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  {item.content && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.content}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
