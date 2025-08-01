"use client"

import type * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Smartphone, Bot, History, Settings, LogOut, Check, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/contexts/wallet-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Swipe",
    icon: Smartphone,
    url: "/swipe",
  },
  {
    title: "Bot Mode",
    icon: Bot,
    url: "/bot-mode",
  },
  {
    title: "Trade History",
    icon: History,
    url: "/trade-history",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
]

interface SideNavProps extends React.ComponentProps<typeof Sidebar> {}

export function SideNav({ ...props }: SideNavProps) {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet()
  const pathname = usePathname()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Sidebar className="border-r border-st-dark-lighter" {...props}>
      <SidebarHeader className="border-b border-st-dark-lighter">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image src="/swipetrade-logo.png" alt="SwipeTrade" fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-st-light">SwipeTrade</span>
            <span className="text-xs text-st-light/70">Trading Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-12 text-st-light hover:bg-st-dark-lighter hover:text-st-mint data-[active=true]:bg-st-mint data-[active=true]:text-st-dark font-medium"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-st-dark-lighter p-4">
        {/* Dynamic Wallet Section */}
        <div className="space-y-3">
          {isConnected && walletAddress ? (
            <Card className="bg-st-mint/10 border-st-mint/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-st-mint/20 rounded-full">
                    <Check className="h-4 w-4 text-st-mint" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-st-light">Wallet Connected</p>
                    <p className="text-xs text-st-mint font-mono">{formatAddress(walletAddress)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={connectWallet}
              className="w-full h-12 bg-st-mint text-st-dark hover:bg-st-mint/90 font-semibold"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </Button>
          )}

          {/* Logout Button */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-10 text-st-light hover:bg-st-dark-lighter hover:text-st-red font-medium"
              >
                <button onClick={disconnectWallet} className="flex items-center gap-3 w-full">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
