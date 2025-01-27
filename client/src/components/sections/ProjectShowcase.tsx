import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";
import type { Project } from "@db/schema";

export default function ProjectShowcase() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">大規模プロジェクトの実績</h2>
            <p className="text-muted-foreground">
              確かな技術力と品質管理で完遂した代表的なプロジェクトをご紹介します
            </p>
          </div>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects?.slice(0, 2).map((project, index) => (
            <FadeIn key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-[400px] overflow-hidden rounded-xl"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-4">
                      <span className="inline-block bg-primary px-3 py-1 text-sm font-medium rounded-full mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white/10"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>

        <FadeIn className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">すべての実績を見る</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
