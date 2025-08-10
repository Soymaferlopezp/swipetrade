import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import { WalletProvider } from "../lib/wallet"; 


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
        
        
          <WalletProvider>
            {children}
          </WalletProvider>
       
      </body>
    </html>
  );
}

