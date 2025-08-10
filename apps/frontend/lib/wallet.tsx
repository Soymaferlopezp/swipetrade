'use client'

import { ReactNode } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http('https://cloudflare-eth.com'),
  },
})

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}