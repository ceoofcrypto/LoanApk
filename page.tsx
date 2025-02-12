"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { LoanMetrics } from "@/components/loan-metrics"
import { LoanEntryForm } from "@/components/loan-entry-form"
import { LoanList } from "@/components/loan-list"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DeveloperCredit } from "@/components/developer-credit"

type Loan = {
  id: number
  borrowerName: string
  amount: number
  interest: number
  status: "pending" | "collected"
  notes?: string
  loanDate: string // Add this line
}

const initialLoans: Loan[] = [
  {
    id: 1,
    borrowerName: "John Doe",
    amount: 500000,
    interest: 5,
    status: "pending",
    notes: "Business expansion",
    loanDate: "2023-06-01",
  },
  {
    id: 2,
    borrowerName: "Jane Smith",
    amount: 300000,
    interest: 4,
    status: "collected",
    notes: "Home renovation",
    loanDate: "2023-05-15",
  },
  {
    id: 3,
    borrowerName: "Bob Johnson",
    amount: 200000,
    interest: 6,
    status: "pending",
    notes: "Education expenses",
    loanDate: "2023-06-10",
  },
]

export default function DashboardPage() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans)
  const [currentPage, setCurrentPage] = useState("home")

  const handleAddLoan = (newLoan: Loan) => {
    setLoans((prevLoans) => [...prevLoans, newLoan])
    setCurrentPage("home")
  }

  const handleMarkAsCollected = (id: number) => {
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === id ? { ...loan, status: "collected" } : loan)))
  }

  const handleDeleteLoan = (id: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id))
  }

  const handleEditLoan = (id: number, newAmount: number) => {
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === id ? { ...loan, amount: newAmount } : loan)))
  }

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <LoanMetrics loans={loans} />
            </div>
            <LoanList
              loans={loans}
              onMarkAsCollected={handleMarkAsCollected}
              onDelete={handleDeleteLoan}
              onEdit={handleEditLoan}
              isManageSection={false}
            />
          </div>
        )
      case "new":
        return <LoanEntryForm onAddLoan={handleAddLoan} />
      case "manage":
        return (
          <LoanList
            loans={loans}
            onMarkAsCollected={handleMarkAsCollected}
            onDelete={handleDeleteLoan}
            onEdit={handleEditLoan}
            isManageSection={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-24 bg-gray-100 dark:bg-gray-900">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
        <DeveloperCredit />
      </main>
      <BottomNavigation currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  )
}

