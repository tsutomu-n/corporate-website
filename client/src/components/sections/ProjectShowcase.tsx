import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";
import type { Project } from "@db/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectShowcase() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  if (isLoading) {
    return (
      <section className="section-container">
        <div className="space-y-8">
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] rounded-xl" />
            <Skeleton className="h-[400px] rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-100/40" />
      <div className="container relative">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              大規模プロジェクトの実績
            </h2>
            <p className="text-xl text-muted-foreground">
              確かな技術力と品質管理で完遂した代表的なプロジェクトをご紹介します
            </p>
          </div>
        </FadeIn>

        <FadeInStagger className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects?.slice(0, 2).map((project) => (
            <FadeIn key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-[400px] overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-6">
                      <span className="inline-block bg-primary/90 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-lg text-gray-200 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <Button
                      variant="outline-white"
                      size="lg"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>

        <FadeIn>
          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              asChild
            >
              <Link href="/projects" className="group">
                <span className="text-lg">すべての実績を見る</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}