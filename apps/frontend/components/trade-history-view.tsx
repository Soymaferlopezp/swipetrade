"use client"

import { useEffect, useState } from "react"
import { TradeHistoryTable } from "./trade-history-table"
import { TradeRecord } from "@/types/trade"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, DollarSign } from "lucide-react"
import axios from "axios"
import { API_BASE } from "@/lib/api";

export function TradeHistoryView() {
  const [history, setHistory] = useState<TradeRecord[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("${API_BASE}/api/swaps/history")
        const raw = res.data

        const formatted: TradeRecord[] = raw.map((item: any, index: number) => ({
          id: index.toString(),
          date: new Date(item.timestamp),
          pair: item.pair,
          executedPrice: parseFloat(item.price),
          amount: `${item.amount} ${item.base}`,
          status:
            item.status === "confirmed"
              ? "confirmed"
              : item.status === "rejected"
              ? "failed"
              : "pending",
          tradeType: item.tradeType || "manual",
          txHash: item.txHash,
        }))

        setHistory(formatted)
      } catch (err) {
        console.error("Error fetching trade history", err)
      }
    }

    fetchHistory()
  }, [])

  const stats = {
    totalTrades: history.length,
    successfulTrades: history.filter((t) => t.status === "confirmed").length,
    totalVolume: `${history.reduce((acc, t) => {
      const val = typeof t.amount === "string"
        ? parseFloat(t.amount.split(" ")[0])
        : Number(t.amount || 0)
      return acc + val
    }, 0).toFixed(2)} ${typeof history[0]?.amount === "string"
      ? history[0].amount.split(" ")[1]
      : "USDC"}`,
    totalPnL: "+$2,847.32",
    winRate: history.length === 0
      ? 0
      : ((history.filter((t) => t.status === "confirmed").length / history.length) * 100).toFixed(1),
    avgTradeSize: history.length === 0
      ? "0 USDC"
      : `${(
          history.reduce((acc, t) => {
            const val = typeof t.amount === "string"
              ? parseFloat(t.amount.split(" ")[0])
              : Number(t.amount || 0)
            return acc + val
          }, 0) / history.length
        ).toFixed(2)} ${typeof history[0]?.amount === "string"
          ? history[0].amount.split(" ")[1]
          : "USDC"}`,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-st-light">Trade History</h1>
          <p className="text-st-light/70 mt-1">Track and analyze your trading performance</p>
        </div>
        <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
          {stats.totalTrades} Total Trades
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-st-light">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-st-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-st-mint">{stats.winRate}%</div>
            <p className="text-xs text-st-light/70">
              {stats.successfulTrades} of {stats.totalTrades} trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-st-light">Total Volume</CardTitle>
            <Activity className="h-4 w-4 text-st-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-st-light">{stats.totalVolume}</div>
            <p className="text-xs text-st-light/70">Across all trading pairs</p>
          </CardContent>
        </Card>

        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-st-light">Total P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-st-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-st-mint">{stats.totalPnL}</div>
            <p className="text-xs text-st-mint">All-time performance</p>
          </CardContent>
        </Card>

        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-st-light">Avg Trade Size</CardTitle>
            <DollarSign className="h-4 w-4 text-st-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-st-light">{stats.avgTradeSize}</div>
            <p className="text-xs text-st-light/70">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Trade History Table */}
      <TradeHistoryTable />
    </div>
  )
}

