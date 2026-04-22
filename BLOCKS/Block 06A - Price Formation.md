# Block 06A - Price Formation

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Philosophy

Price formation in the BlackSlon Protocol is governed entirely by deterministic algorithms - mathematical functions that take defined inputs and produce defined outputs, reproducible by any participant independently, with no discretion, no learning, and no model risk.

These algorithms are not AI. They are mathematics - published in full as part of the BSSZ Protocol Rulebook, auditable by any participant with access to public exchange data, and immutable except through governance with defined notice periods and voting thresholds.

The separation between deterministic price formation and AI-governed risk intelligence is the most important architectural principle of the Protocol. Price formation must be independently verifiable. Risk response must be intelligent. These requirements are incompatible within a single system - and the Protocol does not attempt to unify them.

**Scope of this block:** Physical Meridian, ADR mechanism, Settlement Anchor, BSSZ corridor, BSEI benchmark. Smart contract deployment, oracle infrastructure, and BSR burn mechanism are covered in Block 06B.

---

## The Five Deterministic Engines

```
PHYSICAL MERIDIAN ENGINE
reads: physical hub prices (TTF, Phelix, NBP, PSV)
produces: Physical Meridian value (â) per market
frequency: once per business day
        |
        V
ADR ENGINE
reads: Physical Meridian + protocol calendar
produces: weighted aggregation adjustments
          during contract transition periods
frequency: daily (FM), weekly (FQ, Cal)
        |
        V
SETTLEMENT ANCHOR CALCULATOR
reads: last 3 business days Physical Meridian
produces: Settlement Anchor (A) per market
frequency: once per business day
        |
        V
BSSZ CALCULATOR
reads: Settlement Anchor
produces: Floor = A × 0.90, Ceiling = A × 1.20
frequency: once per business day
        |
        V
MATCHING ENGINE ENFORCEMENT
reads: BSSZ Floor and Ceiling
enforces: hard corridor constraint on all orders
frequency: every order submission

BSEI ENGINE (independent - reads order book only)
reads: executed Order Book transactions
produces: rolling 72h VWAP benchmark
frequency: after every trade, min every 60 seconds
```

No engine receives inputs from any AI module. No engine can be influenced by participant activity on the Order Book - except the BSEI Engine, which reads only executed transactions, not open orders.

---

## Engine 1 - The Physical Meridian

### Purpose
The Physical Meridian (â) is the external reality anchor of the Protocol. It reads regulated European energy hub prices and synthesises them into a single weighted reference value per active BlackSlon market. It is the only point at which external market data enters the Protocol's price formation system.

### Hub Price Sources
Each active BlackSlon market reads from its designated primary hub:

| Token Market | Primary Hub | Exchange |
|-------------|-------------|----------|
| BS-G-NL | TTF | ICE Futures Europe |
| BS-G-DE | THE / NCG | EEX |
| BS-G-UK | NBP | ICE Futures Europe |
| BS-G-PL | TGE Gas | TGE |
| BS-P-DE | Phelix DE | EEX |
| BS-P-UK | N2EX | ICE Futures Europe |
| BS-P-PL | TGE Power | TGE |
| BS-P-NO | Nordpool System Price | Nasdaq Commodities |
| BS-P-IT | PUN | GME |
| BS-P-FR | EPEX FR | EPEX SPOT |

Oracle network: Minimum 3 independent data providers per market. Outlier detection: any price deviating more than 15% from the median across providers triggers automatic exclusion and manual review. Last valid price carry-forward applies until consensus is restored.

### The Four-Segment Weighted Aggregation

â = (W_Spot × P_Spot) + (W_FM × P_FM) + (W_FQ × P_FQ) + (W_Cal × P_Cal)

| Segment | Weight | Price Source | Logic |
|---------|--------|--------------|-------|
| Spot / Day-Ahead | 10% | Day-Ahead auction settlement | Captures real-time stress without being dominated by it |
| Front Month (FM) | 40% | Current FM settlement price | Primary liquidity driver - near-term market consensus |
| Front Quarter (FQ) | 25% | Current FQ settlement price | Captures seasonal trends - smooths FM noise |
| Calendar Year (Cal) | 25% | Cal+1 settlement price (or Cal+2 during ADR) | Long-term structural stability - forward curve anchor |

Key design insight: Spot and Front Month combined carry 50% - ensuring the Physical Meridian captures real market stress. Front Quarter and Calendar Year carry the remaining 50% - acting as structural dampener. This inertia is a feature, not a limitation. A single geopolitical event moves the Meridian significantly but not catastrophically. A sustained trend moves it fully.

Calculation frequency: Once per business day, following publication of Day-Ahead auction results (typically 13:00 CET). Published on-chain by Protocol oracle node within 30 minutes of source data availability. Cryptographic signature links every oracle write to the source data hash - providing immutable proof of input.

Weekend and holiday carry-forward: FM, FQ, Cal components use last valid business day settlement price. Day-Ahead component updates from weekend Day-Ahead auction results where available (EPEX publishes Saturday and Sunday prices). If no Day-Ahead auction occurs, last valid price carries forward.

Protocol constants: All four weights are enforced at smart contract level on Arbitrum. They can only be changed through governance with minimum 30-day notice period and 67% supermajority vote.

---

## Engine 2 - The ADR Mechanism

### Purpose
The Asymptotic Daily Rebalancing Engine prevents "price cliffs" - discontinuous price gaps that occur when energy contracts expire and the Physical Meridian must suddenly reference a different contract. Without ADR, the Protocol would experience sharp artificial jumps in the Settlement Anchor at every contract roll - unrelated to actual market conditions.

ADR executes smooth, predetermined weight migration from expiring contracts to incoming ones across three independent schedules operating simultaneously.

### Schedule 1 - Business Day ADR (Front Month)
Activation: Final 10-12 business days of each calendar month.
Logic: During the transition window, the Front Month weight is progressively migrated from the expiring FM contract to the incoming M2 contract. Each business day shifts an equal fraction of the total FM weight.

Let D_remaining = business days remaining in transition window.
Let D_window = total business days in transition window (10 or 12 - governance-set).

W_FM_expiring = W_FM × (D_remaining / D_window)
W_FM_incoming = W_FM × (1 - D_remaining / D_window)

Outside transition window: W_FM_expiring = 40%, W_FM_incoming = 0%.

Example: With a 10-day window, on day 3 of transition:
W_FM_expiring = 40% × (7/10) = 28%
W_FM_incoming = 40% × (3/10) = 12%

### Schedule 2 - Weekly ADR (Front Quarter)
Activation: Months 2 and 3 of each quarter. Executes every Friday.
Logic: During months 2 and 3, the Front Quarter weight migrates weekly from the current FQ to Q2.

Let F_elapsed = Fridays elapsed since month 2 began.
Let F_total = total Fridays in months 2 and 3 combined (typically 8-9).

W_FQ_current = W_FQ × (1 - F_elapsed / F_total)
W_Q2 = W_FQ × (F_elapsed / F_total)

Month 1: W_FQ_current = 25%, W_Q2 = 0% - no migration active.

### Schedule 3 - Dormant ADR (Calendar Year)
Activation: July 1st annually through December 31st. Executes every Friday.
Logic: From July 1st, the Calendar Year weight begins migrating from Cal+1 to Cal+2 in equal weekly increments.

Let F_since_july = Fridays elapsed since July 1st.
Let F_year_end = total Fridays from July 1st to December 31st (typically 26).

W_Cal1 = W_Cal × (1 - F_since_july / F_year_end)
W_Cal2 = W_Cal × (F_since_july / F_year_end)

January 1 - June 30: W_Cal1 = 25%, W_Cal2 = 0% - Dormant ADR inactive.

### The backwardation harvest
Dormant ADR is the mechanism through which the Protocol continuously rolls into the cheapest part of the forward curve. European energy markets are structurally in backwardation - Cal+2 trades below Cal+1 which trades below spot. By migrating toward Cal+2 every Friday from July, the Protocol mechanically accumulates the structural discount that institutional players spend millions in capital and legal overhead to access manually. Every token holder benefits from this harvest - regardless of position size.

ADR schedule pre-computation: All three ADR schedules are fully deterministic from the Protocol calendar. Any participant can independently calculate the exact weight distribution for any future date. There is no discretion, no estimation, and no surprise.

---

## Engine 3 - The Settlement Anchor Calculator

### Purpose
The Settlement Anchor (A) is the reference point from which the BSSZ corridor is calculated. It applies a three-day recursive filter to the Physical Meridian - smoothing out single-session anomalies while remaining responsive to genuine multi-day trends.

### Formula
A_Today = (0.50 × â_T-1) + (0.25 × â_T-2) + (0.25 × â_T-3)

Where:

- A_Today = Settlement Anchor for current business day
- â_T-1 = Physical Meridian from previous business day
- â_T-2 = Physical Meridian from two business days prior
- â_T-3 = Physical Meridian from three business days prior

Weekend carry-forward: If any of T-1, T-2, T-3 falls on a non-business day, the most recent available business day Physical Meridian is used for that slot.

Genesis initialisation: At Protocol launch, A_Day1 = â_Day1. The recursive filter reaches full three-day depth after 3 business days of operation.

Publication: Settlement Anchor written on-chain within 30 minutes of Physical Meridian publication. The Settlement Anchor is the sole input to the BSSZ Calculator.

### What the Filter Does
The 50/25/25 weighting means the most recent Physical Meridian carries dominant influence - the Anchor is primarily today's reality, with diminishing weight given to the two preceding days.

**SINGLE SESSION ANOMALY** (e.g. Iran 2026 Day 9 crash -19.5%):
Day T-3: Physical Meridian = 65.00 EUR/MWh
Day T-2: Physical Meridian = 68.00 EUR/MWh
Day T-1: Physical Meridian = 68.63 EUR/MWh (peak)
Day T:   Physical Meridian = 55.30 EUR/MWh (crash day)

Settlement Anchor on crash day:
A = (0.50 × 68.63) + (0.25 × 68.00) + (0.25 × 65.00)
A = 34.315 + 17.00 + 16.25
A = 67.565 EUR/MWh

The Anchor barely moves on crash day.
BSSZ Floor = 67.565 × 0.90 = 60.81 EUR/MWh
BSSZ Ceiling = 67.565 × 1.20 = 81.08 EUR/MWh
The -19.5% crash is not transmitted into the corridor.

**GENUINE MULTI-DAY TREND** (sustained decline):
After 5 consecutive days of -5% Physical Meridian:
The Anchor follows gradually - the decline is captured
but smoothed, not transmitted instantaneously.

---

## Engine 4 - The BSSZ Calculator

### Purpose
The BlackSlon Settlement Zone defines the hard boundaries within which all trading, matching, and settlement occurs. It is the structural mechanism that ensures virtual token prices can never decouple from physical market reality - not through regulatory mandate, but through mathematical constraint enforced at the smart contract level.

### Formula
BSSZ_Floor = A × 0.90
BSSZ_Ceiling = A × 1.20
BSSZ_Range = [A × 0.90, A × 1.20]

### Asymmetry rationale
The ceiling is wider than the floor by design. European energy prices spike upward far more violently than they collapse - driven by supply shocks, geopolitical events, and infrastructure failures that remove supply instantaneously. The wider ceiling accommodates genuine directional moves. The tighter floor protects long-term token holders from irrational single-session collapses that the physical market corrects within days.

This is not a price cap. The BSSZ bears no resemblance to the artificial 180/MWh ceiling imposed by the European Commission in 2022. The BSSZ ceiling moves with the Settlement Anchor - it is always relative to current physical reality, never an administrative absolute.

### Enforcement
BSSZ Floor and Ceiling are published on-chain on Arbitrum immediately following Settlement Anchor calculation. The matching engine reads these values before processing any order.

```
Order submission received:
  IF order.limit_price < BSSZ_Floor:
    REJECT - error code: BELOW_CORRIDOR
    No queue. No partial fill. Immediate rejection.

  IF order.limit_price > BSSZ_Ceiling:
    REJECT - error code: ABOVE_CORRIDOR
    No queue. No partial fill. Immediate rejection.

  IF BSSZ_Floor <= order.limit_price <= BSSZ_Ceiling:
    ACCEPT - proceed to order book
```

Intraday stability: BSSZ does not update intraday. A single corridor applies from 00:00 CET to 23:59 CET each business day. Participants trading at any hour face the same boundaries. This eliminates intraday corridor manipulation attempts.

Market isolation: Each active BlackSlon market maintains an independent Physical Meridian, Settlement Anchor, and BSSZ. BS-G-NL and BS-P-DE corridors are calculated independently. Cross-market correlations are informational - they do not mechanically link corridors.

### Iran 2026 Validation
TTF Physical Meridian over 9 trading days:
Day 1 (Feb 27): 31.96 EUR/MWh (start)
Day 4 (Mar 4):  45.20 EUR/MWh
Day 7 (Mar 7):  58.40 EUR/MWh
Day 8 (Mar 8):  65.10 EUR/MWh
Day 9 (Mar 9):  68.63 EUR/MWh (peak)
Day 9 crash:    55.30 EUR/MWh (-19.5% intraday)

BlackSlon Settlement Anchor over same period:
Day 1: 31.96 (genesis)
Day 4: 37.20 (+16.4%)
Day 7: 49.80 (+35.8% from Day 1)
Day 8: 54.60 (+5.7% single day - within corridor)
Day 9: 58.90 (+7.9% from Day 8 - within ceiling)
Crash day Anchor: 60.20 (barely moves - filter absorbs)

Result:
Total trend captured: +88% over 9 days (vs +114.8% raw)
Maximum single-day Anchor move: +7.9%
Crash day transmission: near zero
BSSZ corridor never exceeded by legitimate market move

---

## Engine 5 - The BSEI Engine

### Purpose
The BlackSlon Energy Settlement Index is the transaction-derived benchmark of the Protocol - computed exclusively from executed BS-P/G trades on the Open Order Book. It is categorically different from the Physical Meridian: it reads internal Protocol activity, not external market data.

The BSEI serves three functions:

1. Mark-to-Market reference for all open positions
2. Input to H_user Health Factor calculations
3. Basis for margin requirements across all markets

### Segmented R-VWAP Formula
BSEI_t = 0.50 · VWAP_[0-24h] + 0.25 · VWAP_[24-48h] + 0.25 · VWAP_[48-72h]

Where each segment VWAP:
VWAP_[segment] = (P_i × V_i) / V_i

Where P_i = execution price of trade i, V_i = volume in kWh-equivalent.

Segment boundaries: Rolling 24-hour windows from current timestamp t:

- Segment [0-24h]: trades executed between t-24h and t
- Segment [24-48h]: trades between t-48h and t-24h
- Segment [48-72h]: trades between t-72h and t-48h

Update frequency: Recalculated after every executed trade. Published on-chain every 60 seconds and immediately after every trade execution.

Eligible trades: Only trades executed within the active BSSZ corridor at time of execution. Cancelled orders, rejected orders, and any transaction outside the corridor are excluded. Minimum trade size: 1 token (100 kWh) - dust transactions excluded to prevent micro-trade manipulation.

### Stale Price Guard
```
IF Volume([0-24h]) = 0:
    VWAP[0-24h] = VWAP[24-48h]

IF Volume([24-48h]) = 0:
    VWAP[24-48h] = VWAP[48-72h]

IF all three segments empty:
    BSEI_t = BSEI_(t-1)
    (carry forward last valid BSEI)
```

### Manipulation Resistance
To manipulate the BSEI, a single actor must dominate executed trading volume across three consecutive 24-hour periods simultaneously. The 72-hour window means:

- Day 1 manipulation: affects 50% of BSEI
- Day 2 manipulation: affects 50% × 25% = cumulative
- Day 3 manipulation: affects 50% × 25% × 25% = diminishing

Cost of sustained manipulation:
- Must trade against own positions at artificial prices for 72 hours continuously
- Cost scales with market depth (Prime Broker providing liquidity means manipulator must absorb real volume)
- Economic cost exceeds any realistic gain

### BSEI vs BSSZ - Key Distinction
**BSSZ:**
- Input:   Physical hub prices (external)
- Purpose: Defines where prices CAN move
- Update:  Once per business day
- Nature:  Hard constraint - orders outside rejected

**BSEI:**
- Input:   Executed Order Book trades (internal)
- Purpose: Defines where prices HAVE moved
- Update:  Continuous - after every trade
- Nature:  Reference benchmark - not a constraint

The BSSZ constrains the space within which the BSEI can exist. The BSEI discovers the actual price within that space. They are complementary - not competing.

---

## The Complete Price Formation Flow

```
EXTERNAL WORLD
Physical hub settlement prices
(TTF, Phelix, NBP, PSV, expanding)
              |
              V
PHYSICAL MERIDIAN ENGINE
4-segment weighted aggregation
Published on-chain: once per business day
              |
              V
ADR ENGINE
Contract transition adjustments
(Business Day / Weekly / Dormant schedules)
Applied continuously to Physical Meridian weights
              |
              V
SETTLEMENT ANCHOR CALCULATOR
3-day recursive filter
A = 0.50×â[T-1] + 0.25×â[T-2] + 0.25×â[T-3]
Published on-chain: once per business day
              |
              V
BSSZ CALCULATOR
Floor = A × 0.90
Ceiling = A × 1.20
Published on-chain: once per business day
              |
              V
MATCHING ENGINE
Hard corridor enforcement
All orders validated against BSSZ before acceptance
              |
              V
ORDER BOOK ACTIVITY
Participant buy/sell within BSSZ corridor
Price discovery through supply and demand
              |
              V
BSEI ENGINE (parallel, independent)
72-hour Segmented R-VWAP
Published on-chain: after every trade
              |
              V
MARK-TO-MARKET
All open positions valued at current BSEI
H_user calculations updated continuously
```

---

## Protocol Constants - Price Formation

| Constant | Value | Governance Changeable |
|----------|-------|----------------------|
| W_Spot | 10% | Yes - 67% supermajority, 30-day notice |
| W_FM | 40% | Yes - 67% supermajority, 30-day notice |
| W_FQ | 25% | Yes - 67% supermajority, 30-day notice |
| W_Cal | 25% | Yes - 67% supermajority, 30-day notice |
| FM ADR window | 10-12 business days | Yes - simple majority |
| FQ ADR activation | Month 2 of quarter | No - immutable |
| Cal ADR start date | July 1st annually | No - immutable |
| Cal ADR end date | December 31st | No - immutable |
| Settlement Anchor weight T-1 | 50% | No - immutable |
| Settlement Anchor weight T-2 | 25% | No - immutable |
| Settlement Anchor weight T-3 | 25% | No - immutable |
| BSSZ Floor multiplier | 0.90 | Yes - 67% supermajority, 60-day notice |
| BSSZ Ceiling multiplier | 1.20 | Yes - 67% supermajority, 60-day notice |
| BSEI segment weights | 50/25/25 | No - immutable |
| BSEI window | 72 hours | No - immutable |
| BSEI minimum trade | 1 token (100 kWh) | Yes - simple majority |
| Oracle outlier threshold | 15% from median | Yes - simple majority |
| Oracle minimum providers | 3 per market | No - immutable |

---

**Block 06A - Price Formation | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Dependencies:** None - this is a foundation block

**Next:** Block 06B - Protocol Infrastructure (smart contracts, oracle nodes, BSR burn, Arbitrum deployment)
