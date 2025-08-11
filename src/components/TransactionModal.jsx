import React, { useState, useEffect } from 'react'

export default function TransactionModal({ open, onClose, onSave, initial }){
  const [form, setForm] = useState({
    id: null,
    date: new Date().toISOString().slice(0,10),
    description: '',
    category: 'Other',
    amount: '',
    type: 'expense'
  })

  useEffect(()=>{
    if (initial) setForm({...initial})
    else setForm(f => ({...f, id: null}))
  },[initial])

  if (!open) return null

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev=> ({...prev, [name]: value}))
  }

  function submit(e){
    e.preventDefault()
    if (!form.amount || !form.description) return alert('Please provide description and amount')
    onSave({...form, amount: Number(form.amount)})
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 modal-backdrop bg-black/40" aria-modal="true" role="dialog">
      <form onSubmit={submit} className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">{form.id ? 'Edit' : 'Add'} Transaction</h3>
        <label className="block mb-2">Description
          <input name="description" value={form.description} onChange={handleChange} className="w-full p-3 rounded-lg mt-1" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">Amount
            <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} className="w-full p-3 rounded-lg mt-1" />
          </label>
          <label className="block">Date
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-3 rounded-lg mt-1" />
          </label>
        </div>
        <label className="block mt-3">Category
          <input name="category" value={form.category} onChange={handleChange} className="w-full p-3 rounded-lg mt-1" />
        </label>
        <div className="mt-3 flex items-center gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="type" value="expense" checked={form.type==='expense'} onChange={handleChange} /> Expense</label>
          <label className="flex items-center gap-2"><input type="radio" name="type" value="income" checked={form.type==='income'} onChange={handleChange} /> Income</label>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Save</button>
        </div>
      </form>
    </div>
  )
}