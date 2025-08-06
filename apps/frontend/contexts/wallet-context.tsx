"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { ethers } from "ethers"; // ✅ Ethers v5 compatible

export interface WalletContextType {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signer: ethers.Signer | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProviderContext = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const connectWallet = async () => {
    const metamask = connectors.find((c) => c.id === "injected");
    if (!metamask) {
      console.error("No injected wallet found");
      return;
    }
    await connect({ connector: metamask });
  };

  const disconnectWallet = () => {
    disconnect();
    setSigner(null);
  };

  useEffect(() => {
    if (!isConnected && pathname.startsWith("/swipe")) {
      router.push("/");
    }
  }, [isConnected, pathname, router]);

  useEffect(() => {
    const setupSigner = async () => {
      if (typeof window !== "undefined" && window.ethereum && walletClient) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          // 👇 NECESARIO para que ethers reconozca la cuenta #0
          await provider.send("eth_requestAccounts", []);

          const signer = provider.getSigner();
          const address = await signer.getAddress(); // 👈 validación

          console.log("🔐 Signer ready:", signer);
          console.log("📬 Address:", address);

          setSigner(signer);
        } catch (error) {
          console.error("❌ Failed to get signer:", error);
          setSigner(null);
        }
      } else {
        setSigner(null);
      }
    };

    setupSigner();
  }, [walletClient]);

  const contextValue: WalletContextType = {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    signer,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProviderContext");
  }
  return context;
};











