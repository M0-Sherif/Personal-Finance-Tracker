import React, { useState, useEffect } from 'react'

export default function Filters({ categories=[], onFilterChange, onSearchChange }){
  const [category, setCategory] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const timeout = setTimeout(()=> onSearchChange(search), 350)
    return ()=> clearTimeout(timeout)
  },[search, onSearchChange])

  useEffect(()=>{
    onFilterChange({ category, from, to })
  },[category, from, to, onFilterChange])

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-3 items-center">
      <select aria-label="Filter by category" className="p-3 rounded-lg bg-white shadow-sm" value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="flex gap-2">
        <input aria-label="From date" type="date" className="p-3 rounded-lg bg-white shadow-sm" value={from} onChange={e=>setFrom(e.target.value)} />
        <input aria-label="To date" type="date" className="p-3 rounded-lg bg-white shadow-sm" value={to} onChange={e=>setTo(e.target.value)} />
      </div>

      <input aria-label="Search description" placeholder="Search description..." className="p-3 rounded-lg bg-white shadow-sm flex-1" value={search} onChange={e=>setSearch(e.target.value)} />
    </div>
  )
}