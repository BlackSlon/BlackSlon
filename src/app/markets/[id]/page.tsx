'use client'

import React, { useState } from "react"
import PhysicalMarketPanel from "@/components/PhysicalMarketPanel"
import VirtualMarketPanel from "@/components/VirtualMarketPanel"
import TradingPanel from "@/components/TradingPanel"
import UserAccountPanel from "@/components/UserAccountPanel"
import { useParams } from 'next/navigation'
import Image from 'next/image'

const instruments = ['BS-P-PL', 'BS-P-DE', 'BS-G-NL']

export default function MarketPage() {
  const params = useParams()
  const id = params.id as string
  const [selectedInstrument, setSelectedInstrument] = useState('BS-P-PL')

  // Ujednolicamy cenę dla całego widoku rynku
  const globalAnchorPrice = 10.59;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center font-mono pointer-events-auto">
      <header className="w-full py-4 flex justify-center shrink-0">
        <Image src="/BS_image.jpg" alt="BlackSlon" width={80} height={80} className="h-20 w-auto" />
      </header>

      {/* INSTRUMENT SELECTOR BAR */}
      <div className="w-full max-w-[1600px] mx-auto px-6 py-2 flex items-center gap-6 border-b border-gray-900">
        <span className="text-[9px] text-gray-600 uppercase tracking-widest">Instrument:</span>
        <div className="flex gap-2">
          {instruments.map(inst => (
            <button
              key={inst}
              onClick={() => setSelectedInstrument(inst)}
              className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm border transition-all ${
                selectedInstrument === inst
                  ? 'border-yellow-500/60 text-yellow-500'
                  : 'border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400'
              }`}
            >
              {inst}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-500 uppercase tracking-widest font-black">LIVE</span>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[22%_26%_20%_28%] gap-4 min-h-[calc(100vh-100px)] py-4 pointer-events-auto">
        
        {/* PANEL 1: PHYSICAL (BSTZ) - Teraz z poprawną ceną 10.59 */}
        <section className="border border-yellow-600/50 bg-black/40 rounded-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-end px-3 py-1 border-b border-gray-900/60">
            <span className="text-[9px] text-yellow-500 uppercase tracking-widest">{selectedInstrument}</span>
          </div>
          <PhysicalMarketPanel marketId={id} currentPrice={globalAnchorPrice} />
        </section>

        {/* PANEL 2: VIRTUAL (Order Book) */}
        <section className="border border-yellow-600/50 bg-black/40 rounded-sm flex flex-col">
          <div className="flex items-center justify-end px-3 py-1 border-b border-gray-900/60">
            <span className="text-[9px] text-yellow-500 uppercase tracking-widest">{selectedInstrument}</span>
          </div>
          <VirtualMarketPanel marketId={id} />
        </section>

        {/* PANEL 3: TRADING */}
        <section className="border border-yellow-600/50 bg-black/80 rounded-sm text-xs relative z-50 flex flex-col">
          <div className="flex items-center justify-end px-3 py-1 border-b border-gray-900/60">
            <span className="text-[9px] text-yellow-500 uppercase tracking-widest">{selectedInstrument}</span>
          </div>
          <TradingPanel />
        </section>

        {/* PANEL 4: PORTFOLIO */}
        <section className="border border-yellow-600/30 bg-black/40 rounded-sm text-xs">
          <UserAccountPanel />
        </section>

      </div>
    </main>
  )
}