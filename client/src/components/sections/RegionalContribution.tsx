import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Project } from "@db/schema";
import { FadeIn } from "@/components/ui/fade-in";

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
    <section className="py-24 bg-gray-50">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">地域インフラへの貢献</h2>
            <p className="text-muted-foreground">
              全国各地のインフラ整備を通じて、<br />
              地域社会の発展と安全に貢献しています
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 日本地図表示エリア */}
          <div className="relative aspect-square bg-white rounded-xl shadow-lg p-8">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              ※ 実装時に日本地図SVGを配置
            </div>
          </div>

          {/* 地域別実績リスト */}
          <div className="space-y-8">
            {regions.map((region) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <span className="text-2xl font-bold text-primary">
                    {region.projectCount}
                    <span className="text-sm ml-1">件</span>
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  {region.majorProjects.map((project) => (
                    <li key={project} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                      {project}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">すべての施工実績を見る<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
