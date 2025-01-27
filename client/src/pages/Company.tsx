import { Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CompanyHistory from "@/components/sections/CompanyHistory";

const companyInfo = {
  overview: [
    { label: "社名", value: "山田建設株式会社" },
    { label: "設立", value: "1974年4月" },
    { label: "資本金", value: "1億円" },
    { label: "代表者", value: "山田 太郎" },
    { label: "従業員数", value: "250名（2024年1月現在）" },
    { label: "事業内容", value: "土木工事、建築工事、環境事業" },
  ],
};

export default function Company() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">会社情報</h1>
          <p className="text-muted-foreground">
            創業以来、確かな技術と信頼を積み重ね、<br />
            社会インフラの発展に貢献してまいりました。
          </p>
        </div>

        <div className="space-y-16">
          {/* 企業理念 */}
          <section id="philosophy" className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">企業理念</h2>
            <p className="text-xl mb-4">「信頼と技術で、未来を創造する」</p>
            <p className="text-muted-foreground">
              私たちは、高い技術力と品質管理体制を基盤に、
              安全で快適な社会インフラの構築に取り組んでいます。
              地域社会との共生を図りながら、
              持続可能な未来の創造に貢献することを使命としています。
            </p>
          </section>

          {/* 会社概要 */}
          <section id="about">
            <h2 className="text-3xl font-bold mb-6 text-center">会社概要</h2>
            <Card>
              <CardContent className="pt-6">
                <dl className="divide-y">
                  {companyInfo.overview.map(({ label, value }) => (
                    <div
                      key={label}
                      className="grid grid-cols-1 md:grid-cols-4 py-4"
                    >
                      <dt className="font-medium text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="md:col-span-3">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </section>

          {/* 沿革 - 新しいコンポーネントを使用 */}
          <CompanyHistory />

          {/* アクセス */}
          <section id="access">
            <h2 className="text-3xl font-bold mb-6 text-center">アクセス</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">本社</h3>
                    <address className="not-italic text-muted-foreground">
                      〒100-0001<br />
                      東京都千代田区1-1-1<br />
                      TEL: 03-1234-5678<br />
                      FAX: 03-1234-5679
                    </address>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        東京メトロ丸ノ内線「東京駅」より徒歩5分
                      </p>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg">
                    {/* Google Maps would go here */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}