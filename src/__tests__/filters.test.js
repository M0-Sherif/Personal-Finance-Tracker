import { filterByCategory, filterByDateRange } from '../utils/helpers'

describe('filters', ()=>{
  const arr = [
    { id:'1', category: 'Food', date: '2023-01-01' },
    { id:'2', category: 'Salary', date: '2023-03-10' },
    { id:'3', category: 'Food', date: '2023-05-05' }
  ]

  it('filters by category', ()=>{
    const r = filterByCategory(arr, 'Food')
    expect(r.length).toBe(2)
  })

  it('filters by date range', ()=>{
    const r = filterByDateRange(arr, '2023-03-01', '2023-04-01')
    expect(r.length).toBe(1)
    expect(r[0].id).toBe('2')
  })
})