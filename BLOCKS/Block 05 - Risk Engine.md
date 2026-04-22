# Block 05 - Risk Engine

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Philosophy

Traditional clearing systems treat liquidation as a binary event - positions are closed in full, at unfavourable prices, with no regard for capital preservation. Statistical data from retail trading platforms consistently shows that 70-80% of participants lose capital - not because their market view was wrong, but because intraday volatility forces liquidation before the thesis plays out. A correct thesis, liquidated too early, is indistinguishable from a wrong one.

BlackSlon rejects this architecture entirely. The risk framework operates on a different principle: proportional, surgical response designed to preserve as much of a participant's position as possible while maintaining the Protocol's solvency obligations.

Two independent risk engines operate simultaneously - one at participant level, one at protocol level. They share no data except aggregate statistics. They have no authority over each other. They serve different objectives.

---

## Key Design Decisions

### Decision 1 - No h_BSR haircut.
BSR collateral is valued at current market price in all H_user and H_solv calculations without haircut adjustment. The Anti-Death-Spiral Lock provides protection against rapid BSR depreciation - a separate, targeted mechanism that activates only when needed. A permanent haircut would penalise long-term BSR holders during normal market conditions for a risk that only materialises in extreme scenarios.

### Decision 2 - Five H_solv Tiers.
Five tiers provide earlier warning signals and more granular automated responses than four. The Protocol can respond proportionally before stress becomes crisis.

### Decision 3 - No "minimum eEURO collateral" requirement in stress tiers.
Requiring minimum eEURO collateral in Tier III/IV is a declarative mechanism that creates gaming vectors and contradicts the principle that collateral mix is the participant's own decision. Instead: Tier III suspends new position openings entirely. Tier IV activates Reduce-Only. Tier V activates full stop. Clean, non-declarative, non-gameable.

### Decision 4 - H_solv and H_user are architecturally separated.
H_solv receives only aggregate data from H_user - never individual participant identities or individual position details. H_user receives no data from H_solv beyond the current Tier status published on-chain.

---

## Engine 1 - H_user: User Health Monitor

### Purpose
H_user calculates, monitors, and acts upon the Health Factor of every individual participant position in real time. It is architecturally distinct from the ISA because it must sometimes act against the participant's immediate preference - reducing positions the participant would prefer to keep - in order to protect both the participant's remaining capital and the Protocol's collateral integrity.

The ISA cannot delay or override any H_user response. H_user operates independently of participant instruction once the Intervention Zone is breached.

### Total Equity Formula
Equity_total = (Q_eEURO + Q_BSR × P_BSR) + PnL_unrealised

Where:

- Q_eEURO = eEURO balance in vault
- Q_BSR = BSR balance in vault
- P_BSR = current BSR market price (no haircut applied)
- PnL_unrealised = unrealised PnL on open positions

For BUY positions: PnL = (BSEI_current - P_entry) × V
For SELL positions: PnL = (P_entry - BSEI_current) × V

Where V = volume in tokens of position.

### Health Factor Formula
H_user = Equity_total / (IM_total × 0.5)

Where:

- IM_total = sum of Initial Margins for all positions
- 0.5 = stop-out threshold constant (immutable)

Calculation frequency: After every BSEI update (minimum every 60 seconds) and after every vault or position change.

### Health Zones and Automated Responses

| Zone | H_user | Protocol Response |
|------|--------|-------------------|
| SAFE | > 1.10 | Full operational access. No restrictions. |
| WARNING | 1.05-1.10 | Notification sent to ISA for delivery to participant. No automatic action. Participant has time to respond. |
| RESTRICTED | 1.00-1.05 | Position Lock activates. Existing positions remain active. Account restricted to Reduce-Only or Collateral-Add actions. No new positions. |
| INTERVENTION | 1.00 | Smart Incremental Liquidation activates automatically without participant consent. |

### Smart Incremental Liquidation - SIL
SIL is the mechanism that replaces catastrophic forced closure with surgical, proportional position reduction.

**Activation trigger:** H_user 1.00

**Recovery target:** H_user 1.00 + 0.02

**Algorithm:**
```
FUNCTION SmartIncrementalLiquidation(account):

  LOOP:
    positions = GetOpenPositions(account)

    // Build candidate list
    candidates = []
    FOR EACH position j IN positions:
      h_after = SimulateHealthFactor(account, j, reduction=0.10)
      loss = SimulateLoss(position j, reduction=0.10)
      candidates.append({position: j,
                         h_after: h_after,
                         loss: loss})

    // Sort by loss impact ascending
    // smallest loss first - always
    candidates.sort(by=loss, ascending=True)

    // Find minimum sufficient reduction
    FOR EACH candidate IN candidates:
      IF candidate.h_after >= 1.00 + epsilon:
        ExecutePartialClose(candidate.position, 0.10)
        SettleLoss_50_50(account, candidate.loss)
        RETURN  // Health restored - stop

    // No single 10% cut sufficient
    // Execute smallest loss candidate and re-evaluate
    best = candidates[0]
    ExecutePartialClose(best.position, 0.10)
    SettleLoss_50_50(account, best.loss)

    IF no positions remain:
      BREAK

FUNCTION SettleLoss_50_50(account, loss_amount):
  bsr_deduction = (loss_amount * 0.50) / P_BSR_current
  euroe_deduction = loss_amount * 0.50
  account.bsr_balance -= bsr_deduction
  account.euroe_balance -= euroe_deduction
  Vault.eEURO += euroe_deduction
  Vault.BSR += bsr_deduction
  // Transferred to Vault - not sold on market
  // Prevents cascading price impact
```

**Key properties of SIL:**
- Always closes the least costly position first
- Always in 10% increments - never more than necessary
- Stops immediately when Health Factor is restored
- Losses settled 50% eEURO / 50% BSR - maintains collateral profile
- Seized collateral transferred to Vault - never sold on open market during liquidation event
- Never closes the largest or worst-performing position indiscriminately

### H_user Reporting to H_solv
H_user reports aggregate data to H_solv at defined intervals. No individual participant data is ever transmitted to H_solv.

**Reported every 60 seconds:**
- Distribution of accounts across Health Zones (count only - no identities)
- Aggregate Initial Margin in Intervention Zone
- Projected SIL volume required to restore Intervention Zone accounts
- Aggregate unrealised PnL across all positions by market and direction
- Aggregate eEURO and BSR in all vaults (totals only)

---

## Engine 2 - H_solv: Protocol Solvency Monitor

### Purpose
H_solv monitors the aggregate capital adequacy of the entire Protocol continuously. It answers one question at all times: can the Protocol honour every outstanding obligation to every participant simultaneously?

H_solv is the highest authority in the Protocol's AI architecture. Its Tier responses override all other AI modules and all participant-level activity. No module and no participant can override or delay H_solv's systemic responses.

### H_solv Core Formula
H_solv_CORE = (V_eEURO + BSR-SR_balance) / (|PnL_ITM| + IM_total + Reserve_Op)

**Numerator:**
- V_eEURO = total eEURO in Protocol Vault including:
  - User eEURO collateral deposits
  - Liquidation proceeds (eEURO component)
  - 85% of accumulated trading fees
  - V2P redemption fees
  - Settlement payments received from prime broker

- BSR-SR_balance = BSR Stability Reserve balance funded by 15% of all trading fees. Three tranches - T1 (Tier III deployment), T2 (Tier IV deployment), T3 (Tier V deployment).

**Denominator:**
- |PnL_ITM| = aggregate unrealised profit across all open positions currently in profit - what the Protocol owes participants if they close now simultaneously.
- IM_total = sum of all Initial Margins locked across all open positions system-wide.
- Reserve_Op = Operational Reserve Requirement - governance-set, covers oracle feeds, matching engine infrastructure, regulatory reporting, audit fees. Reviewed quarterly.

### H_solv System Formula
H_solv_SYSTEM = (V_eEURO + BSR-SR + Collateral_PB) / (|PnL_ITM| + IM_total + NIM_PB + Reserve_Op)

Where Collateral_PB = collateral posted by prime broker per Prime Brokerage Agreement and NIM_PB = prime broker's Net Imbalance Margin obligations to Protocol.

Both H_solv_CORE and H_solv_SYSTEM published on-chain continuously on Arbitrum.

### The Five Tiers

| Tier | H_solv_CORE | Name | Automated Response |
|------|-------------|------|-------------------|
| I | > 1.15 | Expansion | Full operations. Burn mechanism active. Maximum leverage available. No restrictions. |
| II | 1.10-1.15 | Equilibrium | Standard operations. Enhanced H_solv monitoring frequency. Prime Broker Mandate Manager on alert. |
| III | 1.05-1.10 | Mitigation | New position openings suspended. Existing positions unaffected. BSR-SR T1 prepared. Prime broker alerted to potential hedge adjustment. |
| IV | 1.00-1.05 | Alert | Reduce-Only mode for all accounts. BSR-SR T2 deployed. Prime broker hedge reviewed. Governance layer notified. |
| V | < 1.00 | Safeguard | Full hard stop on all new activity. BSR-SR T3 deployed. Anti-Death-Spiral Lock engaged if P_BSR -10% simultaneously. Governance emergency vote within 24 hours. |

**Tier transition logic:**
- Tier determined by H_solv_CORE value
- Recalculated after every vault transaction and every BSEI update (minimum every 60 seconds)

**Downgrade (e.g. Tier I Tier II):**
- Automated responses activate immediately
- No delay, no human approval required

**Upgrade (e.g. Tier III Tier II):**
- 30-minute confirmation window required
- H_solv must remain above threshold for 30 minutes before restrictions are lifted
- Prevents oscillation around tier boundary

### BSR Stability Reserve - Three Tranches

**TRANCHE T1 (Tier III deployment):**
- Size: 40% of total BSR-SR balance
- Trigger: H_solv_CORE enters Tier III
- Use: Vault liquidity buffer, covers operational costs without touching participant collateral

**TRANCHE T2 (Tier IV deployment):**
- Size: 35% of total BSR-SR balance
- Trigger: H_solv_CORE enters Tier IV
- Use: Active solvency support, covers ITM obligations shortfall

**TRANCHE T3 (Tier V deployment):**
- Size: 25% of total BSR-SR balance
- Trigger: H_solv_CORE enters Tier V
- Use: Emergency solvency backstop, last line before governance intervention

### Anti-Death-Spiral Lock
**Trigger conditions - both must be met simultaneously:**
- Condition 1: H_solv_CORE < 1.00 (Tier V)
- Condition 2: P_BSR -10% within any 24-hour period

**Effect:**
- BSR collateral frozen at T-24h price for all H_user and H_solv calculations
- SIL cannot use BSR depreciation as trigger for further liquidations
- Maximum lock duration: 48 hours
- Early release: if H_user average > 1.10 across all accounts for 60 consecutive minutes

**Purpose:** Prevents the reflexivity cascade where falling BSR price reduces collateral values triggers H_user liquidations liquidated BSR sold into market further BSR price decline more liquidations. The lock breaks this feedback loop by decoupling BSR market price from collateral valuation during the acute stress period.

### NAV Buyback
When P_BSR_market < P_BSR_formula:

Protocol may deploy Vault surplus to repurchase BSR from Order Book at market price and burn it

**Conditions:**
- H_solv must be in Tier I (surplus confirmed)
- Market price must be below formula NAV
- Buyback never executes above formula NAV
- Maximum per-session buyback: 5% of circulating supply
- Governance approval required above this threshold

**Effect:**
- Reduces circulating supply
- Supports market price toward NAV
- Prevents sustained disconnection between market price and Protocol backing

---

## The Authority Hierarchy

```
LAYER ZERO - DETERMINISTIC (no AI)
Physical Meridian · ADR · Settlement Anchor
BSSZ · BSEI
Cannot be influenced by any AI module
        | feeds into
LAYER ONE - PROTOCOL AI

        H_solv  <--------------------------
        HIGHEST AUTHORITY               |
        Tier responses override all     |
              | constrains              |
    |             |
    |    H_user           |  aggregate  |
    |    per-participant  |  data only  |
    |    Health Factor    |------------>|
    |    SIL execution    |
    |             |
              | alerts only
              read-only interface
LAYER TWO - PARTICIPANT INTELLIGENCE
        ISA
        Advisory + automation rules
        Cannot influence Layer One
        Cannot override H_user
```

---

## On-Chain Transparency

All risk engine outputs published on Arbitrum continuously:

**After every BSEI update (min every 60 seconds):**
- H_solv_CORE current value
- H_solv_SYSTEM current value
- H_solv Tier (I through V)
- Aggregate ITM exposure (total)
- Total Initial Margin locked (total)
- Protocol Vault eEURO balance
- BSR Stability Reserve balance (total + per tranche)
- Anti-Death-Spiral Lock status (active/inactive)

**After every burn event:**
- BSR burned (amount + timestamp)
- Circulating supply post-burn
- Vault surplus at time of burn

**Never published on-chain:**
- Individual participant Health Factors
- Individual position details
- Prime broker position breakdown

Any participant can independently verify the Protocol's solvency without requiring any disclosure from BlackSlon. The guarantee is mathematical and public.

---

## Protocol Constants - Risk Engine

| Constant | Value | Governance Changeable |
|----------|-------|----------------------|
| H_user stop-out constant | 0.5 | No - immutable |
| H_user Safe Zone lower bound | > 1.10 | No - immutable |
| H_user Warning Zone | 1.05-1.10 | No - immutable |
| H_user Restricted Zone | 1.00-1.05 | No - immutable |
| H_user Intervention threshold | 1.00 | No - immutable |
| SIL step size | 10% per iteration | No - immutable |
| SIL recovery epsilon | 0.02 | Yes - simple majority |
| SIL loss settlement | 50/50 eEURO/BSR | No - immutable |
| H_solv Tier I threshold | > 1.15 | Yes - 67% supermajority |
| H_solv Tier II threshold | 1.10-1.15 | Yes - 67% supermajority |
| H_solv Tier III threshold | 1.05-1.10 | Yes - 67% supermajority |
| H_solv Tier IV threshold | 1.00-1.05 | Yes - 67% supermajority |
| H_solv Tier V threshold | < 1.00 | No - immutable |
| Tier upgrade confirmation window | 30 minutes | Yes - simple majority |
| BSR-SR T1 allocation | 40% of BSR-SR | Yes - simple majority |
| BSR-SR T2 allocation | 35% of BSR-SR | Yes - simple majority |
| BSR-SR T3 allocation | 25% of BSR-SR | Yes - simple majority |
| ADS Lock trigger | P_BSR -10% in 24h | Yes - 67% supermajority |
| ADS Lock maximum duration | 48 hours | Yes - simple majority |
| ADS Lock early release threshold | H_user avg > 1.10 for 60 min | Yes - simple majority |
| NAV Buyback max per session | 5% circulating supply | Yes - simple majority |
| BSR haircut | None | No - immutable |
| h_BSR adjustment | Not applicable | Removed - see Decision 1 |

---

**Block 05 - Risk Engine | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Dependencies:** Block 01 (Collateral), Block 06A (Price Formation)

**Next:** Block 02 - Participant Profiles
