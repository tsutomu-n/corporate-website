import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { projects, news, contactSubmissions } from "@db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get projects with pagination and filtering
  app.get("/api/projects", async (req, res) => {
    try {
      const { 
        category,
        region,
        year,
        page = 1,
        limit = 9
      } = req.query;

      const offset = (Number(page) - 1) * Number(limit);

      // Build where conditions
      const whereConditions = [];
      if (category && category !== "all") {
        whereConditions.push(eq(projects.category, category as string));
      }
      if (region) {
        whereConditions.push(eq(projects.region, region as string));
      }
      if (year) {
        whereConditions.push(
          and(
            sql`EXTRACT(YEAR FROM ${projects.completionDate}) = ${Number(year)}`
          )
        );
      }

      // Get total count for pagination
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(projects)
        .where(and(...whereConditions));

      // Get filtered and paginated results
      const projectsList = await db.query.projects.findMany({
        where: and(...whereConditions),
        orderBy: desc(projects.completionDate),
        limit: Number(limit),
        offset: offset
      });

      res.json({
        projects: projectsList,
        pagination: {
          total: Number(count),
          pages: Math.ceil(Number(count) / Number(limit)),
          current: Number(page)
        }
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get featured projects (for homepage showcase)
  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const featuredProjects = await db.query.projects.findMany({
        orderBy: desc(projects.completionDate),
        limit: 4,
        where: eq(projects.featured, true),
      });
      res.json(featuredProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Get projects by region (for regional contribution map)
  app.get("/api/projects/by-region", async (_req, res) => {
    try {
      const projectsByRegion = await db.query.projects.findMany({
        orderBy: desc(projects.completionDate),
        where: eq(projects.completed, true),
      });
      res.json(projectsByRegion);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects by region" });
    }
  });

  // Get recent projects (for homepage)
  app.get("/api/projects/recent", async (_req, res) => {
    try {
      const recentProjects = await db.query.projects.findMany({
        orderBy: desc(projects.completionDate),
        limit: 3,
      });
      res.json(recentProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent projects" });
    }
  });

  // Get single project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await db.query.projects.findFirst({
        where: eq(projects.id, parseInt(id)),
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get recent news
  app.get("/api/news/recent", async (_req, res) => {
    try {
      const recentNews = await db.query.news.findMany({
        orderBy: desc(news.date),
        limit: 5,
      });
      res.json(recentNews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent news" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, phone, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          message: "Name, email and message are required",
        });
      }

      const newSubmission = await db
        .insert(contactSubmissions)
        .values({
          name,
          email,
          company,
          phone,
          message,
          createdAt: new Date(),
        })
        .returning();

      res.status(201).json(newSubmission[0]);
    } catch (error) {
      res.status(500).json({
        message: "Failed to submit contact form",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}