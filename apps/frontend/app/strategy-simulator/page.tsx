import { DashboardLayout } from '@/components/dashboard-layout'
import { StrategySimulatorView } from '@/components/strategy-simulator-view' // ⬅️ cambio aquí

export default function StrategySimulatorPage() {
  return (
    <DashboardLayout>
      <StrategySimulatorView />
    </DashboardLayout>
  )
}