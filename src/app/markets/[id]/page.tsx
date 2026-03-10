'use client'

import React, { useState } from "react"
import PhysicalMarketPanel from "@/components/PhysicalMarketPanel"
import VirtualMarketPanel from "@/components/VirtualMarketPanel"
import TradingPanel from "@/components/TradingPanel"
import UserAccountPanel from "@/components/UserAccountPanel"
import DealConfirmationOverlay from "@/components/DealConfirmationOverlay"
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getMarketColors } from '@/lib/marketColors'

const activeMarkets = [
  'BS-P-PL', 'BS-P-DE', 'BS-P-N', 'BS-P-UK',
  'BS-G-NL', 'BS-G-DE', 'BS-G-PL', 'BS-G-BG',
]
const dormantMarkets = [
  'BS-P-IT', 'BS-P-FR', 'BS-G-IT', 'BS-G-AT',
]

export default function MarketPage() {
  const params = useParams()
  const id = params.id as string
  const [selectedInstrument, setSelectedInstrument] = useState('BS-P-PL')
  const mColors = getMarketColors(selectedInstrument)

  const PanelLogo = () => (
    <Image src="/BS_image.jpg" alt="BlackSlon" width={50} height={50} className="h-10 w-auto opacity-80" />
  )

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center font-mono pointer-events-auto">

      {/* INSTRUMENT SELECTOR BAR */}
      <div className="w-full max-w-[1600px] mx-auto px-4 py-1.5 flex items-center gap-4 border-b border-gray-900">
        <span className="text-[9px] text-gray-600 uppercase tracking-widest shrink-0">Instrument:</span>
        <div className="flex gap-1.5 flex-wrap">
          {activeMarkets.map(inst => {
            const ic = getMarketColors(inst)
            const isActive = selectedInstrument === inst
            return (
              <button
                key={inst}
                onClick={() => setSelectedInstrument(inst)}
                className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border transition-all ${
                  isActive
                    ? ic.isGas ? 'border-blue-500/60 text-blue-500' : 'border-yellow-500/60 text-yellow-500'
                    : 'border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400'
                }`}
              >
                {inst}
              </button>
            )
          })}
          <span className="text-[7px] text-gray-700 self-center mx-1">|</span>
          {dormantMarkets.map(inst => (
            <button
              key={inst}
              disabled
              className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-gray-900 text-gray-800 cursor-not-allowed opacity-50"
            >
              {inst}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-700 animate-pulse"></div>
          <span className="text-[10px] text-green-700 uppercase tracking-widest font-black">LIVE</span>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[22%_26%_20%_28%] gap-4 items-start py-2 pointer-events-auto">
        
        {/* PANEL 1: PHYSICAL (BSTZ) */}
        <section className={`border ${mColors.isGas ? 'border-blue-500/30' : 'border-yellow-600/30'} bg-black/40 rounded-sm overflow-hidden flex flex-col`}>
          <div className="flex items-center justify-center px-3 py-1 border-b border-gray-900/60">
            <PanelLogo />
          </div>
          <PhysicalMarketPanel selectedMarketId={selectedInstrument} />
        </section>

        {/* PANEL 2: VIRTUAL (Order Book) */}
        <section className={`border ${mColors.isGas ? 'border-blue-500/30' : 'border-yellow-600/30'} bg-black/40 rounded-sm flex flex-col`}>
          <div className="flex items-center justify-center px-3 py-1 border-b border-gray-900/60">
            <PanelLogo />
          </div>
          <VirtualMarketPanel selectedMarketId={selectedInstrument} />
        </section>

        {/* PANEL 3: TRADING */}
        <section className="border border-amber-700/30 bg-black/80 rounded-sm text-xs relative z-50 flex flex-col">
          <div className="flex items-center justify-center px-3 py-1 border-b border-gray-900/60">
            <PanelLogo />
          </div>
          <TradingPanel selectedMarketId={selectedInstrument} />
        </section>

        {/* PANEL 4: PORTFOLIO */}
        <section className="border border-amber-700/30 bg-black/40 rounded-sm text-xs flex flex-col">
          <div className="flex items-center justify-center px-3 py-1 border-b border-gray-900/60">
            <PanelLogo />
          </div>
          <UserAccountPanel />
        </section>

      </div>

      {/* Deal Confirmation Overlay */}
      <DealConfirmationOverlay />
    </main>
  )
}