# BlackSlon Energy Protocol

**Technical Specification v2.0**
**April 2026**

**Mathematical Formulas · Smart Contract Architecture · Protocol Constants**

---

## Table of Contents

1. System Architecture Overview
2. Price Formation Engines
3. Token Specifications
4. Collateral Framework
5. User-Level Risk Engine - H_user
6. Protocol Solvency Index - H_solv
7. Smart Incremental Liquidation - SIL
8. BSR Tokenomics and Burn Mechanism
9. Prime Broker Mandate Framework
10. AI Module Architecture
11. Virtual-to-Physical Swap - V2P Mechanics
12. Composability Layer - DeFi Integration
13. On-Chain Transparency - Proof of Reserve
14. Security Model
15. Protocol Constants Reference

---

## 1. System Architecture Overview

### 1.1 Blockchain Infrastructure
- **Network:** Arbitrum One (Ethereum Layer 2)
- **Smart Contract Language:** Solidity ^0.8.19
- **Account Model:** ERC-4337 (Account Abstraction)
- **Gas Model:** Paymaster (eEURO settlement)
- **Consensus:** Ethereum mainnet security via rollup

### 1.2 Contract System Architecture
```
CORE CONTRACTS (immutable):
- ProtocolVault.sol
- MatchingEngine.sol
- BSToken.sol (per market)
- BSRToken.sol

GOVERNANCE CONTRACTS (upgradeable):
- OracleWriter.sol
- BSEICalculator.sol
- HealthMonitor.sol
- SolvencyMonitor.sol
- BurnEngine.sol
- V2PEscrow.sol
- GovernanceController.sol
- TimelockController.sol
```

### 1.3 Data Flow Architecture
```
Physical Hub Prices (external)
              |
   Protocol AI - Oracle and Price Formation
   Physical Meridian Settlement Anchor on-chain BSSZ
              |
   BlackSlon Protocol on Arbitrum
   (BSSZ · BSEI · H_solv · H_user · BSR burn)
         |              |
Prime Broker      Open Order Book
(Layer 2:         24/7 · BSSZ-governed
 market making    Price-Time Priority
 + delta hedge)        |
         |        Prime Broker Mandate Manager
Protocol Vault    (delta hedge · market making)
(Layer 3:              |
 last resort)     ISA - Intelligent Settlement Assistant
              |
   Licensed Retailers - V2P · zero-euro invoices
              |
   Protocol fees Vault surplus BSR Burn BSR Appreciation
```

---

## 2. Price Formation Engines

### 2.1 Physical Meridian Engine
**Purpose:** Reads official settlement prices from regulated European energy exchanges and produces a weighted reference price per market.

**Input Sources:**
One regulated exchange per market - the official daily settlement price published by the authoritative, audited, REMIT-compliant exchange for that hub. A single regulated exchange settlement is the definitive price source for each market. No multi-source consensus is required when the source is a regulated exchange with a legally binding settlement methodology.

**Weekend and non-business day rule:** Forward curve segments (Front Month, Front Quarter, Calendar Year) do not update on weekends as exchange futures markets are closed. On weekends only the Spot segment (10% weight) updates - using the day-ahead price published by spot market operators (EPEX, Nord Pool, OMIE, HUPX, OPCOM etc.) which operate 365 days/year. The remaining 90% of the Physical Meridian carries forward from the last business day settlement. The Settlement Anchor's 3-day recursive filter absorbs weekend carry-forward without discontinuity.

**Gas markets - 10 hubs:**
| # | Ticker | Hub | Exchange | Country | Notes |
|---|--------|-----|----------|---------|-------|
| 1 | BS-G-NL | TTF | ICE Futures Europe | Netherlands | Global benchmark, highest European liquidity |
| 2 | BS-G-UK | NBP | ICE Futures Europe | UK | Second most liquid European gas hub |
| 3 | BS-G-DE | THE | EEX | Germany | Trading Hub Europe (merger GASPOOL + NCG) |
| 4 | BS-G-FR | PEG | EEX | France | Point d'Échange de Gaz (merger PEG Nord + TRS) |
| 5 | BS-G-IT | PSV | EEX / GME | Italy | Punto di Scambio Virtuale |
| 6 | BS-G-ES | PVB | EEX via PEGAS / MIBGAS | Spain/Portugal | Punto Virtual de Balance. Covers Spain and Portugal |
| 7 | BS-G-AT | CEGH VT | EEX CEGH Gas Exchange / Wiener Börse | Austria | CEGH is both hub and exchange (OMV 65% + Wiener Börse 20% + eustream 15%). Leading CEE hub: 575 TWh/year |
| 8 | BS-G-CZ | Czech VTP | EEX CEGH Czech Gas Exchange | Czech Republic | Operated by CEGH in cooperation with EEX. Settlement via OTE |
| 9 | BS-G-PL | TGEgaz | TGE | Poland | Towarowa Gie³da Energii. Regulated by URE |
| 10 | BS-G-HU | FKPCE | EEX | Hungary | Central and Eastern European Organised Natural Gas Market. Operated by CEEGEX Zrt. + FGSz. Clearing: KELER Group |

**Power markets - 10 exchanges:**
| # | Ticker | Index | Exchange | Country | Notes |
|---|--------|-------|----------|---------|-------|
| 1 | BS-P-DE | Phelix DE | EEX | Germany | Largest continental European power benchmark |
| 2 | BS-P-UK | N2EX | Nasdaq Power / Nord Pool UK | UK | UK baseload and peakload |
| 3 | BS-P-FR | EPEX FR | EPEX SPOT SE | France | Day-ahead and intraday |
| 4 | BS-P-IT | PUN | GME | Italy | Prezzo Unico Nazionale. Regulated by ARERA |
| 5 | BS-P-ES | OMIE/OMIP | OMIE (spot) + OMIP (futures) | Spain/Portugal | MIBEL - Mercado Ibérico de Electricidade |
| 6 | BS-P-NO/SE/DK/FI | Systempris | Nord Pool / Nasdaq Commodities | Nordic | Elspot day-ahead, system price and area prices |
| 7 | BS-P-PL | TGE Power | TGE | Poland | Regulated by URE |
| 8 | BS-P-HU | HUPX | HUPX / EEX-PXE | Hungary | Hungarian Power Exchange, EPEX trading system. Futures: EEX-PXE Hungarian Power Futures |
| 9 | BS-P-CH | EPEX CH | EPEX SPOT SE | Switzerland | Swiss day-ahead market via EPEX SPOT. Swissgrid TSO. Note: Switzerland non-EU - market coupling limited pending bilateral agreement |
| 10 | BS-P-RO | PZU | OPCOM | Romania | Piaþa pentru Ziua Urmãtoare. OPCOM is both electricity and gas market operator. Part of 4M MC coupling (CZ-SK-HU-RO) |

**Czech Republic power note:** BS-P-CZ uses OTE/PXE day-ahead market. OTE a.s. is the official Czech electricity and gas market operator. Futures settlement via EEX-PXE platform. Part of 4M MC and PCR coupling.

**Data access model:** Direct API connection to each exchange's official settlement price publication endpoint. Settlement prices published once per business day following market close (typically 13:00-18:00 CET depending on market). Weekend rule as described above.

**Expansion:** New markets added by governance vote. Each new market requires confirmed direct API connection to the relevant regulated exchange before BS token issuance begins.

### 2.2 Automatic Date Roll (ADR) Mechanism
**Purpose:** Continuous roll into cheapest forward segment without manual intervention.

**Schedule Definitions:**
- **Business Day Schedule:** 10-12 business days before expiration
- **Weekly Schedule:** Months 2-3 before expiration
- **Dormant Schedule:** July 1st for Calendar Year contracts

**Front Month ADR Window:**
```
D_window = 10 to 12 business days before Front Month expiration
```

**Calendar ADR Start Date:**
```
ADR_Calendar_Start = July 1st (immutable)
```

### 2.3 Settlement Anchor Calculator
**Purpose:** Applies Historical Recursive Filter to Physical Meridian.

**Formula:**
```
SettlementAnchor_t = (PhysicalMeridian_t-1 × 0.50) + 
                      (PhysicalMeridian_t-2 × 0.25) + 
                      (PhysicalMeridian_t-3 × 0.25)
```

**Parameters:**
- Lookback window: 3 calendar days
- Update frequency: Once per business day
- Weights: 50/25/25 (immutable)

### 2.4 BSSZ Calculator
**Purpose:** Calculates daily price corridor from Settlement Anchor.

**Floor Formula:**
```
BSSZ_Floor = SettlementAnchor × 0.90
```

**Ceiling Formula:**
```
BSSZ_Ceiling = SettlementAnchor × 1.20
```

**Parameters:**
- Floor multiplier: 0.90 (governance-adjustable)
- Ceiling multiplier: 1.20 (governance-adjustable)
- Asymmetric design reflects energy market volatility patterns

### 2.5 BSEI Calculator
**Purpose:** Transaction-derived settlement benchmark from Order Book trades.

**Segmented R-VWAP Formula:**
```
VWAP_[0-24h] = Sum(P_i × V_i) / Sum(V_i) for trades in [0-24h]
VWAP_[24-48h] = Sum(P_i × V_i) / Sum(V_i) for trades in [24-48h]
VWAP_[48-72h] = Sum(P_i × V_i) / Sum(V_i) for trades in [48-72h]
```

**BSEI Calculation:**
```
BSEI = (VWAP_[0-24h] × 0.50) + (VWAP_[24-48h] × 0.25) + (VWAP_[48-72h] × 0.25)
```

**Update Frequency:** After every executed trade. Published on-chain every 60 seconds minimum.

**Eligible Trades:**
- Within active BSSZ corridor only
- Minimum trade size: 1 token (100 kWh)
- Dust transactions excluded

### 2.6 Stale Price Guard
```
IF Volume([0-24h]) = 0:
    VWAP_[0-24h] = VWAP_[24-48h]

IF Volume([24-48h]) = 0:
    VWAP_[24-48h] = VWAP_[48-72h]

IF all segments empty:
    BSEI_t = BSEI_(t-1)
```

### 2.7 Chainlink Integration (for DeFi Composability)
**Feed:** BS-G-NL/EUR, BS-P-DE/EUR (expanding)
**Deviation trigger:** price moves >0.5%
**Heartbeat:** minimum update every 3600 seconds
**Source:** BSEICalculator.sol on Arbitrum
**Required for:** Aave/Morpho governance listing

### 2.8 BSEI vs BSSZ
| Aspect | BSSZ | BSEI |
|--------|------|------|
| Input | Physical hub prices (external) | Executed Order Book trades (internal) |
| Purpose | Defines where prices CAN move | Defines where prices HAVE moved |
| Update | Once per business day | After every trade, min every 60s |
| Nature | Hard constraint | Reference benchmark |

---

## 3. Token Specifications

### 3.1 BS-P and BS-G Energy Tokens
| Property | Value |
|----------|-------|
| Standard | ERC-20 + BlackSlon extensions |
| Network | Arbitrum One |
| Decimals | 18 |
| Unit | 100 kWh per token |
| Expiry | None - perpetual |
| Settlement | eEURO |
| Short selling | Permitted (symmetric with long) |

**Token issuance suspended if:**
- H_solv < 1.00 (Tier V)
- Proof of Reserve invariant violated
- Prime Broker API unavailable > 30 minutes

### 3.2 BSR Token
| Property | Value |
|----------|-------|
| Standard | ERC-20 + BlackSlon extensions |
| Network | Arbitrum One |
| Total Supply | 100,000,000 (fixed forever) |
| Short selling | PROHIBITED - immutable |
| Wallet concentration | Max 5% per address per address for standard participant wallets |

 Exempt from concentration limit:
 Protocol smart contracts with publicly verifiable code and governance-controlled release:
   VestingContract.sol,
   ProtocolVault.sol,
   EcosystemFund.sol,
   RetailersPool.sol |

**Token Allocation:**
| Category | Amount | % | Vesting |
|----------|--------|---|---------|
| Public Sale | 35M | 35% | None |
| Strategic Investor(s) | 15M | 15% | 12M cliff + 24M linear |
| Founder and team | 15M | 15% | 12M cliff + 24M linear |
| Protocol Vault reserve | 15M | 15% | Governance managed |
| Ecosystem Fund | 10M | 10% | Governance managed |
| Prime Broker(s) | 5M | 5% | 6M cliff + 18M linear |
| Licensed Retailers pool | 5M | 5% | Proportional to V2P volume |
| **TOTAL** | **100M** | **100%** | |

---

## 4. Collateral Framework

### 4.1 BSR Stake Ratio
```
BSR_Stake_Ratio = (Q_BSR × P_BSR) / (Q_BSR × P_BSR + Q_eEURO)
```

BSR_Stake_Ratio calculated at position open. Determines fee tier for that position. Does not retroactively alter fee on existing positions.

### 4.2 Fee Structure
| BSR_Stake_Ratio Range | Transaction Fee |
|-----------------------|-----------------|
| 0-25% | 1.00% |
| 25-50% | 0.60% |
| 50-75% | 0.35% |
| 75-100% | 0.20% |

**Fee allocation:** 85% to Protocol Vault, 15% to BSR Stability Reserve.

### 4.3 Initial Margin - Leverage Choice
| Chosen Leverage | Initial Margin | H_user Risk |
|-----------------|----------------|-------------|
| 1:1 | 100% of notional | Minimal |
| 1:2 | 50% of notional | Low |
| 1:3 | 33% of notional | Medium |
| 1:4 | 25% of notional | High |

**Maximum leverage:** 1:4 regardless of collateral composition. Smart contract enforced. Applies equally to long and short positions.

### 4.4 Short Selling Collateral
Short positions use identical collateral framework as long positions - eEURO or BSR, same fee structure, same margin requirements, same H_user monitoring. Liquidated BSR from short seller SIL events: transferred to Protocol Vault eligible for burn supply compression.

---

## 5. User-Level Risk Engine - H_user

### 5.1 Total Equity Formula
```
Equity_total = (Sum(Q_eEURO,k) + Sum(Q_BSR,k × P_BSR)) + Sum(ProfitLoss_j)
```

No haircut applied to BSR collateral valuation.

**For BUY positions:**
```
ProfitLoss_j = (BSEI_current - P_entry,j) × V_j
```

**For SELL positions:**
```
ProfitLoss_j = (P_entry,j - BSEI_current) × V_j
```

### 5.2 Health Factor Formula
```
H_user = Equity_total / (Sum(IM_j) × 0.5)
```

Stop-out constant 0.5 is immutable.

### 5.3 Health Zones
| Zone | H_user | Automated Response |
|------|--------|-------------------|
| Safe | > 1.10 | Full operational access |
| Warning | 1.05-1.10 | ISA notification. No automatic action. |
| Restricted | 1.00-1.05 | Reduce-Only. No new positions. |
| Intervention | 1.00 | Smart Incremental Liquidation activates. |

**Calculation frequency:** After every BSEI update (min 60 seconds) and after every vault or position change.

### 5.4 H_user Reporting to H_solv
Aggregate data only - no individual participant identities or position details ever transmitted to H_solv:

**Every 60 seconds:**
- Account distribution across Health Zones (counts)
- Aggregate IM in Intervention Zone
- Projected SIL volume to restore accounts
- Aggregate unrealised PnL by market/direction
- Aggregate eEURO and BSR in all vaults (totals)

---

## 6. Protocol Solvency Index - H_solv

### 6.1 H_solv Core Formula
H_solv_CORE measures whether the Protocol Vault can independently honour all outstanding obligations to all participants simultaneously, without relying on the Prime Broker. It is the primary solvency indicator - the number every participant should watch.

```
H_solv_CORE = (V_eEURO + BSR_SR_balance) / (|PnL_ITM| + IM_total + Reserve_Op)
```

Where:
- **V_eEURO** - Total eEURO balance held in Protocol Vault at current moment.
- **BSR_SR_balance** - Balance of the BSR Stability Reserve (15% of all protocol fees, held separately from main Vault).
- **|PnL_ITM|** - Absolute value of all unrealised profits currently owed to participants with in-the-money positions. Calculated continuously from BSEI vs entry price across all open positions. Represents the Protocol's immediate settlement obligation if all profitable participants closed simultaneously.
- **IM_total** - Sum of all Initial Margin posted by all participants across all open positions. Represents collateral the Protocol must return upon position closure.
- **Reserve_Op** - Operational liquidity reserve. Calculated as:
```
Reserve_Op = max(FixedMonthlyCosts × 3, V_eEURO × 0.02)
```
Covers: Arbitrum gas fees, oracle node payments, Prime Broker settlement obligations, Chainlink feed maintenance, and emergency buffer. Ensures the Protocol can continue operating even under stress, independent of trading activity.

### 6.2 H_solv System Formula
H_solv_SYSTEM incorporates the Prime Broker layer - including an estimate of the mark-to-market value of the PB's aggregate hedge position on external markets. This provides a fuller picture of ecosystem-wide solvency, at the cost of relying on an estimated rather than exact figure.

```
H_solv_SYSTEM = (V_eEURO + BSR-SR + max(MTM_PB, 0)) / (|PnL_ITM| + IM_total + max(-MTM_PB, 0) + Reserve_Op)
```

Additional term vs H_solv_CORE:
- **MTM_PB** - Estimated net economic value of the Prime Broker's aggregate hedge position, derived from Protocol-observable inputs only. As the Prime Broker hedges the Protocol's net long delta, its P&L moves inversely to participant P&L. Calculated as:
```
MTM_PB = -(Delta_protocol × DeltaPrice × coverage_ratio)
```
Where Delta_protocol is the Protocol's net aggregate delta in MWh-equivalent, DeltaPrice is the price movement since hedge entry, and coverage_ratio is the PB's hedge coverage ratio as defined in the Prime Brokerage Agreement. Actual value is commercially negotiated and confidential. Protocol uses 100% as conservative estimate for H_solv_SYSTEM calculation unless PB reports otherwise."

The Protocol does not monitor how the Prime Broker structures its hedge - instrument choice, tenor, OTC versus exchange, margin requirements - all are commercially confidential per the ISDA Master Agreement. MTM_PB is the Protocol's best estimate of whether the PB's aggregate hedge position is profitable or underwater, based solely on observable price movement and the known delta mandate.

Variation margin flows under ISDA CSA (daily cash settlement between Protocol and Prime Broker) are already captured by MTM_PB direction - no separate collateral term is required.

**Important limitation:** MTM_PB is an estimate, not an audited figure. The Prime Broker's exact hedge book is commercially confidential and not disclosed to the Protocol in real time. H_solv_SYSTEM therefore represents a credit risk estimate, not an exact solvency calculation. H_solv_CORE - based solely on Vault balance and fully on-chain position data - remains the primary, independently verifiable solvency indicator.

Both H_solv_CORE and H_solv_SYSTEM are published on-chain continuously - updated after every BSEI recalculation (minimum every 60 seconds) and after every vault transaction. Any participant can independently verify H_solv_CORE at any time from on-chain Vault balance and position data, without requiring any disclosure from BlackSlon.

### 6.3 Five Tiers
| Tier | H_solv_CORE | Name | Automated Response |
|------|-------------|------|-------------------|
| I | > 1.15 | Expansion | Full operations. Burn active. |
| II | 1.10-1.15 | Equilibrium | Enhanced monitoring. |
| III | 1.05-1.10 | Mitigation | New positions suspended. BSR-SR T1 prepared. |
| IV | 1.00-1.05 | Alert | Reduce-Only. BSR-SR T2 deployed. |
| V | < 1.00 | Safeguard | Full stop. BSR-SR T3. ADS Lock if P_BSR -10%. Governance vote 24h. |

**Tier upgrade confirmation:** 30-minute confirmation window before restrictions lifted. Prevents oscillation at tier boundary.

### 6.4 BSR Stability Reserve Tranches
| Tranche | Size | Deployment Trigger |
|---------|------|-------------------|
| T1 | 40% of BSR-SR | Tier III |
| T2 | 35% of BSR-SR | Tier IV |
| T3 | 25% of BSR-SR | Tier V |

### 6.5 Anti-Death-Spiral Lock
**Trigger:** Both conditions simultaneously:
```
H_solv_CORE < 1.00 (Tier V)
AND
P_BSR -10% within any 24-hour period
```

**Effect:**
- BSR collateral frozen at T-24h price for all calculations
- Maximum duration: 48 hours
- Early release: H_user average > 1.10 for 60 consecutive minutes

---

## 7. Smart Incremental Liquidation - SIL

**Activation:** H_user 1.00

**Recovery target:** H_user 1.00 + 0.02 where epsilon = 0.02

```python
FUNCTION SmartIncrementalLiquidation(account):

  LOOP:
    positions = GetOpenPositions(account)
    candidates = []

    FOR EACH position j IN positions:
      h_after = SimulateHealthFactor(account, j, 0.10)
      loss = SimulateLoss(position_j, 0.10)
      candidates.append({position: j,
                         h_after: h_after,
                         loss: loss})

    # Sort ascending by loss - smallest loss first
    candidates.sort(by=loss, ascending=True)

    FOR EACH candidate IN candidates:
      IF candidate.h_after >= 1.00 + epsilon:
        ExecutePartialClose(candidate.position, 0.10)
        SettleLoss_50_50(account, candidate.loss)
        RETURN  # Health restored - stop

    # No single 10% cut sufficient
    best = candidates[0]
    ExecutePartialClose(best.position, 0.10)
    SettleLoss_50_50(account, best.loss)

    IF no positions remain: BREAK

FUNCTION SettleLoss_50_50(account, loss_amount):
  bsr_deduction = (loss_amount * 0.50) / P_BSR_current
  euroe_deduction = loss_amount * 0.50
  account.bsr_balance -= bsr_deduction
  account.euroe_balance -= euroe_deduction
  Vault.eEURO += euroe_deduction
  Vault.BSR += bsr_deduction
  # Transferred to Vault - NOT sold on open market
  # Prevents cascading price impact
```

**Key properties:**
- Always closes least costly position first
- Always 10% increments - never more than necessary
- Stops immediately when Health Factor restored
- 50/50 settlement maintains collateral profile
- Seized collateral Vault eligible for burn (BSR component)

---

## 8. BSR Tokenomics and Burn Mechanism

### 8.1 BSR Price Formula
```
P_BSR = (V_eEURO - |ProfitLoss_ITM|) / (S_BSR × RR)
```

Where RR = Reserve Ratio (default 1.10, governance-set).

### 8.2 Burn Mechanism
```
Surplus = V_eEURO - (|ProfitLoss_ITM| + IM_total + Reserve_Op)

IF Surplus > 0 AND H_solv Tier I:
    B_auto = Surplus × k_burn
```

Default k_burn = 50% of surplus (governance-set).

**On-chain burn event emits:**
```
BurnExecuted(
  amount: B_auto,
  timestamp: block.timestamp,
  supplyBefore: S_before,
  supplyAfter: S_after,
  vaultBalance: V_eEURO,
  hSolvAtBurn: H_solv_value
)
```

### 8.3 Stability Mechanisms
**Short Selling Prohibition:** Immutable. BSRToken.sol transfer() reverts on any transaction creating net short position. No governance path to remove.

**NAV Buyback:** When P_market < P_BSR_formula: Protocol may repurchase and burn BSR from Order Book using Vault surplus. Only below NAV. Max 5% of circulating supply per session without governance approval.

**Wallet Concentration Limit:** Max 5% of circulating supply per address. Enforced on every transfer in BSRToken.sol.

**Anti-Death-Spiral Lock:** Full specification in Section 6.5.

---

## 9. Prime Broker Mandate Framework

### 9.1 Aggregate Delta
```
Delta_protocol = Sum(delta_j × V_j)
```

delta_j = +1 for BUY positions
delta_j = -1 for SELL positions
V_j = MWh-equivalent volume

Target: Delta_protocol approximately 0 (delta-neutral)

Tolerance band: ±500 MWh-equivalent per market per hour (governance-set).

Within tolerance: no action required.
Outside tolerance: Prime Broker notified within 60 seconds.

### 9.2 Prime Broker Mandate Manager Functions

**Delta Monitoring:**
Reads aggregate net delta continuously per market. When delta breaches tolerance band, transmits notification to Prime Broker API within 60 seconds containing:
- Market (e.g. BS-G-NL / TTF area)
- Net delta requiring coverage (MWh)
- Direction (long or short)
- Required within: 60 minutes

How the Prime Broker executes the hedge - instrument choice, tenor, OTC versus exchange, execution strategy - is entirely at the PB's discretion per the Prime Brokerage Agreement. The Protocol does not instruct execution methodology.

**Order Book Depth Monitoring:**
Monitors two-sided quote presence on the Order Book per market. If Prime Broker quotes are absent or outside agreed spread parameters for more than the defined threshold period, this constitutes an eligibility breach and escalates to the failure response in 9.4. The Protocol does not instruct the Prime Broker on market making - it monitors compliance with the agreed obligation.

**Layer 3 Activation (last resort):**
The Protocol Vault acts as market maker of absolute last resort only when all three conditions are simultaneously met:
1. Prime Broker is quoting but spread on a specific transaction exceeds BSSZ corridor boundaries
2. No organic Order Book counterparty exists for the transaction
3. H_solv_CORE is in Tier I or Tier II (>= 1.05)

Hard cap: 15% of Vault value per market (smart contract enforced). Layer 3 does not activate during Prime Broker eligibility breach - new position issuance is suspended first per 9.4 failure response.

### 9.3 Settlement Mechanics
Settlement between the Protocol and the Prime Broker upon participant position closure is governed by the Prime Brokerage Agreement. The agreement defines the reference price formula, settlement frequency, and payment mechanics. The Protocol does not monitor or require disclosure of the Prime Broker's external hedge book. The specific settlement formula is commercially negotiated and forms part of the confidential schedules to the ISDA Master Agreement.

### 9.4 Prime Broker Eligibility Monitoring
Monitored continuously:
- **API connectivity:** Active and responding within defined latency threshold
- **Two-sided quotes:** Present and within agreed spread parameters during operating hours
- **Regulatory status:** Valid MiFID II and EMIR authorisations verified against public registers (ESMA, FCA, BaFin as applicable)
- **Settlement obligations:** Payments to Vault within agreed timeframes per Prime Brokerage Agreement schedule

**Failure response:**
T+0: Alert to H_solv monitor
     Suspend new token issuance across all affected markets

T+30m: If unresolved:
       Governance notified
       Existing positions unaffected
       Participants may close positions
       Exit through Order Book remains open

T+72h: If unresolved:
       Protocol enters controlled position wind-down mode
       No new positions permitted
       Governance emergency vote on:
       - Replacement Prime Broker
       - Protocol pause
       - Alternative liquidity mechanism

---

## 10. AI Module Architecture

### 10.1 Module Data Access Matrix
| Data Type | Protocol AI | H_user | H_solv | ISA |
|-----------|-------------|--------|--------|-----|
| Physical hub prices | READ | No | No | No |
| Settlement Anchor/BSSZ | WRITE | READ | READ | READ (on-chain) |
| BSEI | WRITE | READ | READ | READ (on-chain) |
| Individual positions | No | READ | No | READ (own only) |
| Aggregate positions | No | WRITE H_solv | READ | No |
| Vault balance (aggregate) | No | No | READ | No |
| Vault balance (own) | No | READ | No | READ |
| H_solv value | No | READ | WRITE | READ (on-chain) |
| H_user (individual) | No | WRITE | READ (aggregate) | READ (own) |
| Prime broker quote presence on Order Book | No | No | READ | No |
| Prime broker settlement status | No | No | READ | No |
| Prime broker regulatory status | No | No | READ | No |
| Participant identity | No | No | No | READ (own) |

### 10.2 BSR/eEURO Ratio Manager (Protocol Level)
Monitors aggregate collateral composition across all participants. Detects correlated shifts - many participants simultaneously moving from BSR to eEURO or vice versa - before reflexivity cascade triggers H_user deterioration.

**Two concentration limits:**
- **Limit 1 - eEURO class concentration:** Alert threshold: 60% of total Protocol collateral. Hard limit: 70% of total Protocol collateral. Response: H_solv alerted may suspend new positions per existing Tier mechanism.
- **Limit 2 - Single eEURO issuer concentration:** No single issuer (Circle/EURC, Monerium/EURe) representing more than 50% of total eEURO collateral. Response: H_solv notified governance decision.

### 10.3 Market Integrity Monitor
Monitors all order book activity for: wash trading, layering, spoofing, cross-market coordination. Open interest concentration limit: max 20% per participant per market. Compliance alert generated for human review on flagging threshold breach.

### 10.4 Circuit Breakers
**Prime broker API unavailable > 30 minutes:**
- Alert H_solv
- Suspend new token issuance
- Notify governance

**Oracle feed unavailable > 60 minutes:**
- Carry forward last valid Settlement Anchor
- Log on-chain: "carry-forward [timestamp]"

**Oracle unavailable > 4 hours:**
- Suspend new position openings

**Delta outside tolerance due to rapid market move:**
- Escalate to H_solv - do NOT attempt single large order to restore

---

## 11. Virtual-to-Physical Swap - V2P Mechanics

### 11.1 Activation Conditions (per market)
All three required:
- Licensed retail energy supply entity operational in jurisdiction with valid DSO agreements 
- Smart metering integration operational and tested

### 11.2 Monthly Reconciliation Algorithm
```python
ON 2nd of each month:
  FOR EACH active V2P contract:
    actual = SmartMeter.read(meter_point, previous_month)
    due = CEILING(actual / 100_kWh)
    available = contract.escrowed_tokens

    IF due <= available:
      BurnTokens(contract, due)
      Invoice(commodity = 0.00 EUR)

    ELIF due > available:
      shortfall_kwh = (due - available) * 100
      BurnTokens(contract, available)

      IF customer_type IN [HOUSEHOLD, SME]:
        tokens = CEILING(shortfall_kwh / 100)
        PurchaseTokens(account, tokens, BSEI_current)
        BurnTokens(contract, tokens)
        Invoice(commodity = tokens * BSEI_current)

      ELIF customer_type == INDUSTRIAL:
        OpenWindow(contract, shortfall_kwh, hours=72)
        IF expired AND not_purchased:
          auto_purchase at BSEI and burn

    IF available > due:
      contract.escrowed_tokens = available - due
      # Roll surplus to next month
```

### 11.3 Partial Release Mechanism (for DeFi)
V2P escrow holds tokens locked under supply contract
Monthly: 100 tokens released to retailer burn function

If DeFi liquidation event:
- DeFi protocol calls partialRelease(amount, liquidator)
- Escrow verifies: caller is whitelisted DeFi protocol
- Escrow releases amount to liquidator

V2P contract has cash settlement fallback:
- If tokens insufficient: Protocol pays cash equivalent at BSEI price
- Retailer supply continuity protected

---

## 12. Composability Layer - DeFi Integration

### 12.1 Integration Timeline
| Milestone | Target | Protocol |
|-----------|--------|----------|
| Chainlink feeds live | Month 6 | BS-G-NL/EUR, BS-P-DE/EUR |
| Clearpool institutional | Month 9 | Permissioned, no governance vote |
| Morpho integration | Month 9 | Via Aave listing |
| Aave governance proposal | Month 12 | After 6-month liquidity track record |
| Aave v3 listing | Month 15-18 | Following governance approval |

### 12.2 Collateral Concentration Limits
- Per DeFi protocol limit: 20% of circulating BS token supply
- Aggregate DeFi limit: 35% of circulating BS token supply

Enforced at smart contract level (BSToken.sol)
New deposits paused if limit approached
Existing positions unaffected

### 12.3 LTV Parameters (target)
BS-G-NL and BS-P-DE at Aave launch:
- LTV: 65% (conservative - new asset class)
- Liquidation threshold: 70%
- Liquidation bonus: 8%

Review after 6 months:
- If volatility data supports: may increase to 70-75%

---

## 13. On-Chain Transparency - Proof of Reserve

### 13.1 Published On-Chain Data (Arbitrum)
| Data Point | Frequency |
|------------|-----------|
| BSEI per market | After every trade, min every 60s |
| BSSZ Floor and Ceiling per market | Once per business day |
| H_solv_CORE | Continuous |
| H_solv_SYSTEM | Continuous |
| H_solv Tier | Continuous |
| Protocol Vault eEURO balance | After every vault transaction |
| BSR Stability Reserve balance | After every fee allocation |
| BSR circulating supply | After every mint/burn |
| Total outstanding token volume | After every issuance/burn |
| Last burn event (amount + timestamp) | After every burn |
| Prime broker API status | Every 5 minutes |

### 13.2 Proof of Reserve Invariant
Smart contract enforces continuously:
```
V_eEURO |ProfitLoss_ITM| + Reserve_Op
```

If violated: new token issuance suspended automatically. No human intervention required or possible.

---

## 14. Security Model

### 14.1 Upgrade Philosophy
**IMMUTABLE (no upgrade path exists):**
- ProtocolVault.sol core logic
- Short selling prohibition on BSR
- SIL step size (10%)
- Stop-out constant (0.5)
- H_solv Tier V threshold (< 1.00)
- Wallet concentration limit (5% BSR)
- Oracle minimum providers (3)

**GOVERNANCE-UPGRADEABLE (with timelock):**
- Minor parameter changes: 48-hour timelock
- Major parameter changes: 7-day timelock
- During timelock: participants can exit if they disagree with coming change

**EMERGENCY (multisig 3 of 5):**
- Pause functions (Tier V only)
- Oracle emergency carry-forward
- Prime broker circuit breakers

### 14.2 Multisig
**Threshold:** 3 of 5 keyholders
**Geographic distribution:** no two keyholders in same country or legal jurisdiction
**Key storage:** hardware wallets only (Ledger/Trezor)
Never connected to internet except at signing

### 14.3 Audit Requirements
**PRE-LAUNCH (mandatory):**
- OpenZeppelin: all smart contracts, ~$100-150K
- Trail of Bits: critical contracts only, ~$80-120K
- Certora: formal verification of invariants, ~$50-80K

**POST-LAUNCH (ongoing):**
- Immunefi bug bounty: max $500,000 for critical
- Annual re-audit for any upgraded contracts
- Chainlink integration audit (required for Aave)

---

## 15. Protocol Constants Reference

| Constant | Symbol | Value | Changeable |
|-----------|---------|-------|------------|
| Physical Meridian weights | W_Spot/FM/FQ/Cal | 10/40/25/25% | Yes - simple majority, 30d notice |
| FM ADR window | D_window | 10-12 business days | Yes - simple majority |
| Cal ADR start | - | July 1st annually | Yes - simple majority |
| Settlement Anchor weights | - | 50/25/25% | Yes - simple majority |
| BSSZ Floor | - | A × 0.90 | Yes - simple majority, 60d notice |
| BSSZ Ceiling | - | A × 1.20 | Yes - simple majority, 60d notice |
| BSEI segment weights | - | 50/25/25% | Yes - simple majority |
| BSEI window | - | 72 hours | Yes - simple majority |
| BSEI min trade | - | 1 token (100 kWh) | Yes - simple majority |
| Oracle outlier threshold | - | 15% from median | Yes - simple majority |
| Oracle min providers | - | 1 per market | No - immutable |
| H_user stop-out | - | 0.5 | No - immutable |
| H_user Safe Zone | - | > 1.10 | No - immutable |
| H_user Intervention | - | 1.00 | No - immutable |
| SIL step size | - | 10% | No - immutable |
| SIL epsilon | 0.02 | Yes - simple majority |
| SIL loss settlement | - | 50/50 eEURO/BSR | Yes - simple majority |
| H_solv Tier I | - | > 1.15 | Yes - 67% supermajority |
| H_solv Tier V | - | < 1.00 | No - immutable |
| Tier upgrade window | - | 30 minutes | Yes - simple majority |
| BSR-SR T1/T2/T3 | - | 40/35/25% | Yes - simple majority |
| ADS Lock trigger | - | P_BSR -10% in 24h | Yes - 67% supermajority |
| ADS Lock max duration | - | 48 hours | Yes - simple majority |
| NAV Buyback max | - | 5% circulating/session | Yes - simple majority |
| BSR total supply | - | 100,000,000 | No - immutable |
| BSR wallet limit | - | 5% circulating | No - immutable |
| BSR short selling | - | Prohibited | No - immutable |
| Max leverage | - | 1:4 | Yes - 67% supermajority |
| Layer 3 Vault cap | - | 15% of Vault | Yes - 67% supermajority |
| Prime broker API max outage | - | 30 minutes | Yes - simple majority |
| Oracle max outage (positions) | - | 4 hours | Yes - simple majority |
| Industrial V2P window | - | 72 hours | Yes - simple majority |
| DeFi per-protocol limit | - | 20% circulating | Yes - 67% supermajority |
| DeFi aggregate limit | - | 35% circulating | Yes - 67% supermajority |
| Timelock minor | - | 48 hours | Yes - 67% supermajority |
| Timelock major | - | 7 days | Yes - 67% supermajority |
| Multisig threshold | - | 3 of 5 | Yes - 80% supermajority |
| Bug bounty maximum | - | $500,000 | Yes - governance |
| Blockchain | - | Arbitrum One | Yes - 80% supermajority |
| Token standard | - | ERC-20 | No - immutable |
| Account model | - | ERC-4337 | Yes - governance |
| Intelligence paid tier | - | 9.99/month | Yes - governance |
| Burn rate default | k_burn | 50% of surplus | Yes - simple majority |
| Reserve Ratio default | RR | 1.10 | Yes - 67% supermajority |
| Genesis vesting cliff | - | 12 months | No - immutable |
| Genesis vesting duration | - | 24 months linear | No - immutable |

---

**BlackSlon Energy Protocol - Technical Specification v2.0 | April 2026**

**For internal use, due diligence, and regulatory submission.**

**© BlackSlon Ecosystem. All rights reserved.**
