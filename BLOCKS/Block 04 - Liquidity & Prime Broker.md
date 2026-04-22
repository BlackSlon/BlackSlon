# Block 04 - Liquidity & Prime Broker

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Philosophy

The BlackSlon Protocol operates as pure financial infrastructure for European energy markets. It does not touch physical energy. It does not hold physical energy. It does not deliver physical energy. Physical energy flows through licensed retailers who operate entirely outside the Protocol boundary. Financial risk flows through a prime broker who operates entirely within it.

This separation is the Protocol's most important structural decision. The Protocol is governed by MiCA. The retailers are governed by energy supply licences. The prime broker is governed by MiFID II and EMIR. Each operates in its own regulatory domain. None of their regulatory obligations bleed into the others.

---

## The Regulatory Foundation - Why 1:1 Reserves Are Not Required

A critical regulatory property of BS-P and BS-G tokens determines the entire capital architecture of the Protocol.

Under MiCA, Asset-Referenced Tokens require the issuer to maintain 1:1 reserves against every token in circulation - locking capital in custodial accounts that cannot be deployed for any other purpose. Every token must be backed by an equivalent value of reserved assets. The capital is frozen and unproductive.

BS-P and BS-G tokens are Utility Tokens under MiCA Title II. They do not purport to maintain a stable value. Their price rises and falls with TTF and Phelix by design. This classification means the Protocol is not required to hold 1:1 reserves against outstanding token supply.

Instead, the Protocol maintains:
- Participant collateral (Initial Margin per position)
- Protocol Vault surplus (above H_solv obligations)
- Prime Broker hedge (offsetting aggregate net delta)
- BSR Stability Reserve (15% of fees, three tranches)

This structure provides full economic backing for every outstanding position - without locking idle capital in 1:1 reserves. The difference between what participants post as Initial Margin and what the Prime Broker requires to hedge the same exposure on external markets - typically 18% of notional - remains in the Vault as productive capital. It funds the BSR burn mechanism, backstops H_solv, and drives token appreciation.

The Utility Token classification is not a regulatory loophole. It reflects the economic reality of BS-P and BS-G tokens: they are instruments of access to the BlackSlon Protocol ecosystem, not claims on a fixed pool of reserved assets.

---

## The Three-Layer Liquidity Architecture

The Protocol operates three liquidity layers in strict priority order. Layer 2 activates only when Layer 1 is insufficient. Layer 3 activates only when Layer 2 has not quoted.

### Layer 1 - The Open Order Book
The primary price discovery mechanism. Participants trade BS-P and BS-G tokens directly with each other at market-driven prices within the BSSZ corridor. All bids and asks are visible to all participants in real time.

**Matching rules:**
- Strict Price-Time Priority - best price first, earliest order at any given price filled first
- No preferential routing - no participant receives priority treatment
- No hidden orders - full order book transparency
- BSSZ enforcement - all orders validated against corridor before acceptance

**Operating hours:** 24 hours per day, 7 days per week, 365 days per year - including weekends, public holidays, and overnight hours when physical energy risk events most commonly occur.

**Mark-to-market reference:** The BSEI - not the last traded price - serves as the mark-to-market reference for all open positions. This insulates PnL calculations from thin-market manipulation during low-volume periods.

### Layer 2 - The Prime Broker
A regulated financial institution of institutional standing - JPMorgan, StoneX, Marex, or equivalent - serves two distinct and equally essential functions simultaneously: market maker and financial guarantor.

Full specification in the Prime Broker section below.

### Layer 3 - The Protocol Vault
The market maker of absolute last resort. Activates only when no matching organic counterparty exists on the Open Order Book AND the prime broker has not quoted within the corridor - a combination that is structurally rare under normal operating conditions.

**Hard constraints enforced at smart contract level:**
- Maximum net directional exposure: 15% of total Vault value
- Not subject to governance override
- Activates only when H_solv is in Tier I or Tier II
- Suspended automatically in Tier III, IV, or V - preserving capital for solvency obligations

---

## The Prime Broker - Dual Role Architecture

### Role 1 - Market Maker
The prime broker's energy trading desk continuously posts two-sided quotes on the Open Order Book:

**BID (standing offer to buy BS tokens from participants):**
- Price = BSEI minus agreed spread
- Typically: 2-3% below BSEI
- Floor: never below BSSZ Floor

**ASK (standing offer to sell BS tokens to participants):**
- Price = BSEI plus agreed spread
- Typically: 2-3% above BSEI
- Ceiling: never above BSSZ Ceiling

The spread parameters - floor, ceiling, and standard spread - are defined in the Prime Brokerage Agreement. All quotes are calibrated against real-time prices available on physical energy markets (TTF, Phelix, NBP, PSV) and financial derivative markets (ICE futures, EEX forwards) - ensuring the prime broker's inventory risk is always priced against current market reality.

The prime broker earns the bid-ask spread on every executed market-making transaction. Because the Prime Broker Mandate Manager provides real-time visibility into the Protocol's aggregate flow - the total directional bias of all open positions across all participants - the prime broker can calibrate its quotes and manage its inventory with an informational advantage unavailable to any other participant. Market making in BlackSlon is commercially attractive beyond the contractual obligation. It is a structurally informed trading activity.

### Role 2 - Financial Guarantor
The prime broker maintains a hedging position in regulated energy derivative markets - TTF futures on ICE, Phelix forwards on EEX, and equivalent instruments - sized to offset the Protocol's aggregate net delta at all times.

**Delta neutrality:**
```
Protocol aggregate delta:
  Sum of all long positions minus sum of all short positions
  expressed in MWh-equivalent across all active markets

Prime broker hedge:
  Offsetting position in external derivative markets
  maintained continuously within defined tolerance band

Target: Protocol net delta = 0 at all times
Tolerance: ±500 MWh-equivalent per market per hour
  (governance-set, reviewed quarterly)
```

**Settlement mechanics when participant closes profitable position:**
```
Participant closes long position with profit:
  Protocol Vault pays participant gain in eEURO

Settlement between Protocol and Prime Broker:
  Occurs directly at prevailing market price
  per Prime Brokerage Agreement terms
  Prime broker settles its obligation to Vault directly

Prime broker's external hedge book:
  Managed independently by prime broker
  No requirement to close external position
  simultaneously with Protocol settlement
  Prime broker decides its own hedge management
  based on commercial judgment

Net effect on Vault:
  Paid out: participant gain
  Received: prime broker settlement
  Vault balance: replenished
```

The prime broker's obligation is financial - to settle the Protocol's obligations at market price. What it does with its own external book is its own commercial decision. This distinction is important: the Protocol does not depend on the prime broker executing a specific external trade at a specific moment. It depends on the prime broker honouring its contractual settlement obligation - which is backed by the ISDA Master Agreement and Credit Support Annex.

---

## Prime Brokerage Agreement - Key Terms

The relationship is governed by:

**ISDA Master Agreement (2002 version)**
- Standard framework for derivative obligations
- Cross-default provisions
- Events of default and termination

**Credit Support Annex (CSA)**
- Eligible collateral: cash, government bonds, eEURO
- Initial Margin: 10-15% of notional hedge value
- Variation Margin: daily settlement, T+1
- Threshold amounts and minimum transfer amounts

**Prime Brokerage Mandate Schedule**
- Market making obligations (spread parameters,
  minimum quote size, operating hours)
- Delta hedge mandate (tolerance band,
  instrument list, maximum NOP per tenor)
- Reporting obligations (real-time position
  data to Prime Broker Mandate Manager API)
- Eligibility conditions (see below)

---

## Prime Broker Eligibility Conditions

The Prime Broker Mandate Manager monitors continuously:
- Adequate margin on deposit (CSA requirements)
- Active API connectivity to Mandate Manager
- Valid regulatory authorisations
  (MiFID II, EMIR reporting active)
- Compliance with ISDA position limits
- Two-sided quotes posted within agreed parameters
- Delta hedge within tolerance band

**Failure of any eligibility condition:**
- T+0:   Immediate alert to H_solv
- T+0:   Protocol restricts new token issuance
- T+30m: If unresolved - governance layer notified
- T+72h: Contingency prime broker activation
        process initiated if failure continues

**Contingency:** The Protocol maintains a defined contingency process for prime broker replacement - executable within 72 hours in the event of prime broker default or regulatory action. No single prime broker relationship represents an unrecoverable single point of failure.

---

## The Prime Broker Mandate Manager

The AI module responsible for coordinating the prime broker relationship. Full specification in Block 05 (Risk Engine) and Block 08 (AI Architecture).

**Key functions relevant to liquidity:**

**Delta monitoring:**
```
Reads: aggregate net delta across all open positions
       across all active markets continuously
Transmits: hedging instructions to prime broker API
           when delta exceeds tolerance band
Frequency: continuous - instruction within 60 seconds
           of tolerance breach
```

**Market making coordination:**
```
Monitors: Layer 1 Order Book depth per market
          per side (bid and ask) continuously
Triggers: market making instruction to prime broker
          when organic depth falls below threshold
Specifies: market, side, target depth, allowable spread
```

**Layer 3 activation:**
Activates Protocol Vault as market maker only when:
1. Prime broker has not quoted within corridor
2. No organic counterparty exists on Order Book
3. H_solv is in Tier I or Tier II

All three conditions must be met simultaneously

**Circuit breakers:**
```
Prime broker API unavailable > 30 minutes:
  Alert H_solv
  Suspend new token issuance
  Notify governance layer

Delta outside tolerance due to rapid market move:
  Escalate to H_solv for systemic response
  Do NOT attempt single large market order
    (would itself move the market)

H_solv enters Tier III:
  Alert prime broker to evaluate hedge adjustment
  Pre-position for potential Vault constraints

H_solv enters Tier IV:
  Freeze new hedging instructions
  Preserve existing hedge
  Await governance emergency protocol
```

---

## Capital Efficiency - The Margin Spread

The margin differential between retail participants and institutional hedging is the Protocol's structural working capital mechanism.

```
Participant opens BS-P-DE position:
  Notional value:              100,000 EUR
  Initial Margin (1:2 lever):   50,000 EUR Vault
  Initial Margin (1:1 lever):  100,000 EUR Vault

Prime broker hedges same exposure:
  Exchange margin (ICE/EEX):     7,000 EUR (7% of notional)
  OTC/EFET with PCG:                 0 EUR (0% of notional)

Structural float in Vault (at 1:2 lever):
  50,000 - 7,000 = 43,000 EUR = 43% of notional

Structural float in Vault (at 1:1 lever):
  100,000 - 7,000 = 93,000 EUR = 93% of notional
```

At scale, this structural float - generated automatically by the architecture rather than by trading skill - funds three Protocol functions:

1. **BSR burn mechanism**
   (when H_solv > 1.15 and surplus confirmed)

2. **H_solv backstop**
   (Vault always holds excess above obligations)

3. **BSR Stability Reserve**
   (15% of fees, three tranches, cascade deployment)

The float is not profit extracted from participants. It is the natural consequence of two facts: participants need larger buffers against position volatility, and institutional hedges require smaller margins because they are professionally managed within defined mandate parameters.

---

## Instrument Mandates - Prime Broker Hedge Book

The Prime Broker Mandate Manager operates within defined instrument limits:

| Instrument | Purpose | Max Notional (% Vault) | Auto Stop-Loss |
|-------------|---------|------------------------|----------------|
| Day-Ahead (DA) | Balancing coverage | 10% | 2% Vault loss |
| Front Month (FM) | Market making + balancing | 25% | 5% Vault loss |
| Front Quarter (FQ) | Core structural hedge | 40% | 8% Vault loss |
| Calendar +1 | Core structural hedge | 50% | 10% Vault loss |
| Calendar +2 | Core hedge + backwardation | 50% | 12% Vault loss |
| Cross-hub spread | TTF/THE/TGE/Phelix spread | 20% | 4% Vault loss |
| Spark spread | BS-G vs BS-P cross-market | 15% | 5% Vault loss |
| Balancing / RB | Balancing cost management | 5% | 3% Vault loss |
| **Total NOP** | **Hard ceiling** | **80% Vault** | **H_solv trigger** |

**VaR limits:**
- Daily VaR (95% confidence):   3.0% of Vault
- Weekly VaR (95% confidence):  6.0% of Vault

**H_solv cascade effect on mandate:**
```
H_solv < 1.10 Reduce all NOP by 50% within 4 hours
H_solv < 1.05 Close speculative positions
                (DA, FM, RB, cross-hub) within 2 hours
H_solv < 1.00 Full Safeguard - halt new positions
                maintain existing hedges only
```

---

## On-Chain Transparency

The following liquidity-related data is published on-chain on Arbitrum continuously:

**Published after every trade:**
- BSEI per market
- Total open interest per market (long/short)
- Layer 3 Vault exposure (% of hard cap used)

**Published every 5 minutes:**
- Prime broker API heartbeat (connected/disconnected)
- H_solv Tier (determines Layer 3 availability)

**Published once per business day:**
- BSSZ Floor and Ceiling per market
- Prime broker aggregate NOP (total only, no breakdown)
- Vault eEURO balance
- BSR Stability Reserve balance

Prime broker individual position details are not published on-chain - they are reported to relevant trade repositories under EMIR, providing regulators with full visibility while protecting the prime broker's commercial position data.

---

## What This Architecture Eliminates

By replacing the Physical Liquidity Provider layer with the Prime Broker as the sole Layer 2 participant, the Protocol eliminates three categories of structural failure:

**Conflict of interest:** A physical liquidity provider that simultaneously participates in the virtual Protocol and the physical energy market - whose hedging decisions on physical exchanges could influence the Physical Meridian that anchors the very corridor within which it is market making - creates an irresolvable conflict. The prime broker hedges in financial derivative markets. Its hedging activity does not affect the Physical Meridian, which is derived from exchange settlement prices, not bilateral OTC transactions.

**Regulatory complexity:** A participant simultaneously subject to MiCA as a Protocol participant and REMIT as a physical energy trading entity creates dual regulatory obligations that are difficult to manage cleanly. The prime broker is subject to MiFID II and EMIR as a financial institution. Its relationship with the Protocol is a standard prime brokerage arrangement - well-understood by regulators and structurally identical to prime brokerage arrangements across all other asset classes.

**Liquidity black holes:** Traditional energy markets experience periods of extreme volatility when professional market makers discretionarily withdraw their quotes - creating cascading price gaps and forced liquidations. The prime broker's contractual market-making obligation, enforced through the Prime Brokerage Agreement and monitored continuously by the Mandate Manager, does not permit discretionary withdrawal during stress events. The BSSZ corridor defines the maximum spread within which quotes must be posted - even during periods of elevated volatility.

---

**Block 04 - Liquidity & Prime Broker | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Dependencies:** Block 06A (Price Formation), Block 01 (Collateral)

**Next:** Block 02 - Participant Profiles
