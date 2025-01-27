import { Building, MapPin, History, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const companyInfo = {
  overview: [
    { label: "社名", value: "山田建設株式会社" },
    { label: "設立", value: "1974年4月" },
    { label: "資本金", value: "1億円" },
    { label: "代表者", value: "山田 太郎" },
    { label: "従業員数", value: "250名（2024年1月現在）" },
    { label: "事業内容", value: "土木工事、建築工事、環境事業" },
  ],
  history: [
    { year: "1974年", event: "山田建設株式会社設立" },
    { year: "1980年", event: "東京支店開設" },
    { year: "1995年", event: "ISO9001認証取得" },
    { year: "2000年", event: "環境事業部設立" },
    { year: "2010年", event: "本社ビル移転" },
    { year: "2020年", event: "創業50周年" },
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

          {/* 沿革 */}
          <section id="history">
            <h2 className="text-3xl font-bold mb-6 text-center">沿革</h2>
            <div className="max-w-3xl mx-auto">
              {companyInfo.history.map(({ year, event }, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-8 relative before:absolute before:left-[17px] before:top-8 before:h-full before:w-[2px] before:bg-border last:before:hidden"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{year}</div>
                    <div className="text-muted-foreground">{event}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
