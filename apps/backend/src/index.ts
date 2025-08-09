<<<<<<< HEAD
=======
import "dotenv/config";
>>>>>>> 00a1b0c6d977eaf36b9e12e56e4056c7c45021e2
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import historyRouter from './routes/swaps/history';
import executeRouter from './routes/swaps/execute';
import simulatorRouter from './routes/swaps/simulator';
import pairsRouter from './routes/swaps/pairs';

const app = express();

<<<<<<< HEAD
app.options("*", cors());
app.use(cors({
  origin: ["http://localhost:3000", "https://swipetrade.vercel.app"],
}));

=======
const allowedOrigins = [
  "http://localhost:3000",
  "https://swipetrade.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // permite curl/Postman
      return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Preflight
app.options("*", cors());
>>>>>>> 00a1b0c6d977eaf36b9e12e56e4056c7c45021e2

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

app.use('/api/swaps/execute', executeRouter)

app.use('/api/swaps/simulator', simulatorRouter);

app.use('/api/swaps/pairs', pairsRouter);

const PORT = process.env.PORT || 3001;
<<<<<<< HEAD
app.listen(PORT, () => console.log(`✅ Backend running on :${PORT}`));
=======
app.listen(PORT, () => {
  console.log(`✅ Backend running on :${PORT}`);
});

>>>>>>> 00a1b0c6d977eaf36b9e12e56e4056c7c45021e2











