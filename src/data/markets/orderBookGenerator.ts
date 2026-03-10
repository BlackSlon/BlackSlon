import { Order } from '@/store/types'

/**
 * Generates mock order book data for a market based on anchor price
 */
export function generateOrderBook(anchor: number, marketId: string): { bids: Order[], asks: Order[] } {
  const spread = 0.01 // 1% spread around anchor
  
  const bids: Order[] = [
    { id: `${marketId}-bid-1`, price: anchor - 0.04, units: 150, volume: 15000, ownedByUser: false },
    { id: `${marketId}-bid-2`, price: anchor - 0.05, units: 120, volume: 12000, ownedByUser: false },
    { id: `${marketId}-bid-3`, price: anchor - 0.06, units: 180, volume: 18000, ownedByUser: false },
    { id: `${marketId}-bid-4`, price: anchor - 0.07, units: 95, volume: 9500, ownedByUser: false },
    { id: `${marketId}-bid-5`, price: anchor - 0.08, units: 200, volume: 20000, ownedByUser: false },
    { id: `${marketId}-bid-6`, price: anchor - 0.09, units: 135, volume: 13500, ownedByUser: false },
    { id: `${marketId}-bid-7`, price: anchor - 0.10, units: 165, volume: 16500, ownedByUser: false },
    { id: `${marketId}-bid-8`, price: anchor - 0.11, units: 110, volume: 11000, ownedByUser: false },
  ]

  const asks: Order[] = [
    { id: `${marketId}-ask-1`, price: anchor + 0.01, units: 110, volume: 11000, ownedByUser: false },
    { id: `${marketId}-ask-2`, price: anchor + 0.02, units: 85, volume: 8500, ownedByUser: false },
    { id: `${marketId}-ask-3`, price: anchor + 0.03, units: 140, volume: 14000, ownedByUser: false },
    { id: `${marketId}-ask-4`, price: anchor + 0.04, units: 75, volume: 7500, ownedByUser: false },
    { id: `${marketId}-ask-5`, price: anchor + 0.05, units: 160, volume: 16000, ownedByUser: false },
    { id: `${marketId}-ask-6`, price: anchor + 0.06, units: 125, volume: 12500, ownedByUser: false },
    { id: `${marketId}-ask-7`, price: anchor + 0.07, units: 190, volume: 19000, ownedByUser: false },
    { id: `${marketId}-ask-8`, price: anchor + 0.08, units: 105, volume: 10500, ownedByUser: false },
  ]

  return { bids, asks }
}

/**
 * Generates BSEI history snapshots based on anchor price
 */
export function generateBSEIHistory(anchor: number) {
  return [
    { label: 'D-1', value: anchor, changePct: 4.2 },
    { label: 'W-1', value: anchor * 1.012, changePct: 3.1 },
    { label: 'M-1', value: anchor * 1.025, changePct: 2.4 },
    { label: 'Q-1', value: anchor * 1.034, changePct: 1.8 },
    { label: 'H-1', value: anchor * 1.041, changePct: 1.2 },
    { label: 'Y-1', value: anchor * 0.932, changePct: 5.8 },
  ]
}

/**
 * Generates liquidity snapshots
 */
export function generateLiquiditySnapshots() {
  return [
    { label: 'D-1', value: 1245 },
    { label: 'W-1', value: 8715 },
    { label: 'M-1', value: 37440 },
    { label: 'Q-1', value: 112320 },
    { label: 'H-1', value: 224640 },
    { label: 'Y-1', value: 449280 },
  ]
}
