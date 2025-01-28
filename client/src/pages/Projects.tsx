import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProjectFilters } from "@/components/filters/ProjectFilters";
import type { Project, CategoryConfig } from "@/types/project";
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { civilEngineeringCategories } from "@/types/project";
import { ProjectCardSkeleton, ProjectGridSkeleton } from "@/components/ui/project-card-skeleton";

const categoryConfig: CategoryConfig = {
  [civilEngineeringCategories.SLOPE]: { icon: "⛰️", bgFrom: "from-orange-600", bgTo: "to-orange-500" },
  [civilEngineeringCategories.BRIDGE]: { icon: "🌉", bgFrom: "from-blue-600", bgTo: "to-blue-500" },
  [civilEngineeringCategories.REPAIR]: { icon: "🔧", bgFrom: "from-purple-600", bgTo: "to-purple-500" },
  [civilEngineeringCategories.ROAD]: { icon: "🛣️", bgFrom: "from-green-600", bgTo: "to-green-500" },
  [civilEngineeringCategories.RIVER]: { icon: "🌊", bgFrom: "from-cyan-600", bgTo: "to-cyan-500" },
  [civilEngineeringCategories.TUNNEL]: { icon: "🚇", bgFrom: "from-gray-600", bgTo: "to-gray-500" },
  [civilEngineeringCategories.GROUND]: { icon: "🏗️", bgFrom: "from-yellow-600", bgTo: "to-yellow-500" },
  [civilEngineeringCategories.DREDGING]: { icon: "⚓", bgFrom: "from-indigo-600", bgTo: "to-indigo-500" },
  [civilEngineeringCategories.LANDSCAPE]: { icon: "🌳", bgFrom: "from-emerald-600", bgTo: "to-emerald-500" },
  [civilEngineeringCategories.DISASTER]: { icon: "🚨", bgFrom: "from-red-600", bgTo: "to-red-500" },
  [civilEngineeringCategories.EROSION]: { icon: "🗻", bgFrom: "from-amber-600", bgTo: "to-amber-500" },
  [civilEngineeringCategories.AGRICULTURE]: { icon: "🌾", bgFrom: "from-lime-600", bgTo: "to-lime-500" },
};

export default function Projects() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    region: "",
    year: null as number | null,
  });

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", filters],
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      region: "",
      year: null,
    });
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <ProjectGridSkeleton />
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

        <ProjectFilters
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <FadeIn key={project.id}>
              <Card
                className="overflow-hidden group relative cursor-pointer transition-all duration-600 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative">
                  <div
                    className="aspect-video bg-cover bg-center transition-transform duration-600 group-hover:scale-120 group-hover:blur-[2px]"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent transition-opacity duration-600 group-hover:opacity-90" />
                  {project.subCategory && categoryConfig[project.subCategory] ? (
                    <div className={`
                      absolute left-0 top-0 h-full w-24
                      bg-gradient-to-br 
                      ${categoryConfig[project.subCategory].bgFrom} 
                      ${categoryConfig[project.subCategory].bgTo}
                      flex flex-col items-center justify-start
                      p-4 text-white shadow-lg
                      transition-all duration-300 group-hover:w-32
                    `}>
                      <span className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                        {categoryConfig[project.subCategory].icon}
                      </span>
                      <div className="writing-vertical-rl text-2xl font-bold tracking-wider">
                        {project.subCategory}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {project.category}
                      </Badge>
                    </div>
                  )}
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
            </FadeIn>
          ))}
        </FadeInStagger>

        {projects?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              該当するプロジェクトが見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}