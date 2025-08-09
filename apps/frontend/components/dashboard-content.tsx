"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"
import CardStack from "./card-stack"

type SwapRecord = {
  pair: string
  action: "accepted" | "rejected"
  price: string
  status: "confirmed" | "rejected" | string
  tradeType: string
  timestamp: string
  txHash?: string
}

export function DashboardContent() {
  const [recentSwaps, setRecentSwaps] = useState<SwapRecord[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/swaps/history")
        const data: SwapRecord[] = await res.json()
        console.log("Raw history data:", data)

        // ✅ FIX: filtrar por action (accepted/rejected)
        const filtered = data.filter(
          (swap) => swap.action === "accepted" || swap.action === "rejected"
        )

        const sorted = filtered.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )

        setRecentSwaps(sorted.slice(0, 5))
      } catch (err) {
        console.error("Error fetching recent swaps:", err)
      }
    }

    fetchHistory()
    const interval = setInterval(fetchHistory, 5000)

    // (Opcional) escucha para refrescar inmediatamente cuando ejecutas un swap
    const onRefresh = () => fetchHistory()
    window.addEventListener("recent-activity-refresh", onRefresh)

    return () => {
      clearInterval(interval)
      window.removeEventListener("recent-activity-refresh", onRefresh)
    }
  }, [])

  return (
    <>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-st-light">Welcome back!</h1>
            <p className="text-st-light/70 mt-1">
              Ready to start trading? Swipe through opportunities below.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-st-mint/20 text-st-mint border-st-mint/30"
          >
            Live Trading
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-st-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-light">$45,231.89</div>
              <p className="text-xs text-st-mint flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">
                Active Trades
              </CardTitle>
              <Activity className="h-4 w-4 text-st-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-light">12</div>
              <p className="text-xs text-st-light/70">3 pending execution</p>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">
                Today&apos;s P&L
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-st-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-mint">+$1,234.56</div>
              <p className="text-xs text-st-mint">+5.2% gain today</p>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">
                Win Rate
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-st-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-light">68.4%</div>
              <p className="text-xs text-st-red">-2.1% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex items-center justify-center">
            <CardStack />
          </div>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSwaps.map((swap, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-md bg-st-dark border border-st-dark-lighter"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      swap.action === "accepted" ? "bg-st-mint" : "bg-st-red"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-st-light">
                      {swap.pair}{" "}
                      {swap.action === "accepted" ? (
                        <span className="text-st-mint font-medium">Buy</span>
                      ) : (
                        <span className="text-st-red font-medium">Rejected</span>
                      )}
                    </p>
                    <p className="text-xs text-st-light/60">
                      {new Date(swap.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {swap.txHash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${swap.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        View Tx ↗
                      </a>
                    )}
                  </div>
                  <span className="text-sm text-st-light">${swap.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
