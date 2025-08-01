"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Wallet } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

interface WalletStatusProps {
  className?: string
}

export function WalletStatus({ className }: WalletStatusProps) {
  const { isConnected, walletAddress, connectWallet } = useWallet()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected && walletAddress) {
    return (
      <Badge
        variant="secondary"
        className={`bg-st-mint/20 text-st-mint border-st-mint/30 hover:bg-st-mint/30 transition-colors ${className}`}
      >
        <Check className="h-3 w-3 mr-2" />
        {formatAddress(walletAddress)}
      </Badge>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      size="sm"
      className={`bg-st-mint text-st-dark hover:bg-st-mint/90 font-medium ${className}`}
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  )
}
