import { db, project, image, project_image } from "../db/schema";

export class ProjectController {
  static async getAllProjects(req, res) {
    const result = await db
      .select({
        id: project.id,
        title: project.title,
        date: project.date,
        tags: project.tags,
        shown: project.shown,
      })
      .from(project);

    res.json({ projects: result });
  }

  static async getProject(req, res) {
    console.log(req.params.id);
    const result = await db.select().from(project);

    res.json({ project: result });
  }

  static async createNewProject(req, res) {
    try {
      let result = await db
        .insert(project)
        .values(req.body)
        .returning({ id: project.id });
      res.status(200).json({ id: result[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }

  static async updateProject(req, res) {
    console.log("update project");
    console.log(req.params.id);

    res.json({ update: "project" });
  }

  static async uploadImage(req, res) {
    try {
      const { project_id, url, alt } = req.body;

      // insert image url, save id
      const image_id = await db
        .insert(image)
        .values({ url, alt })
        .returning({ id: image.id });

      // insert project id, image id
      await db
        .insert(project_image)
        .values({ project_id: project_id, image_id: image_id[0].id });

      res.status(200).json({ id: image_id[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
}
