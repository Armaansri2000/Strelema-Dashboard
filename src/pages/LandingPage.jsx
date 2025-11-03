import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LandingPage(){
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Strelema — Clean Admin Dashboard</h1>
            <p className="text-slate-600 mb-6">A small demo showing a clean UI, auth flow, API integration and paginated tables.</p>
            <a href="/login" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded">Go to Admin</a>
          </div>
          <div className="bg-white p-8 rounded shadow">
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc pl-5 text-slate-700">
              <li>Responsive landing & dashboard</li>
              <li>Login + protected routes</li>
              <li>API integration with pagination</li>
            </ul>
          </div>
        </section>

        <section id="features" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">More</h2>
          <p className="text-slate-600">Design is intentionally kept minimal and focused for clarity.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
