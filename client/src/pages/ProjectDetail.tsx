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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BeforeAfterSlider from "@/components/ui/before-after-slider";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { motion } from "framer-motion";
import { Clock, Wrench, Target } from "lucide-react";
import type { Project } from "@db/schema";
import RelatedProjects from "@/components/sections/RelatedProjects";

// 仮のデータ構造（後でスキーマに追加）
const technicalInfo = {
  techniques: [
    "特殊土木工法による地盤改良",
    "環境配慮型コンクリートの使用",
    "IoTセンサーによる施工管理",
  ],
  certifications: ["ISO9001", "ISO14001"],
  equipment: ["大型クレーン", "地盤改良機", "バックホウ"],
};

const constructionProcess = [
  {
    phase: "準備工事",
    date: "2023-04",
    description: "現場調査、施工計画の立案",
  },
  {
    phase: "基礎工事",
    date: "2023-06",
    description: "地盤改良、基礎コンクリート打設",
  },
  {
    phase: "本体工事",
    date: "2023-08",
    description: "主要構造物の施工",
  },
  {
    phase: "仕上げ工事",
    date: "2023-10",
    description: "舗装工事、安全施設の設置",
  },
  {
    phase: "完成",
    date: "2023-12",
    description: "検査、引き渡し",
  },
];

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

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="technical">技術情報</TabsTrigger>
            <TabsTrigger value="process">施工プロセス</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>プロジェクト概要</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{project.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>技術情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    採用技術
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {technicalInfo.techniques.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    取得認証
                  </h3>
                  <div className="flex gap-2">
                    {technicalInfo.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">使用機材</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {technicalInfo.equipment.map((equip, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-muted/50"
                      >
                        {equip}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle>施工プロセス</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {constructionProcess.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4 relative before:absolute before:left-[17px] before:top-10 before:h-full before:w-[2px] before:bg-border last:before:hidden"
                    >
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="pb-8">
                        <div className="font-medium">
                          {step.phase}
                          <span className="text-sm text-muted-foreground ml-2">
                            {step.date}
                          </span>
                        </div>
                        <div className="text-muted-foreground mt-1">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 関連プロジェクト */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">関連プロジェクト</h2>
          <RelatedProjects
            currentProjectId={project.id}
            category={project.category}
          />
        </section>
      </div>
    </div>
  );
}