"use client";

/**
 * BlackSlon — Profile Selection Page
 * Visual: Malewicz / Suprematism — geometric SVG symbols, colored borders on hover
 * AI: Profile-specific advisor opens after selection
 *
 * Route: /profile  (or replace your existing profile page with this)
 * Requires: AIAdvisor.tsx in the same /components folder
 */

import { useRouter } from "next/navigation";
import type { ProfileId } from "@/components/AIAdvisor";

// ─── Profile definitions ──────────────────────────────────────────────────────

interface ProfileDef {
  id: ProfileId;
  num: string;
  name: string;
  sub: string;
  tag: string;
  tagColor: string;         // border + text color class (Tailwind)
  hoverBorder: string;      // symbol box border on hover
  symbolColor: string;      // SVG stroke/fill color (hex)
  symbol: React.ReactNode;
  defaultMarket: string;
}

const PROFILES: ProfileDef[] = [
  {
    id: "pro-trader",
    num: "01",
    name: "PRO ENERGY TRADER",
    sub: "Inside BP, Orlen, DTEK. Non-compete blocks you.",
    tag: "PRO",
    tagColor: "border-[#e05a4e] text-[#e05a4e]",
    hoverBorder: "group-hover:border-[#e05a4e]",
    symbolColor: "#e05a4e",
    defaultMarket: "BS-G-NL",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <line x1="10" y1="10" x2="50" y2="50" stroke="#e05a4e" strokeWidth="4" strokeLinecap="square"/>
        <line x1="50" y1="10" x2="10" y2="50" stroke="#e05a4e" strokeWidth="4" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: "tech-trader",
    num: "02",
    name: "TECHNICAL TRADER",
    sub: "Crypto & stocks instincts. Energy vol is the frontier.",
    tag: "PRO",
    tagColor: "border-[#e07a2f] text-[#e07a2f]",
    hoverBorder: "group-hover:border-[#e07a2f]",
    symbolColor: "#e07a2f",
    defaultMarket: "BS-P-DE",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <polyline points="6,44 20,20 34,32 48,10" stroke="#e07a2f" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter"/>
      </svg>
    ),
  },
  {
    id: "renewable",
    num: "03",
    name: "RENEWABLE PRODUCER",
    sub: "Wind & solar. Intermittent. Partial hedge only.",
    tag: "HEDGER",
    tagColor: "border-[#3cb371] text-[#3cb371]",
    hoverBorder: "group-hover:border-[#3cb371]",
    symbolColor: "#3cb371",
    defaultMarket: "BS-P-DE",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <polygon points="30,8 54,50 6,50" stroke="#3cb371" strokeWidth="3.5" fill="none" strokeLinejoin="miter"/>
      </svg>
    ),
  },
  {
    id: "baseload",
    num: "04",
    name: "BASELOAD PRODUCER",
    sub: "Nuclear, gas, coal. Flat output 24h/day.",
    tag: "HEDGER",
    tagColor: "border-[#4a90d9] text-[#4a90d9]",
    hoverBorder: "group-hover:border-[#4a90d9]",
    symbolColor: "#4a90d9",
    defaultMarket: "BS-P-DE",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="10" y="24" width="40" height="14" fill="#4a90d9"/>
      </svg>
    ),
  },
  {
    id: "industrial",
    num: "05",
    name: "INDUSTRIAL CONSUMER",
    sub: "Cheap baseload for 2 years. Price certainty.",
    tag: "HEDGER",
    tagColor: "border-[#e8a020] text-[#e8a020]",
    hoverBorder: "group-hover:border-[#e8a020]",
    symbolColor: "#e8a020",
    defaultMarket: "BS-G-NL",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="8"  y="12" width="44" height="9"  fill="#e8a020"/>
        <rect x="8"  y="27" width="30" height="9"  fill="#e8a020"/>
        <rect x="8"  y="42" width="18" height="9"  fill="#e8a020"/>
      </svg>
    ),
  },
  {
    id: "investor",
    num: "06",
    name: "ENERGY INVESTOR",
    sub: "First direct local energy asset class.",
    tag: "INVESTOR",
    tagColor: "border-[#9b59b6] text-[#9b59b6]",
    hoverBorder: "group-hover:border-[#9b59b6]",
    symbolColor: "#9b59b6",
    defaultMarket: "BS-P-DE",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="20" stroke="#9b59b6" strokeWidth="3.5"/>
        <circle cx="30" cy="30" r="5"  fill="#9b59b6"/>
      </svg>
    ),
  },
  {
    id: "sme",
    num: "07",
    name: "SME",
    sub: "Small & medium enterprise. Energy cost is your margin.",
    tag: "HEDGER",
    tagColor: "border-[#27ae60] text-[#27ae60]",
    hoverBorder: "group-hover:border-[#27ae60]",
    symbolColor: "#27ae60",
    defaultMarket: "BS-G-NL",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <line x1="30" y1="8"  x2="30" y2="52" stroke="#27ae60" strokeWidth="4" strokeLinecap="square"/>
        <line x1="8"  y1="30" x2="52" y2="30" stroke="#27ae60" strokeWidth="4" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: "household-active",
    num: "08",
    name: "ACTIVE HOUSEHOLD",
    sub: "Give us your consumption. AI tells you when to buy.",
    tag: "RETAIL",
    tagColor: "border-[#1abc9c] text-[#1abc9c]",
    hoverBorder: "group-hover:border-[#1abc9c]",
    symbolColor: "#1abc9c",
    defaultMarket: "BS-G-NL",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="10" y="10" width="34" height="34" stroke="#1abc9c" strokeWidth="3.5" fill="none"/>
        <line x1="44" y1="20" x2="52" y2="20" stroke="#1abc9c" strokeWidth="3"/>
        <line x1="44" y1="30" x2="52" y2="30" stroke="#1abc9c" strokeWidth="3"/>
        <line x1="20" y1="44" x2="20" y2="52" stroke="#1abc9c" strokeWidth="3"/>
        <line x1="30" y1="44" x2="30" y2="52" stroke="#1abc9c" strokeWidth="3"/>
      </svg>
    ),
  },
  {
    id: "passive",
    num: "09",
    name: "PASSIVE PROTECTION",
    sub: "One button. Set & forget. Zero knowledge required.",
    tag: "RETAIL",
    tagColor: "border-[#e91e8c] text-[#e91e8c]",
    hoverBorder: "group-hover:border-[#e91e8c]",
    symbolColor: "#e91e8c",
    defaultMarket: "BS-G-NL",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="8"  y="8"  width="44" height="44" stroke="#e91e8c" strokeWidth="3.5" fill="none"/>
        <rect x="18" y="18" width="24" height="24" fill="#e91e8c"/>
      </svg>
    ),
  },
  {
    id: "institutional",
    num: "10",
    name: "INSTITUTIONAL / B2B",
    sub: "Family office, fund, broker. Portfolio allocation.",
    tag: "INVESTOR",
    tagColor: "border-[#00bcd4] text-[#00bcd4]",
    hoverBorder: "group-hover:border-[#00bcd4]",
    symbolColor: "#00bcd4",
    defaultMarket: "BS-P-DE",
    symbol: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="6"  y="30" width="18" height="22" fill="#00bcd4"/>
        <rect x="30" y="20" width="24" height="32" fill="#5dd4e4" opacity="0.6"/>
        <rect x="22" y="38" width="10" height="14" fill="#00bcd4" opacity="0.8"/>
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();

  const handleSelect = (p: ProfileDef) => {
    localStorage.setItem('bs_profile', p.id);
    router.push(`/markets/${p.defaultMarket}?profile=${p.id}`);
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">

      {/* ── Top bar ── */}
      <div className="border-b border-[#111] px-6 py-2 flex items-center justify-between sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-yellow-500/50 flex items-center justify-center text-[9px] text-yellow-400">
            八
          </div>
          <span className="text-[8px] tracking-[3px] uppercase text-[#333]">
            BlackSlon Protocol
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-800 animate-pulse" />
          <span className="text-[8px] tracking-widest text-[#333] uppercase">Live</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-14">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-[8px] tracking-[4px] uppercase text-[#333] mb-6">
            BlackSlon Protocol — Profile Selection
          </p>
          <h1 className="text-5xl font-light tracking-wider mb-3">
            Who are <span className="text-yellow-400 font-semibold">you</span>?
          </h1>
          <p className="text-[9px] tracking-[3px] uppercase text-[#333] mb-10">
            Select your profile — your AI advisor adapts to your needs
          </p>

          {/* Protocol strip */}
          <div className="inline-flex border border-[#111] divide-x divide-[#111] text-[8px] tracking-widest uppercase">
            {[
              { k: "Token",     v: "1 BS = 100 kWh" },
              { k: "Contract",  v: "2-Year Rolling Delivery" },
              { k: "Structure", v: "Backwardation Embedded" },
              { k: "Market",    v: "Local · Isolated · 24/7" },
            ].map(({ k, v }) => (
              <div key={k} className="px-6 py-2 text-center">
                <div className="text-[#222] mb-1">{k}</div>
                <div className="text-yellow-400">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Profile Grid ── */}
        <div className="grid grid-cols-5 gap-0 border border-[#111]">
          {PROFILES.map((p) => (
            <div
              key={p.id}
              className="group relative border-r border-b border-[#111] last:border-r-0 cursor-pointer bg-black hover:bg-[#060606] transition-colors"
              style={{ borderRight: "1px solid #111", borderBottom: "1px solid #111" }}
            >
              {/* Card content */}
              <div className="flex flex-col items-center text-center p-6 gap-4">

                {/* Number */}
                <span className="text-[8px] tracking-[2px] text-[#1a1a1a] self-start">
                  {p.num}
                </span>

                {/* Symbol box */}
                <div
                  className={`
                    w-[120px] h-[120px] border border-[#1a1a1a] flex items-center justify-center
                    transition-all duration-200
                    ${p.hoverBorder}
                  `}
                >
                  {p.symbol}
                </div>

                {/* Name */}
                <div className="text-[9px] tracking-[2px] text-[#888] uppercase leading-relaxed">
                  {p.name}
                </div>

                {/* Tag */}
                <div className={`text-[7px] tracking-[2px] uppercase border px-2 py-0.5 ${p.tagColor}`}>
                  {p.tag}
                </div>

                {/* Sub */}
                <p className="text-[9px] text-[#2a2a2a] leading-relaxed tracking-wide">
                  {p.sub}
                </p>

                {/* AI label */}
                <div className="w-full pt-2 border-t border-[#0d0d0d]">
                  <div className="text-[7px] tracking-[2px] text-[#1a1a1a] uppercase mb-1">
                    AI Advisor
                  </div>
                  <button
                    onClick={() => handleSelect(p)}
                    className="
                      w-full text-[7px] tracking-[2px] uppercase py-1.5
                      border border-[#111] text-[#222]
                      transition-all duration-150
                      hover:text-yellow-400 hover:border-yellow-500/40
                    "
                  >
                    Enter →
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Footer strip ── */}
        <div className="mt-0 border border-t-0 border-[#111] grid grid-cols-4 divide-x divide-[#111]">
          {[
            { k: "Settlement", v: "eEURO · MiCA Compliant" },
            { k: "Margin",     v: "25% → 50% · €BSR Tiered" },
            { k: "Protocol",   v: "H_solv · On-Chain · Public" },
            { k: "Access",     v: "100 kWh Minimum · Any Wallet" },
          ].map(({ k, v }) => (
            <div key={k} className="px-4 py-3 text-center">
              <div className="text-[7px] tracking-[2px] text-[#1a1a1a] uppercase mb-1">{k}</div>
              <div className="text-[8px] tracking-widest text-[#2a2a2a] uppercase">{v}</div>
            </div>
          ))}
        </div>

        {/* ── Guest entry ── */}
        <div className="text-center mt-10">
          <p className="text-[8px] tracking-[3px] uppercase text-[#1a1a1a] mb-3">
            Or enter directly without profile — full terminal access
          </p>
          <a
            href="/markets/BS-P-DE"
            className="text-[8px] tracking-[2px] uppercase px-8 py-2.5 border border-[#111] text-[#222]
              hover:border-yellow-500/40 hover:text-yellow-400 transition-colors inline-block"
          >
            Enter Markets →
          </a>
        </div>

      </div>
    </main>
  );
}
