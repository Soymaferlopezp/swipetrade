"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Bot,
  History,
  Shield,
  ArrowRight,
  Check,
  Wallet,
  TrendingUp,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useWalletContext } from "@/contexts/wallet-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export function LandingPageNew() {
  const { address, isConnected } = useWalletContext()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push("/swipe")
    }
  }, [isConnected, router])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const features = [
    {
      icon: Smartphone,
      title: "Swipe to Trade",
      description: "Accept or reject trading opportunities with intuitive swipe gestures",
      color: "text-st-mint",
    },
    {
      icon: Bot,
      title: "Automated Bot Trading",
      description: "Set custom rules and let our bots trade 24/7 while you sleep",
      color: "text-st-mint",
    },
    {
      icon: History,
      title: "Clear Trade History",
      description: "Track all your trades with detailed analytics and performance metrics",
      color: "text-st-mint",
    },
    {
      icon: Shield,
      title: "Non-custodial & Secure",
      description: "Your keys, your crypto. We never hold your funds or private keys",
      color: "text-st-mint",
    },
  ]

  return (
    <div className="min-h-screen bg-st-dark text-st-light">
      {/* Header */}
      <header className="border-b border-st-dark-lighter">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image src="/swipetrade-logo.png" alt="SwipeTrade" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-st-light">SwipeTrade</h1>
                <p className="text-xs text-st-light/70">Next-Gen Trading</p>
              </div>
            </div>

            {/* Wallet Connect */}
            <div className="flex items-center gap-4">
              {isConnected && address ? (
                <Badge variant="secondary" className="bg-st-mint/20 text-st-mint border-st-mint/30">
                  <Check className="h-3 w-3 mr-2" />
                  {formatAddress(address)}
                </Badge>
              ) : (
                <ConnectButton showBalance={false} chainStatus="none" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="bg-st-mint/10 text-st-mint border-st-mint/30 mb-8 text-sm px-4 py-2"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Revolutionary Trading Experience
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-st-light via-st-mint to-st-light bg-clip-text text-transparent">
              SwipeTrade: Trade like you swipe
            </h1>

            <p className="text-xl md:text-2xl text-st-light/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of trading with our intuitive swipe interface, automated bots,
              and comprehensive analytics — all in one platform.
            </p>

            <div className="mb-12 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-st-mint/20 to-st-mint/5 rounded-3xl flex items-center justify-center border border-st-mint/20">
                  <Smartphone className="h-16 w-16 text-st-mint" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-st-mint/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-st-mint" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-st-mint/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-st-mint" />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ConnectButton showBalance={false} chainStatus="none" />
            </div>

            {isConnected && (
              <p className="text-sm text-st-mint mt-4 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Wallet connected — Redirecting...
              </p>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-st-light mb-4">
              Why Choose SwipeTrade?
            </h2>
            <p className="text-lg text-st-light/70 max-w-2xl mx-auto">
              Built for modern traders who demand speed, security, and simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-st-dark-lighter border-st-dark-lighter hover:border-st-mint/30 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-st-mint/10 rounded-2xl flex items-center justify-center group-hover:bg-st-mint/20 transition-colors">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-st-light mb-3">{feature.title}</h3>
                  <p className="text-st-light/70 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <Card className="bg-st-dark-lighter border-st-dark-lighter">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-st-mint mb-2">10K+</div>
                  <p className="text-st-light/70">Active Traders</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-st-mint mb-2">$50M+</div>
                  <p className="text-st-light/70">Volume Traded</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-st-mint mb-2">99.9%</div>
                  <p className="text-st-light/70">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-st-dark-lighter mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <Badge
                variant="secondary"
                className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-lg px-6 py-3"
              >
                🏆 Built for OKX Hackathon — ETHCC 2025
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-st-light/70">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">OKX</span>
                </div>
                <span className="text-sm">OKX</span>
              </div>
              <div className="flex items-center gap-2 text-st-light/70">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">Ξ</span>
                </div>
                <span className="text-sm">Ethereum</span>
              </div>
              <div className="flex items-center gap-2 text-st-light/70">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">DH</span>
                </div>
                <span className="text-sm">DoraHacks</span>
              </div>
            </div>
            <div className="text-st-light/50 text-sm">
              <p>&copy; 2025 SwipeTrade. Built with ❤️ for the future of trading.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}





