# €BSR Stability Reserve (BSR-SR): The Protocol's Shock Absorber

## 1. Reserve Funding (The Capital Stack)

The reserve is funded from three sources, creating a self-sustaining capital pool:

| Source | Allocation | Trigger |
|:---|:---:|:---|
| Trading Fees | **15%** of all collected fees | Continuous, automatic |
| Token Issuance Premium | **20%** of BSR mint premium | On every new BSR mint |
| Liquidation Surplus | **100%** of surplus after liquidation | On every liquidation event |

$$BSR\text{-}SR_{balance} = \sum(\text{Fees} \cdot 0.15) + \sum(\text{MintPremium} \cdot 0.20) + \sum(\text{LiqSurplus})$$

---

## 2. Intervention Triggers (The Fuse System)

Two-tier trigger system — **soft** and **hard**:

**Soft Fuse** (Monitoring Mode):

$$\Delta P_{BSR} \leq -5\% \text{ in } \leq 24h$$

Activates price monitoring. No intervention yet. Protocol logs the event and prepares reserve deployment.

**Hard Fuse** (Active Intervention):

$$\Delta P_{BSR} \leq -15\% \text{ in } \leq 72h \quad \lor \quad BSR\text{-}SR_{balance} < \text{MinReserve}_{threshold}$$

Triggers automatic buyback from open market.

---

## 3. Intervention Mechanism (The Buyback Engine)

When Hard Fuse activates, the protocol deploys capital in **tranches**, not all at once — avoiding panic and market manipulation:

$$Tranche_n = BSR\text{-}SR_{balance} \cdot R_n$$

| Tranche | Reserve Deployed | Condition to Unlock Next |
|:---|:---:|:---|
| T1 | 10% of SR | Hard Fuse triggered |
| T2 | 15% of SR | Price still ≤ -15% after 24h |
| T3 | 25% of SR | Price still ≤ -20% after 48h |
| T4 (Emergency) | 40% of SR | Protocol governance vote |

> **Note:** The remaining 10% is never deployed — it is the absolute floor reserve, untouchable except by governance vote.

---

## 4. Mint/Burn Stabilization (The Elastic Supply)

Complementary to buybacks, the protocol uses **supply elasticity**:

**Deflationary Burn** (price falling):

$$\text{If } \Delta P_{BSR} \leq -15\%: \quad \text{Burn}_{auto} = \frac{BSR\text{-}SR_{balance} \cdot 0.05}{P_{BSR}}$$

Automatically burns a small portion of circulating €BSR supply, reducing sell pressure organically.

**Inflationary Mint** (price overheating):

$$\text{If } \Delta P_{BSR} \geq +30\%: \quad \text{Mint}_{auto} = \frac{\text{ExcessDemand}}{P_{BSR}} \cdot 0.10$$

Mints new €BSR when price runs too hot, capturing value back into the reserve.

---

## 5. The Anti-Death-Spiral Rule

The single most important protection. If both conditions are true simultaneously:

$$H_{BSSZ,avg} < 1.05 \quad \land \quad \Delta P_{BSR} \leq -10\%$$

The protocol activates **Emergency Collateral Lock**:

- All €BSR collateral is **frozen at T-24h price** for margin calculation purposes
- This breaks the feedback loop: falling €BSR price → lower collateral → more liquidations → more €BSR selling → even lower price
- Lock duration: maximum **48 hours** or until $H_{BSSZ,avg} > 1.10$

---

## 6. Key Design Principles

This mechanism is built on three pillars:

**Self-funding** — the reserve grows organically with protocol activity, no external dependency.

**Graduated response** — tranched deployment prevents the reserve from being drained in a single attack or panic event.

**Anti-reflexivity** — the Collateral Lock directly targets the doom loop that destroyed LUNA/UST, by temporarily decoupling €BSR price from margin calculations during systemic stress.
