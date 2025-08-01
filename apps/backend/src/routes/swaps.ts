import express from 'express';
import { getRecommendations } from '../controllers/swapsController';

const router = express.Router();

router.get('/recommendations', getRecommendations);

export default router;
