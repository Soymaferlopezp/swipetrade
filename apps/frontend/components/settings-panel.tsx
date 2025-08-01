"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Palette,
  Zap,
  Coins,
  Clock,
  Wallet,
  Settings,
  Moon,
  Sun,
  Check,
  RefreshCw,
  Copy,
  ExternalLink,
} from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

interface TradePlannerFilters {
  lowGasFees: boolean
  stablecoins: boolean
  quickTrades: boolean
}

export function SettingsPanel() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet()
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [tradePlannerFilters, setTradePlannerFilters] = useState<TradePlannerFilters>({
    lowGasFees: false,
    stablecoins: true,
    quickTrades: false,
  })
  const [copiedAddress, setCopiedAddress] = useState(false)

  const handleFilterToggle = (filter: keyof TradePlannerFilters) => {
    setTradePlannerFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  const handleReconnectWallet = async () => {
    if (isConnected) {
      disconnectWallet()
      // Small delay before reconnecting
      setTimeout(() => {
        connectWallet()
      }, 500)
    } else {
      connectWallet()
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddressToClipboard = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
      } catch (err) {
        console.error("Failed to copy address:", err)
      }
    }
  }

  const getFilterIcon = (filter: keyof TradePlannerFilters) => {
    switch (filter) {
      case "lowGasFees":
        return <Zap className="h-4 w-4" />
      case "stablecoins":
        return <Coins className="h-4 w-4" />
      case "quickTrades":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  const getFilterDescription = (filter: keyof TradePlannerFilters) => {
    switch (filter) {
      case "lowGasFees":
        return "Prioritize swaps with gas fees under $2"
      case "stablecoins":
        return "Show only stable cryptocurrency pairs"
      case "quickTrades":
        return "Display swaps with execution time < 0.5s"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Visual Preferences */}
      <Card className="bg-st-dark-lighter border-st-dark-lighter">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-st-mint/20 rounded-lg">
              <Palette className="h-5 w-5 text-st-mint" />
            </div>
            <div>
              <CardTitle className="text-st-light">Visual Preferences</CardTitle>
              <p className="text-sm text-st-light/70 mt-1">Customize your app appearance</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-st-dark rounded-lg border border-st-dark-lighter">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-st-mint/20 rounded-lg">
                {isDarkMode ? <Moon className="h-4 w-4 text-st-mint" /> : <Sun className="h-4 w-4 text-st-mint" />}
              </div>
              <div>
                <Label className="text-st-light font-medium">Theme Mode</Label>
                <p className="text-xs text-st-light/70">
                  {isDarkMode ? "Dark mode is active" : "Light mode is active"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-st-light/70">Light</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-st-mint"
              />
              <span className="text-sm text-st-light/70">Dark</span>
            </div>
          </div>

          <div className="text-xs text-st-light/70 bg-st-dark/50 p-3 rounded-lg">
            <p>💡 Theme changes will be applied across the entire application</p>
          </div>
        </CardContent>
      </Card>

      {/* Trade Planner */}
      <Card className="bg-st-dark-lighter border-st-dark-lighter">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-st-mint/20 rounded-lg">
              <Settings className="h-5 w-5 text-st-mint" />
            </div>
            <div>
              <CardTitle className="text-st-light">Trade Planner</CardTitle>
              <p className="text-sm text-st-light/70 mt-1">Set your trading preferences and filters</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(tradePlannerFilters).map(([key, isActive]) => {
              const filterKey = key as keyof TradePlannerFilters
              const filterLabels = {
                lowGasFees: "Only low gas fees",
                stablecoins: "Only stablecoins",
                quickTrades: "Quick trades",
              }

              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? "bg-st-mint/10 border-st-mint/30"
                      : "bg-st-dark border-st-dark-lighter hover:border-st-mint/20"
                  }`}
                  onClick={() => handleFilterToggle(filterKey)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-st-mint/20" : "bg-st-light/10"}`}>
                        {getFilterIcon(filterKey)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Label className="text-st-light font-medium cursor-pointer">{filterLabels[filterKey]}</Label>
                          {isActive && (
                            <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-st-light/70 mt-1">{getFilterDescription(filterKey)}</p>
                      </div>
                    </div>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => handleFilterToggle(filterKey)}
                      className="data-[state=checked]:bg-st-mint"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <Separator className="bg-st-dark-lighter" />

          <div className="bg-st-dark/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-st-mint" />
              <span className="text-sm font-medium text-st-light">Active Filters Summary</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(tradePlannerFilters)
                .filter(([, isActive]) => isActive)
                .map(([key]) => {
                  const filterLabels = {
                    lowGasFees: "Low Gas Fees",
                    stablecoins: "Stablecoins Only",
                    quickTrades: "Quick Trades",
                  }
                  return (
                    <Badge key={key} variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
                      {filterLabels[key as keyof TradePlannerFilters]}
                    </Badge>
                  )
                })}
              {Object.values(tradePlannerFilters).every((filter) => !filter) && (
                <span className="text-sm text-st-light/70">No filters active</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Settings */}
      <Card className="bg-st-dark-lighter border-st-dark-lighter">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-st-mint/20 rounded-lg">
              <Wallet className="h-5 w-5 text-st-mint" />
            </div>
            <div>
              <CardTitle className="text-st-light">Wallet</CardTitle>
              <p className="text-sm text-st-light/70 mt-1">Manage your wallet connection and settings</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected && walletAddress ? (
            <>
              {/* Connected Wallet Display */}
              <div className="p-4 bg-st-mint/10 border border-st-mint/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-st-mint/20 rounded-full">
                      <Check className="h-5 w-5 text-st-mint" />
                    </div>
                    <div>
                      <p className="font-medium text-st-light">Wallet Connected</p>
                      <p className="text-sm text-st-light/70">Ready for trading</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
                    Active
                  </Badge>
                </div>

                {/* Wallet Address */}
                <div className="bg-st-dark rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-st-light/70 mb-1">Wallet Address</p>
                      <p className="font-mono text-sm text-st-light">{formatAddress(walletAddress)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAddressToClipboard}
                        className="h-8 w-8 p-0 text-st-light/70 hover:text-st-mint hover:bg-st-mint/10"
                      >
                        {copiedAddress ? <Check className="h-4 w-4 text-st-mint" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-st-light/70 hover:text-st-mint hover:bg-st-mint/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Actions */}
              <div className="grid gap-3 md:grid-cols-2">
                <Button
                  onClick={handleReconnectWallet}
                  variant="outline"
                  className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reconnect Wallet
                </Button>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-st-red/30 text-st-red hover:bg-st-red/10 bg-transparent"
                >
                  Disconnect
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Disconnected State */}
              <div className="p-4 bg-st-red/10 border border-st-red/30 rounded-lg text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-st-red/20 rounded-full mx-auto mb-3">
                  <Wallet className="h-6 w-6 text-st-red" />
                </div>
                <p className="font-medium text-st-light mb-1">No Wallet Connected</p>
                <p className="text-sm text-st-light/70 mb-4">Connect your wallet to start trading</p>
                <Button onClick={connectWallet} className="bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </>
          )}

          {/* Wallet Info */}
          <div className="bg-st-dark/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-st-light mb-2">Wallet Information</h4>
            <div className="space-y-2 text-xs text-st-light/70">
              <div className="flex items-center justify-between">
                <span>Network</span>
                <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs">
                  Ethereum Mainnet
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Connection Type</span>
                <span>Non-custodial</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security</span>
                <span className="text-st-mint">🔒 Encrypted</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
