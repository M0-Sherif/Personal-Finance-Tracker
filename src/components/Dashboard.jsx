import React from 'react'

function Card({ title, value, className }){
  return (
    <div className={`p-4 rounded-2xl text-white shadow ${className}`}>
      <div className="text-sm opacity-90">{title}</div>
      <div className="text-2xl font-bold mt-1">${value.toFixed(2)}</div>
    </div>
  )
}

export default function Dashboard({ totals }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <Card title="Balance" value={totals.balance} className="bg-white text-black" />
      <Card title="Income" value={totals.income} className="bg-gradient-to-r from-indigo-500 to-purple-500" />
      <Card title="Expenses" value={totals.expenses} className="bg-gradient-to-r from-rose-500 to-pink-500" />
    </div>
  )
}