import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { X } from "lucide-react";
import { civilEngineeringCategories } from "@/types/project";

// 工事カテゴリーの定義
const CATEGORIES = Object.entries(civilEngineeringCategories).map(([id, name]) => ({
  id,
  name,
}));

// 地域の定義
const REGIONS = [
  { id: "shimonita", name: "下仁田町" },
  { id: "nanmoku", name: "南牧村" },
];

// 年度の生成（2015年から現在まで）
const YEARS = Array.from(
  { length: new Date().getFullYear() - 2014 },
  (_, i) => 2015 + i
);

export interface ProjectFiltersProps {
  filters: {
    search: string;
    category: string;
    region: string;
    year: number | null;
  };
  onChange: (filters: ProjectFiltersProps["filters"]) => void;
  onReset: () => void;
}

export function ProjectFilters({
  filters,
  onChange,
  onReset,
}: ProjectFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  // インクリメンタルサーチの実装
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // 300msのデバウンスを実装
    const timeoutId = setTimeout(() => {
      onChange({ ...filters, search: value });
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border mb-6">
      <div className="space-y-4">
        {/* 検索フィールド */}
        <div className="relative">
          <Input
            type="search"
            placeholder="プロジェクト名で検索..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* カテゴリーフィルター */}
          <Select
            value={filters.category}
            onValueChange={(value) =>
              onChange({ ...filters, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="工事カテゴリー" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのカテゴリー</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 地域フィルター */}
          <Select
            value={filters.region}
            onValueChange={(value) =>
              onChange({ ...filters, region: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="地域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての地域</SelectItem>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 年度フィルター */}
          <Select
            value={filters.year?.toString() ?? "all"}
            onValueChange={(value) =>
              onChange({ ...filters, year: value === "all" ? null : parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="完工年度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての年度</SelectItem>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* フィルターリセットボタン */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            フィルターをリセット
          </Button>
        </div>
      </div>
    </div>
  );
}