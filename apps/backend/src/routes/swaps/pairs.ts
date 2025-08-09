import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const response = await axios.get(
      'https://www.okx.com/api/v5/dex/aggregator/token-list'
    );

    const data = response.data?.data;

    if (!Array.isArray(data)) {
      return res.status(500).json({ error: 'Unexpected response format from OKX DEX' });
    }

    // Solo devolvemos campos clave
    const pairs = data.map((token: any) => ({
      symbol: token.symbol,
      address: token.address,
      chainId: token.chainId,
      decimals: token.decimals,
      logoURI: token.logoURI,
    }));

    res.json(pairs);
  } catch (err) {
    console.error('🔥 Error fetching DEX token list:', err);
    res.status(500).json({ error: 'Failed to fetch DEX token list' });
  }
});

export default router;

