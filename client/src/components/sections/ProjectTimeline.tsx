import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { civilEngineeringCategories } from "@db/schema";
import type { Project } from "@db/schema";

// カテゴリーごとの色定義
const categoryColors: Record<string, { bg: string; text: string }> = {
  [civilEngineeringCategories.SLOPE]: { bg: "bg-orange-100", text: "text-orange-800" },
  [civilEngineeringCategories.BRIDGE]: { bg: "bg-blue-100", text: "text-blue-800" },
  [civilEngineeringCategories.REPAIR]: { bg: "bg-purple-100", text: "text-purple-800" },
  [civilEngineeringCategories.ROAD]: { bg: "bg-green-100", text: "text-green-800" },
  [civilEngineeringCategories.RIVER]: { bg: "bg-cyan-100", text: "text-cyan-800" },
  [civilEngineeringCategories.TUNNEL]: { bg: "bg-gray-100", text: "text-gray-800" },
  [civilEngineeringCategories.GROUND]: { bg: "bg-yellow-100", text: "text-yellow-800" },
  [civilEngineeringCategories.DREDGING]: { bg: "bg-indigo-100", text: "text-indigo-800" },
  [civilEngineeringCategories.LANDSCAPE]: { bg: "bg-emerald-100", text: "text-emerald-800" },
  [civilEngineeringCategories.DISASTER]: { bg: "bg-red-100", text: "text-red-800" },
};

export default function ProjectTimeline() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array(5).fill(0).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  // プロジェクトを年ごとにグループ化
  const projectsByYear = projects?.reduce((acc, project) => {
    const year = new Date(project.completionDate).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>) ?? {};

  // 年を降順でソート
  const years = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section className="py-16 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">土木工事実績タイムライン</h2>
          <p className="text-muted-foreground">
            創業以来の主要な土木工事実績をご紹介します。<br />
            各プロジェクトの規模は予算規模を反映しています。
          </p>
        </div>

        <div className="space-y-16">
          {years.map((year) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="sticky top-20 bg-background/95 backdrop-blur z-10 py-4">
                  <h3 className="text-2xl font-bold">{year}年</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {projectsByYear[year].map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                      >
                        <Card className="overflow-hidden h-full">
                          <div className="relative">
                            <div
                              className="aspect-video bg-cover bg-center"
                              style={{ backgroundImage: `url(${project.imageUrl})` }}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge
                                className={`${
                                  categoryColors[project.subCategory ?? ""]?.bg ?? "bg-gray-100"
                                } ${
                                  categoryColors[project.subCategory ?? ""]?.text ?? "text-gray-800"
                                }`}
                              >
                                {project.subCategory}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2">{project.title}</CardTitle>
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
                            {project.technicalHighlights && (
                              <div className="mt-4 text-sm">
                                <strong className="text-primary">技術的特徴：</strong>
                                <p className="text-muted-foreground line-clamp-2">
                                  {project.technicalHighlights}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}