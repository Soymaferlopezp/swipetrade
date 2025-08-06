export type TradeRecord = {
  id: string
  date: Date
  pair: string
  executedPrice: number
  amount: string
  status: "confirmed" | "failed" | "pending"
  tradeType: "manual" | "bot"
  txHash?: string | null
}
