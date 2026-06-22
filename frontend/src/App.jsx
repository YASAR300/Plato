import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Dish Management Dashboard
        </h1>
        <p className="text-slate-400 text-sm">
          Scaffolding initialized successfully. Modify <code className="bg-slate-950 text-emerald-400 px-2 py-1 rounded text-xs font-mono">src/App.jsx</code> to start building!
        </p>
        
        <div className="py-4">
          <button
            type="button"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is: {count}
          </button>
        </div>

        <div className="border-t border-slate-800 pt-6 flex justify-around text-xs text-slate-500 font-mono">
          <div>Backend: Port 5000</div>
          <div>Database: Connected (Neon)</div>
        </div>
      </div>
    </div>
  )
}

export default App
