import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Truck, Scale, Clock, CheckCircle2 } from "lucide-react"

const stats = [
  {
    label: "Today's Weighings",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Scale,
  },
  {
    label: "Vehicles Processed",
    value: "23",
    change: "+8%",
    trend: "up",
    icon: Truck,
  },
  {
    label: "Avg. Processing Time",
    value: "4.2m",
    change: "-15%",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Completed",
    value: "41",
    change: "87%",
    trend: "up",
    icon: CheckCircle2,
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }`}
              >
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
