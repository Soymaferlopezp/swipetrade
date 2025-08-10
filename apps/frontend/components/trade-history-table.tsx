"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { TradeRecord } from "@/types/trade"
import { API_BASE } from "@/lib/api";

const tradeTypes = ["All Types", "Manual", "Bot"]

export function TradeHistoryTable() {
  const [trades, setTrades] = useState<TradeRecord[]>([])
  const [pairFilter, setPairFilter] = useState("All Pairs")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/swaps/history`)
        const data = response.data

        const formattedTrades: TradeRecord[] = data.map((item: any, index: number) => ({
          id: item.id || index.toString(),
          date: new Date(item.timestamp || Date.now()),
          pair: item.pair || `${item.base}/${item.quote}` || "?-?",
          executedPrice: parseFloat(item.price) || 0,
          amount: `${item.amount || "0"} ${item.base || "USDC"}`,
          status:
            item.status === "confirmed"
              ? "confirmed"
              : item.status === "rejected"
              ? "failed"
              : "pending",
          tradeType: item.tradeType || "manual",
          txHash: item.txHash || null,
        }))

        setTrades(formattedTrades)
        console.log("trades:", formattedTrades)
      } catch (error) {
        console.error("Failed to fetch trade history:", error)
      }
    }

    fetchTrades()
  }, [])

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })

  const formatPrice = (price: number) =>
    price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmed"
      case "failed": return "Failed"
      case "pending": return "Pending"
      default: return status
    }
  }

  return (
    <Card className="bg-st-dark-lighter border-st-dark-lighter">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-st-light">Trade History</CardTitle>
            <p className="text-sm text-st-light/70 mt-1">View and filter your trading activity</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline" size="sm" className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-6 text-st-light/70 text-sm font-medium border-b border-st-dark pb-2 px-4">
          <div>Pair</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Price</div>
          <div>Status</div>
          <div>Tx Hash</div>
        </div>

        {trades.map((trade) => (
          <div
            key={trade.id}
            className="grid grid-cols-6 text-sm text-st-light px-4 py-2 border-b border-st-dark items-center"
          >
            <div>{trade.pair}</div>
            <div>{formatDate(trade.date)} {formatTime(trade.date)}</div>
            <div>{trade.amount}</div>
            <div>{formatPrice(trade.executedPrice)} USDC</div>
            <div>{getStatusText(trade.status)}</div>
            <div>
              {trade.txHash ? (
                <a
                  href={`https://sepolia.etherscan.io/tx/${trade.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-st-mint hover:text-st-mint/80"
                >
                  View Tx
                </a>
              ) : "—"}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


