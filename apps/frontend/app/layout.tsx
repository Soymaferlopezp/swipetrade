import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ⚠️ Usamos solo el provider de Wagmi/RainbowKit
import { WalletProvider } from "../lib/wallet"; 
import { HydratedProvider } from "@/contexts/HydratedProvider"; // Importa el nuevo componente

import '@rainbow-me/rainbowkit/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwipeTrade - Next-Gen Trading Platform",
  description: "Revolutionary swipe-based trading interface with automated bots and advanced analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ⚠️ Envuelve el WalletProvider con el HydratedProvider */}
        <HydratedProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </HydratedProvider>
      </body>
    </html>
  );
}

