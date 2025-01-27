import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@db/schema";

const categories = [
  { id: "all", label: "すべて" },
  { id: "civil", label: "土木工事" },
  { id: "architecture", label: "建築工事" },
  { id: "environment", label: "環境事業" },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", selectedCategory],
  });

  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">施工実績</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            山田建設の技術力と品質管理の証。<br />
            これまでに手がけた主要なプロジェクトをご紹介します。
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                  </Card>
                ))
            : projects?.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      <p>{project.location}</p>
                      <p>{new Date(project.completionDate).getFullYear()}年完工</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
