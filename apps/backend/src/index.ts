import cors from 'cors';
import express from 'express';
import axios from 'axios';

import historyRouter from './routes/swaps/history';
import executeRouter from './routes/swaps/execute';
import simulatorRouter from './routes/swaps/simulator';
import pairsRouter from './routes/swaps/pairs';

const app = express();

// ✅ CORS robusto: localhost + vercel (prod y previews)
const whitelist = new Set([
  'http://localhost:3000',
  'https://swipetrade.vercel.app',
]);

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // SSR/health/ping
    if (whitelist.has(origin)) return cb(null, true);
    // permitir previews *.vercel.app de este proyecto
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return cb(null, true);
    cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// ✅ Express 5: declarar preflight explícito
app.options('/(.*)', cors(corsOptions));

app.use(express.json());

// (opcional) health
app.get('/health', (_req, res) => res.status(200).send('ok'));

// Rutas
app.use('/api/swaps/history', historyRouter);

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

app.use('/api/swaps/execute', executeRouter);
app.use('/api/swaps/simulator', simulatorRouter);
app.use('/api/swaps/pairs', pairsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running on :${PORT}`));












