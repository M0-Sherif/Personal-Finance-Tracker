import { calculateTotals } from '../utils/helpers'

describe('calculateTotals', ()=>{
  it('calculates income, expenses and balance', ()=>{
    const arr = [
      { amount: 100, type: 'income' },
      { amount: 30, type: 'expense' },
      { amount: 20, type: 'expense' }
    ]
    const totals = calculateTotals(arr)
    expect(totals.income).toBe(100)
    expect(totals.expenses).toBe(50)
    expect(totals.balance).toBe(50)
  })
})