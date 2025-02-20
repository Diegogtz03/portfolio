import { db, skill, image } from "../db/schema";
import { eq } from "drizzle-orm";
export class SkillController {
  static async getAllSkills(req, res) {
    const result = await db
      .select({
        id: skill.id,
        name: skill.name,
        highlighted: skill.highlighted,
        is_hobbie: skill.is_hobbie,
        is_language: skill.is_language,
        url: image.url,
      })
      .from(skill)
      .innerJoin(image, eq(skill.image_id, image.id));
    res.json({ skills: result });
  }

  static async getSkill(req, res) {
    const { id } = req.params;

    const result = await db
      .select({
        id: skill.id,
        name: skill.name,
        highlighted: skill.highlighted,
        is_hobbie: skill.is_hobbie,
        is_language: skill.is_language,
        url: image.url,
      })
      .from(skill)
      .where(eq(skill.id, id))
      .innerJoin(image, eq(skill.image_id, image.id));

    if (result.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(result[0]);
  }

  static async deleteSkill(req, res) {
    const { id } = req.params;
    await db.delete(skill).where(eq(skill.id, id));
    res.json({ message: "Skill deleted" });
  }

  static async updateSkill(req, res) {
    const { id } = req.params;
    const { name, highlighted, isHobbie, isLanguage, url } = req.body;

    await db
      .update(skill)
      .set({ name, highlighted, is_hobbie: isHobbie, is_language: isLanguage })
      .where(eq(skill.id, String(id)));

    // Get Image ID
    const prev_image = await db
      .select({ image_id: skill.image_id })
      .from(skill)
      .where(eq(skill.id, id));

    if (prev_image[0].image_id) {
      await db
        .update(image)
        .set({ url })
        .where(eq(image.id, prev_image[0].image_id));
    }

    res.json({ message: "Skill updated" });
  }

  static async createSkill(req, res) {
    const { name, highlighted, isHobbie, isLanguage, url } = req.body;

    const image_id = await db
      .insert(image)
      .values({ url, alt: name })
      .returning({ id: image.id });

    const result = await db.insert(skill).values({
      name,
      highlighted,
      is_hobbie: isHobbie,
      is_language: isLanguage,
      image_id: image_id[0].id,
    });

    res.json({ skill: result });
  }
}
