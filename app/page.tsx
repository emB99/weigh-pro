import { AppLayout } from "@/components/app-layout"
import { ScaleMonitor } from "@/components/scale-monitor"
import { TransactionsTable } from "@/components/transactions-table"
import { StatsCards } from "@/components/stats-cards"

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <StatsCards />
        </div>
        <div className="lg:col-span-1">
          <ScaleMonitor />
        </div>
      </div>
      <TransactionsTable />
    </AppLayout>
  )
}
