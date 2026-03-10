import { MarketId } from '@/store/types'

export interface MarketHistoricalData {
  date: string
  price: number
  volume: number
}

export interface MarketData {
  marketId: MarketId
  marketName: string
  commodity: string
  country: string
  currency: string
  unit: string
  lastUpdate: string
  // Old format (BS-P-PL)
  historicalData?: MarketHistoricalData[]
  bsszCalculation?: {
    anchor: number
    floor: number
    ceiling: number
    method: string
    floorFormula: string
    ceilingFormula: string
  }
  // New format (BS-G-NL)
  _formula?: {
    meridian: string
    adr: string
    floor: string
    ceiling: string
    trend: string
  }
  bsszPositions?: Array<{
    label: string
    refDate: string
    _comment?: string
    adrData: Array<{
      date: string
      dayAhead: number
      frontMonth: number
      month2: number | null
      frontQuarter: number
      quarter2: number | null
      cal: number
      cal2: number | null
      meridian: number
    }>
    bssz: {
      anchor: number
      floor: number
      ceiling: number
      trendPct: number | null
    }
  }>
}

// Import JSON files
import bsPPL from './BS-P-PL.json'
import bsGNL from './BS-G-NL.json'

const marketDataMap: Record<MarketId, MarketData> = {
  // Active Power markets
  'BS-P-PL': bsPPL as MarketData,
  'BS-P-DE': bsPPL as MarketData, // Placeholder - replace when data available
  'BS-P-N':  bsPPL as MarketData, // Placeholder - Nordic
  'BS-P-UK': bsPPL as MarketData, // Placeholder
  // Active Gas markets
  'BS-G-NL': bsGNL as MarketData,
  'BS-G-DE': bsGNL as MarketData, // Placeholder
  'BS-G-PL': bsGNL as MarketData, // Placeholder
  'BS-G-BG': bsGNL as MarketData, // Placeholder
  // Dormant Power markets
  'BS-P-IT': bsPPL as MarketData, // Dormant
  'BS-P-FR': bsPPL as MarketData, // Dormant
  // Dormant Gas markets
  'BS-G-IT': bsGNL as MarketData, // Dormant
  'BS-G-AT': bsGNL as MarketData, // Dormant
}

export function getMarketData(marketId: MarketId): MarketData {
  return marketDataMap[marketId]
}

export function calculateAnchor(historicalData: MarketHistoricalData[]): number {
  const prices = historicalData.slice(0, 20).map(d => d.price)
  return prices.reduce((sum, price) => sum + price, 0) / prices.length
}

export function calculateBSSZ(anchor: number) {
  return {
    floor: anchor * 0.90,
    ceiling: anchor * 1.20,
  }
}
