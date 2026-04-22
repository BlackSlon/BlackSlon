# Block 02 - Participant Profiles

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Philosophy

The BlackSlon Protocol serves two fundamentally different classes of participant through the same infrastructure, under the same rules, with the same access. There is no declarative distinction between classes at the protocol level - no registration, no flag, no separate account type. The distinction exists in how participants use the protocol, not in how the protocol treats them.

The ISA identifies participant profile through onboarding and guides each class toward the decisions that naturally serve their objectives. A Volume Hedger who follows ISA guidance will choose 1:1 leverage, 100% BSR collateral, and a 24-month accumulation horizon - not because the protocol requires it, but because it is demonstrably optimal for their objective. A Price Seeker will choose higher leverage and shorter horizons for the same reason.

The protocol does not need to enforce these choices. It needs to make them obvious.

---

## Two Fundamental Classes

### Price Seekers

**Who they are:**
- Professional energy traders
- Corporate treasury desks managing fuel cost risk
- Financial institutions running energy books
- Individual investors seeking commodity exposure
- Quantitative and algorithmic trading desks
- Energy professionals with non-compete obligations seeking personal market access

**Primary objective:** Financial exposure to European energy prices - directional, hedging, or arbitrage - without the operational complexity of physical procurement.

**How they use the protocol:**
- Buy BS-P/G tokens when they expect prices to rise
- Sell BS-P/G tokens when they expect prices to fall
- Hold positions for days, weeks, or months
- Exit through secondary market (Order Book)
- Never interact with licensed retailers
- Never take physical delivery
- Collateral returns to vault when position closes

**Natural parameter choices:**
- Leverage: 1:2 to 1:4 (capital efficiency matters)
- Collateral: mix of BSR and eEURO (BSR for fee reduction, eEURO for margin efficiency)
- Horizon: days to months
- Exit: always through Order Book (Path 2)
- Fee tier: 0.20%-0.60% depending on BSR ratio

**Value to ecosystem:**
Price Seekers create liquidity. Their continuous buying and selling activity produces the price discovery that makes the BSSZ corridor meaningful and gives Volume Hedgers confidence that the price at which they lock their energy reflects a real market, not an administrative fiction. Without Price Seekers, the Order Book is thin and Volume Hedger execution quality deteriorates.

### Volume Hedgers

**Who they are:**
- Households wanting to eliminate energy price volatility
- SMEs with predictable monthly energy consumption
- Industrial facilities planning multi-year budgets
- Multi-site manufacturers managing cross-country exposure
- Commercial real estate operators with large energy bills
- Agricultural businesses with seasonal energy needs
- Any participant whose primary goal is price certainty over a defined forward horizon of 12 to 36 months

**Primary objective:** Certainty - of price and of supply volume - over a defined forward horizon of 12 to 36 months.

**How they use the protocol:**
- Accumulate BS-P/G tokens systematically over months
- Build average cost below current market price
- Sign supply agreement with licensed retailer
- Transfer tokens monthly as energy settlement
- Receive zero-euro energy invoices
- Collateral released proportionally each month as tokens are transferred

**Natural parameter choices:**
- Leverage: 1:1 (no leverage - position must not be liquidated before contract ends)
- Collateral: 100% BSR preferred (lowest fee over 24 months, burn appreciation, governance rights)
- Horizon: 12-36 months
- Exit: primarily through V2P (Path 3), secondary market available (Path 2) if plans change
- Fee tier: 0.20% (100% BSR - lowest available)

**Why 1:1 leverage protects Volume Hedgers without declarative lock:**
At 1:1 leverage with any collateral mix, the Health Factor formula produces:
H_user = Equity_total / (IM_total × 0.5)

At 1:1 leverage: IM = 100% of notional

For SIL to activate (H_user 1.00):
Equity must fall to 50% of IM

This requires token price to fall 50% AND BSR collateral to simultaneously lose significant value

BSSZ corridor constrains maximum daily token price move to ±20% (ceiling) and ±10% (floor) from Settlement Anchor

Under normal market conditions:
H_user at 1:1 leverage is mathematically protected from SIL activation

Extreme scenario (BSR crash):
Anti-Death-Spiral Lock activates
Freezes BSR valuation at T-24h price
Prevents collateral depreciation from triggering SIL during acute stress

No lock mechanism required. No declaration required. Mathematical protection through leverage choice.

**Value to ecosystem:**
Volume Hedgers provide long-duration, predictable demand that gives Price Seekers a structurally motivated counterparty base. They are natural long-term BSR holders - accumulating over months, not selling at every market move - which stabilises BSR price and creates a reliable governance base.

---

## The Three Paths - Available to Both Classes

Every BS-P and BS-G token carries three distinct paths to value realisation. No traditional energy instrument offers all three simultaneously.

### Path 1 - Hold.
Buy at today's forward-anchored price. Hold indefinitely. No expiry. No rollover. No delivery point. No margin calls beyond chosen collateral level. The token appreciates as physical energy prices rise. Natural choice for long-term investors and early-stage Volume Hedgers before a supply contract is activated.

### Path 2 - Sell.
Sell on the Protocol Order Book at the prevailing BSEI price. If energy prices rose since purchase - realise the profit. No counterparty negotiation. No early termination penalty. No delivery contract to unwind. Available 24/7/365. Natural choice for Price Seekers as primary exit and for Volume Hedgers if plans change before V2P activation.

### Path 3 - Redeem.
Transfer tokens to a licensed retailer integrated with the Protocol. The retailer delivers kilowatt-hours to the meter. Invoice shows zero for energy. The token is the payment - settled at the price locked when entering the market. Natural choice for Volume Hedgers as primary exit.

**Buy Energy Like Bitcoin. Hold It Like Gold. Use It Like Cash.**

---

## Five Objectives - Five Ways to Participate

### Objective 1 - Hedge Energy Costs
**Profile:** Volume Hedger - household, SME, industrial

The conventional energy supply relationship: retailer controls price, timing, and information. Customer receives a quote and accepts or walks away.

The BlackSlon inversion: the customer arrives at the retailer already holding tokens - energy value accumulated over months at prices they chose. They are not asking the retailer what energy costs. They are presenting a price they have already locked.

For markets where no integrated retailer is yet available, the virtual position still provides economic hedging. When local market prices rise, the BS-P or BS-G position appreciates proportionally - offsetting the higher cost paid to the incumbent supplier. The hedge works before V2P is active.

### Objective 2 - Invest in European Energy Prices
**Profile:** Price Seeker - investor, institutional

European energy is the base currency of the industrial economy. It drives inflation, determines industrial competitiveness, sets the cost floor for AI infrastructure, and anchors the value of carbon.

BS-P and BS-G tokens provide direct, perpetual exposure to European energy forward prices - no expiry, no roll cost, no forced closure, no delivery point. The structural backwardation discount embedded in every token through the ADR mechanism means investors access the same forward curve advantage as institutional energy desks - without exchange membership, bank guarantees, or six-month onboarding.

When the thesis plays out: sell on Order Book, hold indefinitely as a store of value, or redeem as physical energy to power operations.

### Objective 3 - Trade and Arbitrage
**Profile:** Price Seeker - professional trader, quant desk

For professional participants, the Protocol provides a perpetual, on-chain, eEURO-settled instrument with cross-hub correlation across every European benchmark.

**Available strategies from Day 1:**

**Cross-hub arbitrage:**
- TTF vs NBP, Phelix vs N2EX
- AI-calculated correlation matrices identify structural mispricings

**Time spread trading:**
- Cal+1 in backwardation vs spot in contango
- Without physical delivery obligations
- Without EFET framework agreements

**BSSZ boundary strategies:**
- Settlement Anchor mean-reversion
- Systematic opportunities at corridor edges

**Spark spread:**
- Simultaneous BS-G and BS-P positions
- Trade gas-to-power conversion margin
- Cross-market without cross-commodity clearing complexity

Every position is perpetual. Every settlement is in eEURO. Every exit is through the Order Book - no counterparty to negotiate with, no contract to unwind.

### Objective 4 - Manage Multi-Country Energy Exposure
**Profile:** Volume Hedger - multinational manufacturer, commercial real estate

A manufacturer with facilities across multiple European countries buys BS-P tokens for each site at today's forward-anchored price. When production plans change - a factory runs at reduced capacity, a market becomes uncompetitive, a site closes temporarily - unused tokens are sold on the Order Book.

- No delivery contracts to unwind
- No take-or-pay clauses to absorb
- No early termination penalties to pay

If energy prices rose since purchase:
- sale generates profit that offsets production cost increases elsewhere

BlackSlon AI generates a Production Cost Optimizer - showing where energy is cheapest relative to locked-in token prices, where to produce, where to reduce, where to reallocate. Energy procurement becomes a dynamic input to production planning, not a static annual contract.

### Objective 5 - Use as Means of Payment
**Profile:** Volume Hedger - household, SME

A household holding BS-P-DE tokens does not need to convert them to euros to pay an electricity bill. Through the Virtual-to-Physical Swap, the tokens are the payment.

**Monthly invoice:**
```
Energy commodity cost:    0.00 EUR
Distribution tariff:     45.00 EUR
Taxes and levies:        32.00 EUR
Monthly token instalment: 31.90 EUR
------------------------------------------------
TOTAL:                  108.90 EUR
```

**vs conventional invoice:**
```
Energy commodity cost:   180.00 EUR
Distribution tariff:      45.00 EUR
Taxes and levies:         32.00 EUR
------------------------------------------------
TOTAL:                   257.00 EUR
```

Distribution tariffs and taxes remain - these are regulated infrastructure costs no supplier can remove. But the energy cost - the largest and most volatile component - is settled in tokens the customer already owns, at a price they chose when they entered the market.

For businesses: energy cost becomes a balance sheet item, not an income statement surprise. Tokens purchased in Q1 at backwardation prices cover Q3 consumption at zero marginal commodity cost. Cash flow is known. Budget variance on energy is zero.

---

## The Accumulation Strategy - Natural Fit for Volume Hedgers

Every trader knows why averaging down on futures is dangerous. The contract expires. The margin call arrives at precisely the moment the position is most underwater. The broker changes the rules.

BlackSlon eliminates every structural reason why averaging down fails.

**No expiry.** A BS-P or BS-G token never expires. There is no settlement date forcing exit at an inopportune moment. If energy prices will be higher in three years - that belief can be held in token form for three years. The protocol will still be there. The position will still be there.

**Dual exit.** When profitable: sell on Order Book. When physical consumption preferred: transfer to licensed retailer. No other financial instrument offers both simultaneously.

**Nobody changes the rules.** Corridor parameters are governed by an immutable smart contract. No broker can reprice margin requirements overnight. No exchange can suspend trading in a position. The protocol is infrastructure - and infrastructure does not renegotiate.

**A fixed monthly allocation** - the same euro amount regardless of price - produces a cost basis that is structurally below the time-weighted average market price over any multi-year horizon. When prices are low, the allocation buys more tokens. When prices are high, fewer. The average cost is always below the average price.

The sovereign wealth funds of energy-producing states did not build generational wealth by trading futures. They built it by accumulating physical exposure and waiting. BS-P and BS-G tokens make that structural logic accessible to any participant - without a drilling licence, without a pipeline, and without a broker who can flip the table when the position is most valuable.

Energy will cost more in 2030 than it does today. The only question is whether you own that price difference before it happens or pay it after.

---

## ISA Guidance Per Profile

The ISA identifies participant profile through onboarding and calibrates its advisory and automation functions accordingly. The same protocol. Different guidance.

### ISA for Price Seekers

**ADVISORY:**
- Current BSEI vs Settlement Anchor spread
- BSSZ corridor position and distance to boundaries
- Cross-hub correlation matrices (TTF/NBP/PSV/Phelix)
- Open interest distribution by direction
- 72-hour BSEI trend and volume analysis
- Spark spread current value

**AUTOMATION RULES AVAILABLE:**
- Entry trigger: buy X tokens if BSEI drops Y%
- Exit trigger: close position if BSEI rises Z%
- Stop-loss: close if unrealised loss > W%
- Collateral rebalancing: maintain BSR ratio
- Health Factor maintenance: add collateral if H_user approaches Warning Zone

**LEVERAGE GUIDANCE:**
ISA presents all leverage options with plain-language risk explanation:
"At 1:4 leverage, your position closes automatically if BSEI falls 12.5% from your entry price. At 1:2 leverage, the threshold is 25%."

No recommendation - participant decides

### ISA for Volume Hedgers

**ADVISORY:**
- Current average accumulation cost vs today's BSEI (your hedge performance)
- Forward curve discount available (backwardation vs spot)
- Estimated annual saving vs current tariff
- Months to cover annual consumption at current accumulation pace
- Fee saving projection (100% BSR vs current collateral mix over contract term)
- Composability option: working capital available if tokens deposited in Aave/Morpho

**AUTOMATION RULES AVAILABLE:**
- DCA rule: buy X EUR of tokens every month
- Dip rule: buy additional Y tokens if BSEI drops Z% from last purchase price
- Collateral rebalancing: maintain BSR ratio within configured band
- Health Factor maintenance: transfer eEURO from reserve if H_user approaches Warning Zone (rare at 1:1 leverage)

**LEVERAGE GUIDANCE:**
ISA defaults to 1:1 recommendation with clear explanation:
"At 1:1 leverage, your position cannot be automatically closed under normal market conditions. Your energy price is locked for the full contract term."

Participant can override - but 1:1 is presented as the natural choice for supply contract hedging

---

## Participant Profile Summary

| | Price Seeker | Volume Hedger |
|---|---|---|
| **Primary objective** | Financial exposure | Price and supply certainty |
| **Typical horizon** | Days to months | 12-36 months |
| **Natural leverage** | 1:2 to 1:4 | 1:1 |
| **Natural collateral** | BSR + eEURO mix | 100% BSR |
| **Primary exit** | Order Book (Path 2) | V2P Retailer (Path 3) |
| **ISA automation** | Entry/exit triggers | DCA + dip rules |
| **Retailer interaction** | None | Central to strategy |
| **BSR holding horizon** | Short to medium | Long - 12-36 months |
| **Ecosystem role** | Creates liquidity | Creates stability |
| **SIL risk** | Real - managed by leverage choice | Minimal at 1:1 leverage |

---

**Block 02 - Participant Profiles | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Dependencies:** Block 01 (Collateral), Block 04 (Liquidity), Block 05 (Risk Engine)

**Next:** Block 06B - Protocol Infrastructure
