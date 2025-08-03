import { useState } from 'react';
import { SwapData } from '@/types/swap';
import SwapModal from './swap-modal';

type Props = SwapData & {
  onNext: () => void;
};

export default function SwapCard({
  pair,
  price,
  slippage,
  gasFee,
  label,
  volume,
  onNext,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [executed, setExecuted] = useState(false);

  const [tokenA, tokenB] = pair.split('/');

const recordSwap = async (action: 'accepted' | 'rejected') => {
  const [base, quote] = pair.split('/');
  const body = {
    pair,
    base,
    quote,
    price,
    amount: parseFloat(volume), // puede usar volume como cantidad aproximada
    action,
    status: action === 'accepted' ? 'confirmed' : 'rejected',
    tradeType: 'manual',
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch('http://localhost:3001/api/swaps/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('✅ Swap recorded:', data);

    window.dispatchEvent(new Event("recent-activity-refresh"));
  } catch (err) {
    console.error('❌ Error saving swap:', err);
  }
};

  return (
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
          onClick={() => {
            recordSwap('rejected');
            onNext();
          }}
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

      {showModal && (
        <SwapModal
          pair={pair}
          price={price}
          slippage={slippage}
          gasFee={gasFee}
          label={label}
          volume={volume}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            recordSwap('accepted');
            setShowModal(false);
            setExecuted(true);
            setTimeout(() => {
              onNext();
              setExecuted(false);
            }, 1000);
          }}
        />
      )}

      {executed && (
        <div className="mt-4 text-green-400 text-sm">✅ Swap Executed (Simulado)</div>
      )}
    </div>
  );
}




