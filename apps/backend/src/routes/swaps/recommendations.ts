import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const recommendations = [
    {
      pair: 'SOL/USDT',
      price: '177.79',
      slippage: '0.98',
      gasFee: '0.01',
      label: 'Live Market',
      volume: '1003978.73',
    },
    // otros swaps mock
  ];

  res.json(recommendations);
});

export default router;
