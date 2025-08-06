"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Bot,
  LogOut,
  Settings,
  Wallet,
  BarChart2,
  Activity,
  Check,
} from "lucide-react"
import { useWalletContext } from "@/contexts/wallet-context"

const navItems = [
  {
    name: "Swipe Mode",
    href: "/swipe",
    icon: Activity,
  },
  {
    name: "Trade History",
    href: "/trade-history",
    icon: BarChart2,
  },
  {
    name: "Bot Mode",
    href: "/bot-mode",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SideNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { disconnectWallet, isConnected, address } = useWalletContext()

  const handleLogout = () => {
    disconnectWallet()
    router.push("/")
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <aside className="bg-st-dark-lighter w-64 h-screen px-6 py-10 flex flex-col border-r border-st-dark text-st-light">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden">
          <img src="/swipetrade-logo.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-bold">SwipeTrade</h2>
          <p className="text-xs text-st-light/70">Dashboard</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-st-dark/70",
              pathname === item.href
                ? "bg-st-dark text-st-mint font-semibold"
                : "text-st-light/80"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-10 border-t border-st-dark pt-6 space-y-3">
        {isConnected && address && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-st-dark text-st-mint text-sm font-medium">
            <Check className="h-4 w-4" />
            {formatAddress(address)}
          </div>
        )}

        {isConnected && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/10 transition-all w-full text-sm"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        )}
      </div>
    </aside>
  )
}
