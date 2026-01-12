"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Scale, Save, Printer, X } from "lucide-react"

interface CaptureWeightModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentWeight: number
  onSave: (data: {
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

export function CaptureWeightModal({ open, onOpenChange, currentWeight, onSave }: CaptureWeightModalProps) {
  const [transactionType, setTransactionType] = useState<"Receipt" | "Dispatch">("Receipt")
  const [vehicleReg, setVehicleReg] = useState("")
  const [customer, setCustomer] = useState("")
  const [driver, setDriver] = useState("")
  const [haulier, setHaulier] = useState("")
  const [notes, setNotes] = useState("")
  const [firstMass, setFirstMass] = useState<number | null>(null)
  const [secondMass, setSecondMass] = useState<number | null>(null)
  const [useManualWeight, setUseManualWeight] = useState(false)
  const [manualWeight, setManualWeight] = useState<string>("")
  const { toast } = useToast()

  const weightToUse = useManualWeight && manualWeight ? parseFloat(manualWeight) : currentWeight

  useEffect(() => {
    if (open && currentWeight > 0 && !firstMass) {
      // Auto-capture first mass when modal opens with a weight
      setFirstMass(weightToUse)
    }
  }, [open, currentWeight, weightToUse, firstMass])

  useEffect(() => {
    if (open) {
      // Reset form when modal opens (except masses if already set)
      if (!firstMass) {
        setTransactionType("Receipt")
        setVehicleReg("")
        setCustomer("")
        setDriver("")
        setHaulier("")
        setNotes("")
        setSecondMass(null)
      }
      setUseManualWeight(false)
      setManualWeight("")
    }
  }, [open, firstMass])

  const handleCaptureFirstMass = () => {
    if (weightToUse > 0) {
      setFirstMass(weightToUse)
      toast({
        title: "First Mass Captured",
        description: `${weightToUse.toLocaleString()} kg recorded`,
      })
    }
  }

  const handleCaptureSecondMass = () => {
    if (!firstMass) {
      toast({
        title: "Error",
        description: "Please capture first mass before second mass",
        variant: "destructive",
      })
      return
    }
    if (weightToUse > 0) {
      setSecondMass(weightToUse)
      toast({
        title: "Second Mass Captured",
        description: `${weightToUse.toLocaleString()} kg recorded`,
      })
    }
  }

  const handleSave = () => {
    if (!vehicleReg || !customer) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!firstMass) {
      toast({
        title: "Validation Error",
        description: "Please capture first mass",
        variant: "destructive",
      })
      return
    }

    onSave({
      transactionType,
      vehicleReg,
      customer,
      driver,
      haulier,
      notes,
      firstMass,
      secondMass,
    })

    toast({
      title: "Transaction Saved",
      description: "Transaction has been saved successfully",
    })

    // Reset form
    setTransactionType("Receipt")
    setVehicleReg("")
    setCustomer("")
    setDriver("")
    setHaulier("")
    setNotes("")
    setFirstMass(null)
    setSecondMass(null)
    setUseManualWeight(false)
    setManualWeight("")
    onOpenChange(false)
  }

  const handleClear = () => {
    setTransactionType("Receipt")
    setVehicleReg("")
    setCustomer("")
    setDriver("")
    setHaulier("")
    setNotes("")
    setFirstMass(null)
    setSecondMass(null)
    setUseManualWeight(false)
    setManualWeight("")
    toast({
      title: "Form Cleared",
      description: "All fields have been reset",
    })
  }

  const netMass = firstMass && secondMass ? firstMass - secondMass : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            New Weighing Transaction
          </DialogTitle>
          <DialogDescription>Capture weight and complete transaction details</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Current Weight Display - Compact */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs text-muted-foreground mb-1 font-mono">Current Scale Reading</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-mono font-bold text-primary">
                  {weightToUse > 0 ? weightToUse.toLocaleString() : "0"}
                </span>
                <span className="text-lg text-muted-foreground font-medium">kg</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCaptureFirstMass}
                disabled={!!firstMass || weightToUse <= 0}
                className="w-full"
              >
                Capture First Mass
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCaptureSecondMass}
                disabled={!firstMass || !!secondMass || weightToUse <= 0}
                className="w-full"
              >
                Capture Second Mass
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUseManualWeight(!useManualWeight)}
                className={`w-full ${useManualWeight ? "bg-primary/10 text-primary" : ""}`}
              >
                {useManualWeight ? "Using Manual" : "Use Manual"}
              </Button>
              {useManualWeight && (
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={manualWeight}
                  onChange={(e) => setManualWeight(e.target.value)}
                  className="w-full font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <RadioGroup value={transactionType} onValueChange={(value) => setTransactionType(value as "Receipt" | "Dispatch")}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Receipt" id="receipt" />
                  <Label htmlFor="receipt" className="cursor-pointer">Receipt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Dispatch" id="dispatch" />
                  <Label htmlFor="dispatch" className="cursor-pointer">Dispatch</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleReg">Vehicle Registration *</Label>
              <Input
                id="vehicleReg"
                placeholder="ABC123GP"
                value={vehicleReg}
                onChange={(e) => setVehicleReg(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Industries</SelectItem>
                  <SelectItem value="global">Global Mining Co</SelectItem>
                  <SelectItem value="steel">Steel Works Inc</SelectItem>
                  <SelectItem value="buildcorp">BuildCorp</SelectItem>
                  <SelectItem value="chemical">Chemical Corp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver">Driver Name</Label>
              <Input
                id="driver"
                placeholder="John Smith"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="haulier">Haulier</Label>
              <Input
                id="haulier"
                placeholder="FastHaul Ltd"
                value={haulier}
                onChange={(e) => setHaulier(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Mass Display */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
            <div>
              <Label className="text-muted-foreground text-sm">First Mass</Label>
              <div className="text-2xl font-mono font-bold mt-1">
                {firstMass ? `${firstMass.toLocaleString()} kg` : "—"}
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Second Mass</Label>
              <div className="text-2xl font-mono font-bold mt-1">
                {secondMass ? `${secondMass.toLocaleString()} kg` : "—"}
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Net Mass</Label>
              <div className="text-2xl font-mono font-bold text-primary mt-1">
                {netMass ? `${netMass.toLocaleString()} kg` : "—"}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border bg-card">
          <div className="flex items-center gap-2 w-full">
            <Button variant="outline" onClick={handleClear}>
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <div className="flex-1" />
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Transaction
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
