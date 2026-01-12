"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { ScaleMonitor } from "@/components/scale-monitor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Scale, Save, Printer, X } from "lucide-react"

export default function WeighingPage() {
  const [transactionType, setTransactionType] = useState<"Receipt" | "Dispatch">("Receipt")
  const [vehicleReg, setVehicleReg] = useState("")
  const [customer, setCustomer] = useState("")
  const [driver, setDriver] = useState("")
  const [haulier, setHaulier] = useState("")
  const [notes, setNotes] = useState("")
  const [firstMass, setFirstMass] = useState<number | null>(null)
  const [secondMass, setSecondMass] = useState<number | null>(null)
  const { toast } = useToast()

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
    // Populate form with captured data
    setTransactionType(data.transactionType)
    setVehicleReg(data.vehicleReg)
    setCustomer(data.customer)
    setDriver(data.driver)
    setHaulier(data.haulier)
    setNotes(data.notes)
    setFirstMass(data.firstMass)
    setSecondMass(data.secondMass)
    
    toast({
      title: "Transaction Data Loaded",
      description: "Transaction details have been loaded into the form",
    })
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

    toast({
      title: "Transaction Saved",
      description: "Transaction has been saved successfully",
    })

    // Reset form
    setVehicleReg("")
    setCustomer("")
    setDriver("")
    setHaulier("")
    setNotes("")
    setFirstMass(null)
    setSecondMass(null)
  }

  const handleClear = () => {
    setVehicleReg("")
    setCustomer("")
    setDriver("")
    setHaulier("")
    setNotes("")
    setFirstMass(null)
    setSecondMass(null)
    toast({
      title: "Form Cleared",
      description: "All fields have been reset",
    })
  }

  const netMass = firstMass && secondMass ? firstMass - secondMass : null

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                New Weighing Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <RadioGroup value={transactionType} onValueChange={(value) => setTransactionType(value as "Receipt" | "Dispatch")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Receipt" id="receipt" />
                    <Label htmlFor="receipt" className="cursor-pointer">Receipt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dispatch" id="dispatch" />
                    <Label htmlFor="dispatch" className="cursor-pointer">Dispatch</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
                <div>
                  <Label className="text-muted-foreground text-sm">First Mass</Label>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1">
                    {firstMass ? `${firstMass.toLocaleString()} kg` : "—"}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Second Mass</Label>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1">
                    {secondMass ? `${secondMass.toLocaleString()} kg` : "—"}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Net Mass</Label>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-primary mt-1">
                    {netMass ? `${netMass.toLocaleString()} kg` : "—"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Save Transaction</span>
                  <span className="sm:hidden">Save</span>
                </Button>
                <Button variant="outline" onClick={handleClear} className="flex-1 sm:flex-initial">
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-initial">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ScaleMonitor onWeightCaptured={handleWeightCaptured} />
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle className="text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">First Mass</div>
                <div className="text-lg font-mono font-bold">
                  {firstMass ? `${firstMass.toLocaleString()} kg` : "Not captured"}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Second Mass</div>
                <div className="text-lg font-mono font-bold">
                  {secondMass ? `${secondMass.toLocaleString()} kg` : "Not captured"}
                </div>
              </div>
              {firstMass && secondMass && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-1">Net Mass</div>
                  <div className="text-lg font-mono font-bold text-primary">
                    {(firstMass - secondMass).toLocaleString()} kg
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
