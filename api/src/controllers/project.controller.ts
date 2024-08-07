import { db, image } from "../db/schema";

export class ProjectController {
  static async getAllProjects(req, res) {
    const result = await db.select().from(image);

    res.json({ "RESULT": result });
  }
}