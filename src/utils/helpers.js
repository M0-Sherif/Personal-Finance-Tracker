export function calculateTotals(transactions) {
  const income = transactions.filter(t => t.type === 'income').reduce((s,t)=> s + Number(t.amount),0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s,t)=> s + Number(t.amount),0)
  const balance = income - expenses
  return { income, expenses, balance }
}

export function filterByCategory(transactions, category) {
  if (!category || category === 'all') return transactions
  return transactions.filter(t => t.category === category)
}

export function filterByDateRange(transactions, from, to) {
  if (!from && !to) return transactions
  const f = from ? new Date(from) : new Date('1970-01-01')
  const tt = to ? new Date(to) : new Date('9999-12-31')
  return transactions.filter(t => {
    const d = new Date(t.date)
    return d >= f && d <= tt
  })
}