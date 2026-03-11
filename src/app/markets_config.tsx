// src/app/markets_config.ts

export const BSR_MARKETS = [
  // Electrons (Power) - BS
  { id: 'BS-P-PL', name: 'Power Poland', type: 'Power', b_base: 0.005 },
  { id: 'BS-P-DE', name: 'Power Germany', type: 'Power', b_base: 0.008 },
  { id: 'BS-P-NO', name: 'Power Nordic', type: 'Power', b_base: 0.012 },
  { id: 'BS-P-UK', name: 'Power United Kingdom', type: 'Power', b_base: 0.015 },
  
  // Molecules (Gas) - BS
  { id: 'BS-G-NL', name: 'Gas Netherlands', type: 'Gas', b_base: 0.010 },
  { id: 'BS-G-DE', name: 'Gas Germany', type: 'Gas', b_base: 0.012 },
  { id: 'BS-G-PL', name: 'Gas Poland', type: 'Gas', b_base: 0.030 },
  { id: 'BS-G-BG', name: 'Gas Bulgaria', type: 'Gas', b_base: 0.045 },
];