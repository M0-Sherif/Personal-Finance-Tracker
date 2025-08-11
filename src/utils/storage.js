const KEY = 'pft_transactions_v1'

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to load', e)
    return null
  }
}

export function saveTransactions(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function seedIfEmpty(seed) {
  const existing = loadTransactions()
  if (!existing || existing.length === 0) {
    saveTransactions(seed)
    return seed
  }
  return existing
}