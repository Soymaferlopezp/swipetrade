import express from 'express';
import cors from 'cors';
import axios from 'axios';
import historyRouter from './routes/swaps/history';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/swaps/history', historyRouter);


app.get('/api/swaps/recommendations', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.okx.com/api/v5/market/tickers?instType=SPOT');

    const recommendations = data.data.slice(0, 20).map((item: any) => ({
      pair: item.instId.replace('-', '/'),             // Ej: "SOL/USDT"
      price: item.last,                                // Precio actual
      slippage: (Math.random() * 1).toFixed(2),         // Simulado
      gasFee: (Math.random() * 5).toFixed(2),           // Simulado
      label: 'Live Market',
      volume: Number(item.volCcy24h).toFixed(2),        // Volumen 24h
    }));

    res.json(recommendations);
  } catch (err) {
    console.error('[OKX API Error]', err);
    res.status(500).json({ error: 'Error fetching swap data from OKX' });
  }
});

app.listen(3001, () => {
  console.log('✅ Backend running on http://localhost:3001');
});
