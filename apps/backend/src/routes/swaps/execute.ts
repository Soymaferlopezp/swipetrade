import { Router } from 'express'
import { tradeHistory } from '../../data'

const executeRouter = Router()

executeRouter.post('/', (req, res) => {
  const {
    pair,
    price,
    volume,
    gasFee,
    slippage,
    label,
    txHash,
    userAddress,
    destinationAddress,
    type,
    timestamp,
  } = req.body

  // Validación básica
  if (!txHash || !userAddress || !pair || !timestamp) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields (txHash, userAddress, pair, timestamp)',
    })
  }

  const [base, quote] = pair.split('/')

  const record = {
    pair,
    base,
    quote,
    price,
    amount: volume,
    gasFee,
    slippage,
    label,
    destinationAddress,
    txHash,
    userAddress,
    tradeType: type || 'manual',
    status: 'confirmed',
    action: 'accepted',
    timestamp,
  }

  tradeHistory.push(record)
  console.log('✅ Swap ejecutado guardado:', record)

  return res.status(200).json({
    success: true,
    data: record,
  })
})

export default executeRouter


