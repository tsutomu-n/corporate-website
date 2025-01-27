import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            信頼と技術で、<br />
            未来のインフラを創造する
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            創業50年の実績と信頼。<br />
            最新技術と確かな品質で、<br />
            社会インフラの発展に貢献します。
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">お問い合わせ</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white" asChild>
              <Link href="/projects">施工実績を見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
