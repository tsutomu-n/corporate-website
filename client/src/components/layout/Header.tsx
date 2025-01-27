import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "施工実績", href: "/projects" },
  { label: "会社情報", href: "/company" },
  { label: "協力会社募集", href: "/partners" },
  { label: "採用情報", href: "/careers" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">山田建設株式会社</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-between">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`text-sm transition-colors hover:text-foreground/80 ${
                    location === item.href
                      ? "text-foreground font-medium"
                      : "text-foreground/60"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild>
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>山田建設株式会社</SheetTitle>
            </SheetHeader>
            <nav className="mt-8">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`block py-2 text-lg ${
                        location === item.href
                          ? "text-foreground font-medium"
                          : "text-foreground/60"
                      }`}
                      
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}