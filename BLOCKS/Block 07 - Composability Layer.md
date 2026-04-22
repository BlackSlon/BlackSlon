# Block 07 - Composability Layer

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Philosophy

A BS-P or BS-G token held in a participant's wallet is not a dormant asset. It is a composable instrument - one that can serve its primary function as an energy price hedge or supply settlement vehicle while simultaneously functioning as collateral within the decentralised finance ecosystem. The capital does not choose between these functions. It serves both at once.

This is the ONDO principle applied to energy markets. An ONDO token earns the underlying Treasury yield while simultaneously serving as accepted collateral on Aave and MakerDAO. The holder does not choose between yield and liquidity. BlackSlon Energy tokens are designed with the same composability principle - adapted to the specific characteristics of energy markets and the multi-year supply horizons of Volume Hedgers.

**Scope of this block:** BS-P and BS-G tokens as DeFi collateral. BSR composability is out of scope for this version - to be addressed separately when BSR has sufficient market track record.

---

## Why BS-P/G Tokens Are Natural DeFi Collateral

Three properties make BS-P and BS-G tokens structurally suited as lending collateral:

### Property 1 - Predictable value floor.

BS-P and BS-G token prices operate within the BSSZ corridor - anchored daily to physical hub prices (TTF, Phelix, NBP, PSV). The corridor prevents single-session crashes. The Settlement Anchor prevents discontinuous price gaps. A lending protocol can model the maximum daily price move with high confidence - which is exactly what liquidation risk models require.

### Property 2 - Continuous, verifiable, on-chain pricing.

The BSEI is published on-chain after every executed trade and minimum every 60 seconds. It is transaction-derived - not an administrator's opinion. It can be published as a Chainlink feed, making it directly consumable by any DeFi protocol that uses Chainlink oracles. No custom oracle integration required.

### Property 3 - Deep, institutionally-backed liquidity.

The Prime Broker provides continuous market-making within the BSSZ corridor. Any liquidation event that requires a lending protocol to sell BS tokens into the BlackSlon Order Book will find a market maker on the other side. This is the critical property that distinguishes BS tokens from long-tail DeFi assets where liquidation cascades are common.

---

## The Primary Use Case - Volume Hedger Capital Unlock

The composability layer solves a specific problem for Volume Hedgers: they accumulate BS tokens over months, lock them into a supply contract, and then watch that capital sit idle for 24 months while their business needs working capital.

**Without composability:**
- Volume Hedger accumulates 2,400 BS-G tokens
- Signs 24-month supply contract with retailer
- Capital locked: 92,400 EUR in BS-G position
- Working capital available: whatever was left over
- Energy price: secured at 38.50 EUR/MWh average

**With composability:**
- Same position - but deposited into Aave/Morpho
- Borrows 60,000 EUR in EURC at 65% LTV
- Working capital available: +60,000 EUR
- Energy price: still secured at 38.50 EUR/MWh
- Cost: ~4% annual interest on borrowed EURC
- Net: energy hedge intact + significant liquidity unlocked

The capital works twice. The energy hedge is not sacrificed for liquidity. The liquidity is not sacrificed for the energy hedge.

---

## Supported Protocol Tiers

Not all DeFi lending protocols are equal. BlackSlon targets integration in three tiers based on strategic priority, governance complexity, and participant profile.

### Tier 1 - Primary Integration Targets

**AAVE v3**
- Largest TVL in DeFi lending (~$15B+)
- Chainlink oracle standard - direct compatibility
- Governance: token holder vote required
- Timeline: 12-18 months from Protocol launch
  (requires liquidity track record first)
- Best for: retail and SME Volume Hedgers
          broad accessibility

**MORPHO**
- Peer-to-peer matching on top of Aave/Compound
- Better interest rates for both sides
- No separate governance vote needed
  (inherits Aave's asset list)
- Timeline: simultaneous with Aave integration
- Best for: larger Volume Hedgers
          institutional participants
          better rates on big positions

### Tier 2 - Secondary Integration Targets

**EULER FINANCE**
- More flexible asset onboarding
- Smaller governance process
- Good first step before Aave
- Timeline: 6-9 months from Protocol launch
- Best for: early adopters, testing integration

**SPARK (MakerDAO ecosystem)**
- Access to DAI/USDS borrowing
- Different collateral risk framework
- Timeline: 12-18 months
- Best for: participants who prefer DAI
          over EURC as borrowed asset

**CLEARPOOL**
- Institutional, permissioned lending
- No governance vote - direct integration
- Timeline: 6-12 months
- Best for: B2B Volume Hedgers
          corporate treasury use case
          prime broker relationships

### Tier 3 - Future Consideration

- FLUID (formerly Instadapp)
- COMPOUND v3
- PENDLE (yield tokenisation of BS tokens)
  - longer term, requires deeper liquidity

---

## Technical Requirements for Integration

Five technical conditions must be satisfied before any DeFi protocol integration goes live.

### Requirement 1 - Chainlink Price Feed

BSEI per market published as Chainlink feed:
- BS-G-NL/EUR (TTF-based)
- BS-P-DE/EUR (Phelix-based)
- BS-G-UK/EUR (NBP-based)
- BS-P-UK/EUR (N2EX-based)
- expanding per market activation

Feed update frequency: every 60 seconds
  + deviation trigger if price moves >0.5%
Heartbeat: minimum update every 3600 seconds
  even if price unchanged

Implementation: BlackSlon oracle node
  submits to Chainlink aggregator network
  Multiple independent nodes required
  for Chainlink decentralisation standard

### Requirement 2 - ERC-20 Standard Compliance

BS-P and BS-G tokens must implement
full ERC-20 interface:
- transfer()
- transferFrom()
- approve()
- allowance()
- balanceOf()
- totalSupply()

Additional requirement for V2P escrow:
- partialRelease(amount, recipient)
  - callable by authorised DeFi protocol
    during liquidation event
  - releases specified token amount
    from escrow to liquidator

### Requirement 3 - Smart Contract Audit

Audit required by firms recognised
by Aave/Morpho governance:
- OpenZeppelin - primary
- Trail of Bits - secondary
- Certora (formal verification) - for
  critical escrow and oracle contracts

Audit scope:
- BS token smart contracts
- BSEI oracle contracts
- V2P escrow contracts
- Partial release mechanism
- Collateral concentration limit enforcement

### Requirement 4 - Liquidity Track Record

Aave governance will require evidence of:
- Minimum 6 months continuous operation
- Average daily Order Book volume > X EUR
- Maximum observed daily price move
- Liquidation simulation results
- Prime Broker commitment letter

Timeline implication:
- Protocol launches Month 3
- Earliest Aave governance proposal: Month 9
- Earliest Aave integration live: Month 15-18
- Euler/Clearpool can move faster: Month 9-12

### Requirement 5 - Collateral Concentration Limit

Maximum percentage of total BS token supply
that can be deposited in external DeFi protocols:

Per protocol limit: 20% of circulating supply
Aggregate DeFi limit: 35% of circulating supply

Enforced at smart contract level
If limit approached: new deposits paused
  existing positions unaffected

Rationale: prevents scenario where
  DeFi liquidation cascade generates
  forced selling that overwhelms
  BlackSlon Order Book liquidity

---

## The Partial Release Mechanism

This is the critical technical innovation that makes V2P escrow and DeFi collateral compatible.

**The problem without partial release:**
- Volume Hedger deposits 2,400 BS-G tokens in Aave
- Signs V2P supply contract - tokens go to escrow
- Escrow locks all 2,400 tokens
- Aave cannot access them for liquidation
- Integration breaks

**The solution - partial release function:**
- V2P escrow smart contract holds 2,400 tokens
- Monthly: 100 tokens released to retailer (V2P)
- Corresponding Aave position reduced

If liquidation event:
- Aave calls partialRelease(amount, liquidator)
- Escrow verifies: Aave is authorised caller
- Escrow releases requested amount to liquidator
- V2P contract updated: remaining supply
  obligation covered by remaining tokens
  or cash settlement at current BSEI

**Retailer is protected:**
- Supply contract has cash settlement fallback
- If tokens insufficient: Protocol pays
  cash equivalent at BSEI price
- Retailer never loses supply certainty

**Authorised callers for partial release:**
- Registered DeFi protocols only
  (whitelist maintained by BlackSlon governance)
- Prime Broker (for margin calls)
- Protocol itself (for SIL events)
- Participant (voluntary exit)

---

## Worked Example - Full Composability Flow

**Setup:**
European manufacturing company. Monthly gas consumption: 100 MWh. Planning horizon: 24 months. Treasury objective: lock gas price + preserve working capital.

### Phase 1 - Accumulation (Months -6 to 0):
- Month -6: 400 BS-G-NL @ 36.00 EUR/MWh = 14,400 EUR
- Month -5: 400 BS-G-NL @ 38.00 EUR/MWh = 15,200 EUR
- Month -4: 400 BS-G-NL @ 41.00 EUR/MWh = 16,400 EUR
- Month -3: 400 BS-G-NL @ 39.00 EUR/MWh = 15,600 EUR
- Month -2: 400 BS-G-NL @ 37.00 EUR/MWh = 14,800 EUR
- Month -1: 400 BS-G-NL @ 40.00 EUR/MWh = 16,000 EUR

Total acquired: 2,400 BS-G-NL tokens
Total invested: 92,400 EUR
Average cost: 38.50 EUR/MWh
Market BSEI on contract day: 40.00 EUR/MWh
Unrealised gain at contract signing: +3,600 EUR

### Phase 2 - Contract + Composability Activation (Day 0):
Signs V2P supply contract with retailer:
- Settlement rate: 40.00 EUR/MWh
- Term: 24 months
- Volume: 100 MWh/month

Deposits 2,400 BS-G-NL into Morpho:
- Collateral value: 96,000 EUR (at BSEI 40.00)
- LTV: 65%
- Maximum borrow: 62,400 EUR EURC

Takes loan: 60,000 EUR EURC
- Interest rate: 4.2% annual (Morpho peer rate)
- Annual interest cost: 2,520 EUR
- 24-month total interest: 5,040 EUR

Protocol Vault collateral (25% IM, 100% BSR):
- Posted: 24,000 EUR in BSR
- Fee tier: 0.20% per transfer

**Day Zero Balance Sheet:**
Outflows:
- Token accumulation:     -92,400 EUR
- Protocol IM:            -24,000 EUR
- Total deployed:        -116,400 EUR

Inflows:
- Morpho loan:            +60,000 EUR EURC

Net Day Zero position:    -56,400 EUR deployed
  (vs -116,400 EUR without composability)
  Capital efficiency improvement: 51.5%

Energy price: secured at 38.50 EUR/MWh average
Market price on Day 0: 40.00 EUR/MWh
Immediate hedge value: +3,600 EUR unrealised

### Phase 3 - Monthly Unwind (Months 1-24):
Each month:
- 100 BS-G-NL tokens released from Morpho escrow
- 100 tokens transferred to retailer (V2P)
- Retailer delivers 10,000 kWh to factory
- Invoice: energy commodity cost = 0.00 EUR
- Morpho loan reduced by proportional amount:
  60,000 EUR / 24 months = 2,500 EUR/month
- Protocol IM partially released: 1,000 EUR/month

### Phase 4 - Final State (Month 24):
All 2,400 tokens consumed via V2P
Morpho loan: fully repaid
Protocol IM: fully released back to company
BSR returned to company wallet
  (potentially appreciated through burn mechanism)

**Total energy cost over 24 months:**
- Token accumulation:      92,400 EUR
- Morpho interest:          5,040 EUR
- Protocol fees (0.20%):    4,608 EUR
- Total:                  102,048 EUR

vs market price supply contract
  at 40.00 EUR/MWh × 2,400 MWh: 96,000 EUR

vs if gas price rose to 50 EUR/MWh:
  Market cost would be:   120,000 EUR
  BlackSlon cost:         102,048 EUR
  Saving:                  17,952 EUR

Working capital unlocked and used
for 24 months: 60,000 EUR EURC
Opportunity value (at 6% deployment): ~7,200 EUR

---

## Risk Framework for Composability

### Risk 1 - BSEI Price Drop triggers Morpho liquidation
Scenario: TTF crashes 30% over 3 days
BSEI falls within BSSZ floor constraints
BS-G-NL collateral value drops
Morpho Health Factor approaches 1.0

**Mitigant 1: BSSZ floor limits daily move to -10%**
Three-day crash: maximum -27% within corridor
At 65% LTV and -27% collateral drop:
HF = (96,000 × 0.73 × liquidation_threshold) / 60,000
Still above 1.0 with conservative LTV

**Mitigant 2: ISA alerts participant when
Morpho HF approaches warning threshold
Participant can add collateral or repay partial loan**

**Mitigant 3: Concentration limit prevents
liquidation cascade from overwhelming Order Book**

**Mitigant 4: Prime Broker provides liquidity
on BlackSlon Order Book during stress events**

### Risk 2 - DeFi protocol smart contract exploit
Scenario: Aave/Morpho suffers exploit
BS tokens trapped or stolen

**Mitigant: Concentration limit (20% per protocol)
Maximum exposure to any single protocol
is capped at smart contract level
Diversification across Tier 1 and Tier 2
protocols reduces single-point-of-failure risk**

**Insurance: Nexus Mutual / Sherlock coverage
available for Aave v3 positions
Participants informed of coverage options**

### Risk 3 - V2P supply disruption from liquidation
Scenario: Morpho liquidates BS tokens
before they are transferred to retailer

**Mitigant: Cash settlement fallback in V2P contract
If tokens are liquidated before monthly transfer:
Protocol pays retailer cash equivalent at BSEI
Retailer's supply obligation is always honoured
Participant loses hedge upside but
supply continuity is protected**

### Risk 4 - Oracle manipulation
Scenario: BSEI manipulated to trigger
artificial liquidations in DeFi protocols

**Mitigant 1: BSEI 72-hour VWAP structure
requires 3-day volume dominance to manipulate
(see Block 06: Protocol Mechanics)**

**Mitigant 2: Chainlink oracle has deviation
circuit breaker - extreme moves flagged
for manual review before DeFi protocols
act on the price**

**Mitigant 3: BSSZ corridor limits
how far BSEI can move intraday
regardless of manipulation attempt**

---

## Integration Timeline

**MONTH 3 - Protocol Launch:**
- BS-G-NL and BS-P-DE live
- BSEI calculation begins
- Composability: not yet available

**MONTH 6 - Technical Prerequisites:**
- Chainlink feed live for BS-G-NL, BS-P-DE
- ERC-20 compliance verified
- Partial release mechanism deployed
- Smart contract audit complete (Euler scope)

**MONTH 9 - First Integration:**
- Euler Finance: BS-G-NL and BS-P-DE
- Clearpool: institutional channel
- LTV: conservative 50% on launch
- Concentration limit: 10% on launch

**MONTH 12 - Track Record Established:**
- 6 months liquidation history
- Average daily volume data compiled
- Aave governance proposal prepared
- LTV review: potentially raised to 60-65%

**MONTH 15-18 - Aave + Morpho:**
- Aave v3 governance vote
- Morpho automatic via Aave listing
- Concentration limit raised to 20%
- Full composability use case available
  to all participant profiles

**MONTH 18+ - Expansion:**
- Additional BS markets added to feeds
- BS-G-UK, BS-P-PL, BS-P-IT
- Spark/MakerDAO integration
- Pendle yield tokenisation (exploratory)

---

## What Composability Changes for BlackSlon

Composability is not a feature. It is a structural argument for why BS-P and BS-G tokens are superior to any other energy hedging instrument available today.

A TTF futures contract on ICE cannot be deposited in Aave. An EEX Phelix forward cannot unlock working capital while the hedge remains open. A bilateral OTC supply agreement cannot be tokenised and used as DeFi collateral. None of the instruments that currently dominate European energy hedging can do what a BS token can do.

The hedge works. And while it works - the capital works too.

---

**Block 07 - Composability Layer | Canonical | April 2026**

**Dependencies:** Block 01 (Collateral), Block 04 (Liquidity), Block 06 (Protocol Mechanics)

**Next:** Block 02 - Participant Profiles
