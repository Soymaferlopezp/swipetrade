"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  walletAddress: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Mock wallet connection - in real app this would integrate with Web3
  const connectWallet = async () => {
    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock wallet address
      const mockAddress = "0xA23B4C5D6E7F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T"
      setWalletAddress(mockAddress)
      setIsConnected(true)

      // Store in localStorage for persistence
      localStorage.setItem("wallet_connected", "true")
      localStorage.setItem("wallet_address", mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress(null)
    localStorage.removeItem("wallet_connected")
    localStorage.removeItem("wallet_address")
  }

  // Check for existing connection on mount
  useEffect(() => {
    const savedConnection = localStorage.getItem("wallet_connected")
    const savedAddress = localStorage.getItem("wallet_address")

    if (savedConnection === "true" && savedAddress) {
      setIsConnected(true)
      setWalletAddress(savedAddress)
    }
  }, [])

  // Simulate random disconnection for demo (remove in production)
  useEffect(() => {
    if (isConnected) {
      const randomDisconnect = setTimeout(() => {
        // 10% chance of random disconnect after 30 seconds (for demo purposes)
        if (Math.random() < 0.1) {
          disconnectWallet()
        }
      }, 30000)

      return () => clearTimeout(randomDisconnect)
    }
  }, [isConnected])

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
