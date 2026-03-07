# Ecosystem Solvency: Macro (System) Level

---

## 1. Overview

While Risk Management (Micro) governs the health of individual user accounts, Ecosystem Solvency (Macro) ensures the integrity of the entire BlackSlon Protocol. It answers one question at all times:

> **Is the protocol solvent — can it honour every outstanding obligation to every participant?**

The primary metric is the **Ecosystem Solvency Index** ($H_{solv}$) — a real-time ratio between the protocol's total adjusted asset base and its total outstanding liabilities. $H_{solv}$ is calculated continuously, published on-chain, and triggers automated responses when it breaches defined thresholds.

---

## 2. The Ecosystem Solvency Index ($H_{solv}$)

$$H_{solv} = \frac{\overbrace{V_{eEURO} + V_{BSR} \cdot (1 - h_{BSR}) + BSR\text{-}SR_{balance}}^{\text{Adjusted Asset Base}}}{\underbrace{\sum |PnL_{ITM}| + \sum IM_{total} + Reserve_{Op}}_{\text{Total Systemic Liabilities}}}$$

---

### 2.1 The Numerator: Adjusted Asset Base

The numerator represents the total capital available to honour all outstanding obligations.

**$V_{eEURO}$ — Vaulted eEURO (Hard Anchor):**
The total fiat-backed eEURO held across the Protocol Vault and BSR-SR. This is the highest-quality asset in the system — 1:1 EUR-backed, zero haircut. It includes:
- User collateral deposited as eEURO
- Trading fee revenue allocated to the Vault (85% of fees)
- Liquidation surplus retained in the Vault

**$V_{BSR} \cdot (1 - h_{BSR})$ — Risk-Adjusted €BSR Reserve:**
The conservative valuation of €BSR held within the protocol's own reserve positions (not user collateral — that is already counted in Micro Health Factor). A haircut $h_{BSR}$ is applied to account for €BSR price volatility:

$$h_{BSR} = \begin{cases} 10\% & \text{if } H_{solv} > 1.15 \text{ (Tier I)} \\ 15\% & \text{if } 1.05 \leq H_{solv} \leq 1.15 \text{ (Tier II)} \\ 25\% & \text{if } H_{solv} < 1.05 \text{ (Tier III/IV)} \end{cases}$$

**$BSR\text{-}SR_{balance}$ — Stability Reserve Balance:**
The current balance of the BSR Stability Reserve — the dedicated shock absorber funded by 15% of trading fees, mint premiums, and liquidation surplus. This is counted separately from $V_{eEURO}$ because it is ring-fenced and governed by its own deployment rules.

---

### 2.2 The Denominator: Total Systemic Liabilities

The denominator represents the sum of all claims the protocol must be able to honour.

**$\sum |PnL_{ITM}|$ — Aggregate In-The-Money Exposure:**
The total unrealized profit across all open positions currently in profit (ITM — In The Money). These represent real obligations — if every profitable user closed their position simultaneously, the protocol must be able to pay. Calculated in real time from the BSEI ($I_t$) across all markets.

**$\sum IM_{total}$ — Total Committed Initial Margin:**
The sum of all initial margin locked across all open positions system-wide. This represents capital that users are entitled to recover when they close positions (net of losses). It is the aggregate of all individual $\sum IM_j$ from the Micro Health Factor formula.

**$Reserve_{Op}$ — Operational Reserve Requirement:**
A fixed minimum capital buffer maintained for protocol infrastructure continuity:
- Oracle feed costs and redundancy
- Matching engine infrastructure
- Regulatory reporting obligations
- PLP settlement fees (Phase 2)

$Reserve_{Op}$ is set by governance and reviewed quarterly.

---

## 3. Solvency Resilience Tiers

The protocol operates across four defined solvency regimes, each triggering automated responses:

| Tier | $H_{solv}$ | Regime | Automated Response |
|:---|:---:|:---|:---|
| **Tier I — Expansion** | $> 1.15$ | Full health | No restrictions. Maximum €BSR ratios permitted per Tiering Matrix |
| **Tier II — Equilibrium** | $1.05 – 1.15$ | Standard operations | Normal collateral mix. $h_{BSR}$ increases to 15%. Enhanced monitoring |
| **Tier III — Mitigation** | $1.00 – 1.05$ | Stress | New positions restricted to **eEURO-only collateral**. $h_{BSR}$ rises to 25%. BSR-SR Soft Fuse activates |
| **Tier IV — Safeguard** | $< 1.00$ | Critical | **Full hard stop** on new positions. Reduce-Only mode. BSR-SR Hard Fuse activates. Governance emergency vote triggered |

---

## 4. Tier III Stabilization Mechanisms

When $H_{solv}$ drops into Tier III, three automated protocols activate simultaneously:

### 4.1 eEURO-Only Entry Mandate

All new BS-P/G positions must be collateralised **100% in eEURO**. €BSR is temporarily disabled as initial margin for new trades.

**Effect:** Forces immediate inflow of hard-anchor liquidity into the Vault, directly improving the numerator of $H_{solv}$ without requiring any market intervention.

### 4.2 Dynamic €BSR Haircut Escalation

The protocol raises $h_{BSR}$ from 15% to 25%, reducing the recognised value of €BSR in the Asset Base calculation.

**Effect:** Users with high €BSR exposure in their collateral will see their individual $H_{BSSZ}$ decline, incentivising them to deposit additional eEURO or reduce positions — organically deleveraging the system without forcing a market dump of €BSR.

### 4.3 BSR-SR Soft Fuse Activation

The BSR Stability Reserve enters monitoring mode as defined in the BSR-SR Framework. Tranche T1 deployment is prepared but not yet executed — the reserve stands ready to intervene if $\Delta P_{BSR} \leq -15\%$ within 72 hours.

---

## 5. Tier IV Emergency Protocol

If $H_{solv}$ breaches 1.00, the protocol enters full Safeguard mode:

1. **Hard Stop:** No new positions opened in any market
2. **Reduce-Only:** All accounts restricted to position reduction or eEURO collateral addition
3. **BSR-SR Hard Fuse:** Tranche deployment begins per the BSR-SR Framework (T1 → T2 → T3 as conditions require)
4. **Anti-Death-Spiral Lock:** If $\Delta P_{BSR} \leq -10\%$ simultaneously, Emergency Collateral Lock activates — €BSR collateral frozen at T-24h price for all margin calculations
5. **Governance Emergency Vote:** The Multisig Council (Phase 1) or DAO (Phase 2) is notified and convened within 24 hours to assess whether additional capital injection or parameter changes are required

---

## 6. The Relationship Between Macro and Micro

$H_{solv}$ and $H_{BSSZ}$ are complementary but independent metrics:

| | $H_{BSSZ}$ (Micro) | $H_{solv}$ (Macro) |
|:---|:---|:---|
| **Scope** | Single user account | Entire protocol |
| **Numerator** | User's Equity (collateral + PnL) | Protocol's total adjusted assets |
| **Denominator** | User's required Initial Margin | Protocol's total liabilities |
| **Trigger** | Smart Incremental Liquidation | Solvency Tier regime change |
| **Response** | Position reduction | System-wide operational restrictions |

A user can have a healthy $H_{BSSZ} > 1.10$ while the protocol is in Tier III — their individual account is safe but they cannot open new positions. Conversely, a protocol in Tier I can still liquidate individual accounts whose $H_{BSSZ}$ falls below 1.00. The two systems operate in parallel and reinforce each other.

---

## 7. On-Chain Transparency

$H_{solv}$ is published on-chain in real time. Any participant can independently verify:

- $V_{eEURO}$: Total eEURO in Vault (on-chain balance)
- $S_{BSR}$ and $P_{BSR}$: Circulating supply and current price (on-chain oracle)
- $BSR\text{-}SR_{balance}$: Stability Reserve balance (on-chain)
- $\sum |PnL_{ITM}|$: Aggregate ITM exposure (calculated from BSEI and open positions)

There are no hidden reserves, no off-chain adjustments, and no discretionary inputs. The protocol's solvency is fully verifiable by any participant at any time.


