import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Project } from "@db/schema";

interface RelatedProjectsProps {
  currentProjectId: number;
  category: string;
}

export default function RelatedProjects({ currentProjectId, category }: RelatedProjectsProps) {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", category],
  });

  const relatedProjects = projects
    ?.filter((p) => p.id !== currentProjectId && p.category === category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
      </div>
    );
  }

  if (!relatedProjects?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedProjects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
            <div className="relative">
              <div
                className="aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
                {project.location} ・{" "}
                {format(new Date(project.completionDate), "yyyy年MM月完工", {
                  locale: ja,
                })}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
