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
            backgroundImage: "url('https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?q=80&w=2069')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            確かな技術と実績で、<br />
            未来のインフラを創造する
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed">
            創業50年の信頼と実績。<br />
            確かな品質と最新技術で、<br />
            安全で快適な社会インフラの構築に貢献します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" asChild>
              <Link href="/contact">お問い合わせ</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10 text-lg px-8" 
              asChild
            >
              <Link href="/projects">施工実績を見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}