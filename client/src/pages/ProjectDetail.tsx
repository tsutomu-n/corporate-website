import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import BeforeAfterSlider from "@/components/ui/before-after-slider";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Project } from "@db/schema";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container max-w-4xl">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!project) {
    return <div>プロジェクトが見つかりませんでした。</div>;
  }

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge variant="secondary">{project.category}</Badge>
            <span>{project.location}</span>
            <span>
              {format(new Date(project.completionDate), "yyyy年MM月完工", {
                locale: ja,
              })}
            </span>
          </div>
        </div>

        {project.beforeImageUrl && project.afterImageUrl && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>施工前後の比較</CardTitle>
              <CardDescription>
                スライダーを左右に動かして施工前後の状態を比較できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BeforeAfterSlider
                beforeImage={project.beforeImageUrl}
                afterImage={project.afterImageUrl}
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>プロジェクト詳細</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{project.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}