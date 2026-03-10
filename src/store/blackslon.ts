import { create } from 'zustand'
import type { MarketPanelState, MarketId, SolvencyState, BSRReserveState, PhysicalState, VirtualState, TradingState, PendingOrder, UserAccountState } from './types'
import { getMarketData } from '@/data/markets/loader'

export interface DealConfirmation {
  side: 'BUY' | 'SELL'
  price: number
  filledQty: number
  remainingQty: number
  marketId: string
  timestamp: number
}

interface DealConfirmationState {
  deal: DealConfirmation | null
  showDeal: (deal: DealConfirmation) => void
  clearDeal: () => void
}

export const useDealConfirmation = create<DealConfirmationState>((set) => ({
  deal: null,
  showDeal: (deal) => set({ deal }),
  clearDeal: () => set({ deal: null }),
}))

export const useMarketPanel = create<MarketPanelState>((set) => ({
  currentPrice: 10.59,
  activeMarketId: 'BS-P-PL',
  solvency: {
    tier: 'I',
    hSolv: 1.250,
    emergencyCollateralLock: false,
  },
  bsrReserve: {
    pBsr: 2.4500,
    fuseState: 'INACTIVE',
  },
  setMarketId: (id: MarketId) => set({ activeMarketId: id }),
  setCurrentPrice: (price: number) => set({ currentPrice: price }),
  setSolvency: (solvency: Partial<SolvencyState>) =>
    set((state) => ({
      solvency: { ...state.solvency, ...solvency },
    })),
  setBsrReserve: (reserve: Partial<BSRReserveState>) =>
    set((state) => ({
      bsrReserve: { ...state.bsrReserve, ...reserve },
    })),
}))

export const usePhysical = create<PhysicalState>(() => {
  // Load market data from JSON
  const marketData = getMarketData('BS-G-NL') as any
  const positions = marketData?.bsszPositions || []
  const anchor = positions[0]?.bssz?.anchor || 10.59
  
  return {
    bssz: {
      floor: anchor * 0.90,
      ceiling: anchor * 1.20,
      isLocked: false,
      lockReason: null,
    },
    anchor,
    history: [
      { label: 'D-1', value: 10.55, changePct: 6.0 },
      { label: 'W-1', value: 10.42, changePct: 7.5 },
      { label: 'M-1', value: 9.80, changePct: 16.9 },
      { label: 'Q-1', value: 9.50, changePct: 15.0 },
      { label: 'H-1', value: 9.20, changePct: 19.7 },
      { label: 'Y-1', value: 8.50, changePct: 24.5 },
    ],
    bsszPositions: positions,
    marketId: 'BS-G-NL',
  }
})

export const useVirtual = create<VirtualState>(() => ({
  orderBook: {
    bids: [
      { id: '1', price: 10.55, units: 150, volume: 15000, ownedByUser: false },
      { id: '2', price: 10.54, units: 120, volume: 12000, ownedByUser: false },
      { id: '3', price: 10.53, units: 180, volume: 18000, ownedByUser: false },
      { id: '4', price: 10.52, units: 95, volume: 9500, ownedByUser: false },
      { id: '5', price: 10.51, units: 200, volume: 20000, ownedByUser: false },
      { id: '6', price: 10.50, units: 135, volume: 13500, ownedByUser: false },
      { id: '7', price: 10.49, units: 165, volume: 16500, ownedByUser: false },
      { id: '8', price: 10.48, units: 110, volume: 11000, ownedByUser: false },
    ],
    asks: [
      { id: '9', price: 10.60, units: 110, volume: 11000, ownedByUser: false },
      { id: '10', price: 10.61, units: 85, volume: 8500, ownedByUser: false },
      { id: '11', price: 10.62, units: 140, volume: 14000, ownedByUser: false },
      { id: '12', price: 10.63, units: 75, volume: 7500, ownedByUser: false },
      { id: '13', price: 10.64, units: 160, volume: 16000, ownedByUser: false },
      { id: '14', price: 10.65, units: 125, volume: 12500, ownedByUser: false },
      { id: '15', price: 10.66, units: 190, volume: 19000, ownedByUser: false },
      { id: '16', price: 10.67, units: 105, volume: 10500, ownedByUser: false },
    ],
    lastTrade: {
      price: 10.59,
      units: 10,
      volume: 1000,
      timestamp: Date.now(),
    },
  },
  bsei: {
    It: 10.59,
    omega: 0.80,
    pRvwap: 10.58,
    anchor: 10.59,
    history: [
      { label: 'D-1', value: 10.59, changePct: 4.2 },
      { label: 'W-1', value: 10.72, changePct: 3.1 },
      { label: 'M-1', value: 10.85, changePct: 2.4 },
      { label: 'Q-1', value: 10.95, changePct: 1.8 },
      { label: 'H-1', value: 11.02, changePct: 1.2 },
      { label: 'Y-1', value: 9.87, changePct: 5.8 },
    ],
  },
  liquidity: [
    { label: 'D-1', value: 1245 },
    { label: 'W-1', value: 8715 },
    { label: 'M-1', value: 37440 },
    { label: 'Q-1', value: 112320 },
    { label: 'H-1', value: 224640 },
    { label: 'Y-1', value: 449280 },
  ],
  marketId: 'BS-P-PL',
}))

export const useTrading = create<TradingState>((set, get) => {
  const anchor = 10.59
  return {
  pendingOrder: null,
  activeOrders: [],
  bssz: {
    floor: anchor * 0.90,
    ceiling: anchor * 1.20,
    isLocked: false,
    lockReason: null,
  },
  solvencyTier: 'I',
  emergencyLock: false,
  marketId: 'BS-P-PL',
  
  setPendingOrder: (side, price, quantity, bsrStake) => {
      const totalNotional = price * quantity
      const userState = useUserAccount.getState()
      
      // Determine margin based on BSR stake and side (LONG/SHORT)
      let marginPct: number
      if (side === 'BUY') {
        // LONG margins
        if (bsrStake >= 100) marginPct = 25
        else if (bsrStake >= 75) marginPct = 30
        else if (bsrStake >= 50) marginPct = 40
        else if (bsrStake >= 25) marginPct = 45
        else marginPct = 50
      } else {
        // SHORT margins (2x LONG)
        if (bsrStake >= 100) marginPct = 50
        else if (bsrStake >= 75) marginPct = 60
        else if (bsrStake >= 50) marginPct = 80
        else if (bsrStake >= 25) marginPct = 90
        else marginPct = 100
      }
      
      const tradingFee = totalNotional * 0.001
      const marginRequired = (totalNotional * marginPct) / 100
      const bsrDepositEUR = (marginRequired * bsrStake) / 100
      const eEuroDeposit = (marginRequired * (100 - bsrStake)) / 100
      
      // Convert EUR to BSR for display
      const bsrDeposit = bsrDepositEUR / userState.bsrEuroRate
      
      // DEBUG LOG
      console.log('setPendingOrder:', { 
        side, 
        bsrStake, 
        marginPct, 
        marginRequired,
        bsrDepositEUR,
        bsrDeposit,
        eEuroDeposit,
        bsrEuroRate: userState.bsrEuroRate
      })
      
      set({
        pendingOrder: {
          side,
          price,
          quantity,
          bsrStake,
          marginPct,
          totalNotional,
          tradingFee,
          bsrDeposit,
          eEuroDeposit,
        },
      })
    },
    
    placeOrder: (side, price, quantity, bsrStake, marketId) => {
      const state = get()
      const userState = useUserAccount.getState()
      
      // Validation: Tier IV blocks new positions
      if (state.solvencyTier === 'IV') {
        return 'Tier IV Safeguard: New positions blocked'
      }
      
      // Validation: Tier III requires eEURO-only
      if (state.solvencyTier === 'III' && bsrStake > 0) {
        return 'Tier III: Only eEURO collateral allowed (BSR stake must be 0%)'
      }
      
      // Calculate margin requirements
      const totalNotional = price * quantity
      let marginPct: number
      if (side === 'BUY') {
        if (bsrStake >= 100) marginPct = 25
        else if (bsrStake >= 75) marginPct = 30
        else if (bsrStake >= 50) marginPct = 40
        else if (bsrStake >= 25) marginPct = 45
        else marginPct = 50
      } else {
        if (bsrStake >= 100) marginPct = 50
        else if (bsrStake >= 75) marginPct = 60
        else if (bsrStake >= 50) marginPct = 80
        else if (bsrStake >= 25) marginPct = 90
        else marginPct = 100
      }
      
      const marginRequired = (totalNotional * marginPct) / 100
      const bsrDepositEUR = (marginRequired * bsrStake) / 100
      const eEuroDeposit = (marginRequired * (100 - bsrStake)) / 100
      
      // Check if user has sufficient balance
      const bsrNeeded = bsrDepositEUR / userState.bsrEuroRate
      if (bsrNeeded > userState.user.bsrBalance) {
        return `Insufficient €BSR balance. Required: ${bsrNeeded.toFixed(2)} BSR, Available: ${userState.user.bsrBalance.toFixed(2)} BSR`
      }
      if (eEuroDeposit > userState.user.eEuroBalance) {
        return `Insufficient eEURO balance. Required: ${eEuroDeposit.toFixed(2)} EUR, Available: ${userState.user.eEuroBalance.toFixed(2)} EUR`
      }
      
      // Calculate new solvency after trade
      const newLockedBSR = userState.vault.lockedBSR + bsrNeeded
      const newLockedEuro = userState.vault.lockedEuro + eEuroDeposit
      const totalEquity = (userState.user.bsrBalance - bsrNeeded) * userState.bsrEuroRate + 
                          (userState.user.eEuroBalance - eEuroDeposit) +
                          userState.inventory.reduce((sum, pos) => sum + pos.pnl, 0)
      const totalMargin = newLockedBSR * userState.bsrEuroRate + newLockedEuro
      const newHFactor = totalEquity / (totalMargin * 0.5)
      
      if (newHFactor < 1.0) {
        return `Trade rejected: Would push Health Factor below 1.0 (calculated: ${newHFactor.toFixed(2)})`
      }
      
      // ─── ORDER MATCHING ENGINE ───
      const virtualState = useVirtual.getState()
      let remainingQty = quantity
      let filledQty = 0
      let fillPrice = price
      
      if (side === 'BUY') {
        // BUY: match against asks (sells) where ask price <= buy price
        const sortedAsks = [...virtualState.orderBook.asks].sort((a, b) => a.price - b.price)
        const matchedAskIds: string[] = []
        const updatedAsks: typeof sortedAsks = []
        
        for (const ask of sortedAsks) {
          if (remainingQty <= 0 || ask.price > price) {
            updatedAsks.push(ask)
            continue
          }
          // Match this ask
          if (ask.units <= remainingQty) {
            // Fully consume this ask
            filledQty += ask.units
            remainingQty -= ask.units
            fillPrice = ask.price
            matchedAskIds.push(ask.id)
          } else {
            // Partially consume this ask
            filledQty += remainingQty
            fillPrice = ask.price
            updatedAsks.push({ ...ask, units: ask.units - remainingQty, volume: (ask.units - remainingQty) * 100 })
            remainingQty = 0
          }
        }
        
        if (filledQty > 0) {
          // Update order book: remove fully consumed asks
          useVirtual.setState((vs) => ({
            orderBook: {
              ...vs.orderBook,
              asks: updatedAsks,
              lastTrade: { price: fillPrice, units: filledQty, volume: filledQty * 100, timestamp: Date.now() },
            }
          }))
          
          // Show deal confirmation
          useDealConfirmation.getState().showDeal({
            side: 'BUY',
            price: fillPrice,
            filledQty,
            remainingQty,
            marketId,
            timestamp: Date.now(),
          })
        }
        
        // If remaining quantity, add to order book as bid
        if (remainingQty > 0) {
          const newOrder = {
            id: `user-${Date.now()}`,
            price,
            units: remainingQty,
            volume: remainingQty * 100,
            ownedByUser: true,
            marketId,
          }
          useVirtual.setState((vs) => ({
            orderBook: {
              ...vs.orderBook,
              bids: [...vs.orderBook.bids, newOrder].sort((a, b) => b.price - a.price),
            }
          }))
          
          // Add to active orders
          set((s) => ({
            activeOrders: [...s.activeOrders, {
              id: newOrder.id,
              side,
              price,
              quantity: remainingQty,
              bsrStake,
              marginPct,
              bsrLocked: bsrNeeded * (remainingQty / quantity),
              eEuroLocked: eEuroDeposit * (remainingQty / quantity),
              timestamp: Date.now(),
              marketId: marketId as MarketId,
            }]
          }))
        }
        
      } else {
        // SELL: match against bids (buys) where bid price >= sell price
        const sortedBids = [...virtualState.orderBook.bids].sort((a, b) => b.price - a.price)
        const updatedBids: typeof sortedBids = []
        
        for (const bid of sortedBids) {
          if (remainingQty <= 0 || bid.price < price) {
            updatedBids.push(bid)
            continue
          }
          if (bid.units <= remainingQty) {
            filledQty += bid.units
            remainingQty -= bid.units
            fillPrice = bid.price
          } else {
            filledQty += remainingQty
            fillPrice = bid.price
            updatedBids.push({ ...bid, units: bid.units - remainingQty, volume: (bid.units - remainingQty) * 100 })
            remainingQty = 0
          }
        }
        
        if (filledQty > 0) {
          useVirtual.setState((vs) => ({
            orderBook: {
              ...vs.orderBook,
              bids: updatedBids,
              lastTrade: { price: fillPrice, units: filledQty, volume: filledQty * 100, timestamp: Date.now() },
            }
          }))
          
          useDealConfirmation.getState().showDeal({
            side: 'SELL',
            price: fillPrice,
            filledQty,
            remainingQty,
            marketId,
            timestamp: Date.now(),
          })
        }
        
        if (remainingQty > 0) {
          const newOrder = {
            id: `user-${Date.now()}`,
            price,
            units: remainingQty,
            volume: remainingQty * 100,
            ownedByUser: true,
            marketId,
          }
          useVirtual.setState((vs) => ({
            orderBook: {
              ...vs.orderBook,
              asks: [...vs.orderBook.asks, newOrder].sort((a, b) => a.price - b.price),
            }
          }))
          
          set((s) => ({
            activeOrders: [...s.activeOrders, {
              id: newOrder.id,
              side,
              price,
              quantity: remainingQty,
              bsrStake,
              marginPct,
              bsrLocked: bsrNeeded * (remainingQty / quantity),
              eEuroLocked: eEuroDeposit * (remainingQty / quantity),
              timestamp: Date.now(),
              marketId: marketId as MarketId,
            }]
          }))
        }
      }
      
      // Update user account: deduct balances, update inventory for filled portion
      useUserAccount.setState((us) => {
        const newBsrBalance = us.user.bsrBalance - bsrNeeded
        const newEuroBalance = us.user.eEuroBalance - eEuroDeposit
        
        let newInventory = [...us.inventory]
        if (filledQty > 0) {
          const existingPos = newInventory.find(p => p.token === marketId)
          if (existingPos) {
            const newUnits = side === 'BUY' ? existingPos.units + filledQty : existingPos.units - filledQty
            const newQuantity = Math.abs(newUnits) * 100
            const newAvgPrice = side === 'BUY' 
              ? ((existingPos.avgPrice * existingPos.units) + (fillPrice * filledQty)) / (newUnits || 1)
              : existingPos.avgPrice
            newInventory = newInventory.map(p => 
              p.token === marketId 
                ? { ...p, units: newUnits, quantity: newQuantity, avgPrice: Math.abs(newAvgPrice), lastPrice: fillPrice, pnl: (fillPrice - Math.abs(newAvgPrice)) * newUnits }
                : p
            )
          } else {
            newInventory.push({
              token: marketId,
              units: side === 'BUY' ? filledQty : -filledQty,
              quantity: filledQty * 100,
              avgPrice: fillPrice,
              lastPrice: fillPrice,
              pnl: 0
            })
          }
        }
        
        return {
          user: { ...us.user, bsrBalance: newBsrBalance, eEuroBalance: newEuroBalance },
          inventory: newInventory,
          vault: { lockedBSR: newLockedBSR, lockedEuro: newLockedEuro },
          hFactor: newHFactor,
          solvency: newHFactor > 1.10 ? 0.92 : newHFactor > 1.05 ? 0.75 : newHFactor > 1.00 ? 0.55 : 0.35,
        }
      })
      
      const status = filledQty > 0
        ? `✓ Filled ${filledQty} units @ ${fillPrice.toFixed(2)}${remainingQty > 0 ? ` + ${remainingQty} units resting in book` : ''}`
        : `✓ Order resting in book: ${quantity} units @ ${price.toFixed(2)}`
      console.log(status)
      return null
    },
    
    cancelOrder: (orderId) => {
      const state = get()
      const order = state.activeOrders.find(o => o.id === orderId)
      
      if (!order) {
        console.warn(`Order ${orderId} not found`)
        return
      }
      
      // Remove order from active orders
      set((state) => ({
        activeOrders: state.activeOrders.filter(o => o.id !== orderId)
      }))
      
      // Return locked funds to user
      useUserAccount.setState((userState) => ({
        user: {
          ...userState.user,
          bsrBalance: userState.user.bsrBalance + order.bsrLocked,
          eEuroBalance: userState.user.eEuroBalance + order.eEuroLocked,
        },
        vault: {
          lockedBSR: userState.vault.lockedBSR - order.bsrLocked,
          lockedEuro: userState.vault.lockedEuro - order.eEuroLocked,
        }
      }))
      
      // Remove from Order Book
      useVirtual.setState((virtualState) => ({
        orderBook: {
          ...virtualState.orderBook,
          bids: virtualState.orderBook.bids.filter(o => o.id !== orderId),
          asks: virtualState.orderBook.asks.filter(o => o.id !== orderId),
        }
      }))
      
      console.log(`✓ Order ${orderId} cancelled, funds returned`)
    },
  }
})

export const useUserAccount = create<UserAccountState>((set, get) => ({
  user: {
    name: 'BS-PRO-001',
    id: 'BS-PRO-001',
    bsrBalance: 3200.00,
    eEuroBalance: 12450.00,
    walletConnected: false,
    walletAddress: undefined,
  },
  inventory: [
    { token: 'BS-P-PL', units: 30, quantity: 3000, avgPrice: 10.45, lastPrice: 10.59, pnl: 420.00 },
    { token: 'BS-G-NL', units: 45, quantity: 4500, avgPrice: 4.80,  lastPrice: 4.85,  pnl: 225.00 },
    { token: 'BS-G-DE', units: 22, quantity: 2200, avgPrice: 4.90,  lastPrice: 4.85,  pnl: -110.00 },
  ],
  vault: {
    lockedBSR: 1250.40,
    lockedEuro: 450.00,
  },
  solvency: 0.92,
  hFactor: 2.48,
  bsrEuroRate: 2.45,
  setWalletConnected: (connected) =>
    set((state) => ({
      user: {
        ...state.user,
        walletConnected: connected,
        walletAddress: connected ? '0x4aB3c1D2e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0' : undefined,
      },
    })),
  checkLiquidation: async () => {
    await new Promise((r) => setTimeout(r, 1200))
    return get().solvency < 0.40
  },
  convertTokens: (direction, amount) => {
    const state = get()
    
    if (amount <= 0) {
      return 'Invalid amount'
    }
    
    if (direction === 'BSR_TO_EURO') {
      // Convert €BSR to eEURO
      if (amount > state.user.bsrBalance) {
        return `Insufficient €BSR balance. Available: ${state.user.bsrBalance.toFixed(2)} BSR`
      }
      
      const euroReceived = amount * state.bsrEuroRate
      
      set((s) => ({
        user: {
          ...s.user,
          bsrBalance: s.user.bsrBalance - amount,
          eEuroBalance: s.user.eEuroBalance + euroReceived,
        },
      }))
      
      return null
    } else {
      // Convert eEURO to €BSR
      if (amount > state.user.eEuroBalance) {
        return `Insufficient eEURO balance. Available: ${state.user.eEuroBalance.toFixed(2)} EUR`
      }
      
      const bsrReceived = amount / state.bsrEuroRate
      
      set((s) => ({
        user: {
          ...s.user,
          eEuroBalance: s.user.eEuroBalance - amount,
          bsrBalance: s.user.bsrBalance + bsrReceived,
        },
      }))
      
      return null
    }
  },
}))
