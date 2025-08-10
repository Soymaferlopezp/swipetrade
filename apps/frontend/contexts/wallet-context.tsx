"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { ethers } from "ethers";

// ⚠️ Importa la función o el hook de tu store de estado global
// Por ejemplo, si usas Zustand o Redux
// import { useTradeStore } from '@/stores/trade-store';

export interface WalletContextType {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signer: ethers.Signer | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProviderContext = ({ children }: { children: ReactNode }) => {
  const { address, isConnected, isDisconnected } = useAccount(); // ⚠️ Añadir isDisconnected
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // ⚠️ Agrega un efecto para la limpieza global al desconectar
  useEffect(() => {
    // Aquí colocarás la lógica para limpiar el estado
    if (isDisconnected) {
      console.log("Wallet disconnected. Cleaning up global state.");

      // ⚠️ Reemplaza esta línea con la función real para limpiar tus trades
      // Por ejemplo, si usas Zustand:
      // const resetTrades = useTradeStore.getState().resetTrades;
      // resetTrades();
      // O si simplemente usas un hook local, podrías llamar a una función
      // que recarga la página o limpia el estado de forma manual
    }

    // También puedes asegurarte de que el signer se limpie al desconectar
    if (!isConnected) {
      setSigner(null);
    }
  }, [isConnected, isDisconnected]);


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
    // setSigner(null); ⚠️ Ya no es necesario aquí, el useEffect de arriba se encargará de esto
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
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
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










