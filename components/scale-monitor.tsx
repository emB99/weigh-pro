"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, RefreshCw, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { CaptureWeightModal } from "@/components/capture-weight-modal"

interface ScaleMonitorProps {
  onWeightCaptured?: (data: {
    transactionType: "Receipt" | "Dispatch"
    vehicleReg: string
    customer: string
    driver: string
    haulier: string
    notes: string
    firstMass: number | null
    secondMass: number | null
  }) => void
}

export function ScaleMonitor({ onWeightCaptured }: ScaleMonitorProps) {
  const [weight, setWeight] = useState(0)
  const [status, setStatus] = useState<"stable" | "reading" | "error">("stable")
  const [time, setTime] = useState(new Date())
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate weight changes
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random()
      if (random > 0.7) {
        setStatus("reading")
        const newWeight = Math.floor(Math.random() * 50000) + 10000
        setTimeout(() => {
          setWeight(newWeight)
          setStatus("stable")
        }, 1500)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatWeight = (w: number) => {
    return w.toLocaleString("en-US")
  }

  const handleCaptureClick = () => {
    if (status === "stable" && weight > 0) {
      setIsCaptureModalOpen(true)
    }
  }

  const handleWeightCaptured = (data: {
    transactionType: "Receipt" | "Dispatch"
    vehicleReg: string
    customer: string
    driver: string
    haulier: string
    notes: string
    firstMass: number | null
    secondMass: number | null
  }) => {
    if (onWeightCaptured) {
      onWeightCaptured(data)
    }
  }

  return (
    <>
      <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Scale Monitor
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "font-mono text-xs",
              status === "stable" && "border-primary text-primary",
              status === "reading" && "border-warning text-warning",
              status === "error" && "border-destructive text-destructive",
            )}
          >
            {status === "stable" && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                STABLE
              </>
            )}
            {status === "reading" && (
              <>
                <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                READING
              </>
            )}
            {status === "error" && "ERROR"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center py-6 rounded-lg bg-secondary/50 border border-border">
          <div className="text-xs text-muted-foreground mb-1 font-mono">Scale No. 1</div>
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "text-3xl sm:text-5xl font-mono font-bold tracking-tight transition-colors",
                status === "reading" && "text-warning animate-pulse",
                status === "stable" && weight > 0 && "text-primary",
              )}
            >
              {formatWeight(weight)}
            </span>
            <span className="text-lg sm:text-xl text-muted-foreground font-medium">kg</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-mono">
            {time.toLocaleTimeString()} • {time.toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-transparent"
            onClick={() => {
              setWeight(0)
              setStatus("stable")
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Zero
          </Button>
          <Button 
            size="sm" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleCaptureClick}
            disabled={status !== "stable" || weight <= 0}
          >
            <Zap className="w-4 h-4 mr-2" />
            Capture
          </Button>
        </div>
      </CardContent>
    </Card>

    <CaptureWeightModal
      open={isCaptureModalOpen}
      onOpenChange={setIsCaptureModalOpen}
      currentWeight={weight}
      onSave={handleWeightCaptured}
    />
    </>
  )
}
