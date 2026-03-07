# BS-P & BS-G Token Specification: BlackSlon Power & Gas Tokens

---

## 1. What Are BS-P & BS-G?

BlackSlon Power (BS-P) and BlackSlon Gas (BS-G) tokens are the core tradeable instruments of the BlackSlon Protocol. Each token represents the **underlying value of 100 kWh** of electric power or natural gas within a specific national or regional European energy market.

They are not commodities. They are not securities. They are **virtual settlement units** — perpetual, market-specific instruments that allow any participant to gain exposure to European wholesale energy price movements without the legal, technical, and capital barriers of traditional energy trading.

---

## 2. Key Properties

| Property | Description |
|:---|:---|
| **Underlying** | 100 kWh of electric power (BS-P) or natural gas (BS-G) |
| **Market Specificity** | Each token is dedicated to a specific national market |
| **Perpetual** | No expiration date — no rollover costs, no contract management |
| **Asymmetric Corridor** | Price bounded by BSSZ: $[a - 10\%, a + 20\%]$ relative to Physical Meridian |
| **Minimum Unit** | 1 token = 100 kWh (granular access from any capital size) |
| **Settlement Currency** | eEURO |
| **Phase 1** | Virtual settlement only — no physical delivery |
| **Phase 2** | Physical redemption available for 1MW+ industrial consumers |

---

## 3. Market Taxonomy

Each BS-P and BS-G token is identified by a standardized ticker that encodes its type and market:

**Format:** `BS-[Type]-[Country Code]`

| Ticker | Instrument | Reference Market |
|:---|:---|:---|
| BS-G-NL | BlackSlon Gas — Netherlands | TTF (Title Transfer Facility) |
| BS-G-DE | BlackSlon Gas — Germany | THE (Trading Hub Europe) |
| BS-G-PL | BlackSlon Gas — Poland | TGE (Towarowa Giełda Energii) |
| BS-P-DE | BlackSlon Power — Germany | EEX (European Energy Exchange) |
| BS-P-FR | BlackSlon Power — France | EPEX SPOT |
| BS-P-PL | BlackSlon Power — Poland | TGE |
| BS-P-NL | BlackSlon Power — Netherlands | EPEX SPOT |

> Each market has its own isolated BSSZ corridor, its own Physical Meridian, and its own $b_{base}$ calibration in the Circuit Breaker. Markets do not cross-contaminate each other's price dynamics.

---

## 4. Token Valuation

The value of a BS-P/G token at any given moment is determined by the **BSEI** ($I_t$) for that specific market:

$$V_{token} = I_t \times 100\text{ kWh}$$

Where $I_t$ is the BlackSlon Energy Index — the hybrid of the Physical Meridian and the internal Rolling VWAP:

$$I_t = \omega \cdot a + (1 - \omega) \cdot P_{RVWAP}$$

This means the token price is never purely speculative — it is always at least 80% ($\omega = 0.80$) anchored to real physical market prices.

---

## 5. The Investment Case: Why Hold BS-P/G?

BS-P/G tokens are designed as a **dual-purpose instrument**:

**Energy Hedge:** Industrial consumers, energy-intensive businesses, and utilities can lock in exposure to future energy prices without signing physical supply contracts. A manufacturer buying BS-P-DE in January is effectively pre-purchasing German power at today's price levels.

**Energy-Denominated Store of Value:** For investors, BS-P/G tokens represent a direct claim on European energy value — an asset class historically uncorrelated with equities and bonds, denominated in eEURO, with no counterparty risk and no expiry.

The asymmetric BSSZ corridor ($-10\% / +20\%$) reflects this investment rationale explicitly:
- The **floor** protects against catastrophic downside — useful for hedgers who need price certainty
- The **ceiling** preserves significant upside — attractive for investors who believe in long-term energy price appreciation

---

## 6. Opening a Position: How It Works

### 6.1 Buying BS-P/G (Long — Energy Price Appreciation)

A user who believes energy prices will rise deposits collateral (eEURO and/or €BSR) into the Reserve Vault and opens a long position:

$$\text{Required Collateral} = V_{token} \times N_{tokens} \times Margin_{LONG}$$

Where $Margin_{LONG}$ is determined by the user's $\omega_{BSR}$ ratio (Tiering Matrix) — ranging from 50% (10% BSR) to 25% (100% BSR).

### 6.2 Selling BS-P/G (Short — Energy Price Decline)

A user who believes energy prices will fall opens a short position. Short positions require significantly higher collateral:

$$\text{Required Collateral} = V_{token} \times N_{tokens} \times Margin_{SHORT}$$

Where $Margin_{SHORT}$ ranges from 100% (10% BSR) to 50% (100% BSR). The elevated short margin is a deliberate design choice — energy markets historically spike upward far more violently than they collapse, so short positions carry structurally higher risk.

---

## 7. PnL Calculation

The unrealized PnL of an open BS-P/G position is calculated against the current BSEI:

**Long Position:**
$$\Delta PnL_{LONG} = (I_{t,now} - I_{t,open}) \times N_{tokens} \times 100\text{ kWh}$$

**Short Position:**
$$\Delta PnL_{SHORT} = (I_{t,open} - I_{t,now}) \times N_{tokens} \times 100\text{ kWh}$$

All PnL is denominated in eEURO and feeds directly into the Master Equity Formula for real-time Health Factor calculation.

---

## 8. Phase 2: Physical Redemption

In Phase 2, BS-P/G tokens gain a physical redemption right for eligible industrial consumers (minimum 1 MW annual baseload consumption). The Virtual-to-Physical Swap mechanism allows token holders to convert their virtual position into a physical energy supply contract:

$$\text{Physical Delivery} = N_{tokens} \times 100\text{ kWh} \times \text{Baseload Profile}$$

The pre-locked token value covers the baseload component of the supply contract. Balancing, network, and variable costs are settled separately under the physical supply agreement with the PLP (Physical Liquidity Provider).

This creates a seamless continuum: a user accumulates BS-P/G tokens over months or years in Phase 1, then redeems them against a 1–3 year physical supply contract in Phase 2 — effectively having pre-purchased their energy at Phase 1 prices.

---

## 9. Risk Summary

| Risk | Mitigation |
|:---|:---|
| Price moves below BSSZ floor | Lockout activates — Hybrid Position Handling Protocol |
| Price moves above BSSZ ceiling | Lockout activates — in-profit positions frozen, short liquidations triggered |
| €BSR collateral devalues simultaneously | Anti-Death-Spiral Rule — Emergency Collateral Lock at T-24h price |
| Physical market disconnects from BSEI | $\omega = 0.80$ ensures Physical Meridian dominates BSEI at all times |
| Low liquidity manipulation | R-VWAP with 6h half-life + Circuit Breaker ($b_{adj}$) prevent price distortion |
