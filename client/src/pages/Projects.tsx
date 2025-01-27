import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Project } from "@db/schema";

const categories = [
  { id: "all", label: "すべて", icon: "🏗️" },
  { id: "civil", label: "土木工事", icon: "🛣️" },
  { id: "architecture", label: "建築工事", icon: "🏢" },
  { id: "environment", label: "環境事業", icon: "🌱" },
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

        {/* カテゴリフィルター */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-6 py-3 text-lg transition-all duration-300
                ${selectedCategory === category.id
                  ? "scale-105 shadow-lg"
                  : "hover:scale-105"
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
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
                <Card 
                  key={project.id} 
                  className="overflow-hidden group relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative">
                    <div
                      className="aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 shadow-md transition-transform duration-300 group-hover:scale-110"
                      >
                        {categories.find(c => c.id === project.category)?.icon}{" "}
                        {project.category}
                      </Badge>
                    </div>
                  </div>
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
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="default" className="bg-white text-black hover:bg-white/90">
                        詳細を見る
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}