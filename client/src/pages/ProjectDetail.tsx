import React from 'react';
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
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  CircleDot,
  AlertCircle,
  Calendar,
  Maximize,
  Award,
  Newspaper,
  Shield,
  Leaf,
  Wrench,
  HardHat,
  Truck,
  CheckSquare
} from "lucide-react";
import type { Project } from "@db/schema";
import RelatedProjects from "@/components/sections/RelatedProjects";

// 以下のコードは変更なし

// 施工プロセスの状態定義
type ProcessStatus = "completed" | "inProgress" | "upcoming";

interface ConstructionProcess {
  phase: string;
  date: string;
  description: string;
  details: string[];
  status: ProcessStatus;
  icon: keyof typeof processIcons;
}

// プロセスのアイコン定義
const processIcons = {
  planning: HardHat,
  preparation: Wrench,
  foundation: Truck,
  construction: Truck,
  completion: CheckSquare,
} as const;

// プロセスの状態に応じた色とアイコン
const statusConfig: Record<ProcessStatus, { color: string; Icon: any }> = {
  completed: { color: "text-green-500", Icon: CheckCircle2 },
  inProgress: { color: "text-blue-500", Icon: CircleDot },
  upcoming: { color: "text-gray-400", Icon: AlertCircle },
};

const constructionProcess: ConstructionProcess[] = [
  {
    phase: "計画立案",
    date: "2023-04",
    description: "現場調査、施工計画の立案",
    details: [
      "現地調査と環境アセスメントの実施",
      "地質調査と土壌分析",
      "施工計画書の作成と承認",
      "必要な許認可の取得"
    ],
    status: "completed",
    icon: "planning"
  },
  {
    phase: "準備工事",
    date: "2023-06",
    description: "仮設工事、安全対策の実施",
    details: [
      "仮設事務所の設置",
      "安全フェンスと警告標識の設置",
      "建設機械の搬入",
      "現場周辺の安全確保"
    ],
    status: "completed",
    icon: "preparation"
  },
  {
    phase: "基礎工事",
    date: "2023-08",
    description: "地盤改良、基礎コンクリート打設",
    details: [
      "掘削工事の実施",
      "地盤改良材の注入",
      "鉄筋組立て",
      "基礎コンクリートの打設"
    ],
    status: "inProgress",
    icon: "foundation"
  },
  {
    phase: "本体工事",
    date: "2023-10",
    description: "主要構造物の施工",
    details: [
      "主要構造物の建設",
      "配管・配線工事",
      "防水工事",
      "品質検査の実施"
    ],
    status: "upcoming",
    icon: "construction"
  },
  {
    phase: "完成",
    date: "2023-12",
    description: "検査、引き渡し",
    details: [
      "最終検査の実施",
      "必要書類の作成",
      "清掃と片付け",
      "引き渡し式の実施"
    ],
    status: "upcoming",
    icon: "completion"
  },
];

function formatCurrency(value: number | null): string {
  if (!value) return "非公開";
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

function formatArea(value: number | null): string {
  if (!value) return "非公開";
  return `${value.toLocaleString('ja-JP')}㎡`;
}

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="technical">技術情報</TabsTrigger>
            <TabsTrigger value="process">施工プロセス</TabsTrigger>
            <TabsTrigger value="achievements">実績・評価</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>プロジェクト概要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="whitespace-pre-wrap">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.startDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">工期</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(project.startDate), "yyyy年MM月", { locale: ja })} 〜{" "}
                          {format(new Date(project.completionDate), "yyyy年MM月", { locale: ja })}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.budget && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">予算規模</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(Number(project.budget))}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.area && (
                    <div className="flex items-start gap-3">
                      <Maximize className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">施工面積</div>
                        <div className="text-sm text-muted-foreground">
                          {formatArea(Number(project.area))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {(project.environmentalMeasures || project.safetyMeasures) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    {project.environmentalMeasures && (
                      <div className="space-y-3">
                        <h3 className="flex items-center gap-2 font-medium">
                          <Leaf className="h-5 w-5 text-primary" />
                          環境配慮
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {project.environmentalMeasures}
                        </p>
                      </div>
                    )}

                    {project.safetyMeasures && (
                      <div className="space-y-3">
                        <h3 className="flex items-center gap-2 font-medium">
                          <Shield className="h-5 w-5 text-primary" />
                          安全対策
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {project.safetyMeasures}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>技術情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {project.technicalHighlights && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      技術的特徴
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {project.technicalHighlights}
                    </div>
                  </div>
                )}

                {project.challengesSolutions && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      課題と解決策
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {project.challengesSolutions}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle>施工プロセス</CardTitle>
                <CardDescription>
                  プロジェクトの進行状況と各フェーズの詳細をご確認いただけます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {constructionProcess.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* 接続線 */}
                      {index < constructionProcess.length - 1 && (
                        <div className="absolute left-[17px] top-10 h-full w-[2px] bg-border" />
                      )}

                      <div className="flex gap-4">
                        {/* アイコンと状態表示 */}
                        <div className="relative">
                          <div className={`
                            h-9 w-9 rounded-full 
                            ${step.status === 'completed' ? 'bg-primary/10' : 'bg-muted'}
                            flex items-center justify-center shrink-0
                          `}>
                            {React.createElement(processIcons[step.icon], {
                              className: `h-5 w-5 ${step.status === 'completed' ? 'text-primary' : 'text-muted-foreground'}`
                            })}
                          </div>
                          {/* 状態インジケーター */}
                          <div className={`
                            absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-white
                            flex items-center justify-center
                            border-2 border-background
                          `}>
                            {React.createElement(statusConfig[step.status].Icon, {
                              className: `h-3 w-3 ${statusConfig[step.status].color}`
                            })}
                          </div>
                        </div>

                        {/* コンテンツ */}
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-lg">
                              {step.phase}
                            </div>
                            <Badge variant="outline">
                              {step.date}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {step.description}
                          </p>

                          {/* 詳細情報（アコーディオン） */}
                          <AnimatePresence>
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-muted/50 rounded-lg p-4"
                            >
                              <ul className="space-y-2">
                                {step.details.map((detail, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>実績・評価</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {project.awards && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      受賞歴
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {project.awards}
                    </div>
                  </div>
                )}

                {project.mediaLinks && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      メディア掲載
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {project.mediaLinks}
                    </div>
                  </div>
                )}
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