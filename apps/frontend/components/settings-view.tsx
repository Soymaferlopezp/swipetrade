"use client"

import { SettingsPanel } from "./settings-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Zap, Info } from "lucide-react"

export function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-st-light">Settings</h1>
          <p className="text-st-light/70 mt-1">Customize your SwipeTrade experience</p>
        </div>
        <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
          <Settings className="h-3 w-3 mr-1" />
          Preferences
        </Badge>
      </div>

      {/* Main Settings Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SettingsPanel />
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <Info className="h-5 w-5 text-st-mint" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-st-light/70">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Enable trade filters to see only opportunities that match your strategy</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Dark mode reduces eye strain during extended trading sessions</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-st-mint rounded-full mt-2 flex-shrink-0" />
                <p>Keep your wallet connected for seamless trading experience</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <Shield className="h-5 w-5 text-st-mint" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-st-light/70">
              <div className="flex items-center justify-between">
                <span>Wallet Security</span>
                <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs">
                  Secure
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Connection Type</span>
                <span className="text-st-light">Non-custodial</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Privacy</span>
                <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30 text-xs">
                  Protected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardHeader>
              <CardTitle className="text-st-light flex items-center gap-2">
                <Zap className="h-5 w-5 text-st-mint" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-st-mint mb-1">Fast</div>
                <p className="text-xs text-st-light/70">Current trade execution speed</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-st-light">0.3s</p>
                  <p className="text-xs text-st-light/70">Avg Response</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-st-light">99.8%</p>
                  <p className="text-xs text-st-light/70">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
