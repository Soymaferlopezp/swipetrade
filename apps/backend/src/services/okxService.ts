import axios from 'axios';

export const fetchRecommendations = async () => {
  try {
    const response = await axios.get('https://www.okx.com/api/v5/market/tickers?instType=SPOT');

    const data = response.data.data;

    const pairs = data.filter((d: any) =>
      ['ETH-USDT', 'BTC-USDT', 'SOL-USDT', 'AVAX-USDT', 'MATIC-USDT'].includes(d.instId)
    );

    const recommendations = pairs.map((p: any) => ({
      pair: p.instId.replace('-', '/'),
      price: Number(p.last).toFixed(2),
      slippage: (Math.random() * 1).toFixed(2), // simulado
      gasFee: (Math.random() * 5).toFixed(2),    // simulado
      label: 'Live Market',
      volume: Number(p.vol24h).toFixed(2)
    }));

    return recommendations;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('❌ Axios error:', err.message);
    } else {
      console.error('❌ Unknown error fetching market data');
    }
    return [];
  }
};
