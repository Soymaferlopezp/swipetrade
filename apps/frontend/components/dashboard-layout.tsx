"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SideNav } from "@/components/side-nav"
import { WalletProvider, useWallet } from "@/contexts/wallet-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function WalletRequiredMessage() {
  const { connectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-st-dark flex items-center justify-center p-6">
      <Card className="bg-st-dark-lighter border-st-dark-lighter max-w-md w-full text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-st-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-st-mint" />
          </div>
          <CardTitle className="text-2xl font-bold text-st-light">Wallet Required</CardTitle>
          <p className="text-st-light/70 mt-2">Please connect your wallet to access the SwipeTrade dashboard</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={connectWallet} className="w-full bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { isConnected } = useWallet()

  // Show wallet required message if not connected
  if (!isConnected) {
    return <WalletRequiredMessage />
  }

  // Show dashboard if wallet is connected
  return (
    <div className="min-h-screen bg-st-dark">
      <SidebarProvider defaultOpen={true}>
        <SideNav />
        <SidebarInset className="bg-st-dark">
          <div className="flex-1 p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <WalletProvider>
      <DashboardContent>{children}</DashboardContent>
    </WalletProvider>
  )
}
