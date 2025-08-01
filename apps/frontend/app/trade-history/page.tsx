"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { TradeHistoryView } from "@/components/trade-history-view"

export default function TradeHistoryPage() {
  return (
    <DashboardLayout>
      <TradeHistoryView />
    </DashboardLayout>
  )
}
