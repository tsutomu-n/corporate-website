import { pgTable, text, serial, timestamp, varchar, integer, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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
} as const;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),  // 土木工事の詳細カテゴリー
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  completionDate: timestamp("completion_date").notNull(),
  location: text("location").notNull(),
  startDate: timestamp("start_date"),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  area: decimal("area", { precision: 10, scale: 2 }),
  contractorComment: text("contractor_comment"),
  environmentalMeasures: text("environmental_measures"),
  safetyMeasures: text("safety_measures"),
  awards: text("awards"),
  mediaLinks: text("media_links"),
  technicalHighlights: text("technical_highlights"),
  challengesSolutions: text("challenges_solutions"),
  // 新しいフィールド
  constructionScale: text("construction_scale"), // 工事規模
  technicalFeatures: json("technical_features"), // 技術的特徴（JSON形式）
  impactMetrics: json("impact_metrics"), // 社会的影響指標（JSON形式）
});

// 他のテーブル定義は変更なし
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  imageUrl: text("image_url"),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: varchar("phone", { length: 20 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export const insertNewsSchema = createInsertSchema(news);
export const selectNewsSchema = createSelectSchema(news);
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
export const selectContactSubmissionSchema = createSelectSchema(contactSubmissions);