export function getMarketColors(marketId: string) {
  const isGas = marketId.startsWith('BS-G')
  return {
    isGas,
    title:       'text-amber-700',  // Always amber-700 for section titles
    value:       isGas ? 'text-blue-500'       : 'text-yellow-500',
    border:      'border-yellow-600/30',  // Same as panel borders
    sectionBorder: 'border-yellow-600/30',  // Panel borders
    pulse:       'bg-amber-700',  // Always amber-700
    gradient:    isGas
      ? 'from-blue-700/40 via-green-700/40 to-blue-700/40'
      : 'from-yellow-700/40 via-green-700/40 to-yellow-700/40',
    label:       isGas ? 'text-blue-500'       : 'text-yellow-500',
  }
}
