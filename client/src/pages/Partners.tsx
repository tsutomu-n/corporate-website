import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Handshake, Shield, Users, Target } from "lucide-react";

const benefits = [
  {
    icon: Handshake,
    title: "長期的なパートナーシップ",
    description:
      "単なる取引先ではなく、共に成長するパートナーとして、長期的な関係構築を目指します。",
  },
  {
    icon: Shield,
    title: "安定した発注",
    description:
      "豊富な工事実績と強固な経営基盤により、安定した工事発注を実現します。",
  },
  {
    icon: Users,
    title: "充実したサポート体制",
    description:
      "技術支援や安全管理など、各種サポート体制を整備し、協力会社様の業務をバックアップします。",
  },
  {
    icon: Target,
    title: "成長機会の提供",
    description:
      "技術研修や資格取得支援など、協力会社様の成長をサポートする機会を提供します。",
  },
];

export default function Partners() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">協力会社募集</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            山田建設は、共に成長していける協力会社様を募集しています。<br />
            確かな技術力と品質管理能力を持つ企業様からのご応募をお待ちしています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>募集要項</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y">
              <div className="py-4">
                <dt className="font-medium mb-2">募集職種</dt>
                <dd className="text-muted-foreground">
                  土木工事、建築工事、設備工事など
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-medium mb-2">応募資格</dt>
                <dd className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>建設業の許可を有していること</li>
                    <li>安定した経営基盤を有していること</li>
                    <li>品質管理体制が整備されていること</li>
                    <li>必要な資格を有する技術者が在籍していること</li>
                  </ul>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-medium mb-2">選考プロセス</dt>
                <dd className="text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>お問い合わせフォームよりご連絡</li>
                    <li>資料のご提出</li>
                    <li>面談</li>
                    <li>現場視察（必要に応じて）</li>
                    <li>契約締結</li>
                  </ol>
                </dd>
              </div>
            </dl>

            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">お問い合わせ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
