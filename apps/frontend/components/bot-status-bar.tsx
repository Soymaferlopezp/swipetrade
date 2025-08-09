"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Square, Clock, TrendingUp, Shield, Zap } from "lucide-react"

export interface BotSession {
  startTime: Date
  swapCount: number
  successfulSwaps: number
  totalVolume: string
  currentPairs: string[]
}

interface BotStatusBarProps {
  isActive: boolean
  session: BotSession | null
  onStopBot: () => void
}

export function BotStatusBar({ isActive, session, onStopBot }: BotStatusBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // 🔹 Timer para actualizar el tiempo en vivo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 🔹 Si no hay sesión activa, no mostramos nada
  if (!isActive || !session) return null

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getSessionDuration = () => {
    const diff = currentTime.getTime() - new Date(session.startTime).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const getSuccessRate = () => {
    if (session.swapCount === 0) return "0%"
    return `${Math.round((session.successfulSwaps / session.swapCount) * 100)}%`
  }

  return (
    <Card className="bg-st-mint/10 border-st-mint/30 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="h-6 w-6 text-st-mint" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-st-mint rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-st-light">Bot Active</span>
                  <Badge
                    variant="secondary"
                    className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs"
                  >
                    LIVE
                  </Badge>
                </div>
                <p className="text-sm text-st-light/70">
                  Since {formatTime(session.startTime)} • Running for {getSessionDuration()}
                </p>
              </div>
            </div>

            {/* Stats Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-st-mint" />
                <div>
                  <p className="text-sm font-medium text-st-light">{session.swapCount} swaps</p>
                  <p className="text-xs text-st-light/70">{getSuccessRate()} success</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-st-mint" />
                <div>
                  <p className="text-sm font-medium text-st-light">{session.totalVolume}</p>
                  <p className="text-xs text-st-light/70">Total volume</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-st-light/70" />
                <div>
                  <p className="text-sm font-medium text-st-light">
                    {session.currentPairs.length} pairs
                  </p>
                  <p className="text-xs text-st-light/70">Active trading</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onStopBot}
              variant="outline"
              size="sm"
              className="border-st-red/30 text-st-red hover:bg-st-red/10 bg-transparent"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Bot
            </Button>
          </div>
        </div>

        {/* Stats Mobile */}
        <div className="md:hidden mt-3 pt-3 border-t border-st-mint/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-st-mint">{session.swapCount}</p>
              <p className="text-xs text-st-light/70">Swaps</p>
            </div>
            <div>
              <p className="text-lg font-bold text-st-mint">{getSuccessRate()}</p>
              <p className="text-xs text-st-light/70">Success</p>
            </div>
            <div>
              <p className="text-lg font-bold text-st-mint">{session.totalVolume}</p>
              <p className="text-xs text-st-light/70">Volume</p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-3 pt-3 border-t border-st-mint/20">
          <div className="flex items-center gap-2 text-xs text-st-light/70">
            <Shield className="h-3 w-3 text-st-mint" />
            <span>Non-custodial – operates under configured rules</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

