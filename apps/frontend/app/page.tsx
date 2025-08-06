"use client"
import { useRouter } from "next/navigation"
import { useWalletContext, WalletProviderContext } from "@/contexts/wallet-context"
import { LandingPageNew } from "@/components/landing-page-new"



function HomePage() {
  const { isConnected } = useWalletContext()
  const router = useRouter()

  // Don't auto-redirect anymore - let users explore the landing page
  // They can manually navigate to /swipe when ready

  return <LandingPageNew />
}

export default function RootPage() {
  return (
    <WalletProviderContext>
      <HomePage />
    </WalletProviderContext>
  )
}
