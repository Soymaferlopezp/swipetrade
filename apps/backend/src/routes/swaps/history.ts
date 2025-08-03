import express from 'express';

const router = express.Router();

type SwapRecord = {
  pair: string;
  base: string;
  quote: string;
  price: string;
  amount: number;
  action: 'accepted' | 'rejected';
  status: 'confirmed' | 'rejected';
  tradeType: 'manual' | 'bot';
  timestamp: string;
};

const tradeHistory: SwapRecord[] = [];

// POST /api/swaps/history → guardar un swap
router.post('/', (req, res) => {
  const { pair, base, quote, price, amount, action, status, tradeType, timestamp } = req.body;

  if (!pair || !base || !quote || !price || !amount || !action || !status || !tradeType || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRecord: SwapRecord = {
    pair,
    base,
    quote,
    price,
    amount,
    action,
    status: 'confirmed',
    tradeType: 'manual',
    timestamp,
  };

  tradeHistory.push(newRecord);

  res.status(201).json({ message: 'Swap recorded', data: newRecord });
});

// GET /api/swaps/history → devolver historial
router.get('/', (req, res) => {
  res.json(tradeHistory);
});

export default router;


