"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Printer,
  ArrowUpDown,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  transactionNo: string
  vehicleReg: string
  firstMassDate: string
  firstMass: number
  secondMass: number | null
  netMass: number | null
  type: "Receipt" | "Dispatch"
  customer: string
  product: string
  driver: string
  haulier: string
  status: "Pending" | "Complete" | "In Progress"
}

const transactions: Transaction[] = [
  {
    id: "1",
    transactionNo: "000001",
    vehicleReg: "ABC123GP",
    firstMassDate: "2024-02-05 13:23:18",
    firstMass: 35420,
    secondMass: 12500,
    netMass: 22920,
    type: "Receipt",
    customer: "Acme Industries",
    product: "Coal Grade A",
    driver: "John Smith",
    haulier: "FastHaul Ltd",
    status: "Complete",
  },
  {
    id: "2",
    transactionNo: "000002",
    vehicleReg: "DEF456GP",
    firstMassDate: "2024-02-05 13:59:28",
    firstMass: 18680,
    secondMass: null,
    netMass: null,
    type: "Dispatch",
    customer: "Global Mining Co",
    product: "Iron Ore",
    driver: "Peter Jones",
    haulier: "TransCargo",
    status: "In Progress",
  },
  {
    id: "3",
    transactionNo: "000003",
    vehicleReg: "XYZ987GP",
    firstMassDate: "2024-02-05 14:02:14",
    firstMass: 35410,
    secondMass: null,
    netMass: null,
    type: "Receipt",
    customer: "Steel Works Inc",
    product: "Scrap Metal",
    driver: "Mike Wilson",
    haulier: "Heavy Movers",
    status: "Pending",
  },
  {
    id: "4",
    transactionNo: "000004",
    vehicleReg: "GHI321GP",
    firstMassDate: "2024-02-05 14:15:42",
    firstMass: 42150,
    secondMass: 15200,
    netMass: 26950,
    type: "Receipt",
    customer: "BuildCorp",
    product: "Aggregate",
    driver: "Tom Brown",
    haulier: "QuickFreight",
    status: "Complete",
  },
  {
    id: "5",
    transactionNo: "000005",
    vehicleReg: "JKL654GP",
    firstMassDate: "2024-02-05 14:28:33",
    firstMass: 28900,
    secondMass: null,
    netMass: null,
    type: "Dispatch",
    customer: "Chemical Corp",
    product: "Limestone",
    driver: "Dave Lee",
    haulier: "CargoExpress",
    status: "Pending",
  },
]

export function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(transactions)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const filteredTransactions = transactionsList.filter(
    (t) =>
      t.vehicleReg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionNo.includes(searchQuery) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (transaction: Transaction) => {
    router.push(`/weighing?edit=${transaction.id}`)
  }

  const handleDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactionsList(transactionsList.filter((t) => t.id !== transactionToDelete.id))
      toast({
        title: "Transaction Deleted",
        description: `Transaction ${transactionToDelete.transactionNo} has been deleted`,
      })
      setIsDeleteDialogOpen(false)
      setTransactionToDelete(null)
    }
  }

  const handlePrint = (transaction: Transaction) => {
    toast({
      title: "Printing Ticket",
      description: `Printing ticket for transaction ${transaction.transactionNo}`,
    })
  }

  const handleNewTransaction = () => {
    router.push("/weighing")
  }

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Complete":
        return "bg-primary/10 text-primary border-primary/20"
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20"
      case "Pending":
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "Receipt":
        return "bg-info/10 text-info border-info/20"
      case "Dispatch":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Recent Transactions
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:flex-initial min-w-[200px] sm:min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-48 bg-secondary border-border"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0" onClick={handleNewTransaction}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New</span>
              <span className="sm:hidden">New</span>
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
                  <TableHead className="font-medium">
                    <Button variant="ghost" size="sm" className="h-auto p-0 font-medium hover:bg-transparent">
                      Transaction
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-medium">Vehicle</TableHead>
                  <TableHead className="font-medium">Date/Time</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Customer</TableHead>
                  <TableHead className="font-medium text-right">1st Mass</TableHead>
                  <TableHead className="font-medium text-right">2nd Mass</TableHead>
                  <TableHead className="font-medium text-right">Net Mass</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-secondary/30 cursor-pointer">
                    <TableCell className="font-mono text-sm">{transaction.transactionNo}</TableCell>
                    <TableCell>
                      <span className="font-medium">{transaction.vehicleReg}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{transaction.firstMassDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", getTypeColor(transaction.type))}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell className="text-right font-mono">{transaction.firstMass.toLocaleString()} kg</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {transaction.secondMass ? `${transaction.secondMass.toLocaleString()} kg` : "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {transaction.netMass ? `${transaction.netMass.toLocaleString()} kg` : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(transaction.status))}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(transaction)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrint(transaction)}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print Ticket
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(transaction)}>
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
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-sm font-semibold mb-1">{transaction.transactionNo}</div>
                    <div className="text-sm font-medium">{transaction.vehicleReg}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(transaction)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePrint(transaction)}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print Ticket
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(transaction)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={cn("text-xs", getTypeColor(transaction.type))}>
                    {transaction.type}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", getStatusColor(transaction.status))}>
                    {transaction.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">{transaction.customer}</div>
                <div className="text-xs text-muted-foreground mb-2">{transaction.firstMassDate}</div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">1st Mass</div>
                    <div className="text-sm font-mono font-semibold">{transaction.firstMass.toLocaleString()} kg</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">2nd Mass</div>
                    <div className="text-sm font-mono">
                      {transaction.secondMass ? `${transaction.secondMass.toLocaleString()} kg` : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Net Mass</div>
                    <div className="text-sm font-mono font-semibold text-primary">
                      {transaction.netMass ? `${transaction.netMass.toLocaleString()} kg` : "—"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-muted-foreground">
          <span className="text-center sm:text-left">
            Showing {filteredTransactions.length} of {transactionsList.length} transactions
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>View complete transaction information</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Number</p>
                  <p className="font-mono font-medium">{selectedTransaction.transactionNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={cn("text-xs mt-1", getStatusColor(selectedTransaction.status))}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Registration</p>
                  <p className="font-medium">{selectedTransaction.vehicleReg}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant="outline" className={cn("text-xs mt-1", getTypeColor(selectedTransaction.type))}>
                    {selectedTransaction.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedTransaction.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Driver</p>
                  <p className="font-medium">{selectedTransaction.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Haulier</p>
                  <p className="font-medium">{selectedTransaction.haulier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">{selectedTransaction.firstMassDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
                <div>
                  <p className="text-sm text-muted-foreground">First Mass</p>
                  <p className="text-2xl font-mono font-bold mt-1">{selectedTransaction.firstMass.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Second Mass</p>
                  <p className="text-2xl font-mono font-bold mt-1">
                    {selectedTransaction.secondMass ? `${selectedTransaction.secondMass.toLocaleString()} kg` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Mass</p>
                  <p className="text-2xl font-mono font-bold text-primary mt-1">
                    {selectedTransaction.netMass ? `${selectedTransaction.netMass.toLocaleString()} kg` : "—"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedTransaction && (
              <>
                <Button variant="outline" onClick={() => handlePrint(selectedTransaction)}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEdit(selectedTransaction)
                }}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete transaction{" "}
              <span className="font-mono font-medium">{transactionToDelete?.transactionNo}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
