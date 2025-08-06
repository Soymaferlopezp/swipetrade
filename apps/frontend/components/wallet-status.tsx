"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Wallet } from "lucide-react";
import { useWalletContext } from "@/contexts/wallet-context"; // ✅ Corrección aquí

interface WalletStatusProps {
  className?: string;
}

export function WalletStatus({ className }: WalletStatusProps) {
  const { isConnected, address, connectWallet } = useWalletContext(); // ✅ address en vez de walletAddress

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (isConnected && address) {
    return (
      <Badge
        variant="secondary"
        className={`bg-st-mint/20 text-st-mint border-st-mint/30 hover:bg-st-mint/30 transition-colors ${className}`}
      >
        <Check className="h-3 w-3 mr-2" />
        {formatAddress(address)}
      </Badge>
    );
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
  );
}
