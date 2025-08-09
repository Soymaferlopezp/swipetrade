'use client'

import { useState } from 'react'
import { SwapData } from '@/types/swap'
import SwapModal from './swap-modal'
import { API_BASE } from "@/lib/api";

type Props = SwapData & {
  onNext: () => void
  onSwipeRight: (swap: SwapData) => Promise<void>
}

export default function SwapCard({
  pair,
  price,
  slippage,
  gasFee,
  label,
  volume,
  timestamp,
  onNext,
  onSwipeRight
}: Props) {
  const [tokenA, tokenB] = pair.split('/')
  const [showModal, setShowModal] = useState(false)

  const recordSwap = async (action: 'accepted' | 'rejected') => {
    const [base, quote] = pair.split('/')
    const body = {
      pair,
      base,
      quote,
      price,
      amount: parseFloat(volume),
      action,
      status: action === 'accepted' ? 'confirmed' : 'rejected',
      tradeType: 'manual',
      timestamp: new Date().toISOString(),
    }

    try {
      const res = await fetch(`${API_BASE}/api/swaps/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await res.json()
      window.dispatchEvent(new Event('recent-activity-refresh'))
    } catch (err) {
      console.error(`❌ Error saving ${action} swap (history):`, err)
    }
  }

  const handleAccept = async (): Promise<void> => {
    setShowModal(false)
    await recordSwap('accepted')

    // 👉 Construye el swap en el momento, sin estado local
    const swapNow: SwapData = {
      id: crypto.randomUUID(),
      pair,
      price,
      slippage,
      gasFee,
      label,
      volume,
      type: 'manual',
      timestamp: timestamp || new Date().toISOString(),
    }

    await onSwipeRight(swapNow)
  }

  const handleReject = async () => {
    await recordSwap('rejected')
    onNext()
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-[#1c1c2c] border border-[#333] rounded-2xl p-6 shadow-lg text-white flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span>{tokenA}</span>
          <span className="text-gray-400">→</span>
          <span>{tokenB}</span>
          <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded-full">{label}</span>
        </div>

        <div className="text-4xl font-extrabold text-green-400">${price}</div>
        <div className="text-sm text-green-500">↑ +2.4%</div>

        <div className="w-full flex flex-col gap-2 text-sm mt-4">
          <div className="flex justify-between">
            <span>💸 Estimated Slippage:</span>
            <span>{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span>⛽ Gas Fee:</span>
            <span>${gasFee}</span>
          </div>
          <div className="flex justify-between">
            <span>📊 Volume:</span>
            <span>{volume}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4 w-full justify-center">
          <button
            onClick={handleReject}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
          >
            Reject
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>

      {showModal && (
        <SwapModal
          pair={pair}
          price={Number(price)}
          slippage={Number(slippage)}
          gasFee={Number(gasFee)}
          label={label}
          volume={volume}
          onCancel={() => setShowModal(false)}
          onConfirm={handleAccept}
        />
      )}
    </>
  )
}