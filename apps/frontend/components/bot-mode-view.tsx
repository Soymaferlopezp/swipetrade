"use client"

import { useState } from "react"
import { BotConfigPanel } from "./bot-config-panel"
import { BotStatusBar } from "./bot-status-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Clock } from "lucide-react"

interface BotConfig {
  isActive: boolean
  selectedPairs: string[]
  targetPriceType: "max" | "min"
  targetPrice: string
  maxSlippage: string
  amountPerTrade: string
  sessionDuration: string
}

interface BotSession {
  startTime: Date
  swapCount: number
  successfulSwaps: number
  totalVolume: string
  currentPairs: string[]
}

export function BotModeView() {
  const [botActive, setBotActive] = useState(false)
  const [botSession, setBotSession] = useState<BotSession | null>(null)

  // 🔹 Iniciar Bot (llamando backend real)
  const handleStartBot = async (config: BotConfig) => {
    try {
      const res = await fetch("http://localhost:3001/api/swaps/bot/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pairs: config.selectedPairs.map(p => p.replace("/", "-")), // OKX usa guiones
          targetPriceType: config.targetPriceType,
          targetPrice: Number(config.targetPrice),
          maxSlippage: config.maxSlippage,
          amountPerTrade: config.amountPerTrade,
          userAddress: "0x0000000000000000000000000000000000000000" // TODO: conectar wallet
        })
      })

      if (!res.ok) throw new Error("Error starting bot")

      setBotActive(true)
      setBotSession({
        startTime: new Date(),
        swapCount: 0,
        successfulSwaps: 0,
        totalVolume: "0.00 ETH",
        currentPairs: config.selectedPairs,
      })
    } catch (error) {
      console.error("[BOT MODE] Error starting bot:", error)
    }
  }

  // 🔹 Detener Bot (llamando backend real)
  const handleStopBot = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/swaps/bot/stop", {
        method: "POST"
      })

      if (!res.ok) throw new Error("Error stopping bot")

      setBotActive(false)
      setBotSession(null)
    } catch (error) {
      console.error("[BOT MODE] Error stopping bot:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-st-light">Bot Mode</h1>
          <p className="text-st-light/70 mt-1">Configure and control your automated trading bot</p>
        </div>
        <Badge
          variant="secondary"
          className={`${
            botActive
              ? "bg-st-mint/20 text-st-mint border-st-mint/30"
              : "bg-st-light/20 text-st-light border-st-light/30"
          }`}
        >
          {botActive ? "Bot Active" : "Bot Inactive"}
        </Badge>
      </div>

      {/* Bot Status Bar */}
      {botActive && (
        <BotStatusBar isActive={botActive} session={botSession} onStopBot={handleStopBot} />
      )}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bot Configuration Panel */}
        <div className="lg:col-span-2">
          <BotConfigPanel onStartBot={handleStartBot} isDisabled={botActive} />
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <Zap className="h-5 w-5 text-st-mint" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-st-light/70">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Bot monitors selected trading pairs continuously</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Executes trades when target price conditions are met</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Respects slippage limits and trade amounts</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Stops automatically after session duration</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-st-mint" />
                Performance Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-st-light/70">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <p>Start with smaller amounts to test strategies</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <p>Monitor high-volume pairs for better execution</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <p>Set realistic slippage limits (0.5-2%)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <Clock className="h-5 w-5 text-st-mint" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {botSession ? (
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-st-mint">{botSession.swapCount}</p>
                    <p className="text-xs text-st-light/70">Total Swaps</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-st-mint">
                      {botSession.swapCount > 0
                        ? Math.round((botSession.successfulSwaps / botSession.swapCount) * 100)
                        : 0}
                      %
                    </p>
                    <p className="text-xs text-st-light/70">Success Rate</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-st-light/70 text-center">No active session</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
