import express from 'express'
import { fetchDEXQuotes } from '../../services/okxService'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const recommendations = await fetchDEXQuotes({ quoteAmount: '50' }); 
    res.json(recommendations);
  } catch (err) {
    console.error('❌ Failed to fetch DEX recommendations');
    res.status(500).json({ error: 'Failed to fetch swap recommendations' });
  }
});

export default router;





