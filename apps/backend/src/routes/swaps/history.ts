import express from 'express'
import { tradeHistory } from '../../data'

const router = express.Router()

// GET /api/swaps/history → devuelve el historial completo
router.get('/', (_req, res) => {
  res.json(tradeHistory)
})

// POST /api/swaps/history → guardar rechazo manual
router.post('/', (req, res) => {
  const {
    pair,
    base,
    quote,
    price,
    amount,
    action,
    status,
    tradeType,
    timestamp,
  } = req.body

  if (!pair || !price || !action || !status || !timestamp) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: pair, price, action, status, timestamp',
    })
  }

  const record = {
    pair,
    base: base || pair.split('/')[0],
    quote: quote || pair.split('/')[1],
    price,
    amount,
    action, // "rejected"
    status, // "rejected"
    tradeType: tradeType || 'manual',
    timestamp,
  }

  tradeHistory.push(record)
  console.log('📥 Rejected Swap saved:', record)

  return res.status(200).json({
    success: true,
    data: record,
  })
})

export default router


