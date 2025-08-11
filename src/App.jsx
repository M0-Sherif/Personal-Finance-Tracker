import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Dashboard from './components/Dashboard'
import TransactionsList from './components/TransactionsList'
import TransactionModal from './components/TransactionModal'
import Filters from './components/Filters'
import { seedIfEmpty, loadTransactions, saveTransactions } from './utils/storage'
import { calculateTotals, filterByCategory, filterByDateRange } from './utils/helpers'

const SEED = [
  { id: 't1', date: new Date().toISOString().slice(0,10), description: 'Salary', category: 'Salary', amount: 2000, type: 'income' },
  { id: 't2', date: new Date().toISOString().slice(0,10), description: 'Groceries', category: 'Food', amount: 120.5, type: 'expense' },
  { id: 't3', date: new Date().toISOString().slice(0,10), description: 'Bus Ticket', category: 'Transport', amount: 2.5, type: 'expense' }
]

function uid(){ return Math.random().toString(36).slice(2,9) }

export default function App(){
  const [transactions, setTransactions] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState({ category: 'all', from: '', to: '' })
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const loaded = seedIfEmpty(SEED)
    setTransactions(loaded)
  },[])

  useEffect(()=>{
    saveTransactions(transactions)
  },[transactions])

  const totals = useMemo(()=> calculateTotals(transactions), [transactions])

  const categories = useMemo(()=> {
    const set = new Set(transactions.map(t=>t.category))
    return Array.from(set)
  },[transactions])

  const addOrUpdate = useCallback((t)=>{
    if (t.id) {
      setTransactions(prev => prev.map(p => p.id === t.id ? t : p))
    } else {
      t.id = uid()
      setTransactions(prev => [t, ...prev])
    }
  },[])

  const deleteTx = useCallback((id)=>{
    setTransactions(prev => prev.filter(p=> p.id !== id))
  },[])

  const onEdit = (t) => { setEditing(t); setModalOpen(true) }

  // filtering pipeline
  const visible = useMemo(()=>{
    let arr = [...transactions]
    arr = filterByCategory(arr, filter.category)
    arr = filterByDateRange(arr, filter.from, filter.to)
    if (search) {
      const s = search.toLowerCase()
      arr = arr.filter(t => t.description.toLowerCase().includes(s))
    }
    return arr
  },[transactions, filter, search])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Personal Finance Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">Track your income & expenses — responsive and keyboard friendly</p>
          </div>
          <div>
            <button onClick={()=>{ setEditing(null); setModalOpen(true) }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">Add Transaction</button>
          </div>
        </header>

        <Dashboard totals={totals} />

        <div className="bg-white p-4 rounded-2xl shadow mb-4">
          <Filters categories={categories} onFilterChange={setFilter} onSearchChange={setSearch} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <TransactionsList transactions={visible} onEdit={onEdit} onDelete={deleteTx} />
        </div>

        <TransactionModal open={modalOpen} onClose={()=>setModalOpen(false)} onSave={addOrUpdate} initial={editing} />
      </div>
    </div>
  )
}