import React from 'react'

export default function Spinner(){
  return (
    <div className="flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2"></div>
    </div>
  )
}
