import express from 'express';
import cors from 'cors';
import axios from 'axios';
import historyRouter from './routes/swaps/history';
import executeRouter from './routes/swaps/execute';
import simulatorRouter from './routes/swaps/simulator';
import pairsRouter from './routes/swaps/pairs';
import recommendationsRouter from './routes/swaps/recommendations';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://swipetrade.vercel.app",
    "https://swipetrade-medicenmafer221-5173s-projects.vercel.app",
    "https://swipetrade-lxwo.onrender.com"
  ],
  credentials: true,
}));

app.use(express.json());

app.get('/', (_req, res) => res.status(200).send('API is running'));
app.get('/health', (_req, res) => res.status(200).send('ok'));

app.use('/api/swaps/history', historyRouter);
app.use('/api/swaps/execute', executeRouter);
app.use('/api/swaps/simulator', simulatorRouter);
app.use('/api/swaps/pairs', pairsRouter);
app.use('/api/swaps/recommendations', recommendationsRouter);

app.get('/api/swaps/recommendations', async (_req, res) => {
  try {
    const { data } = await axios.get('https://www.okx.com/api/v5/market/tickers?instType=SPOT');
    const recommendations = data.data.slice(0, 20).map((item: any) => ({
      pair: item.instId.replace('-', '/'),
      price: item.last,
      slippage: Number((Math.random() * 1).toFixed(2)),
      gasFee: Number((Math.random() * 5).toFixed(2)),
      label: 'Live Market',
      volume: Number(item.volCcy24h).toFixed(2),
    }));
    res.json(recommendations);
  } catch (err) {
    console.error('[OKX API Error]', err);
    res.status(500).json({ error: 'Error fetching swap data from OKX' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running on :${PORT}`));












