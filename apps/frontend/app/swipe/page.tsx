"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import CardStack from "@/components/card-stack"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

export default function SwipePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-st-light">Swipe Trading</h1>
            <p className="text-st-light/70 mt-1">Swipe through trading opportunities and make instant decisions</p>
          </div>
          <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
            Live Trading
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">Total Balance</CardTitle>
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
              <CardTitle className="text-sm font-medium text-st-light">Active Trades</CardTitle>
              <Activity className="h-4 w-4 text-st-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-light">12</div>
              <p className="text-xs text-st-light/70">3 pending execution</p>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">Today's P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-st-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-st-mint">+$1,234.56</div>
              <p className="text-xs text-st-mint">+5.2% gain today</p>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-st-light">Win Rate</CardTitle>
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
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-st-mint rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-st-light">BTC/USD Buy</p>
                  <p className="text-xs text-st-light/70">2 minutes ago</p>
                </div>
                <span className="text-sm text-st-mint">+$234</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-st-red rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-st-light">ETH/USD Sell</p>
                  <p className="text-xs text-st-light/70">5 minutes ago</p>
                </div>
                <span className="text-sm text-st-red">-$89</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-st-mint rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-st-light">AAPL Buy</p>
                  <p className="text-xs text-st-light/70">12 minutes ago</p>
                </div>
                <span className="text-sm text-st-mint">+$156</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
