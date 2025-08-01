import { Request, Response } from 'express';
import { fetchRecommendations } from '../services/okxService';

export const getRecommendations = async (req: Request, res: Response) => {
  const data = await fetchRecommendations();
  res.json(data);
};
