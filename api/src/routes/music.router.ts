import express from "express";
import { MusicController } from '../controllers/music.controller'

export const musicRouter = express.Router();

musicRouter.get('/current', MusicController.getCurrentPlayingSong);
musicRouter.post('/spotify', MusicController.getSongs);
musicRouter.post('/spotify/add', MusicController.addSong);
musicRouter.delete('/spotify', MusicController.deleteSong);
musicRouter.put('/spotify', MusicController.updateSong);
