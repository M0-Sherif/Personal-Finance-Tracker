import React from 'react'

export default function TransactionsList({ transactions, onEdit, onDelete }){
  if (!transactions.length) return <div className="p-4">No transactions</div>
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full rounded-xl overflow-hidden shadow-md">
        <thead className="bg-white/70">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t,i) => (
            <tr key={t.id} className={`transaction-row ${i%2===0 ? 'bg-white/60' : 'bg-white/50'}`}>
              <td className="p-3 align-top">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-3 align-top">{t.description}</td>
              <td className="p-3 align-top">{t.category} <span className="ml-2 text-sm text-gray-500">({t.type})</span></td>
              <td className={`p-3 text-right align-top ${t.type==='expense' ? 'text-red-600' : 'text-green-600'}`}>${Number(t.amount).toFixed(2)}</td>
              <td className="p-3 align-top">
                <button onClick={()=>onEdit(t)} className="mr-2 text-indigo-600 hover:underline">Edit</button>
                <button onClick={()=>onDelete(t.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}