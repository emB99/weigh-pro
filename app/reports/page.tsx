"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { BarChart3, Download, Calendar as CalendarIcon, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const dailyData = [
  { date: "2024-02-01", weighings: 45, vehicles: 32, netMass: 1250000 },
  { date: "2024-02-02", weighings: 52, vehicles: 38, netMass: 1450000 },
  { date: "2024-02-03", weighings: 48, vehicles: 35, netMass: 1320000 },
  { date: "2024-02-04", weighings: 61, vehicles: 42, netMass: 1680000 },
  { date: "2024-02-05", weighings: 47, vehicles: 33, netMass: 1290000 },
]

const typeData = [
  { name: "Receipt", value: 145, color: "oklch(0.65 0.15 220)" },
  { name: "Dispatch", value: 98, color: "oklch(0.7 0.2 30)" },
]

const customerData = [
  { name: "BuildCorp", transactions: 203, netMass: 2450000 },
  { name: "Acme Industries", transactions: 145, netMass: 1890000 },
  { name: "Global Mining", transactions: 98, netMass: 1560000 },
  { name: "Steel Works", transactions: 67, netMass: 980000 },
  { name: "Chemical Corp", transactions: 34, netMass: 520000 },
]

const COLORS = ["oklch(0.7 0.15 160)", "oklch(0.7 0.2 30)", "oklch(0.65 0.15 220)", "oklch(0.75 0.15 80)", "oklch(0.6 0.15 300)"]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [reportType, setReportType] = useState("daily")

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">View detailed reports and analytics</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Weighings</p>
                  <p className="text-3xl font-bold mt-2">253</p>
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% from last period
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Net Mass</p>
                  <p className="text-3xl font-bold mt-2">6.8M kg</p>
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last period
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. per Day</p>
                  <p className="text-3xl font-bold mt-2">50.6</p>
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5% from last period
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Daily Weighings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis dataKey="date" stroke="oklch(0.65 0 0)" />
                  <YAxis stroke="oklch(0.65 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="weighings" stroke="oklch(0.7 0.15 160)" strokeWidth={2} />
                  <Line type="monotone" dataKey="vehicles" stroke="oklch(0.65 0.15 220)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Transaction Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Customers by Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                  <XAxis dataKey="name" stroke="oklch(0.65 0 0)" />
                  <YAxis stroke="oklch(0.65 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="transactions" fill="oklch(0.7 0.15 160)" name="Transactions" />
                  <Bar dataKey="netMass" fill="oklch(0.65 0.15 220)" name="Net Mass (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
