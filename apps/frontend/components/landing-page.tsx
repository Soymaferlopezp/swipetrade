"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Smartphone, Bot, TrendingUp } from "lucide-react"
import Image from "next/image"

// ⚠️ Importa el hook de RainbowKit
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function LandingPage() {
  // ⚠️ Ya no necesitamos useWallet. La conexión se maneja con ConnectButton

  return (
    <div className="min-h-screen bg-st-dark flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image src="/swipetrade-logo.png" alt="SwipeTrade" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-st-light">SwipeTrade</h1>
              <p className="text-st-light/70">Next-Gen Trading Platform</p>
            </div>
          </div>
          <p className="text-xl text-st-light/80 max-w-2xl mx-auto">
            Connect your wallet to access the most intuitive trading experience. Swipe through opportunities, automate
            with bots, and trade like never before.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* ... (Tu código de Features aquí) ... */}
        </div>

        {/* Connect Wallet CTA */}
        <div className="text-center">
          <Card className="bg-st-dark-lighter border-st-mint/30 max-w-md mx-auto">
            <CardHeader>
              <Wallet className="h-16 w-16 text-st-mint mx-auto mb-4" />
              <CardTitle className="text-st-light text-2xl">Ready to Start Trading?</CardTitle>
              <CardDescription className="text-st-light/70">
                Connect your wallet to access the full SwipeTrade experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* ⚠️ Reemplazamos el botón por el componente de RainbowKit */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  return (
                    <div
                      {...(!mounted && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!mounted || !account || !chain) {
                          return (
                            <Button
                              onClick={openConnectModal}
                              size="lg"
                              className="w-full bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold text-lg py-6"
                            >
                              <Wallet className="h-5 w-5 mr-2" />
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button
                              onClick={openChainModal}
                              size="lg"
                              className="w-full bg-red-600 text-st-light hover:bg-red-700 font-semibold text-lg py-6"
                            >
                              Wrong network
                            </Button>
                          );
                        }
                        
                        return (
                          // Si ya está conectado y en la red correcta, no mostramos el botón
                          // Podemos mostrar el componente de cuenta aquí si quieres
                          // Por ahora, lo dejamos vacío para que el usuario sea redirigido a la app
                          <Button
                            onClick={openAccountModal}
                            size="lg"
                            className="w-full bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold text-lg py-6"
                          >
                            <Wallet className="h-5 w-5 mr-2" />
                            Wallet Connected
                          </Button>
                        );

                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
