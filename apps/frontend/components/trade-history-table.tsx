"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Filter, Download, RefreshCw } from "lucide-react"

interface TradeRecord {
  id: string
  date: Date
  pair: string
  executedPrice: number
  amount: string
  status: "confirmed" | "failed" | "pending"
  tradeType: "manual" | "bot"
  txHash?: string
}

// Mock trade history data
const mockTradeHistory: TradeRecord[] = [
  {
    id: "1",
    date: new Date("2024-01-15T14:30:00"),
    pair: "ETH/USDC",
    executedPrice: 2543.87,
    amount: "0.15 ETH",
    status: "confirmed",
    tradeType: "manual",
    txHash: "0x1234...5678",
  },
  {
    id: "2",
    date: new Date("2024-01-15T13:45:00"),
    pair: "BTC/USDT",
    executedPrice: 42150.23,
    amount: "0.025 BTC",
    status: "confirmed",
    tradeType: "bot",
    txHash: "0x2345...6789",
  },
  {
    id: "3",
    date: new Date("2024-01-15T12:20:00"),
    pair: "MATIC/USDC",
    executedPrice: 0.8234,
    amount: "150 MATIC",
    status: "failed",
    tradeType: "manual",
  },
  {
    id: "4",
    date: new Date("2024-01-15T11:15:00"),
    pair: "UNI/ETH",
    executedPrice: 0.00234,
    amount: "50 UNI",
    status: "confirmed",
    tradeType: "bot",
    txHash: "0x3456...7890",
  },
  {
    id: "5",
    date: new Date("2024-01-15T10:30:00"),
    pair: "ETH/USDC",
    executedPrice: 2538.12,
    amount: "0.08 ETH",
    status: "pending",
    tradeType: "manual",
  },
  {
    id: "6",
    date: new Date("2024-01-14T16:45:00"),
    pair: "LINK/USDT",
    executedPrice: 14.67,
    amount: "25 LINK",
    status: "confirmed",
    tradeType: "bot",
    txHash: "0x4567...8901",
  },
  {
    id: "7",
    date: new Date("2024-01-14T15:20:00"),
    pair: "AAVE/ETH",
    executedPrice: 0.0456,
    amount: "5 AAVE",
    status: "confirmed",
    tradeType: "manual",
    txHash: "0x5678...9012",
  },
  {
    id: "8",
    date: new Date("2024-01-14T14:10:00"),
    pair: "BTC/USDT",
    executedPrice: 42089.45,
    amount: "0.012 BTC",
    status: "failed",
    tradeType: "bot",
  },
]

const availablePairs = ["All Pairs", "ETH/USDC", "BTC/USDT", "MATIC/USDC", "UNI/ETH", "LINK/USDT", "AAVE/ETH"]
const tradeTypes = ["All Types", "Manual", "Bot"]

export function TradeHistoryTable() {
  const [trades] = useState<TradeRecord[]>(mockTradeHistory)
  const [pairFilter, setPairFilter] = useState("All Pairs")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [dateFilter, setDateFilter] = useState("")

  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const pairMatch = pairFilter === "All Pairs" || trade.pair === pairFilter
      const typeMatch = typeFilter === "All Types" || trade.tradeType === typeFilter.toLowerCase()
      const dateMatch = !dateFilter || trade.date.toISOString().split("T")[0] === dateFilter

      return pairMatch && typeMatch && dateMatch
    })
  }, [trades, pairFilter, typeFilter, dateFilter])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check className="h-4 w-4 text-st-mint" />
      case "failed":
        return <X className="h-4 w-4 text-st-red" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "failed":
        return "Failed"
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  const getTypeColor = (type: string) => {
    return type === "bot"
      ? "bg-st-mint/20 text-st-mint border-st-mint/30"
      : "bg-st-light/20 text-st-light border-st-light/30"
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
            <Button
              variant="outline"
              size="sm"
              className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-st-light text-sm">Trading Pair</Label>
            <Select value={pairFilter} onValueChange={setPairFilter}>
              <SelectTrigger className="border-st-dark-lighter text-st-light bg-st-dark">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-st-dark border-st-dark-lighter">
                {availablePairs.map((pair) => (
                  <SelectItem key={pair} value={pair} className="text-st-light">
                    {pair}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-st-light text-sm">Trade Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-st-dark-lighter text-st-light bg-st-dark">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-st-dark border-st-dark-lighter">
                {tradeTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-st-light">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-st-light text-sm">Date</Label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border-st-dark-lighter text-st-light bg-st-dark"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-st-light text-sm opacity-0">Actions</Label>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-st-light/70">
          <span>
            Showing {filteredTrades.length} of {trades.length} trades
          </span>
          {(pairFilter !== "All Pairs" || typeFilter !== "All Types" || dateFilter) && (
            <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
              Filtered
            </Badge>
          )}
        </div>

        {/* Table */}
        <div className="rounded-lg border border-st-dark-lighter overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-st-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Pair
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Executed Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-st-light/70 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-st-dark-lighter">
                {filteredTrades.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-st-light/70">
                      No trades found matching your filters
                    </td>
                  </tr>
                ) : (
                  filteredTrades.map((trade, index) => (
                    <tr
                      key={trade.id}
                      className={`hover:bg-st-dark transition-colors ${
                        index % 2 === 0 ? "bg-st-dark-lighter" : "bg-st-dark-lighter/50"
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="text-sm text-st-light">{formatDate(trade.date)}</div>
                        <div className="text-xs text-st-light/70">{formatTime(trade.date)}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center -space-x-1">
                            <div className="w-6 h-6 bg-st-mint rounded-full flex items-center justify-center text-xs font-bold text-st-dark">
                              {trade.pair.split("/")[0].slice(0, 1)}
                            </div>
                            <div className="w-6 h-6 bg-st-light rounded-full flex items-center justify-center text-xs font-bold text-st-dark">
                              {trade.pair.split("/")[1].slice(0, 1)}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-st-light">{trade.pair}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-medium text-st-light">${formatPrice(trade.executedPrice)}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-medium text-st-light">{trade.amount}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(trade.status)}
                          <span className="text-sm text-st-light">{getStatusText(trade.status)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="secondary" className={getTypeColor(trade.tradeType)}>
                          {trade.tradeType === "bot" ? "Bot" : "Manual"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination placeholder */}
        {filteredTrades.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-st-light/70">Page 1 of 1</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-st-dark-lighter text-st-light/50 bg-transparent"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-st-dark-lighter text-st-light/50 bg-transparent"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
