"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bot, Settings, TrendingUp, Clock, DollarSign, Zap, X } from "lucide-react"

const availablePairs = [
  { value: "ETH/USDC", label: "ETH/USDC", volume: "High" },
  { value: "BTC/USDT", label: "BTC/USDT", volume: "High" },
  { value: "MATIC/USDC", label: "MATIC/USDC", volume: "Medium" },
  { value: "UNI/ETH", label: "UNI/ETH", volume: "Medium" },
  { value: "LINK/USDT", label: "LINK/USDT", volume: "Low" },
  { value: "AAVE/ETH", label: "AAVE/ETH", volume: "Low" },
]

const sessionDurations = [
  { value: "30min", label: "30 minutes" },
  { value: "2h", label: "2 hours" },
  { value: "24h", label: "24 hours" },
]

export interface BotConfig {
  isActive: boolean
  selectedPairs: string[]
  targetPriceType: "max" | "min"
  targetPrice: string
  maxSlippage: string
  amountPerTrade: string
  sessionDuration: string
}

interface BotConfigPanelProps {
  onStartBot: (config: BotConfig) => void
  isDisabled?: boolean
}

export function BotConfigPanel({ onStartBot, isDisabled = false }: BotConfigPanelProps) {
  const [config, setConfig] = useState<BotConfig>({
    isActive: false,
    selectedPairs: [],
    targetPriceType: "max",
    targetPrice: "",
    maxSlippage: "1.0",
    amountPerTrade: "0.05",
    sessionDuration: "2h",
  })

  const [showPairDropdown, setShowPairDropdown] = useState(false)

  const handlePairToggle = (pairValue: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedPairs: prev.selectedPairs.includes(pairValue)
        ? prev.selectedPairs.filter((p) => p !== pairValue)
        : [...prev.selectedPairs, pairValue],
    }))
  }

  const removePair = (pairValue: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedPairs: prev.selectedPairs.filter((p) => p !== pairValue),
    }))
  }

  const handleStartBot = () => {
    if (isFormValid) {
      onStartBot({ ...config, isActive: true })
    }
  }

  const isFormValid =
    config.selectedPairs.length > 0 &&
    !!config.targetPrice &&
    !!config.amountPerTrade &&
    Number(config.targetPrice) > 0 &&
    Number(config.amountPerTrade) > 0

  return (
    <Card className="bg-st-dark-lighter border-st-dark-lighter">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-st-mint/20 rounded-lg">
            <Bot className="h-5 w-5 text-st-mint" />
          </div>
          <div>
            <CardTitle className="text-st-light">Bot Configuration</CardTitle>
            <CardDescription className="text-st-light/70">
              Set up your automated trading parameters
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Bot Activation Toggle */}
        <div className="flex items-center justify-between p-4 bg-st-dark rounded-lg border border-st-dark-lighter">
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-st-light/70" />
            <div>
              <Label className="text-st-light font-medium">Bot Status</Label>
              <p className="text-xs text-st-light/70">Enable automated trading</p>
            </div>
          </div>
          <Switch
            checked={config.isActive}
            onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, isActive: checked }))}
            disabled={isDisabled}
            className="data-[state=checked]:bg-st-mint"
          />
        </div>

        {/* Trading Pairs Selection */}
        <div className="space-y-3">
          <Label className="text-st-light font-medium">Trading Pairs</Label>
          <div className="space-y-2">
            {config.selectedPairs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.selectedPairs.map((pair) => (
                  <Badge key={pair} variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 pr-1">
                    {pair}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-st-mint/30"
                      onClick={() => removePair(pair)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Pair Selection Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowPairDropdown(!showPairDropdown)}
                className="w-full justify-start border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
                disabled={isDisabled}
              >
                Select trading pairs...
              </Button>

              {showPairDropdown && (
                <Card className="absolute top-full left-0 right-0 z-10 mt-1 bg-st-dark border-st-dark-lighter">
                  <CardContent className="p-2">
                    {availablePairs.map((pair) => (
                      <div
                        key={pair.value}
                        className="flex items-center justify-between p-2 hover:bg-st-dark-lighter rounded cursor-pointer"
                        onClick={() => handlePairToggle(pair.value)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={config.selectedPairs.includes(pair.value)}
                            readOnly
                            className="rounded border-st-dark-lighter"
                          />
                          <span className="text-st-light text-sm">{pair.label}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            pair.volume === "High"
                              ? "bg-st-mint/20 text-st-mint"
                              : pair.volume === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-st-light/20 text-st-light"
                          }`}
                        >
                          {pair.volume}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Target Price */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-st-light font-medium">Price Target</Label>
            <select
              value={config.targetPriceType}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  targetPriceType: e.target.value as "max" | "min",
                }))
              }
              disabled={isDisabled}
              className="border-st-dark-lighter text-st-light bg-st-dark p-2 rounded"
            >
              <option value="max">Max Price</option>
              <option value="min">Min Price</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-st-light font-medium">Target Value</Label>
            <Input
              type="number"
              placeholder="2500.00"
              value={config.targetPrice}
              onChange={(e) => setConfig((prev) => ({ ...prev, targetPrice: e.target.value }))}
              className="border-st-dark-lighter text-st-light bg-st-dark placeholder:text-st-light/50"
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Max Slippage */}
        <div className="space-y-2">
          <Label className="text-st-light font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-st-light/70" />
            Max Allowed Slippage (%)
          </Label>
          <Input
            type="number"
            step="0.1"
            value={config.maxSlippage}
            onChange={(e) => setConfig((prev) => ({ ...prev, maxSlippage: e.target.value }))}
            className="border-st-dark-lighter text-st-light bg-st-dark"
            disabled={isDisabled}
          />
        </div>

        {/* Amount Per Trade */}
        <div className="space-y-2">
          <Label className="text-st-light font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-st-light/70" />
            Amount Per Trade
          </Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.05"
            value={config.amountPerTrade}
            onChange={(e) => setConfig((prev) => ({ ...prev, amountPerTrade: e.target.value }))}
            className="border-st-dark-lighter text-st-light bg-st-dark placeholder:text-st-light/50"
            disabled={isDisabled}
          />
          <p className="text-xs text-st-light/70">ETH equivalent value per trade</p>
        </div>

        {/* Session Duration */}
        <div className="space-y-2">
          <Label className="text-st-light font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-st-light/70" />
            Session Duration
          </Label>
          <select
            value={config.sessionDuration}
            onChange={(e) => setConfig((prev) => ({ ...prev, sessionDuration: e.target.value }))}
            disabled={isDisabled}
            className="border-st-dark-lighter text-st-light bg-st-dark p-2 rounded"
          >
            {sessionDurations.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>

        {/* Start Bot Button */}
        <Button
          onClick={handleStartBot}
          disabled={!isFormValid || isDisabled}
          className="w-full bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Bot className="h-5 w-5 mr-2" />
          Start Bot
        </Button>

        {!isFormValid && (
          <p className="text-sm text-st-light/70 text-center">
            Please select trading pairs, set target price, and amount per trade to continue
          </p>
        )}
      </CardContent>
    </Card>
  )
}