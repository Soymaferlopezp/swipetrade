"use client"
import { useRouter } from "next/navigation"
import { useWalletContext, WalletProviderContext } from "@/contexts/wallet-context"
import { LandingPageNew } from "@/components/landing-page-new"

function HomePage() {
  const { isConnected } = useWalletContext()
  const router = useRouter()

  return <LandingPageNew />
}

export default function RootPage() {
  return (
    <WalletProviderContext>
      <HomePage />
    </WalletProviderContext>
  )
}
