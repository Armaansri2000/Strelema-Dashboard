import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-auto bg-white border-t">
      <div className="container mx-auto px-6 py-6 text-sm text-slate-600 flex justify-between">
        <div>© {new Date().getFullYear()} Strelema</div>
        <div>Contact: hello@example.com</div>
      </div>
    </footer>
  )
}
