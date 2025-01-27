import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { civilEngineeringCategories } from "@db/schema";
import type { Project } from "@db/schema";
import ProjectTimeline from "@/components/sections/ProjectTimeline";

const categories = [
  { id: "all", label: "すべて", icon: "🏗️" },
  { id: civilEngineeringCategories.SLOPE, label: "法面工事", icon: "⛰️" },
  { id: civilEngineeringCategories.BRIDGE, label: "橋梁工事", icon: "🌉" },
  { id: civilEngineeringCategories.REPAIR, label: "補修工事", icon: "🔧" },
  { id: civilEngineeringCategories.ROAD, label: "道路工事", icon: "🛣️" },
  { id: civilEngineeringCategories.RIVER, label: "河川工事", icon: "🌊" },
  { id: civilEngineeringCategories.TUNNEL, label: "トンネル工事", icon: "🚇" },
  { id: civilEngineeringCategories.GROUND, label: "地盤改良工事", icon: "🏗️" },
  { id: civilEngineeringCategories.DREDGING, label: "しゅんせつ工事", icon: "⚓" },
  { id: civilEngineeringCategories.LANDSCAPE, label: "造園工事", icon: "🌳" },
  { id: civilEngineeringCategories.DISASTER, label: "災害復旧工事", icon: "🚨" },
];

const categoryConfig = {
  [civilEngineeringCategories.SLOPE]: { icon: "⛰️", bg: "from-teal-500" },
  [civilEngineeringCategories.BRIDGE]: { icon: "🌉", bg: "from-blue-500" },
  [civilEngineeringCategories.REPAIR]: { icon: "🔧", bg: "from-yellow-500" },
  [civilEngineeringCategories.ROAD]: { icon: "🛣️", bg: "from-orange-500" },
  [civilEngineeringCategories.RIVER]: { icon: "🌊", bg: "from-cyan-500" },
  [civilEngineeringCategories.TUNNEL]: { icon: "🚇", bg: "from-purple-500" },
  [civilEngineeringCategories.GROUND]: { icon: "🏗️", bg: "from-pink-500" },
  [civilEngineeringCategories.DREDGING]: { icon: "⚓", bg: "from-indigo-500" },
  [civilEngineeringCategories.LANDSCAPE]: { icon: "🌳", bg: "from-green-500" },
  [civilEngineeringCategories.DISASTER]: { icon: "🚨", bg: "from-red-500" },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("timeline");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", selectedCategory],
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">施工実績</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            山田建設の技術力と品質管理の証。<br />
            これまでに手がけた主要な土木工事プロジェクトをご紹介します。
          </p>
        </div>

        {/* 表示切り替えボタン */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={viewMode === "timeline" ? "default" : "outline"}
            onClick={() => setViewMode("timeline")}
            className="gap-2"
          >
            <span>📅</span> タイムライン表示
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <span>📱</span> グリッド表示
          </Button>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-6 py-3 transition-all duration-300
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

        {viewMode === "timeline" ? (
          <ProjectTimeline />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group relative cursor-pointer transition-all duration-600 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative">
                  <div
                    className="aspect-video bg-cover bg-center transition-transform duration-600 group-hover:scale-120 group-hover:blur-[2px]"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent transition-opacity duration-600 group-hover:opacity-90" />
                  {/* サイドリボン */}
                  <div className={`
                    absolute left-0 top-0 h-full w-16
                    bg-gradient-to-r ${categoryConfig[project.subCategory ?? ""]?.bg ?? "from-gray-600"}
                    flex flex-col items-center justify-start
                    p-4 text-white
                  `}>
                    <span className="text-2xl mb-2">
                      {categoryConfig[project.subCategory ?? ""]?.icon}
                    </span>
                    <div className="writing-vertical-rl text-lg font-bold tracking-wider">
                      {project.subCategory}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <p>{project.location}</p>
                    <p>{new Date(project.completionDate).getFullYear()}年完工</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-radial from-black/80 via-black/70 to-black/90 opacity-0 group-hover:opacity-100 transition-all duration-600 flex items-center justify-center">
                  <Link href={`/projects/${project.id}`}>
                    <Button
                      variant="default"
                      size="lg"
                      className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white transform transition-all duration-600 group-hover:scale-120 px-12 py-8 text-xl font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] active:scale-95 border-2 border-white/20"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        詳細を見る
                        <ArrowRight className="h-6 w-6 transition-transform duration-600 group-hover:translate-x-3" />
                      </span>
                      <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}