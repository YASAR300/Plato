import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchDishes, toggleDish } from '../api/dishApi';
import { io } from 'socket.io-client';
import {
  ChefHat,
  LogOut,
  UtensilsCrossed,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sun,
  LayoutDashboard,
  Compass,
  BarChart2,
  Users,
  Settings,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [togglingIds, setTogglingIds] = useState({});
  const [isDark, setIsDark] = useState(true);
  const [toast, setToast] = useState(null);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Fetch initial dishes list
  const getDishes = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const data = await fetchDishes();
      setDishes(data);
    } catch (err) {
      console.error('Error fetching dishes:', err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  // Connect to Socket.io for real-time updates
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL || 'https://plato-pwtx.onrender.com';
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.io server for real-time updates');
    });

    socket.on('dish:updated', (updatedDish) => {
      console.log('Received real-time dish update:', updatedDish);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Filter dishes by search query
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) return dishes;
    const q = searchQuery.toLowerCase();
    return dishes.filter((dish) => dish.dishName.toLowerCase().includes(q));
  }, [dishes, searchQuery]);

  // Compute stats
  const stats = useMemo(() => {
    const total = dishes.length;
    const published = dishes.filter((dish) => dish.isPublished).length;
    const unpublished = total - published;
    return { total, published, unpublished };
  }, [dishes]);

  // Handle publishing toggle
  const handleToggle = async (dishId) => {
    // Check if already in-flight
    if (togglingIds[dishId]) return;

    // Track original state for rollback
    const originalDish = dishes.find((d) => d.dishId === dishId);
    if (!originalDish) return;

    // Optimistically update state
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === dishId ? { ...dish, isPublished: !dish.isPublished } : dish
      )
    );

    // Set loading for this specific dish toggle
    setTogglingIds((prev) => ({ ...prev, [dishId]: true }));

    try {
      const response = await toggleDish(dishId);
      // Trigger toast message based on backend response status
      setToast(response.isPublished ? '✅ Dish published' : '🔴 Dish unpublished');
    } catch (err) {
      console.error('Failed to toggle dish:', err);
      // Rollback on failure
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === dishId ? originalDish : dish
        )
      );
    } finally {
      setTogglingIds((prev) => {
        const next = { ...prev };
        delete next[dishId];
        return next;
      });
    }
  };

  const isAnyToggling = Object.keys(togglingIds).length > 0;
  const publishedPercent = stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0;

  return (
    <div className="h-screen overflow-hidden font-sans flex flex-col md:flex-row bg-[#f6f6f6] dark:bg-black text-[#1f2937] dark:text-neutral-200 transition-colors duration-200">
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[99999] bg-neutral-900 border border-white/[0.08] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-[13px] font-medium transition-all duration-300 animate-slide-up">
          {toast}
        </div>
      )}

      {/* ─── SIDEBAR ────────────────────────────────────────────────────────── */}
      <aside className="w-full md:w-[240px] h-auto md:h-full shrink-0 bg-white dark:bg-[#0b0b0b] border-b md:border-b-0 md:border-r border-neutral-200 dark:border-white/[0.08] flex flex-col justify-between p-4.5 overflow-y-auto">
        
        <div className="flex flex-col gap-6">
          {/* Brand/Logo */}
          <div className="flex items-center gap-2 px-2">
            <div className="w-[22px] h-[22px] rounded-[5px] bg-orange-500 flex items-center justify-center">
              <ChefHat size={12} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-black dark:text-white text-[14px] font-semibold tracking-tight">Plato</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-wider px-2 mb-1">
              Main Menu
            </div>
            <button className="flex items-center gap-2.5 w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg bg-neutral-100 text-black dark:bg-white/[0.06] dark:text-white transition-colors cursor-pointer">
              <LayoutDashboard size={14} className="text-neutral-500 dark:text-neutral-400" />
              <span>Overview</span>
            </button>
            <button className="flex items-center gap-2.5 w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-white transition-colors cursor-pointer">
              <Compass size={14} className="text-neutral-400 dark:text-neutral-500" />
              <span>Dishes</span>
            </button>
            <button className="flex items-center gap-2.5 w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-white transition-colors cursor-pointer">
              <BarChart2 size={14} className="text-neutral-400 dark:text-neutral-500" />
              <span>Analytics</span>
            </button>
            <button className="flex items-center gap-2.5 w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-white transition-colors cursor-pointer">
              <Users size={14} className="text-neutral-400 dark:text-neutral-500" />
              <span>Customers</span>
            </button>
            <button className="flex items-center gap-2.5 w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-white transition-colors cursor-pointer">
              <Settings size={14} className="text-neutral-400 dark:text-neutral-500" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Theme Selector */}
          <div className="flex flex-col gap-1 pt-2 border-t border-neutral-100 dark:border-white/[0.04]">
            <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-wider px-2 mb-1">
              Configuration
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-between w-full text-left text-[13px] font-medium px-2.5 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-white/[0.03] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {isDark ? (
                  <>
                    <Moon size={14} className="text-neutral-400 dark:text-neutral-500" />
                    <span>Theme: Dark</span>
                  </>
                ) : (
                  <>
                    <Sun size={14} className="text-neutral-400" />
                    <span>Theme: Light</span>
                  </>
                )}
              </div>
              <div className="w-6.5 h-4 bg-neutral-200 dark:bg-white/[0.1] rounded-full relative p-0.5 transition-colors">
                <div className={`w-3.5 h-3.5 rounded-full bg-white dark:bg-neutral-300 shadow transition-transform ${isDark ? 'translate-x-2.5' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Usage Stats Block */}
          <div className="bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] rounded-xl p-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mb-1.5">
              <span>Published Limits</span>
              <span>{stats.published} / {stats.total}</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${publishedPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-1">
              Usage resets at midnight
            </div>
          </div>

          {/* Upgrade Plan Button */}
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-[13px] font-semibold transition-all cursor-pointer">
            <Sparkles size={13} />
            <span>Upgrade to Pro</span>
          </button>

          {/* Profile & Logout Info */}
          <div className="flex items-center justify-between gap-2.5 pt-3.5 border-t border-neutral-100 dark:border-white/[0.04] overflow-hidden">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold flex items-center justify-center text-[12px] shrink-0">
                {user?.email ? user.email[0].toUpperCase() : 'U'}
              </div>
              {/* Responsive Layout: Hide email metadata block on mobile view */}
              <div className="hidden md:flex flex-col text-left overflow-hidden">
                <span className="text-[12px] text-neutral-400 dark:text-neutral-500">Kitchen Staff</span>
                <span className="text-[12px] font-semibold text-black dark:text-white truncate" title={user?.email}>
                  {user?.email}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log Out"
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0b0b0b] text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>

      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <main className="flex-1 h-full p-4 md:p-6 flex flex-col overflow-y-auto max-w-[1400px] mx-auto w-full">
        
        {/* Rounded Inner Box wrapping Dashboard content (Dub-like) */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-neutral-200/80 dark:border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] flex-1 flex flex-col">
          
          {/* Header Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-white/[0.04] pb-6 mb-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">
                Dish Management
              </h1>
              <p className="text-neutral-400 dark:text-neutral-500 text-[13px] mt-0.5">
                Manage restaurant dishes and publish changes in real time.
              </p>
            </div>

            {/* Central Filter Search Bar */}
            <div className="relative w-full md:max-w-[320px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes..."
                className="w-full bg-neutral-50/50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] text-black dark:text-white text-[13px] rounded-full py-2 pl-10 pr-4 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-8">
            {/* Stat 1: Total Dishes */}
            <div className="bg-neutral-50 dark:bg-[#0f0f0f] border border-neutral-200/60 dark:border-white/[0.05] p-4.5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Total Dishes
                </p>
                <p className="text-2xl font-bold text-black dark:text-white mt-1">
                  {loading ? '...' : stats.total}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-neutral-200/50 dark:bg-white/[0.03] flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                <UtensilsCrossed size={16} />
              </div>
            </div>

            {/* Stat 2: Published */}
            <div className="bg-neutral-50 dark:bg-[#0f0f0f] border border-neutral-200/60 dark:border-white/[0.05] p-4.5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Published
                </p>
                <p className="text-2xl font-bold text-emerald-500 mt-1">
                  {loading ? '...' : stats.published}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle size={16} />
              </div>
            </div>

            {/* Stat 3: Unpublished */}
            <div className="bg-neutral-50 dark:bg-[#0f0f0f] border border-neutral-200/60 dark:border-white/[0.05] p-4.5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Unpublished
                </p>
                <p className="text-2xl font-bold text-rose-500 mt-1">
                  {loading ? '...' : stats.unpublished}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
                <XCircle size={16} />
              </div>
            </div>
          </div>

          {/* Core Content Area */}
          {fetchError ? (
            /* Error state: Centered alert card with retry action button */
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-center p-8 max-w-sm mx-auto">
              <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-black dark:text-white font-semibold text-[15px] mb-1">
                Failed to load dishes.
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-[13px] mb-5">
                Please try again.
              </p>
              <button
                onClick={getDishes}
                className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-semibold text-[13px] transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            /* Loading state: 8 skeleton cards animating */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl h-72" />
              ))}
            </div>
          ) : dishes.length === 0 ? (
            /* Empty state: No dishes registered */
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-center border-2 border-dashed border-neutral-100 dark:border-white/[0.03] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 mx-auto">
                <UtensilsCrossed size={24} />
              </div>
              <h3 className="text-black dark:text-white font-semibold text-[15px] mb-1">
                No dishes found.
              </h3>
            </div>
          ) : filteredDishes.length === 0 ? (
            /* Search empty state */
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-center border-2 border-dashed border-neutral-100 dark:border-white/[0.03] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 mx-auto">
                <Search size={24} />
              </div>
              <h3 className="text-black dark:text-white font-semibold text-[15px] mb-1">
                No matching dishes found
              </h3>
              <p className="text-neutral-400 dark:text-neutral-500 text-[13px] max-w-xs mx-auto">
                Try adjusting your search query, or clear the search input.
              </p>
            </div>
          ) : (
            /* Dish Grid showing dishes list */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => {
                const isToggling = !!togglingIds[dish.dishId];
                return (
                  <div
                    key={dish.dishId}
                    className="group bg-white dark:bg-[#0c0c0c] border border-neutral-200/80 dark:border-white/[0.06] rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-black hover:border-orange-500/40 dark:hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Dish Image Wrapper */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200/60 dark:border-white/[0.04]">
                      <img
                        src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600'}
                        alt={dish.dishName}
                        loading="lazy"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Floating Status Badge (with transition effects) */}
                      <div className="absolute top-3 right-3">
                        {dish.isPublished ? (
                          <span className="transition-all duration-300 bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold py-0.5 px-2 rounded-full backdrop-blur-md">
                            Published
                          </span>
                        ) : (
                          <span className="transition-all duration-300 bg-rose-500/15 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-500/20 text-[10px] font-bold py-0.5 px-2 rounded-full backdrop-blur-md">
                            Unpublished
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="text-[14px] font-bold text-black dark:text-white truncate">
                          {dish.dishName}
                        </h4>
                        <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                          ID: {dish.dishId}
                        </p>
                      </div>

                      {/* Action Button (disabled while any toggle API call is active to avoid conflicts) */}
                      <button
                        onClick={() => handleToggle(dish.dishId)}
                        disabled={isAnyToggling}
                        className={`w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-full text-[12.5px] font-semibold transition-all mt-4 cursor-pointer border select-none ${
                          dish.isPublished
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/15 dark:text-rose-400 dark:hover:bg-rose-500/25'
                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500/25'
                        } disabled:opacity-50`}
                      >
                        {isToggling ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : dish.isPublished ? (
                          <>
                            <EyeOff size={13} />
                            <span>Unpublish</span>
                          </>
                        ) : (
                          <>
                            <Eye size={13} />
                            <span>Publish</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

    </div>
  );
};

export default DashboardPage;
