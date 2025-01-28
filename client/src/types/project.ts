import { z } from "zod";

export const civilEngineeringCategories = {
  SLOPE: "法面工事",
  BRIDGE: "橋梁工事",
  REPAIR: "補修工事",
  ROAD: "道路工事",
  RIVER: "河川工事",
  TUNNEL: "トンネル工事",
  GROUND: "地盤改良工事",
  DREDGING: "しゅんせつ工事",
  LANDSCAPE: "造園工事",
  DISASTER: "災害復旧工事",
  EROSION: "砂防工事",
  AGRICULTURE: "農業土木工事",
} as const;

export type CivilEngineeringCategory = typeof civilEngineeringCategories[keyof typeof civilEngineeringCategories];

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  subCategory: z.string().optional(),
  location: z.string(),
  completionDate: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export type CategoryConfig = {
  [K in CivilEngineeringCategory]?: {
    icon: string;
    bgFrom: string;
    bgTo: string;
  };
};
