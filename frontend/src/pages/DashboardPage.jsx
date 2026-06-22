import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans text-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
      {/* Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-40 pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(249,115,22,0.08) 0%,transparent 70%)'}} />

      <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-8 max-w-md w-full text-center relative z-10 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
        <div className="w-[36px] h-[36px] rounded-[8px] bg-orange-500 flex items-center justify-center mx-auto mb-4">
          <ChefHat size={20} className="text-black" strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to DishBoard</h1>
        <p className="text-neutral-400 text-[13.5px] mb-6">
          You are successfully authenticated.
        </p>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 mb-6 text-left">
          <div className="text-[11px] uppercase tracking-wider text-neutral-600 font-bold mb-1">
            Logged In As
          </div>
          <div className="text-neutral-300 font-mono text-[13px] truncate">
            {user?.email}
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-black font-semibold text-[13.5px] hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
