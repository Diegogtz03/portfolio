import express from "express";
import { MusicController } from '../controllers/music.controller'

export const musicRouter = express.Router();

musicRouter.get('/current', MusicController.getCurrentPlayingSong);