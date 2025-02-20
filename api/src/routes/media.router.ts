import express from "express";
import { MediaController } from '../controllers/media.controller'

export const mediaRouter = express.Router();

mediaRouter.post('/', MediaController.getMedia);
mediaRouter.post('/add', MediaController.addMedia);
mediaRouter.delete('/', MediaController.deleteMedia);
mediaRouter.put('/', MediaController.updateMedia);