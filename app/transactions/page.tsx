"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { TransactionsTable } from "@/components/transactions-table"

export default function TransactionsPage() {
  return (
    <AppLayout>
      <TransactionsTable />
    </AppLayout>
  )
}
