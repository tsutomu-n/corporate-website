import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">山田建設株式会社</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>〒100-0001</p>
              <p>東京都千代田区1-1-1</p>
              <p>TEL: 03-1234-5678</p>
              <p>FAX: 03-1234-5679</p>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">事業案内</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects?category=civil">
                  <a className="text-muted-foreground hover:text-foreground">土木工事</a>
                </Link>
              </li>
              <li>
                <Link href="/projects?category=architecture">
                  <a className="text-muted-foreground hover:text-foreground">建築工事</a>
                </Link>
              </li>
              <li>
                <Link href="/projects?category=environment">
                  <a className="text-muted-foreground hover:text-foreground">環境事業</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">企業情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/company#about">
                  <a className="text-muted-foreground hover:text-foreground">会社概要</a>
                </Link>
              </li>
              <li>
                <Link href="/company#philosophy">
                  <a className="text-muted-foreground hover:text-foreground">企業理念</a>
                </Link>
              </li>
              <li>
                <Link href="/company#history">
                  <a className="text-muted-foreground hover:text-foreground">沿革</a>
                </Link>
              </li>
              <li>
                <Link href="/company#access">
                  <a className="text-muted-foreground hover:text-foreground">アクセス</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">採用・協力会社</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/careers">
                  <a className="text-muted-foreground hover:text-foreground">採用情報</a>
                </Link>
              </li>
              <li>
                <Link href="/partners">
                  <a className="text-muted-foreground hover:text-foreground">協力会社募集</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground">お問い合わせ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy">
                <a className="hover:text-foreground">プライバシーポリシー</a>
              </Link>
              <Link href="/terms">
                <a className="hover:text-foreground">利用規約</a>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 山田建設株式会社 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
