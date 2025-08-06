'use client'

import { useEffect, useState } from 'react'
import { useWalletContext } from '@/contexts/wallet-context'
import { toast } from 'sonner'
import SwapCard from './swap-card'
import { SwapData } from '@/types/swap'
import { ethers } from 'ethers'

export default function CardStack() {
  const [recommendations, setRecommendations] = useState<SwapData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { signer, isConnected, address } = useWalletContext()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/swaps/recommendations')
        const data = await res.json()
        setRecommendations(data)
        console.log("📥 Recommendations fetched:", data)
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err)
        toast.error("Failed to fetch swap recommendations")
      }
    }
    fetchRecommendations()
  }, [])

  const handleSwipeRight = async (swap: SwapData) => {
    if (!signer || !isConnected) {
      toast.error("Wallet not connected")
      console.warn("⚠️ signer or wallet not available:", { signer, isConnected })
      return
    }

    try {
      const tx = {
        to: swap.destinationAddress || address,
        value: ethers.utils.parseEther('0')
      }

      console.log("🚀 Preparing transaction with signer:", signer)
      console.log("📤 Transaction payload:", tx)

      const transactionResponse = await signer.sendTransaction(tx)
      console.log("✅ Transaction sent:", transactionResponse)

      await transactionResponse.wait()
      console.log("⏱ Transaction confirmed")

      const payload = {
        ...swap,
        userAddress: address,
        txHash: transactionResponse.hash,
        type: 'manual',
        timestamp: new Date().toISOString(),
      }

      console.log("📦 Payload to backend:", payload)

      const backendRes = await fetch('http://localhost:3001/api/swaps/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const backendData = await backendRes.json()
      console.log("🧾 Backend response:", backendData)

      toast.success("Swap executed successfully")
      setCurrentIndex((prev) => prev + 1)
      window.dispatchEvent(new Event("recent-activity-refresh"))
    } catch (error) {
      console.error("❌ Swap execution failed:", error)
      toast.error("Swap execution failed")
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  const currentSwap = recommendations[currentIndex]

  return (
    <div className="space-y-6">
      {currentSwap ? (
        <SwapCard
          {...{
            ...currentSwap,
            id: currentSwap.id || `${currentSwap.pair}-${currentSwap.timestamp || Date.now()}`, // 🛠 fallback simple
            timestamp: currentSwap.timestamp || new Date().toISOString(),
            type: "manual"
          }}
          onNext={handleNext}
          onSwipeRight={handleSwipeRight}
        />
      ) : (
        <p className="text-center text-st-light/70">No more recommendations</p>
      )}
    </div>
  )
}




