"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Filter, Download, RefreshCw } from "lucide-react"

export interface TradeRecord {
  id: string
  date: Date
  pair: string
  executedPrice: number
  amount: string
  status: "confirmed" | "failed" | "pending"
  tradeType: "manual" | "bot"
  txHash?: string
}

const tradeTypes = ["All Types", "Manual", "Bot"]

export function TradeHistoryTable() {
  const [trades, setTrades] = useState<TradeRecord[]>([])
  const [pairFilter, setPairFilter] = useState("All Pairs")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/swaps/history")
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
          txHash: item.txHash,
        }))

        setTrades(formattedTrades)
        console.log("trades:", formattedTrades)
      } catch (error) {
        console.error("Failed to fetch trade history:", error)
      }
    }

    fetchTrades()
  }, [])

  const availablePairs = useMemo(() => {
    const uniquePairs = new Set(trades.map((t) => t.pair))
    return ["All Pairs", ...Array.from(uniquePairs)]
  }, [trades])

  const filteredTrades = useMemo(() => {
    const result = trades.filter((trade) => {
      const pairMatch = pairFilter === "All Pairs" || trade.pair === pairFilter
      const typeMatch = typeFilter === "All Types" || trade.tradeType === typeFilter.toLowerCase()
      const dateMatch = !dateFilter || trade.date.toISOString().split("T")[0] === dateFilter
      return pairMatch && typeMatch && dateMatch
    })
    console.log("filteredTrades:", result)
    return result
  }, [trades, pairFilter, typeFilter, dateFilter])

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

  const clearFilters = () => {
    setPairFilter("All Pairs")
    setTypeFilter("All Types")
    setDateFilter("")
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
            <Button variant="outline" size="sm" className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent" onClick={clearFilters}>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="flex justify-between items-center px-4 py-2 border-b border-st-dark"
          >
            <div className="text-st-light">{trade.pair}</div>
            <div className="text-st-light/80">{formatDate(trade.date)} {formatTime(trade.date)}</div>
            <div className="text-st-light">{trade.amount}</div>
            <div className="text-st-light">{formatPrice(trade.executedPrice)} USDC</div>
            <div className="text-st-light">{getStatusText(trade.status)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

