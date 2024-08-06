import express from "express";
import { ProjectController } from '../controllers/project.controller'

export const projectRouter = express.Router();

projectRouter.get('/', ProjectController.getAllProjects);