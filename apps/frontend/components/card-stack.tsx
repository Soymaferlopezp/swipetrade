'use client'

import { useEffect, useState } from 'react'
import { useWalletContext } from '@/contexts/wallet-context'
import { toast } from 'sonner'
import SwapCard from './swap-card'
import { SwapData } from '@/types/swap'
import { ethers } from 'ethers'
import { API_BASE } from "@/lib/api";

export default function CardStack() {
  const [recommendations, setRecommendations] = useState<SwapData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { signer, isConnected, address } = useWalletContext()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/swaps/recommendations`);
        const data = await res.json()
        setRecommendations(data)
        console.log('📥 DEX Recommendations fetched:', data)
      } catch (err) {
        console.error('❌ Error fetching recommendations:', err)
        toast.error('Failed to fetch swap recommendations')
      }
    }
    fetchRecommendations()
  }, [])

  const handleSwipeRight = async (swap: SwapData) => {
    if (!signer || !isConnected) {
      toast.error('Wallet not connected')
      console.warn('⚠️ signer or wallet not available:', { signer, isConnected })
      return
    }

    try {
      // --- Derivar SIEMPRE el par desde swap.pair; fallback a base/quote si hiciera falta ---
      let baseSym = ''
      let quoteSym = ''

      if (swap?.pair && swap.pair.includes('/')) {
        const [b, q] = swap.pair.split('/')
        baseSym = (b || '').toUpperCase()
        quoteSym = (q || '').toUpperCase()
      } else {
        baseSym = (swap as any).base ? String((swap as any).base).toUpperCase() : ''
        quoteSym = (swap as any).quote ? String((swap as any).quote).toUpperCase() : ''
      }

      const canonicalPair =
        baseSym && quoteSym ? `${baseSym}/${quoteSym}` : (swap.pair || '').toUpperCase()

      console.log('🧩 Pair resolution ->', {
        incomingSwapPair: swap.pair,
        baseSym,
        quoteSym,
        canonicalPair,
      })

      // --- Tx simulada / placeholder ---
      const tx = {
        to: swap.destinationAddress || address,
        value: ethers.utils.parseEther('0.0001'), // si quieres cero, pon '0'
      }

      console.log('🚀 Sending transaction to:', tx.to)
      const transactionResponse = await signer.sendTransaction(tx)
      console.log('✅ Transaction sent:', transactionResponse)

      await transactionResponse.wait()
      console.log('⏱ Transaction confirmed')

      // --- Payload con par canónico CORRECTO ---
      const payload = {
        pair: canonicalPair,
        price: swap.price,
        volume: swap.volume,
        gasFee: swap.gasFee,
        slippage: swap.slippage,
        label: swap.label,
        destinationAddress: swap.destinationAddress,
        userAddress: address,
        txHash: transactionResponse.hash,
        type: 'manual',
        timestamp: new Date().toISOString(),
      }

      console.log('📦 Payload to /execute:', payload)

      const backendRes = await fetch(`${API_BASE}/api/swaps/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json()
      console.log('🧾 Backend /execute response:', backendData)

      toast.success('Swap executed successfully')
      setCurrentIndex((prev) => prev + 1)
      window.dispatchEvent(new Event('recent-activity-refresh'))
    } catch (error) {
      console.error('❌ Swap execution failed:', error)
      toast.error('Swap execution failed')
    }
  }

  const handleNext = () => setCurrentIndex((prev) => prev + 1)

  const currentSwap = recommendations[currentIndex]

  return (
    <div className="space-y-6">
      {currentSwap ? (
        <SwapCard
          {...{
            ...currentSwap,
            id: currentSwap.id || `${currentSwap.pair}-${currentSwap.timestamp || Date.now()}`,
            timestamp: currentSwap.timestamp || new Date().toISOString(),
            type: 'manual',
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




