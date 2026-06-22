import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  ChefHat, ArrowRight, ArrowUpRight, Check,
  Zap, ShieldCheck, ToggleRight, Wifi,
  BarChart2, RefreshCw, Star, Quote
} from 'lucide-react'

/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Product',    id: 'product'    },
  { label: 'Customers',  id: 'customers'  },
  { label: 'Changelog',  id: 'changelog'  },
  { label: 'Pricing',    id: 'pricing'    },
  { label: 'Docs',       id: 'docs'       },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/[0.05] transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-5 h-[56px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-[22px] h-[22px] rounded-[5px] bg-orange-500 flex items-center justify-center">
            <ChefHat size={12} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-white text-[14px] font-semibold tracking-tight">DishBoard</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[13px] text-neutral-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/dashboard" className="text-[13px] font-medium bg-white text-black px-3.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="text-[13px] text-neutral-400 hover:text-white transition-colors px-3 py-1.5 hidden md:block">Log in</Link>
              <Link to="/signup" className="text-[13px] font-medium bg-white text-black px-3.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors">Sign up</Link>
            </>
          )}
          {/* Hamburger */}
          <button
            className="md:hidden ml-1 flex flex-col gap-[4px] p-1"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={`block w-4.5 h-[1.5px] bg-neutral-400 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
            <span className={`block w-4.5 h-[1.5px] bg-neutral-400 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4.5 h-[1.5px] bg-neutral-400 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.05] px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMobileOpen(false) }}
              className="text-left text-[14px] text-neutral-400 hover:text-white transition-colors py-2.5 border-b border-white/[0.04] last:border-0 bg-transparent cursor-pointer"
            >
              {label}
            </button>
          ))}
          <div className="flex gap-3 pt-3">
            {user ? (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-[13px] font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-[13px] text-neutral-400 hover:text-white transition-colors">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-[13px] font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}


/* ─── HERO ────────────────────────────────────────────────────────────────── */
function Hero() {
  const { user } = useAuth()
  return (
    <section className="relative pt-[120px] pb-0 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-40 pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(249,115,22,0.08) 0%,transparent 70%)'}} />

      {/* Badge */}
      <div className="relative z-10 mb-7 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-[12px]">
        <span className="px-2 py-0.5 rounded-full bg-orange-500 text-black font-bold text-[10px]">NEW</span>
        <span className="text-neutral-400">Real-time Socket.io updates across all dashboards</span>
        <ArrowRight size={11} className="text-neutral-600" />
      </div>

      {/* Headline */}
      <h1 className="relative z-10 text-center font-bold tracking-[-0.04em] leading-[1.07] px-4"
          style={{fontSize:'clamp(42px,6.5vw,88px)',background:'linear-gradient(180deg,#fff 30%,rgba(255,255,255,0.45) 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',maxWidth:'900px'}}>
        The menu management system for modern kitchens
      </h1>
      <p className="relative z-10 mt-5 text-center text-neutral-400 leading-relaxed px-4" style={{fontSize:'clamp(15px,1.3vw,18px)',maxWidth:'480px'}}>
        Publish, unpublish, and track dishes in real time — built for restaurant and cloud kitchen operators who move fast.
      </p>

      {/* CTAs */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to={user ? "/dashboard" : "/signup"} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-[13.5px] font-semibold hover:bg-neutral-100 transition-colors shadow-lg">
          {user ? 'Go to Dashboard' : 'Get started'} <ArrowRight size={13} />
        </Link>
        <a href="#features" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[13.5px] text-neutral-300 hover:bg-white/[0.07] hover:text-white transition-colors">
          Learn more
        </a>
      </div>

      {/* Trust */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-5 text-[12px] text-neutral-600">
        {['Free to start','No credit card','Deploy in minutes'].map((t,i) => (
          <span key={i} className="flex items-center gap-1.5"><Check size={11} className="text-neutral-600" />{t}</span>
        ))}
      </div>

      {/* App mockup */}
      <div className="relative z-10 mt-14 w-full max-w-[1160px] mx-auto px-4">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(249,115,22,0.06) 0%,transparent 70%)'}} />
        <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/[0.06] bg-[#0c0c0c]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-[200px] mx-auto h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <span className="text-neutral-600 text-[10px]">dishboard.app/dashboard</span>
            </div>
          </div>
          <div className="flex" style={{height:'clamp(280px,35vw,420px)'}}>
            <aside className="hidden md:flex flex-col w-[190px] border-r border-white/[0.05] py-4 px-2.5 shrink-0 gap-0.5">
              <div className="px-2.5 py-1.5 mb-1.5"><span className="text-[10px] text-neutral-700 uppercase tracking-widest font-medium">Menu</span></div>
              {[{l:'All Dishes',a:true},{l:'Published',a:false},{l:'Drafts',a:false},{l:'Analytics',a:false},{l:'Settings',a:false}].map(({l,a}) => (
                <div key={l} className={`flex items-center gap-2 px-2.5 py-[5px] rounded-md text-[12.5px] cursor-pointer transition-colors ${a?'bg-white/[0.07] text-white':'text-neutral-600 hover:text-neutral-300 hover:bg-white/[0.03]'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${a?'bg-orange-400':'bg-neutral-800'}`} />
                  {l}
                </div>
              ))}
              <div className="mt-auto px-2.5 py-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center"><ChefHat size={10} className="text-orange-400" /></div>
                <span className="text-[11px] text-neutral-700 truncate">chef@kitchen.co</span>
              </div>
            </aside>
            <main className="flex-1 p-4 flex flex-col gap-2 overflow-hidden">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[14px] font-semibold text-white">All Dishes</span>
                <div className="flex gap-1.5">
                  <div className="h-6 px-3 rounded-md bg-white/[0.04] border border-white/[0.07] flex items-center"><span className="text-[11px] text-neutral-600">Filter</span></div>
                  <div className="h-6 px-3 rounded-md bg-orange-500 flex items-center"><span className="text-[11px] text-black font-semibold">+ Add</span></div>
                </div>
              </div>
              {[
                {n:'Margherita Pizza',c:'Italian',p:true},
                {n:'Chicken Tikka Masala',c:'Indian',p:true},
                {n:'Caesar Salad',c:'Salads',p:false},
                {n:'Pad Thai',c:'Asian',p:true},
                {n:'Beef Burger',c:'American',p:false},
                {n:'Sushi Platter',c:'Japanese',p:false},
              ].map((d,i) => (
                <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${i===0?'border-orange-500/20 bg-orange-500/[0.025]':'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'}`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-xs shrink-0">🍽️</div>
                    <div className="min-w-0">
                      <p className="text-[12.5px] text-white font-medium truncate">{d.n}</p>
                      <p className="text-[10.5px] text-neutral-700">{d.c}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${d.p?'bg-emerald-500/10 text-emerald-400 border-emerald-500/20':'bg-white/[0.03] text-neutral-600 border-white/[0.07]'}`}>{d.p?'Published':'Draft'}</span>
                    <div className={`relative w-7 h-[15px] rounded-full transition-colors cursor-pointer ${d.p?'bg-orange-500':'bg-white/[0.1]'}`}>
                      <div className={`absolute top-[2px] w-[11px] h-[11px] rounded-full bg-white transition-all shadow ${d.p?'left-[14px]':'left-[2px]'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TICKER ──────────────────────────────────────────────────────────────── */
function Ticker() {
  const items = ['Cloud Kitchens','Hotel F&B','QSR Chains','Food Trucks','Catering Ops','Restaurant Groups','Ghost Kitchens','Fine Dining','Street Food Vendors','Canteen Operators']
  return (
    <div className="mt-16 border-y border-white/[0.05] py-4 overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap animate-marquee">
        {[...items,...items].map((s,i) => (
          <span key={i} className="flex items-center gap-3 text-[11px] text-neutral-700 font-medium uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-neutral-800 shrink-0" />{s}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── "NEW KIND" SECTION ─────────────────────────────────────────────────── */

/* Stacked flat menu-layer slabs in isometric projection */
function StackedLayersSVG() {
  const cx = 140, hw = 82, hd = 17, lh = 11
  const layers = [
    { y: 158, op: 0.32 },
    { y: 123, op: 0.52 },
    { y: 88,  op: 0.74 },
    { y: 53,  op: 1.0  },
  ]
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {layers.map(({ y, op }) => (
        <g key={y} opacity={op}>
          {/* left face */}
          <polygon points={`${cx-hw},${y} ${cx-hw},${y+lh} ${cx},${y+hd+lh} ${cx},${y+hd}`}
            fill="rgba(255,255,255,0.018)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
          {/* right face */}
          <polygon points={`${cx+hw},${y} ${cx+hw},${y+lh} ${cx},${y+hd+lh} ${cx},${y+hd}`}
            fill="rgba(255,255,255,0.018)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
          {/* top face */}
          <polygon points={`${cx},${y-hd} ${cx+hw},${y} ${cx},${y+hd} ${cx-hw},${y}`}
            fill="rgba(255,255,255,0.038)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
        </g>
      ))}
    </svg>
  )
}

/* Cluster of isometric cubes — modular, real-time components */
function IsoCubesSVG() {
  const st = 'rgba(255,255,255,0.26)'
  // anchor = the front-bottom-left corner; s = scale
  // top:   E,F,A,G   right: F,B,D,A   back: G,A,D,C
  function iso(ax, ay, s) {
    const h = +(s * 0.866).toFixed(1), H = s * 0.5
    return {
      top:   `${ax},${ay-s} ${ax+h},${ay-H} ${ax},${ay} ${ax-h},${ay-H}`,
      right: `${ax+h},${ay-H} ${ax+h},${ay+H} ${ax},${ay+s} ${ax},${ay}`,
      back:  `${ax-h},${ay-H} ${ax},${ay} ${ax},${ay+s} ${ax-h},${ay+H}`,
    }
  }
  const main  = iso(125, 150, 55)
  const top_  = iso(125,  95, 34)
  const right = iso(173, 178, 33)
  return (
    <svg viewBox="0 0 280 265" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {[
        { f: main,  op: 1.0 },
        { f: top_,  op: 0.82 },
        { f: right, op: 0.65 },
      ].map(({ f, op }, i) => (
        <g key={i} opacity={op}>
          <polygon points={f.back}  fill="rgba(255,255,255,0.01)"  stroke={st} strokeWidth="0.7" />
          <polygon points={f.right} fill="rgba(255,255,255,0.022)" stroke={st} strokeWidth="0.7" />
          <polygon points={f.top}   fill="rgba(255,255,255,0.04)"  stroke={st} strokeWidth="0.7" />
        </g>
      ))}
    </svg>
  )
}

/* Cascading parallelogram "dish cards" fanned back-left to front-right */
function CascadingSheetsSVG() {
  // each entry: [tl_x, tl_y, tr_x, tr_y, br_x, br_y, bl_x, bl_y]
  // drawn back → front so front card is on top
  const cards = [
    [52, 115, 102, 140, 102, 218, 52, 193],
    [83,  97, 133, 122, 133, 200, 83, 175],
    [114, 79, 164, 104, 164, 182, 114, 157],
    [145, 61, 195,  86, 195, 164, 145, 139],
    [176, 43, 226,  68, 226, 146, 176, 121],
  ]
  return (
    <svg viewBox="38 28 218 215" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {cards.map((c, i) => (
        <polygon
          key={i}
          points={`${c[0]},${c[1]} ${c[2]},${c[3]} ${c[4]},${c[5]} ${c[6]},${c[7]}`}
          fill="rgba(255,255,255,0.022)"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.75"
          opacity={0.28 + i * 0.18}
        />
      ))}
    </svg>
  )
}

function IntroGrid() {
  const figs = [
    {
      id: 'FIG 0.2',
      SVG: StackedLayersSVG,
      title: 'Built for purpose',
      desc: 'DishBoard is shaped by real kitchen workflows — fast decisions, live menus, and zero friction from order to plate.',
    },
    {
      id: 'FIG 0.3',
      SVG: IsoCubesSVG,
      title: 'Powered by real-time',
      desc: 'Every dish toggle broadcasts via Socket.io to all connected dashboards simultaneously. No polling. No refresh.',
    },
    {
      id: 'FIG 0.4',
      SVG: CascadingSheetsSVG,
      title: 'Designed for speed',
      desc: 'Sub-100ms interactions. Optimistic UI and keyboard-first design so operators never have to slow down.',
    },
  ]

  return (
    <section id="product" className="pt-20 pb-0" style={{ scrollMarginTop: '70px' }}>
      <div className="max-w-[1200px] mx-auto px-5">

        {/* Two-tone headline — exact Linear style */}
        <h2 className="text-[30px] md:text-[42px] lg:text-[52px] font-bold tracking-[-0.025em] leading-[1.13] mb-16 max-w-[940px]">
          <span className="text-white">A new kind of dish management tool.</span>
          {' '}
          <span className="text-neutral-500">
            Purpose-built for restaurant and cloud kitchen operators, DishBoard brings real-time menu control and instant publishing to every screen.
          </span>
        </h2>

        {/* 3 equal columns — vertical dividers, no card borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-white/[0.06]">
          {figs.map(({ id, SVG, title, desc }) => (
            <div key={id} className="flex flex-col md:px-8 first:pl-0 last:pr-0 pb-10 md:pb-0">
              {/* FIG label */}
              <p className="text-[10px] font-medium text-neutral-700 tracking-[0.18em] uppercase mb-10">{id}</p>
              {/* Illustration */}
              <div className="flex-1 flex items-center justify-center py-4 min-h-[220px]">
                <SVG />
              </div>
              {/* Text */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h3 className="text-[14px] font-semibold text-white mb-2">{title}</h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURE BLOCK ───────────────────────────────────────────────────────── */
function FeatureBlock({num,label,headline,body,tabs,visual,reverse=false}){
  const [active,setActive]=useState(0)
  return (
    <div className="border-t border-white/[0.05] py-20">
      <div className={`max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${reverse?'direction-rtl':''}`}>
        {/* Text */}
        <div className={`flex flex-col justify-between py-4 pr-0 lg:pr-12 ${reverse?'lg:order-2':''}`}>
          <div>
            <a href="#" className="inline-flex items-center gap-1 text-[12px] text-neutral-500 hover:text-neutral-300 transition-colors mb-6">
              {num} {label} <ArrowUpRight size={11} />
            </a>
            <h3 className="text-[28px] md:text-[36px] font-bold tracking-[-0.025em] leading-[1.15] mb-4" style={{background:'linear-gradient(180deg,#fff 40%,rgba(255,255,255,0.55) 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              {headline}
            </h3>
            <p className="text-neutral-500 text-[14px] leading-relaxed max-w-[380px]">{body}</p>
          </div>
          {tabs && (
            <div className="flex flex-wrap gap-1.5 mt-8">
              {tabs.map((t,i) => (
                <button key={t} onClick={()=>setActive(i)} className={`text-[12px] font-medium px-2.5 py-1 rounded-full border transition-all ${active===i?'border-white/20 bg-white/[0.07] text-white':'border-white/[0.07] text-neutral-600 hover:text-neutral-400 hover:border-white/[0.12]'}`}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Visual */}
        <div className={`rounded-xl border border-white/[0.07] bg-[#090909] overflow-hidden min-h-[320px] flex items-center justify-center ${reverse?'lg:order-1':''}`}>
          {visual}
        </div>
      </div>
    </div>
  )
}

/* ─── FEATURE VISUALS ─────────────────────────────────────────────────────── */
const IntakeVisual = (
  <div className="w-full p-5 space-y-2">
    <div className="flex items-center gap-2 mb-4">
      {['Backlog','Todo','In Progress','Done'].map((col,i) => (
        <div key={col} className={`flex-1 rounded-lg border p-2.5 ${i===2?'border-orange-500/20 bg-orange-500/[0.03]':'border-white/[0.06] bg-white/[0.02]'}`}>
          <p className="text-[10px] text-neutral-600 mb-2 font-medium">{col}</p>
          {[...Array(i===2?3:i===0?2:1)].map((_,j) => (
            <div key={j} className="h-5 rounded-md bg-white/[0.04] border border-white/[0.06] mb-1 last:mb-0" />
          ))}
        </div>
      ))}
    </div>
    <div className="rounded-lg border border-white/[0.06] bg-[#0c0c0c] p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center"><span className="text-[9px]">💬</span></div>
        <span className="text-[11px] text-neutral-500">Slack thread — customer feedback</span>
      </div>
      <p className="text-[11px] text-neutral-400 leading-relaxed">"The Saturday night menu keeps going out of stock — Biryani and Butter Chicken are always unavailable by 7pm"</p>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded px-2 py-0.5">@DishBoard auto-triage this →</div>
      </div>
    </div>
  </div>
)

const PlanVisual = (
  <div className="w-full p-5">
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[11px] text-neutral-600 font-medium">Menu Roadmap — Q3 2025</span>
      <span className="text-[10px] text-neutral-700">Jul → Sep</span>
    </div>
    {[
      {label:'Ramadan Special Menu',w:'75%',color:'bg-orange-500/40'},
      {label:'Vegan Range Launch',w:'45%',color:'bg-blue-500/30'},
      {label:'Weekend Brunch Cards',w:'60%',color:'bg-emerald-500/30'},
      {label:'Kids Meal Redesign',w:'30%',color:'bg-purple-500/30'},
    ].map(({label,w,color}) => (
      <div key={label} className="mb-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11.5px] text-neutral-400">{label}</span>
        </div>
        <div className="h-5 rounded-md bg-white/[0.04] border border-white/[0.06] overflow-hidden">
          <div className={`h-full rounded-md ${color}`} style={{width:w}} />
        </div>
      </div>
    ))}
    <div className="mt-4 grid grid-cols-2 gap-2">
      {[{t:'Core Menu',s:'On track',c:'text-emerald-400'},{t:'Seasonal Items',s:'At risk',c:'text-orange-400'}].map(({t,s,c}) => (
        <div key={t} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="text-[11px] text-neutral-500 mb-0.5">{t}</p>
          <p className={`text-[11px] font-medium ${c}`}>{s}</p>
        </div>
      ))}
    </div>
  </div>
)

const BuildVisual = (
  <div className="w-full p-5 font-mono">
    <div className="rounded-lg border border-white/[0.07] bg-[#050505] p-4 mb-3">
      <p className="text-[10px] text-neutral-600 mb-2.5">// Dish toggle action</p>
      {[
        {c:'text-neutral-500',t:'// PATCH /api/dishes/6/toggle'},
        {c:'text-orange-400',t:'→ dish:updated emitted to io'},
        {c:'text-neutral-400',t:'→ Broadcasting to 4 clients...'},
        {c:'text-emerald-400',t:'✓ client-a received'},
        {c:'text-emerald-400',t:'✓ client-b received'},
        {c:'text-emerald-400',t:'✓ client-c received'},
        {c:'text-emerald-400',t:'✓ client-d received'},
      ].map((l,i) => (
        <div key={i} className={`text-[11px] mb-1 ${l.c}`}>{l.t}</div>
      ))}
    </div>
    <div className="flex gap-2">
      {['Issues','Socket Events','Git Push','API Logs'].map((t,i) => (
        <div key={t} className={`text-[10px] px-2 py-1 rounded-full border ${i===0?'border-white/20 bg-white/[0.06] text-white':'border-white/[0.07] text-neutral-700'}`}>{t}</div>
      ))}
    </div>
  </div>
)

const MonitorVisual = (
  <div className="w-full p-5">
    <div className="mb-3">
      <span className="text-[11px] text-neutral-600 font-medium">Toggle events — Last 7 days</span>
    </div>
    <div className="flex items-end gap-1.5 h-24 mb-4">
      {[40,65,30,80,55,70,95,60,45,85,50,75,90].map((h,i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{height:`${h}%`,background:i===12?'#f97316':i>9?'rgba(249,115,22,0.5)':'rgba(255,255,255,0.07)'}} />
      ))}
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[{l:'Dishes Live',v:'5',up:true},{l:'Drafts',v:'3',up:false},{l:'Toggles Today',v:'12',up:true}].map(({l,v,up}) => (
        <div key={l} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="text-[10px] text-neutral-600 mb-1">{l}</p>
          <p className="text-[18px] font-semibold text-white leading-none">{v}</p>
          <p className={`text-[10px] mt-1 ${up?'text-emerald-400':'text-neutral-600'}`}>{up?'↑ active':'→ static'}</p>
        </div>
      ))}
    </div>
  </div>
)

/* ─── CHANGELOG ───────────────────────────────────────────────────────────── */
function Changelog(){
  const items=[
    {date:'Jun 17, 2025',title:'Real-time multi-client sync',desc:'Socket.io now broadcasts to unlimited simultaneous dashboard sessions.'},
    {date:'Jun 10, 2025',title:'One-click toggle API',desc:'PATCH /api/dishes/:id/toggle now returns the updated dish object instantly.'},
    {date:'Jun 3, 2025',title:'JWT httpOnly auth cookies',desc:'Login sessions secured with httpOnly cookies, 7-day expiry, and CORS credentials.'},
    {date:'May 27, 2025',title:'Prisma + Neon integration',desc:'Serverless PostgreSQL with full Prisma ORM support and instant migrations.'},
  ]
  return (
    <section id="changelog" className="border-t border-white/[0.05] py-20 px-5" style={{scrollMarginTop:'70px'}}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-semibold text-white tracking-tight">Changelog</h2>
          <a href="#" className="flex items-center gap-1 text-[13px] text-neutral-500 hover:text-white transition-colors">View all <ArrowRight size={13} /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map(({date,title,desc})=>(
            <div key={title} className="rounded-xl border border-white/[0.07] bg-[#0b0b0b] p-5 hover:border-white/[0.14] transition-colors group cursor-pointer">
              <p className="text-[11px] text-neutral-600 mb-3 font-medium">{date}</p>
              <h4 className="text-[14px] font-semibold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">{title}</h4>
              <p className="text-[12.5px] text-neutral-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ────────────────────────────────────────────────────────── */
function Testimonials(){
  return (
    <section id="customers" className="border-t border-white/[0.05] py-20 px-5" style={{scrollMarginTop:'70px'}}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {quote:'"You stop worrying about stale menus the moment you see a dish toggle sync across three open screens in real time. DishBoard just works."',name:'Tariq Hussain',role:'Head of Ops, CloudBite Kitchen',emoji:'🍳'},
            {quote:'"We cut our menu update time from 20 minutes of WhatsApp messages to literally one click. Every manager sees it instantly."',name:'Priya Menon',role:'General Manager, Spice Route Group',emoji:'🌶️'},
          ].map(({quote,name,role,emoji})=>(
            <div key={name} className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-8 md:p-10 flex flex-col justify-between min-h-[220px]">
              <p className="text-[17px] md:text-[20px] text-white font-medium leading-[1.5] tracking-tight">{quote}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.1] flex items-center justify-center text-base">{emoji}</div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{name}</p>
                  <p className="text-[12px] text-neutral-600">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PRICING (STATS) ─────────────────────────────────────────────────────── */
function StatsStrip(){
  return (
    <section id="pricing" className="border-t border-white/[0.05] py-16 px-5" style={{scrollMarginTop:'70px'}}>
      <div className="max-w-[1200px] mx-auto">
        <p className="text-center text-[13px] text-neutral-600 mb-8">DishBoard powers menu operations for kitchens across 3 continents. From ambitious startups to major food groups.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:'8',l:'Dishes seeded on launch'},{v:'3',l:'Real-time events/toggle'},{v:'7d',l:'JWT session expiry'},{v:'< 100ms',l:'Avg API response time'}].map(({v,l})=>(
            <div key={l} className="rounded-xl border border-white/[0.06] bg-[#0b0b0b] p-5 text-center">
              <p className="text-[32px] font-bold text-white tracking-tight">{v}</p>
              <p className="text-[12px] text-neutral-600 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── DOCS SECTION ────────────────────────────────────────────────────────── */
function DocsBlock(){
  const endpoints = [
    { method:'POST', path:'/api/auth/register', desc:'Create account & get session cookie' },
    { method:'POST', path:'/api/auth/login',    desc:'Login, set httpOnly JWT cookie' },
    { method:'POST', path:'/api/auth/logout',   desc:'Clear the token cookie' },
    { method:'GET',  path:'/api/auth/me',        desc:'Returns the authenticated user' },
    { method:'GET',  path:'/api/dishes',         desc:'List all dishes (auth required)' },
    { method:'PATCH',path:'/api/dishes/:id/toggle', desc:'Flip isPublished, emits dish:updated' },
  ]
  return (
    <section id="docs" className="border-t border-white/[0.05] py-20 px-5" style={{scrollMarginTop:'70px'}}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[22px] font-semibold text-white tracking-tight mb-1">API Reference</h2>
            <p className="text-[13px] text-neutral-600">REST + Socket.io endpoints for DishBoard</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-[13px] text-neutral-500 hover:text-white transition-colors">Full docs <ArrowRight size={13} /></a>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#090909] overflow-hidden">
          {endpoints.map(({ method, path, desc }, i) => (
            <div key={path} className={`flex items-center gap-4 px-5 py-3.5 ${i < endpoints.length - 1 ? 'border-b border-white/[0.05]' : ''} hover:bg-white/[0.02] transition-colors`}>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono shrink-0 ${
                method==='GET'   ? 'text-emerald-400 bg-emerald-500/10' :
                method==='POST'  ? 'text-blue-400 bg-blue-500/10' :
                method==='PATCH' ? 'text-orange-400 bg-orange-500/10' : 'text-red-400 bg-red-500/10'
              }`}>{method}</span>
              <code className="text-[12.5px] text-neutral-300 font-mono flex-1">{path}</code>
              <span className="text-[12px] text-neutral-600 hidden md:block">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
function Cta(){
  const { user } = useAuth()
  return (
    <section className="border-t border-white/[0.05] py-28 px-5">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="text-[40px] md:text-[60px] font-bold tracking-[-0.04em] leading-[1.08] mb-5" style={{background:'linear-gradient(180deg,#fff 40%,rgba(255,255,255,0.45) 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
          Built for the future.<br />Available today.
        </h2>
        <p className="text-neutral-500 text-[15px] leading-relaxed mb-8 max-w-[380px] mx-auto">Join the operators already using DishBoard to run tighter, faster kitchens.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={user ? "/dashboard" : "/signup"} className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-neutral-100 transition-colors shadow-xl shadow-white/10">
            {user ? 'Go to Dashboard' : 'Get started'} <ArrowRight size={14} />
          </Link>
          <a href="mailto:hello@dishboard.app" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.1] text-[14px] text-neutral-400 hover:bg-white/[0.05] hover:text-white transition-colors">
            Contact sales
          </a>
        </div>
      </div>
    </section>
  )
}


/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer(){
  const cols=[
    {h:'Product',ls:['Intake','Plan','Build','Monitor','Pricing','Security']},
    {h:'Features',ls:['Toggle API','Socket Events','Auth Cookies','Dish Analytics','Mobile','Integrations','Changelog']},
    {h:'Company',ls:['About','Customers','Careers','Blog','Method','Brand']},
    {h:'Resources',ls:['Docs','API Reference','Status','Enterprise','Download','Startups']},
    {h:'Connect',ls:['Contact us','Community','Twitter / X','GitHub','LinkedIn']},
  ]
  return (
    <footer className="border-t border-white/[0.05] px-5 pt-14 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="shrink-0 w-[160px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-[20px] h-[20px] rounded-[4px] bg-orange-500 flex items-center justify-center"><ChefHat size={11} className="text-black" strokeWidth={2.5} /></div>
              <span className="text-white text-[13px] font-semibold">DishBoard</span>
            </div>
            <p className="text-[12px] text-neutral-700 leading-relaxed">Menu management for modern kitchens.</p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {cols.map(({h,ls})=>(
              <div key={h}>
                <p className="text-[11px] font-semibold text-neutral-600 mb-3 uppercase tracking-widest">{h}</p>
                <ul className="space-y-2">
                  {ls.map(l=>(<li key={l}><a href="#" className="text-[12.5px] text-neutral-700 hover:text-neutral-300 transition-colors">{l}</a></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-5 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11.5px] text-neutral-800">© 2025 DishBoard. Built for food operators.</p>
          <div className="flex gap-5">
            {['Privacy','Terms','DPA','AUP'].map(l=>(<a key={l} href="#" className="text-[11.5px] text-neutral-800 hover:text-neutral-500 transition-colors">{l}</a>))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function LandingPage(){
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <IntroGrid />

      <FeatureBlock
        num="1.0" label="Intake"
        headline="Make menu operations self-driving."
        body="Turn customer feedback and stock alerts into actionable dish toggles that are routed, updated, and broadcast to every screen instantly."
        tabs={['1.1 Socket Events','1.2 Auto Triage','1.3 Customer Requests','1.4 Alerts']}
        visual={IntakeVisual}
      />
      <FeatureBlock
        num="2.0" label="Plan"
        headline="Define your menu direction."
        body="Plan seasonal menus, manage dish roadmaps, and align your kitchen team with clear, up-to-date availability status."
        tabs={['2.1 Roadmap','2.2 Initiatives','2.3 Visual Planning','2.4 Documents']}
        visual={PlanVisual}
        reverse
      />
      <FeatureBlock
        num="3.0" label="Build"
        headline="Move changes across teams in real time."
        body="Every PATCH to the toggle endpoint broadcasts a dish:updated Socket.io event to all connected dashboards — no polling, no refresh needed."
        tabs={['3.1 API Endpoints','3.2 Socket Events','3.3 JWT Auth','3.4 Prisma ORM','3.5 Neon DB']}
        visual={BuildVisual}
      />
      <FeatureBlock
        num="4.0" label="Monitor"
        headline="Understand your menu at scale."
        body="Track toggle frequency, published vs draft ratios, and live event streams — all surfaced in a real-time analytics view."
        tabs={['4.1 Pulse','4.2 Insights','4.3 Dashboards']}
        visual={MonitorVisual}
        reverse
      />

      <Changelog />
      <Testimonials />
      <StatsStrip />
      <DocsBlock />
      <Cta />
      <Footer />
    </div>
  )
}
