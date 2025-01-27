import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "wouter";
import { GraduationCap, Briefcase, Target, Heart } from "lucide-react";

const positions = [
  {
    title: "土木施工管理技術者",
    type: "正社員",
    location: "東京都",
    requirements: [
      "土木施工管理技士（1級または2級）",
      "施工管理経験3年以上",
      "要普通自動車免許",
    ],
  },
  {
    title: "建築施工管理技術者",
    type: "正社員",
    location: "東京都",
    requirements: [
      "建築施工管理技士（1級または2級）",
      "施工管理経験3年以上",
      "要普通自動車免許",
    ],
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "充実した研修制度",
    description: "入社後の研修プログラムから、資格取得支援まで、成長をサポート",
  },
  {
    icon: Briefcase,
    title: "安定した労働環境",
    description: "完全週休2日制、有給休暇、各種社会保険完備",
  },
  {
    icon: Target,
    title: "キャリアパス",
    description: "明確なキャリアパスと、実力に応じた昇進・昇給制度",
  },
  {
    icon: Heart,
    title: "福利厚生",
    description: "社員寮、財形貯蓄、従業員持株会、各種手当など",
  },
];

export default function Careers() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">採用情報</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            山田建設は、未来のインフラを支える技術者を募集しています。<br />
            充実した研修制度と働きやすい環境で、あなたの成長をサポートします。
          </p>
        </div>

        <div className="space-y-16">
          {/* 募集職種 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">募集職種</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {positions.map((position) => (
                <Card key={position.title}>
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                    <CardDescription>
                      {position.type} ・ {position.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">応募要件</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {position.requirements.map((req) => (
                            <li key={req}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <Button asChild>
                        <Link href="/contact">応募する</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 福利厚生 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">福利厚生</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 募集要項 */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>募集要項</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y">
                  <div className="py-4">
                    <dt className="font-medium mb-2">給与</dt>
                    <dd className="text-muted-foreground">
                      月給25万円〜45万円（経験・能力による）
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="font-medium mb-2">勤務時間</dt>
                    <dd className="text-muted-foreground">
                      8:00〜17:00（実働8時間）
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="font-medium mb-2">休日・休暇</dt>
                    <dd className="text-muted-foreground">
                      完全週休2日制（土日）、祝日、年末年始、夏季休暇、
                      有給休暇、慶弔休暇
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="font-medium mb-2">福利厚生</dt>
                    <dd className="text-muted-foreground">
                      各種社会保険完備、退職金制度、財形貯蓄、従業員持株会、
                      社員寮、資格取得支援、各種手当（通勤、住宅、家族など）
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
