import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Project } from "@db/schema";
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";

// 地域ごとの実績データ型定義
type RegionData = {
  id: string;
  name: string;
  projectCount: number;
  majorProjects: string[];
};

const regions: RegionData[] = [
  {
    id: "kanto",
    name: "関東地方",
    projectCount: 150,
    majorProjects: ["首都高速道路補修工事", "東京外環自動車道建設"],
  },
  {
    id: "chubu",
    name: "中部地方",
    projectCount: 80,
    majorProjects: ["中央自動車道補強工事", "新東名高速道路建設"],
  },
  // 他の地域データ...
];

export default function RegionalContribution() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects/by-region"],
  });

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 to-white" />
      <div className="container relative">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              地域インフラへの貢献
            </h2>
            <p className="text-lg text-muted-foreground">
              全国各地のインフラ整備を通じて、<br className="hidden sm:inline" />
              地域社会の発展と安全に貢献しています
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* 日本地図表示エリア */}
          <div className="relative aspect-square bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              ※ 実装時に日本地図SVGを配置
            </div>
          </div>

          {/* 地域別実績リスト */}
          <FadeInStagger className="space-y-6">
            {regions.map((region) => (
              <FadeIn key={region.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50/80 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{region.name}</h3>
                    <span className="text-2xl font-bold text-primary">
                      {region.projectCount}
                      <span className="text-sm ml-1">件</span>
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {region.majorProjects.map((project) => (
                      <li key={project} className="flex items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>

        <FadeIn>
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects" className="group">
                すべての施工実績を見る
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}