import React from 'react'

export default function IconButton({ children, onClick, title, className='' }){
  return (
    <button onClick={onClick} title={title} className={`px-3 py-2 rounded-lg shadow-sm transition ${className}`}>
      {children}
    </button>
  )
}