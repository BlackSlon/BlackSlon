'use client'

import { useState, useEffect } from 'react'
import { useUserAccount } from '@/store/blackslon'

// ─── Solvency Tier Config ────────────────────────────────────────────────────
const SOLVENCY_TIERS = [
  { tier: 'I',   label: 'PRIME',    min: 0.85, color: '#22c55e', glow: 'rgba(34,197,94,0.4)',   bg: 'rgba(34,197,94,0.06)',   border: 'rgba(34,197,94,0.3)'   },
  { tier: 'II',  label: 'SECURE',   min: 0.65, color: '#38bdf8', glow: 'rgba(56,189,248,0.4)',  bg: 'rgba(56,189,248,0.06)',  border: 'rgba(56,189,248,0.3)'  },
  { tier: 'III', label: 'WATCH',    min: 0.40, color: '#b45309', glow: 'rgba(180,83,9,0.4)',    bg: 'rgba(180,83,9,0.06)',    border: 'rgba(180,83,9,0.3)'    },
  { tier: 'IV',  label: 'CRITICAL', min: 0,    color: '#ef4444', glow: 'rgba(239,68,68,0.4)',   bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.3)'   },
] as const

function getSolvencyTier(s: number) {
  return SOLVENCY_TIERS.find((t) => s >= t.min) ?? SOLVENCY_TIERS[3]
}

const fmt = (n: number) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace(/\u202f/g, ' ')
    .replace(/,/g, '.')

export default function UserAccountPanel() {
  const {
    user,
    inventory,
    vault,
    solvency,
    hFactor,
    bsrEuroRate,
    setWalletConnected,
    checkLiquidation,
    convertTokens,
  } = useUserAccount()

  const [convertAmount, setConvertAmount] = useState('')
  const [convertDirection, setConvertDirection] = useState<'BSR_TO_EURO' | 'EURO_TO_BSR'>('BSR_TO_EURO')
  const [convertError, setConvertError] = useState<string | null>(null)
  const [convertSuccess, setConvertSuccess] = useState(false)
  const [liquidationRisk, setLiquidationRisk] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)

  const activeTier = getSolvencyTier(solvency)
  const pct = Math.round(solvency * 100)

  const totalBSRinEUR = user.bsrBalance * bsrEuroRate
  const totalBalance = user.eEuroBalance + totalBSRinEUR
  const totalLockedEUR = vault.lockedBSR * bsrEuroRate + vault.lockedEuro

  const shortAddress = user.walletAddress
    ? `${user.walletAddress.slice(0, 6)}…${user.walletAddress.slice(-4)}`
    : '─────────────'

  const handleLiquidationCheck = async () => {
    setChecking(true)
    try {
      const risk = await checkLiquidation()
      setLiquidationRisk(risk)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-black font-mono text-white p-0 overflow-hidden">

      {/* ── Header ── */}
      <div className="w-full pt-1 pb-1 flex flex-col items-center shrink-0">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.5em] font-bold">
          User's Account Panel
        </div>
        <div className="w-[85%] border-b border-gray-800 mt-2" />
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-grow overflow-y-auto px-6 pb-4 flex flex-col space-y-3 min-h-0">

        {/* ── Section: Available Liquidity & Vault ── */}
        <div className="pt-3">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="text-[10px] tracking-widest text-amber-700 font-bold text-center">
              Available Liquidity
            </div>
            <div className="text-[10px] tracking-widest text-amber-700 font-bold text-center">
              BlackSlon Vault
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="border border-amber-700 rounded-sm py-1 px-3 w-fit">
              <div className="text-[7px] text-amber-700 uppercase tracking-widest mb-0">€BSR Balance</div>
              <div className="text-[11px] text-amber-700 leading-tight font-normal">{fmt(user.bsrBalance)}</div>
            </div>
            <div className="border border-sky-400 rounded-sm py-1 px-3 w-fit">
              <div className="text-[7px] text-sky-400 uppercase tracking-widest mb-0"><span className="normal-case">e</span>EURO Balance</div>
              <div className="text-[11px] text-sky-400 leading-tight font-normal">{fmt(user.eEuroBalance)}</div>
            </div>
            <div className="border border-amber-700 rounded-sm py-1 px-3 w-fit">
              <div className="text-[7px] text-amber-700 uppercase tracking-widest mb-0">Locked €BSR</div>
              <div className="text-[11px] text-amber-700 tracking-tighter leading-tight">{fmt(vault.lockedBSR)}</div>
            </div>
            <div className="border border-sky-400 rounded-sm py-1 px-3 w-fit">
              <div className="text-[7px] text-sky-400 uppercase tracking-widest mb-0">Locked <span className="normal-case">e</span>EURO</div>
              <div className="text-[11px] text-sky-400 tracking-tighter leading-tight">{fmt(vault.lockedEuro)}</div>
            </div>
          </div>
        </div>

        {/* ── Section: Portfolio ── */}
        <div>
          <div className="text-[10px] tracking-widest text-amber-700 font-bold mb-1 text-center">
            BlackSlon Tokens Portfolio
          </div>
          <div className="grid grid-cols-6 text-[7px] text-gray-500 uppercase px-2 py-1 border-b border-gray-900">
            <div className="tracking-widest">Token</div>
            <div className="text-center tracking-widest">Units</div>
            <div className="text-center tracking-widest normal-case">Vol (kWh)</div>
            <div className="text-center tracking-widest">Avg P.</div>
            <div className="text-center tracking-widest">Last P.</div>
            <div className="text-right tracking-widest">PnL (EUR)</div>
          </div>
          {inventory.map((item) => (
            <div
              key={item.token}
              className="grid grid-cols-6 items-center py-1 px-2 border-b border-gray-900/50 hover:bg-gray-900/40 transition-colors"
            >
              <div className={`text-[10px] ${
                item.token.startsWith('BS-G') ? 'text-blue-500' : 'text-yellow-500'
              }`}>{item.token}</div>
              <div className="text-center text-[11px] text-gray-400">{item.units}</div>
              <div className="text-center text-[11px] text-gray-400">{item.quantity.toLocaleString('fr-FR').replace(/\u202f/g, ' ')}</div>
              <div className="text-center text-[11px] text-gray-400">{item.avgPrice.toFixed(2)}</div>
              <div className="text-center text-[11px] text-gray-400">{item.lastPrice.toFixed(2)}</div>
              <div className={`text-right text-[11px] ${item.pnl >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                {item.pnl >= 0 ? '+' : ''}{item.pnl.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Section: Solvency ── */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] tracking-widest text-amber-700 font-bold text-center">
              BlackSlon Solvency Engine
            </div>
            <span className="text-[7px] text-gray-700 uppercase tracking-widest">(Protocol Level)</span>
          </div>

          {/* Current Tier */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest">Current Tier</span>
            <span className="text-[11px] font-black" style={{ color: activeTier.color }}>
              T{activeTier.tier}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest">Solvency Index</span>
            <span className="text-[11px] font-black" style={{ color: activeTier.color }}>
              {pct}%
            </span>
          </div>
          <div className="w-full h-1 rounded-full overflow-hidden bg-gray-900 border border-gray-800">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${activeTier.color}80, ${activeTier.color})`,
                boxShadow: `0 0 8px ${activeTier.glow}`,
              }}
            />
          </div>
          <div className="text-right text-[7px] mt-0.5" style={{ color: activeTier.color + '99' }}>
            {activeTier.tier === 'I' ? 'Ultra-solvent' : activeTier.tier === 'II' ? 'Stable margin' : activeTier.tier === 'III' ? 'Margin pressure' : 'Liquidation risk'}
          </div>
        </div>

        {/* ── Section: Risk Management ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-widest text-amber-700 font-bold text-center">
              BlackSlon Risk Management
            </div>
            <span className="text-[7px] text-gray-700 uppercase tracking-widest">(User's Level)</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">H-Factor (H-BSTZ)</div>
              <div className="text-sm text-green-700 tracking-tighter leading-tight">{hFactor.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Status</div>
              <div className="text-[10px] text-green-700 tracking-[0.2em] uppercase animate-pulse">
                {hFactor >= 1.5 ? 'SAFE ZONE' : hFactor >= 1.0 ? 'WATCH' : 'DANGER'}
              </div>
            </div>
            {/* Liquidation check */}
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleLiquidationCheck}
                disabled={checking}
                className="text-[8px] uppercase tracking-widest px-2 py-1 border rounded-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  border: `1px solid ${checking ? 'rgba(71,85,105,0.3)' : 'rgba(239,68,68,0.35)'}`,
                  color: checking ? '#475569' : '#ef4444',
                  background: checking ? 'rgba(71,85,105,0.1)' : 'rgba(239,68,68,0.06)',
                }}
              >
                {checking ? (
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full border border-slate-500 border-t-transparent animate-spin" />
                    Scanning
                  </span>
                ) : '⚠ Liq. Check'}
              </button>
              {liquidationRisk !== null && !checking && (
                <div className="text-[8px] tracking-widest uppercase"
                  style={{ color: liquidationRisk ? '#ef4444' : '#22c55e' }}>
                  {liquidationRisk ? '⚡ AT RISK' : '✓ SAFE'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Section: BSR Reserve & Exchange ── */}
        <div>
          <div className="text-[10px] tracking-widest text-amber-700 font-bold mb-1 text-center">
            BlackSlon Reserve (€BSR/EUR)
          </div>
          <div className="border border-gray-900 rounded-sm px-3 py-1.5">
            {/* Live rate */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-pulse shrink-0" />
              <span className="text-[8px] text-amber-700 uppercase tracking-widest">LIVE</span>
              <span className="text-[11px] text-amber-700 tracking-tighter">1 €BSR</span>
              <span className="text-[11px] text-gray-600">=</span>
              <span className="text-[11px] text-sky-400 tracking-tighter">{bsrEuroRate.toFixed(2)} eEURO</span>
            </div>
            {/* Exchange row */}
            <div className="flex gap-1.5 items-center">
              <input
                type="number"
                placeholder="0.00"
                value={convertAmount}
                onChange={(e) => {
                  setConvertAmount(e.target.value)
                  setConvertError(null)
                  setConvertSuccess(false)
                }}
                className="bg-zinc-900 border border-gray-800 text-[10px] text-gray-300 text-center outline-none w-16 py-0.5 rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => setConvertDirection(d => d === 'BSR_TO_EURO' ? 'EURO_TO_BSR' : 'BSR_TO_EURO')}
                className="text-[8px] text-gray-500 hover:text-gray-300 transition-colors px-1 py-0.5 border border-gray-800 rounded-sm"
              >
                {convertDirection === 'BSR_TO_EURO' ? '€BSR → eEURO' : 'eEURO → €BSR'}
              </button>
              <span className="text-[8px] text-gray-600">
                Receive: <span className={convertDirection === 'BSR_TO_EURO' ? 'text-sky-400' : 'text-amber-700'}>
                  {convertAmount && !isNaN(parseFloat(convertAmount))
                    ? convertDirection === 'BSR_TO_EURO'
                      ? `${(parseFloat(convertAmount) * bsrEuroRate).toFixed(2)} eEURO`
                      : `${(parseFloat(convertAmount) / bsrEuroRate).toFixed(2)} €BSR`
                    : convertDirection === 'BSR_TO_EURO' ? '0.00 eEURO' : '0.00 €BSR'}
                </span>
              </span>
              <button
                onClick={() => {
                  setConvertError(null)
                  setConvertSuccess(false)
                  const amount = parseFloat(convertAmount)
                  if (isNaN(amount) || amount <= 0) return
                  const error = convertTokens(convertDirection, amount)
                  if (!error) {
                    setConvertSuccess(true)
                    setConvertAmount('')
                    setTimeout(() => setConvertSuccess(false), 1500)
                  } else {
                    setConvertError(error)
                  }
                }}
                className={`ml-auto px-2 py-0.5 text-[7px] uppercase tracking-widest border transition-all rounded-sm ${
                  convertDirection === 'BSR_TO_EURO'
                    ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black'
                    : 'border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-black'
                }`}
              >
                CONVERT
              </button>
              {convertSuccess && <span className="text-[7px] text-green-700">✓</span>}
            </div>
            {convertError && (
              <div className="text-[7px] text-red-600 mt-1">{convertError}</div>
            )}
          </div>
        </div>

      </div>

      {/* ── Footer: Wallet ── */}
      <div className="px-6 py-2 shrink-0 border-t border-gray-900">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] text-gray-600 uppercase tracking-widest">
            UID: <span className="text-gray-400">{user.id}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: user.walletConnected ? '#22c55e' : '#ef4444' }}
            />
            <span className="text-[9px] uppercase tracking-widest"
              style={{ color: user.walletConnected ? '#22c55e' : '#ef4444' }}>
              {user.walletConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </div>
        {user.walletConnected && (
          <div className="text-[9px] text-gray-600 tracking-tight mb-1 text-center">
            {shortAddress}
          </div>
        )}
        <button
          onClick={() => setWalletConnected(!user.walletConnected)}
          className="w-full py-2 uppercase tracking-[0.3em] text-[10px] border transition-all rounded-sm"
          style={{
            border: `1px solid ${user.walletConnected ? 'rgba(239,68,68,0.35)' : 'rgba(34,197,94,0.35)'}`,
            color: user.walletConnected ? '#ef4444' : '#22c55e',
            background: user.walletConnected ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.05)',
          }}
        >
          {user.walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  )
}
