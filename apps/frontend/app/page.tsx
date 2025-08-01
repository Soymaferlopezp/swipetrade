"use client"
import { useRouter } from "next/navigation"
import { WalletProvider, useWallet } from "@/contexts/wallet-context"
import { LandingPageNew } from "@/components/landing-page-new"

function HomePage() {
  const { isConnected } = useWallet()
  const router = useRouter()

  // Don't auto-redirect anymore - let users explore the landing page
  // They can manually navigate to /swipe when ready

  return <LandingPageNew />
}

export default function RootPage() {
  return (
    <WalletProvider>
      <HomePage />
    </WalletProvider>
  )
}
