# Personal Finance Tracker

Simple React + Vite app to track income and expenses. Uses localStorage for persistence and seeds example transactions on first load.

## Setup

1. Install:
```
npm install
```
2. Run dev server:
```
npm run dev
```
3. Run tests:
```
npm test
```

## Features
- Dashboard: balance, income, expenses
- Transactions list with edit/delete
- Add/edit transaction in modal
- Filter by category and date range
- Search by description (debounced)
- Data persisted in localStorage; seeded on first load
- Mobile-first and keyboard accessible forms

## Time breakdown (example)
- Setup project & Tailwind: 25 minutes
- Implement core components (Dashboard, List, Modal): 1 hour
- Filtering, search, persistence: 40 minutes
- Tests & polish: 30 minutes
- README & final checks: 25 minutes

Total ~3h