"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Users, Plus, Search, Edit, Trash2, MoreHorizontal, Phone, Mail, Building2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Customer {
  id: string
  name: string
  contact: string
  email: string
  address: string
  totalTransactions: number
  lastTransaction: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Industries",
    contact: "+27 11 123 4567",
    email: "contact@acme.co.za",
    address: "123 Industrial Ave, Johannesburg",
    totalTransactions: 145,
    lastTransaction: "2024-02-05 13:23:18",
  },
  {
    id: "2",
    name: "Global Mining Co",
    contact: "+27 12 234 5678",
    email: "info@globalmining.co.za",
    address: "456 Mining Road, Pretoria",
    totalTransactions: 98,
    lastTransaction: "2024-02-05 13:59:28",
  },
  {
    id: "3",
    name: "Steel Works Inc",
    contact: "+27 16 345 6789",
    email: "sales@steelworks.co.za",
    address: "789 Steel Street, Vanderbijlpark",
    totalTransactions: 67,
    lastTransaction: "2024-02-05 14:02:14",
  },
  {
    id: "4",
    name: "BuildCorp",
    contact: "+27 21 456 7890",
    email: "contact@buildcorp.co.za",
    address: "321 Construction Way, Cape Town",
    totalTransactions: 203,
    lastTransaction: "2024-02-05 14:15:42",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const { toast } = useToast()

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id))
    toast({
      title: "Customer Deleted",
      description: "Customer has been removed successfully",
    })
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingCustomer(null)
    setIsDialogOpen(true)
  }

  return (
    <AppLayout>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Customer Management
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 sm:flex-initial min-w-[200px] sm:min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 bg-secondary border-border"
                />
              </div>
              <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90 shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Customer</span>
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
                  <TableHead className="font-medium">Customer Name</TableHead>
                  <TableHead className="font-medium">Contact</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium text-right">Total Transactions</TableHead>
                  <TableHead className="font-medium">Last Transaction</TableHead>
                  <TableHead className="font-medium w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {customer.contact}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{customer.address}</TableCell>
                    <TableCell className="text-right font-medium">{customer.totalTransactions}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{customer.lastTransaction}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(customer)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(customer.id)}
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
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{customer.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Phone className="w-4 h-4" />
                        {customer.contact}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{customer.address}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(customer)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Transactions</div>
                      <div className="text-sm font-medium">{customer.totalTransactions}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Last Transaction</div>
                      <div className="text-xs text-muted-foreground">{customer.lastTransaction}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Showing {filteredCustomers.length} of {customers.length} customers</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
            <DialogDescription>
              {editingCustomer ? "Update customer information" : "Enter details for the new customer"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input id="name" defaultValue={editingCustomer?.name} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" defaultValue={editingCustomer?.contact} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={editingCustomer?.email} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue={editingCustomer?.address} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: editingCustomer ? "Customer Updated" : "Customer Added",
                  description: "Customer information has been saved successfully",
                })
                setIsDialogOpen(false)
              }}
            >
              {editingCustomer ? "Update" : "Add"} Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
