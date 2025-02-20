import express from "express";
import { SkillController } from "../controllers/skills.controller";

export const skillsRouter = express.Router();

skillsRouter.get("/", SkillController.getAllSkills);
skillsRouter.get("/:id", SkillController.getSkill);
skillsRouter.post("/", SkillController.createSkill);
skillsRouter.delete("/:id", SkillController.deleteSkill);
skillsRouter.put("/:id", SkillController.updateSkill);
