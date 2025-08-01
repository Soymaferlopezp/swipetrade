"use client"

import { TradeHistoryTable } from "./trade-history-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, DollarSign } from "lucide-react"

export function TradeHistoryView() {
  // Mock statistics - in a real app, these would be calculated from actual trade data
  const stats = {
    totalTrades: 156,
    successfulTrades: 142,
    totalVolume: "12.45 ETH",
    totalPnL: "+$2,847.32",
    winRate: 91.0,
    avgTradeSize: "0.08 ETH",
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

      {/* Additional Info Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader>
            <CardTitle className="text-st-light">Trading Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Most Active Pair</span>
              <span className="text-sm font-medium text-st-light">ETH/USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Best Performing Day</span>
              <span className="text-sm font-medium text-st-mint">+$456.78</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Manual vs Bot Trades</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-st-light/20 text-st-light border-st-light/30 text-xs">
                  Manual: 62%
                </Badge>
                <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs">
                  Bot: 38%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader>
            <CardTitle className="text-st-light">Recent Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Last 7 Days</span>
              <span className="text-sm font-medium text-st-mint">+$234.56</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Last 30 Days</span>
              <span className="text-sm font-medium text-st-mint">+$1,123.45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-st-light/70">Failed Trades</span>
              <span className="text-sm font-medium text-st-red">{stats.totalTrades - stats.successfulTrades}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
