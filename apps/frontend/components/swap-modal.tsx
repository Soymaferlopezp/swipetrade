'use client'

import { useState } from 'react'
import { SwapData } from '@/types/swap'

type Props = {
  pair: string
  price: number
  slippage: number
  gasFee: number
  label: string
  volume: string
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export default function SwapModal({
  pair,
  price,
  slippage,
  gasFee,
  onCancel,
  onConfirm,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await onConfirm()
    } catch (err) {
      console.error('❌ Error on confirm:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1c1c2c] p-6 rounded-xl w-full max-w-md shadow-lg text-white space-y-4">
        <h2 className="text-2xl font-bold">Confirm Swap</h2>

        <div className="space-y-2 text-sm">
          <p>💱 Pair: <span className="font-semibold">{pair}</span></p>
          <p>💰 Price: <span className="font-semibold">${price}</span></p>
          <p>📉 Slippage: {slippage}%</p>
          <p>⛽ Gas Fee: ${gasFee}</p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Swap'}
          </button>
        </div>
      </div>
    </div>
  )
}

