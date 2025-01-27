import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Project } from "@db/schema";

export default function RecentProjects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/recent"],
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">最新の施工実績</h2>
            <p className="text-muted-foreground">
              確かな技術力と品質管理で実現した代表的なプロジェクトをご紹介します
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">すべての実績を見る</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative">
                      <Skeleton className="aspect-[4/3] w-full" />
                      <div className="absolute top-4 left-4">
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
            : projects?.map((project) => (
                <Card key={project.id} className="overflow-hidden group">
                  <div className="relative">
                    <div
                      className="aspect-[4/3] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      {project.location} ・{" "}
                      {format(new Date(project.completionDate), "yyyy年MM月完工", {
                        locale: ja,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}