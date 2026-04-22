# The Retailer Economics & Composability Model

> **A worked example using TTF natural gas, 24-month supply contract, 100 MWh/month**

---

## Market Assumptions

The following forward curve reflects a typical European gas market in structural backwardation - a condition that has characterised TTF for the majority of the past decade outside of acute supply shock episodes.

| Tenor | TTF Price |
|-------|-----------|
| Spot | 45 EUR/MWh |
| Cal+1 (1Y forward) | 42 EUR/MWh |
| Cal+2 (2Y forward) | 38 EUR/MWh |
| Cal+3 (3Y forward) | 35 EUR/MWh |

**BSEI at contract inception:** 38 EUR/MWh (Cal+2 TTF).  
**Backwardation:** approximately 15% per year - spot to Cal+2.

---

## Contract Parameters

| Parameter | Value |
|-----------|-------|
| Monthly volume | 100 MWh |
| Contract duration | 24 months |
| Total volume | 2,400 MWh |
| Total contract value at BSEI | 91,200 EUR |
| Client collateral (25% in BSR) | 22,800 EUR |
| Client upfront cash payment | 0 EUR |
| Retailer hedge instrument | Cal+2 TTF forward @ 38 EUR/MWh |
| Protocol trading fee (100% BSR) | 0.20% per transaction |

The critical design point: **the client pays nothing upfront in cash** - exactly as in any standard energy supply agreement. The collateral is posted in BSR, which itself becomes productive through the composability layer.

---

## Day Zero: Contract Inception

### What the client does:

1. **Deposits 22,800 EUR worth of BSR** into the BlackSlon Reserve Vault
2. **Protocol issues 2,400 BS-G tokens** at BSEI price of 38 EUR/MWh
3. **Tokens sit in client's wallet**, fully owned, freely composable
4. **Client deposits all 2,400 BS-G tokens** into a DeFi lending protocol (Aave) as collateral
5. **At 70% LTV, client borrows 63,840 EUR in EURC** against those tokens

#### Client's Day Zero balance sheet:

| Item | Value |
|------|-------|
| BSR deposited as collateral | -22,800 EUR |
| EURC borrowed from Aave | +63,840 EUR |
| Net liquidity position | +41,040 EUR |
| BS-G tokens (locked in Aave) | 2,400 tokens @ 38 EUR |
| Energy price hedged for 24 months | |

**Result:** The client has locked in gas supply price for two years, posted required collateral, and ends Day Zero with **41,040 EUR more liquidity** than they started with. They have not paid anything. They have gained capital.

### What the retailer does:

1. **Executes Cal+2 TTF forward hedge** for 2,400 MWh at 38 EUR/MWh - locking in procurement cost for full contract duration
2. **Cost of supply is fixed**
3. **Revenue** - token stream from client - anchored to BSEI at same 38 EUR/MWh

**From this moment, the retailer carries no commodity price risk** on this contract. The only risk is operational: delivering the gas. Payment risk is eliminated by protocol collateral.

---

## Monthly Cycle: Months 1 through 24

Each month follows an identical mechanical sequence:

1. **Client releases 100 BS-G tokens** from Aave collateral by repaying corresponding EURC loan portion (2,660 EUR per month at 70% LTV)
2. **Client transfers 100 tokens** to retailer as settlement for that month's gas delivery
3. **Retailer presents tokens** to BlackSlon Protocol for redemption
4. **Protocol burns tokens** and credits retailer's account with redemption value in EUR/EURC within T+2 business days
5. **Client's Reserve Vault releases 1/24 of locked BSR collateral** back to client

### Monthly cashflow - base case (spot converging toward Cal+2 as backwardation resolves):

| Month | Spot TTF | Token Redemption Value | Retailer Procurement Cost | Retailer Monthly Margin | Client Collateral Released |
|-------|----------|------------------------|--------------------------|-------------------------|---------------------------|
| 1 | 44.50 | 3,850 EUR | 3,800 EUR | 50 EUR | 950 EUR |
| 3 | 43.50 | 3,850 EUR | 3,800 EUR | 50 EUR | 950 EUR |
| 6 | 42.00 | 3,850 EUR | 3,800 EUR | 50 EUR | 950 EUR |
| 9 | 41.00 | 3,900 EUR | 3,800 EUR | 100 EUR | 950 EUR |
| 12 | 40.00 | 3,900 EUR | 3,800 EUR | 100 EUR | 950 EUR |
| 15 | 39.00 | 3,900 EUR | 3,800 EUR | 100 EUR | 950 EUR |
| 18 | 38.00 | 3,800 EUR | 3,800 EUR | 0 EUR | 950 EUR |
| 21 | 36.50 | 3,700 EUR | 3,800 EUR | -100 EUR | 950 EUR |
| 24 | 35.00 | 3,650 EUR | 3,800 EUR | -150 EUR | 950 EUR |

*Note: In months 21-24, token redemption value falls below retailer's procurement cost because spot has converged below BSEI. However, the retailer's forward hedge has been generating offsetting gains throughout this period.*

---

## Retailer's Full Economics Over 24 Months

The retailer earns from three independent sources, each with a different risk profile.

### Source One - Backwardation carry on the forward hedge

The retailer purchased 2,400 MWh at 38 EUR/MWh on Day Zero. As the contract runs, spot price converges downward toward the forward price. The retailer closes hedge positions gradually as each monthly delivery occurs, realising the spread between hedge price and prevailing spot.

| Metric | Value |
|--------|-------|
| Average carry per MWh | 3.50 EUR |
| Total volume | 2,400 MWh |
| Total carry profit | 8,400 EUR |

### Source Two - Token premium above BSEI

The protocol's BSEI-anchored price includes a tokenisation premium of 0.50 EUR/MWh.

| Metric | Value |
|--------|-------|
| Premium per MWh | 0.50 EUR |
| Total volume | 2,400 MWh |
| Total premium income | 1,200 EUR |

### Source Three - Collateral yield share

The client's 22,800 EUR BSR collateral sits in protocol's Reserve Vault for 24 months. The protocol invests this pool in short-duration instruments at ~3.5% per annum. The protocol shares a portion with the retailer as incentive for client onboarding.

| Metric | Value |
|--------|-------|
| Collateral amount | 22,800 EUR |
| Annual yield rate | 3.50% |
| Duration | 2 years |
| Retailer yield share (60%) | 60% |
| Total yield income | 958 EUR |

### Retailer total economics:

| Source | Amount | Share |
|--------|--------|-------|
| Backwardation carry | 8,400 EUR | 81% |
| Token premium | 1,200 EUR | 12% |
| Collateral yield share | 958 EUR | 9% |
| **Total margin** | **10,558 EUR** | **100%** |
| Contract value | 91,200 EUR | - |
| Margin as % of contract | **11.6%** | - |

**The retailer earns 11.6% margin on a contract that carries zero credit risk, zero payment risk, and requires no change to its existing supply or grid operations.** The only capability needed is the ability to present tokens to the protocol for monthly redemption - a single API call.

---

## Client's Full Economics Over 24 Months

### What the client actually pays:

The client repays their Aave loan in 24 monthly instalments of 2,660 EUR each, totalling 63,840 EUR over the contract term. They also pay Aave interest on the outstanding loan balance - at approximately 4% per annum on a declining balance, total interest approximately 2,700 EUR over 24 months.

Their BSR collateral of 22,800 EUR is returned in full over the 24 months as positions close.

### Client cashflow summary:

| Item | Value |
|------|-------|
| Day Zero EURC received from Aave | +63,840 EUR |
| Aave loan repaid over 24 months | -63,840 EUR |
| Aave interest paid | -2,700 EUR |
| BSR collateral deposited | -22,800 EUR |
| BSR collateral returned | +22,800 EUR |
| **Net cost of two-year gas hedge** | **-2,700 EUR** |
| **Cost per MWh hedged** | **1.125 EUR/MWh** |

**The client paid 1.125 EUR/MWh - approximately 3% of the gas price - to lock in two years of supply at today's forward price.** If spot in month 18 is 50 EUR/MWh instead of 35, they have saved 12 EUR/MWh on every megawatt hour delivered in that month.

If the client does not want to use Aave at all - if they simply want to post collateral and hold tokens without borrowing - their effective cost is the opportunity cost of the BSR deposit, which earns partial yield through the collateral yield programme.

---

## What Happens in a Rising Price Environment

Backwardation is the base case but not the guaranteed case. The model must work under adverse conditions.

If spot TTF rises to 55 EUR/MWh by month 18 - a scenario consistent with a supply shock:

- **Token price within BSSZ corridor rises correspondingly**
- **Retailer receives tokens worth more** at redemption than their procurement cost of 38 EUR/MWh
- **Retailer margin increases**
- **Hedge generates additional carry** - forward was cheap, carry is now a gain

**The client also benefits:** the gas they locked at 38 EUR/MWh is now worth 55 EUR/MWh on the market. They can choose to sell their remaining tokens on the secondary market at a significant profit rather than delivering them to the retailer.

**This optionality - the ability to monetise the hedge by selling tokens rather than consuming them - is the feature that no conventional forward contract provides.** A standard fixed-price supply agreement locks the client into delivery. A BS-G token position gives the client the right to deliver or to sell.

---

## Why the Retailer Signs

A retailer evaluating this model against a conventional fixed-price supply agreement sees:

| Model | Margin | Credit Risk | Payment Risk | Operational Change |
|-------|--------|-------------|--------------|--------------------|
| **Conventional** | 2-4 EUR/MWh (2-4%) | Full | Full | None |
| **BlackSlon** | 10-12 EUR/MWh (11.6%) | **Zero** | **Zero** | **Single API call** |

**The retailer earns 4-6x the conventional margin with zero credit risk, zero payment default risk, and a collateral position that is continuously verified on-chain.**

The margin improvement is not a subsidy from the protocol. It is the backwardation carry that the retailer could theoretically capture independently by trading Cal+2 forwards directly - but which most retailers do not capture because they lack the treasury infrastructure, exchange membership, or risk appetite for proprietary forward positions.

**The BlackSlon model packages this carry as a natural consequence of the settlement structure, making it accessible to every retailer regardless of size or sophistication.**

The retailer does not need to understand tokenisation. It needs to understand that it **earns more, risks less, and changes nothing** about how it delivers energy to its clients.

**That is why the retailer signs.**

---

## UZUPELNIENIE: Ecosystem Composability & Asset Productivity

The BlackSlon architecture is built on the principle of **Financial Composability**, transforming energy-backed instruments into "Money Legos" within the broader DeFi landscape. Unlike traditional energy markets where capital is often trapped in rigid, siloed environments, the BlackSlon Settlement Zone (BSZ) operates as an **Open Book Model**, allowing participants to maximize the utility of their holdings through seamless integration with external protocols.

### 4.1. From Dormant to Productive Capital

A core innovation of the BlackSlon protocol is its handling of **time-segmented liquidity**. In the Cal Segment (The Dormant Year Model), assets allocated to the n+2 period remain "dormant" during Stage 1 (January - June).

Through composability, these **Dormant Assets** are not merely idle; they can be tokenized as future-yield components, allowing holders to:

- **Unlock Liquidity:** Use dormant positions as collateral in external lending markets
- **Optimize Yield:** Engage in cross-protocol strategies while waiting for the Asymptotic Daily Rebalancing (ADR) to activate the asset's weight within the BSZ

### 4.2. Tokenized Commodity Units: BS-P & BS-G

The protocol's primary energy tokens, **BS-P (Power)** and **BS-G (Gas)**, function as standardized, composable assets. Because they are anchored to the physical market via the BSSZ Corridor (-10 / +20), they serve as high-quality collateral.

- **Secondary Markets:** BS-P and BS-G can be paired in Automated Market Makers (AMMs) outside the native protocol, enhancing price discovery and exit liquidity
- **Hedging & Derivatives:** Third-party developers can build sophisticated hedging instruments (Options, Synthetic Futures) on top of BS-P/G tokens, utilizing the BlackSlon Energy Index as a transparent, transaction-weighted oracle

### 4.3. The BSR Reserve Layer

**BSR (BlackSlon Reserve)** acts as the liquidity backbone of the ecosystem. Its composable nature allows for:

- **Interoperability:** BSR can be utilized across various DeFi vaults to automate rebalancing or participate in governance-incentivized liquidity pools
- **Arbitrage Efficiency:** The open nature of the BSZ allows arbitrageurs to align the BSTZ (Physical Market Formula) with on-chain prices, ensuring that the Base demand directly influences the value of the ecosystem, creating a positive feedback loop for all participants

### 4.4. Atomic Settlement and Risk Mitigation

By leveraging the **Atomicity of blockchain transactions**, BlackSlon enables complex multi-step operations - such as purchasing gas tokens, swapping for power, and rebalancing a portfolio - to occur in a single, verifiable transaction. This eliminates counterparty risk and ensures that the **Stabilizer b** (combining Progressive Friction and EMA) maintains system integrity even during periods of high external volatility.

---

*Document: Retailer Economics & Composability Model · BlackSlon Protocol · Worked Example*
