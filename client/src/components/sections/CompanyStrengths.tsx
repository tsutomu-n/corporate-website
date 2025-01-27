import { Shield, Users, Building2, Leaf } from "lucide-react";

const strengths = [
  {
    icon: Shield,
    title: "確かな技術力",
    description:
      "創業50年の実績と、最新技術の導入により、高品質な施工を実現します。技術士、一級土木施工管理技士など、資格を持つ専門家が多数在籍しています。",
  },
  {
    icon: Users,
    title: "人材育成",
    description:
      "社員一人一人の成長をサポートする充実した研修制度を整備。若手技術者の育成に力を入れ、技術の継承と革新を両立します。",
  },
  {
    icon: Building2,
    title: "施工実績",
    description:
      "道路、橋梁、トンネルなど、多様な工事実績を持ち、官公庁からの信頼も厚い実績があります。地域に根ざした施工で、確かな評価を得ています。",
  },
  {
    icon: Leaf,
    title: "環境への配慮",
    description:
      "環境負荷の低減を重視し、最新の環境技術を積極的に導入。持続可能な社会の実現に向けて、環境に配慮した施工を心がけています。",
  },
];

export default function CompanyStrengths() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">企業の強み</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            山田建設は、長年培った技術力と信頼を基盤に、
            <br />
            社会インフラの発展に貢献し続けています
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength) => (
            <div key={strength.title} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <strength.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{strength.title}</h3>
              <p className="text-sm text-muted-foreground">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
