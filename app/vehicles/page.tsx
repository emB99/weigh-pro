"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Truck, Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Vehicle {
  id: string
  registration: string
  make: string
  model: string
  year: number
  owner: string
  lastWeighing: string
  totalWeighings: number
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    registration: "ABC123GP",
    make: "Mercedes-Benz",
    model: "Actros",
    year: 2020,
    owner: "FastHaul Ltd",
    lastWeighing: "2024-02-05 14:28:33",
    totalWeighings: 47,
  },
  {
    id: "2",
    registration: "DEF456GP",
    make: "Volvo",
    model: "FH16",
    year: 2019,
    owner: "TransCargo",
    lastWeighing: "2024-02-05 13:59:28",
    totalWeighings: 32,
  },
  {
    id: "3",
    registration: "XYZ987GP",
    make: "Scania",
    model: "R-Series",
    year: 2021,
    owner: "Heavy Movers",
    lastWeighing: "2024-02-05 14:02:14",
    totalWeighings: 28,
  },
  {
    id: "4",
    registration: "GHI321GP",
    make: "MAN",
    model: "TGX",
    year: 2022,
    owner: "QuickFreight",
    lastWeighing: "2024-02-05 14:15:42",
    totalWeighings: 19,
  },
]

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const { toast } = useToast()

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id))
    toast({
      title: "Vehicle Deleted",
      description: "Vehicle has been removed successfully",
    })
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingVehicle(null)
    setIsDialogOpen(true)
  }

  return (
    <AppLayout>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Vehicle Management
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 sm:flex-initial min-w-[200px] sm:min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 bg-secondary border-border"
                />
              </div>
              <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90 shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Vehicle</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="font-medium">Registration</TableHead>
                  <TableHead className="font-medium">Make & Model</TableHead>
                  <TableHead className="font-medium">Year</TableHead>
                  <TableHead className="font-medium">Owner</TableHead>
                  <TableHead className="font-medium">Last Weighing</TableHead>
                  <TableHead className="font-medium text-right">Total Weighings</TableHead>
                  <TableHead className="font-medium w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-secondary/30">
                    <TableCell className="font-mono font-medium">{vehicle.registration}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vehicle.make}</div>
                        <div className="text-sm text-muted-foreground">{vehicle.model}</div>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{vehicle.lastWeighing}</TableCell>
                    <TableCell className="text-right font-medium">{vehicle.totalWeighings}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(vehicle.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-mono font-medium mb-1">{vehicle.registration}</div>
                      <div className="font-medium mb-1">{vehicle.make}</div>
                      <div className="text-sm text-muted-foreground mb-2">{vehicle.model}</div>
                      <div className="text-sm text-muted-foreground mb-2">Owner: {vehicle.owner}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Year</div>
                      <div className="text-sm font-medium">{vehicle.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Weighings</div>
                      <div className="text-sm font-medium">{vehicle.totalWeighings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Last Weighing</div>
                      <div className="text-xs text-muted-foreground">{vehicle.lastWeighing}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Showing {filteredVehicles.length} of {vehicles.length} vehicles</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
            <DialogDescription>
              {editingVehicle ? "Update vehicle information" : "Enter details for the new vehicle"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="registration">Registration Number</Label>
              <Input id="registration" defaultValue={editingVehicle?.registration} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="make">Make</Label>
                <Input id="make" defaultValue={editingVehicle?.make} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" defaultValue={editingVehicle?.model} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" defaultValue={editingVehicle?.year} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" defaultValue={editingVehicle?.owner} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: editingVehicle ? "Vehicle Updated" : "Vehicle Added",
                  description: "Vehicle information has been saved successfully",
                })
                setIsDialogOpen(false)
              }}
            >
              {editingVehicle ? "Update" : "Add"} Vehicle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
