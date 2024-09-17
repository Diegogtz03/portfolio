import { db, project } from "../db/schema";

export class ProjectController {
  static async getAllProjects(req, res) {
    const result = await db.select({
      id: project.id,
      title: project.title,
      date: project.date,
      tags: project.tags,
      shown: project.shown
    }).from(project);

    res.json({ "projects": result });
  }

  static async getProject(req, res) {
    console.log(req.params.id)
    const result = await db.select().from(project);

    res.json({ "project": result });
  }

  static async createNewProject(req, res) {
    await db.insert(project).values(req.body)

    res.json({ "created": "new" });
  }

  static async updateProject(req, res) {
    console.log("update project");
    console.log(req.params.id)

    res.json({ "update": "project" });
  }
}