# Block 01 - Collateral & Tokenomics

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## Design Decisions

Three decisions were made that define this entire block:

### Decision 1 - BSR is a long-term holder asset, not a leverage tool.

BSR rewards loyalty through cost reduction and ecosystem participation - not through capital efficiency. The fee structure is the primary incentive mechanism. Leverage is decoupled from BSR ratio entirely.

### Decision 2 - Margin and fee are independent decisions.

How much BSR a participant holds determines what they pay per transaction. How much leverage a participant takes determines their margin requirement. These two decisions do not influence each other.

### Decision 3 - No declarative lock mechanism.

Lock mechanisms are gaming vectors - participants activate them to avoid liquidation, not to signal long-term intent. Volume Hedger protection comes from mathematical over-collateralisation and the Anti-Death-Spiral Lock, not from voluntary declarations.

---

## The Three Collateral Assets

**€EURO** is the hard settlement currency of the Protocol. It is a MiCA-compliant Euro stablecoin - €URe (Monerium) or €URC (Circle). It carries no price risk relative to the Protocol's €EURO-denominated obligations. It commands the highest Initial Margin efficiency because it is the most stable collateral asset. It is the preferred collateral for participants who want maximum capital efficiency with minimum collateral volatility risk.

**BSR** is the native reserve token of the Protocol. Its price is a mathematical derivative of the Protocol Vault's net asset value. It is volatile relative to €EURO - its value rises as the ecosystem grows and falls if the ecosystem contracts. It is the preferred collateral for long-term participants who want to capture ecosystem appreciation while paying minimum transaction fees. It is not a leverage tool. It is a loyalty instrument.

**Mixed collateral** is the default state for most participants - a combination of €EURO and BSR in proportions the participant configures. The BSR Stake Ratio (h_BSR) is the single parameter that determines fee tier. The ISA monitors this ratio and surfaces it to the participant - collateral rebalancing is always a conscious participant decision, never an automated action.

---

## Mechanism 1 - Fee Structure

Fee is the primary incentive for BSR holding. It applies to every Order Book transaction and every monthly V2P token transfer.

| BSR Stake Ratio (h_BSR) | Transaction Fee |
|-------------------------|-----------------|
| 0 - 25%                 | 1.00%           |
| 25 - 50%                | 0.60%           |
| 50 - 75%                | 0.35%           |
| 75 - 100%               | 0.20%           |

Fee allocation: 85% of every fee flows to the Protocol Vault. 15% flows to the BSR Stability Reserve.

**Why this matters for Volume Hedgers over 24 months:**

Example: 2,400 BS-G tokens, 24-month supply contract
Monthly transfer to retailer: 100 tokens
@ 40 €/MWh = 4,000 € notional per month

At 0% BSR (fee 1.00%):
Monthly fee: 40.00 €
24-month total: 960 €

At 100% BSR (fee 0.20%):
Monthly fee: 8.00 €
24-month total: 192 €

Fee saving over contract term: 768 €
On a 96,000 € notional position: 0.80% net cost reduction

For a Price Seeker executing 20 trades per month, the saving is equally significant - lower friction per trade, higher net return on each position.

---

## Mechanism 2 - Initial Margin

Initial Margin is decoupled from BSR ratio. It is determined solely by the participant's chosen leverage level.

| Chosen Leverage | Initial Margin Required | H_user Risk Level |
|-----------------|------------------------|-------------------|
| 1:1 (no leverage) | 100% of notional | Minimal - SIL effectively unreachable at normal volatility |
| 1:2 | 50% of notional | Low |
| 1:3 | 33% of notional | Medium |
| 1:4 | 25% of notional | High |

Maximum leverage is 1:4 regardless of collateral composition. This is a Protocol constant enforced at smart contract level on Arbitrum.

The collateral type does not change the margin requirement. A participant posting 100% BSR at 1:1 leverage and a participant posting 100% €EURO at 1:1 leverage both post 100% of notional. The difference is only in the fee they pay.

**Why 1:1 protects Volume Hedgers without a lock mechanism:**

At 1:1 leverage: IM = 100% of notional

For H_user to reach 1.0 (SIL trigger):
Equity_total must fall to 50% of IM

This requires token price to fall 50% AND
BSR collateral to simultaneously lose
significant value

Under normal market conditions with BSSZ
constraining daily moves to max ±20%:
H_user at 1:1 leverage is mathematically
protected from SIL activation

Extreme scenario (BSR crash):
Anti-Death-Spiral Lock activates
Freezes BSR valuation at T-24h price
Prevents collateral depreciation from
triggering SIL during acute stress

---

## Mechanism 3 - Additional BSR Holder Benefits

### Burn Appreciation
Every Protocol transaction generates fees. 85% flows to the Vault. When the Vault holds a verified surplus over all outstanding obligations, the burn mechanism activates - permanently destroying a governance-set percentage of BSR from circulation. As circulating supply decreases and Vault value grows, the price of each remaining BSR appreciates per the NAV formula. Early exit means leaving that appreciation to remaining holders.

Short selling of BSR is permanently prohibited at smart contract level. This constraint is immutable - it cannot be overridden by governance.

### New Market Priority Access
When BlackSlon activates a new market - BS-P-IT, BS-G-UK, BS-P-FR - participants holding BSR above a defined threshold receive priority access during the first 72 hours of trading.

### Governance Rights
BSR is the governance token of the Protocol. Holders vote on BSSZ parameter adjustments, burn rate governance, new market and jurisdiction approvals, prime broker selection and replacement, and Protocol fee schedule revisions. Governance weight is proportional to BSR held.

### BlackSlon Intelligence Access
Participants holding BSR above a defined threshold receive complimentary access to BlackSlon Intelligence paid tier (49/month). The threshold is governance-set and reviewed quarterly.

### Retailer Incentives
Licensed retailers who hold BSR receive reduced V2P API access fees, priority onboarding, and preferential settlement terms. Their operating costs decrease as their BSR holding increases - creating structural alignment between retailer economics and ecosystem success.

---

## BSR Token Supply

Total supply: 100,000,000 BSR - fixed forever.

No additional emissions without governance vote requiring 80% supermajority. In practice: fixed supply. Burn reduces supply permanently over time. Long-term supply trajectory is deflationary.

Supply model: market-driven (not emission-based).

BSR is purchased on the Open Order Book from other participants - not minted by the Protocol on demand. This is the same model as ETH and AAVE. The NAV formula serves as a fundamental value anchor - not as an emission price. The NAV Buyback activates when market price falls below NAV - it is a protective mechanism, not a redemption mechanism.

---

## BSR Token Allocation

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

**Strategic Investor(s):** One or more investors with energy market or DeFi background. 15M allocation creates meaningful governance weight and long-term alignment. 12M cliff ensures no tokens enter circulation during the Protocol's first year.

**Prime Broker(s):** Allocated at Prime Brokerage Agreement signing. Vesting contingent on active agreement. If prime broker exits before 24 months - unvested tokens return to Protocol Vault. Creates financial stake in Protocol success beyond fee income.

**Licensed Retailers pool:** Distributed proportionally to V2P settlement volume. The more customers a retailer onboards and settles through the Protocol, the more BSR they receive. Creates a flywheel - more BSR lower operating costs more competitive offer more customers more BSR.

**Ecosystem Fund:** Governance-managed. Used for future partnerships, liquidity incentives, grants, and protocol development. Not pre-allocated to any specific purpose.

---

## BSR Price Formula

P_BSR = (V_€EURO - |PnL_ITM|) / (S_BSR × RR)

Where:

- V_€EURO = total €EURO in Protocol Vault
- |PnL_ITM| = aggregate unrealised profit of all in-the-money positions
- S_BSR = circulating BSR supply
- RR = Reserve Ratio (governance-set, default 1.10)

---

## BSR Stake Ratio Formula

h_BSR = (Q_BSR × P_BSR) / (Q_BSR × P_BSR + Q_€EURO)

h_BSR is calculated at position open and determines the fee tier for that position. Subsequent changes to vault composition do not retroactively alter the fee on existing positions.

---

## BSR Burn Mechanism

Surplus = V_€EURO - (|PnL_ITM| + IM_total + Reserve_Op)

If Surplus > 0 and H_solv Tier I:
B_auto = Surplus × k_burn

Where k_burn = burn rate (governance-set, default 50% of surplus).

Burn executes as a public on-chain transaction on Arbitrum with cryptographic proof. Every burn event logged on-chain with timestamp and amount. Burn only activates in H_solv Tier I (> 1.15) - in Tier II-V surplus is retained as solvency buffer.

---

## BSR Stability Mechanisms

### Short Selling Prohibition
Immutable smart contract constraint. Cannot be overridden by governance.

### Anti-Death-Spiral Lock
Triggers when P_BSR -10% in 24h AND H_solv in Tier IV or V. BSR collateral frozen at T-24h price for max 48 hours. Full specification in Block 05.

### NAV Buyback
When P_market < P_BSR_formula: Protocol may repurchase and burn BSR from Order Book using Vault surplus. Only below NAV - never above.

### Wallet Concentration Limit
Maximum 5% of circulating supply per wallet. Enforced at smart contract level.

### Genesis Vesting
Team and founder: 12M cliff + 24M linear. No team tokens in circulation during first year.

---

## Summary - What BSR Is and Is Not

| BSR Is | BSR Is Not |
|--------|------------|
| Long-term holder asset | Leverage tool |
| Fee reduction instrument | Stablecoin |
| Governance token | Redemption instrument |
| Burn-driven appreciating asset | Dividend-paying security |
| Trading collateral (at market value) | Short-sellable within Protocol |
| Fixed supply (100M, deflationary) | Emission-based token |

---

**Block 01 - Collateral & Tokenomics | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Next:** Block 02 - Participant Profiles**
