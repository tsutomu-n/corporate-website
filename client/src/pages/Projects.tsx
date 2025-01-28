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
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { civilEngineeringCategories } from "@/types/project";
import { ProjectCardSkeleton, ProjectGridSkeleton } from "@/components/ui/project-card-skeleton";

interface PaginatedResponse {
  projects: Project[];
  pagination: {
    total: number;
    pages: number;
    current: number;
  };
}

const ITEMS_PER_PAGE = 9;

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

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery<PaginatedResponse>({
    queryKey: ["/api/projects", { ...filters, page: currentPage, limit: ITEMS_PER_PAGE }],
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      region: "",
      year: null,
    });
    setCurrentPage(1);
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

  const projects = data?.projects ?? [];
  const totalPages = data?.pagination.pages ?? 1;

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
          onChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          onReset={resetFilters}
        />

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project) => (
            <FadeIn key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <Card className="overflow-hidden group relative cursor-pointer transition-all duration-600 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative">
                    <div
                      className="aspect-video bg-cover bg-center transition-transform duration-600 group-hover:scale-110 group-hover:blur-[2px]"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent transition-opacity duration-600 group-hover:opacity-90" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {project.category}
                      </Badge>
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
                </Card>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="touch-target"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className="touch-target"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="touch-target"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {projects.length === 0 && (
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