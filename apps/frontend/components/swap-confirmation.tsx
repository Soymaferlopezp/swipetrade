import { SwapData } from '@/types/swap'

type Props = {
  data: SwapData
  onClose: () => void
}

export default function SwapConfirmation({ data, onClose }: Props) {
  const { pair, price, slippage, gasFee, txHash } = data

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1c1c2c] p-6 rounded-xl w-full max-w-md shadow-lg text-white space-y-4">
        <h2 className="text-2xl font-bold">✅ Swap Executed</h2>

        <div className="space-y-2 text-sm">
          <p>💱 Pair: <span className="font-semibold">{pair}</span></p>
          <p>💰 Price: <span className="font-semibold">${price}</span></p>
          <p>📉 Slippage: {slippage}%</p>
          <p>⛽ Gas Fee: ${gasFee}</p>
          {txHash && (
            <p>
              🔗 Tx Hash:{' '}
              <a
                href={`https://explorer.okx.com/en/address/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline break-all"
              >
                {txHash.slice(0, 10)}...
              </a>
            </p>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}