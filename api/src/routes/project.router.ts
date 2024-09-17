import express from "express";
import { ProjectController } from '../controllers/project.controller'

export const projectRouter = express.Router();

projectRouter.get('/', ProjectController.getAllProjects);
projectRouter.get('/:id', ProjectController.getProject);
projectRouter.post('/new', ProjectController.createNewProject);
projectRouter.put('/:id', ProjectController.updateProject);