# BlackSlon Energy Index (BSEI): The Rolling Valuation & Risk Benchmark

---

## 1. The Nature of the BSEI

The BlackSlon Energy Index (BSEI) is an autonomous, high-fidelity synthetic benchmark that serves as the **gravitational anchor** of the BlackSlon Protocol. It is the single source of truth for Mark-to-Market valuation, margin requirements, and settlement integrity across all virtual energy markets.

Unlike traditional energy benchmarks that rely on static daily fixings (e.g., Platts, ICIS), the BSEI is a **perpetual, continuously recalculated index** that reflects both physical market fundamentals and real-time internal market sentiment simultaneously.

The BSEI serves three critical systemic functions:

- **Mark-to-Market (MtM):** Real-time calculation of unrealized PnL for all open positions across BS-P and BS-G tokens.
- **Adaptive Margin:** Determining the required collateral (eEURO/€BSR) to maintain positions based on current market velocity.
- **Settlement Guard:** Acting as the reference price against which BSSZ corridor boundaries are enforced.

---

## 2. The Zero-Friction Architecture

The BSEI enables a professional-grade settlement environment built on five structural pillars that eliminate the traditional barriers of wholesale energy trading:

- **Zero Expiration:** The BSEI is a perpetual benchmark with no contract expiry dates, allowing long-term energy exposure without rollover costs or administrative friction.
- **Zero Spread:** Positions are valued at a single, mathematically derived settlement price — no bid/ask gap creates asymmetric entry/exit costs.
- **Zero Formalities:** Participation is permissionless, removing the legal, credit-check, and administrative hurdles typical of professional energy markets.
- **Zero Counterparty Risk:** All PnL is settled in real-time against the Protocol's Liquidity Vault, backed by eEURO reserves. No bilateral exposure exists.
- **Zero Entry Barrier:** Granular settlement down to 100 kWh allows participants of any scale to access professional energy benchmarks — from industrial hedgers to individual investors.

---

## 3. The BSEI Pricing Formula: The Hybrid Physical-Virtual Index

To ensure the BSEI remains simultaneously responsive to internal market sentiment and tethered to physical energy reality, the protocol uses a **Hybrid Anchor formula** — a weighted combination of the Physical Meridian and the internal Rolling VWAP:

$$I_t = \omega \cdot a + (1 - \omega) \cdot P_{RVWAP}$$

Where:

- $I_t$: The current value of the BlackSlon Energy Index for market at time $t$.
- $a$ **(The Physical Meridian):** The physical reference price derived from the weighted basket aggregation (10/40/25/25) and the 50/25/25 Historical Recursive Filter, as defined in the BSSZ Framework.
- $P_{RVWAP}$ **(Rolling VWAP):** The internal market price derived from executed transactions on the BlackSlon Open Order Book over a rolling 24-hour window (defined in Section 4 below).
- $\omega$ **(Inertia Factor):** A systemic constant (default: $\omega = 0.80$) that dictates the index's resistance to internal volatility. A high $\omega$ ensures the BSEI remains dominated by physical energy fundamentals, preventing virtual speculation from decoupling from physical reality.

> **Governance Note:** The $\omega$ parameter is subject to governance adjustment. As the BlackSlon Ecosystem matures and internal liquidity deepens, $\omega$ may be progressively reduced — increasing the weight of internal market price discovery relative to the Physical Meridian.

---

## 4. The Rolling VWAP Engine ($P_{RVWAP}$)

The internal market price component of the BSEI is calculated using a **Rolling Volume-Weighted Average Price (R-VWAP)** over a moving 24-hour window. This ensures the index reflects genuine market activity while remaining resistant to short-term manipulation or closing shocks.

$$P_{RVWAP} = \frac{\sum_{i=1}^{n} (Price_i \cdot Volume_i \cdot w_i)}{\sum_{i=1}^{n} (Volume_i \cdot w_i)}$$

Where:

- $n$: All transactions validated within the last 24-hour rolling window.
- $Price_i \cdot Volume_i$: The total executed value of each individual transaction.
- $w_i$ **(Time-Decay Weight):** A decay factor giving higher relevance to the most recent transactions, ensuring the index reflects current momentum while preserving historical inertia.

### The Exponential Decay Function ($w_i$)

$$w_i = e^{-\lambda \cdot (t_{now} - t_i)}$$

Where:
- $(t_{now} - t_i)$: Time elapsed since the transaction was executed, measured in hours.
- $\lambda$ **(Decay Constant):** Derived from a **6-hour half-life** — a transaction executed 6 hours ago carries 50% of its original weight; a transaction from 24 hours ago retains only 6.25% of its influence.

> **Design Rationale:** The 6-hour half-life is calibrated for energy market rhythms — reactive enough to capture intraday momentum, stable enough to resist flash manipulation. This is meaningfully different from crypto VWAP (too reactive) and traditional daily fixing (too static).

---

## 5. The Order Book Circuit Breaker ($b_{adj}$)

To prevent the Open Order Book from generating price movements that violate the BSSZ corridor or create destabilizing velocity, the protocol implements a **dynamic friction mechanism** applied at the matching engine level.

The Circuit Breaker does not set prices — it **slows the matching engine** when price movement becomes dangerously fast or approaches BSSZ boundaries.

$$b_{adj} = \frac{b_{base}}{\left(1 + \frac{|P - a|}{a}\right)^2 \times (1 + |P - EMA_P|)}$$

Where:

- $b_{base}$ **(Market DNA):** The base sensitivity parameter calibrated individually for each energy market, derived from historical liquidity depth and volatility profiles:

| Market | $b_{base}$ | Rationale |
|:---|:---:|:---|
| German Power (EEX) | 0.005 | High liquidity, deep order book |
| Dutch Gas (TTF) | 0.008 | High liquidity, global benchmark |
| Polish Gas (TGE) | 0.025 | Medium liquidity, regional market |
| Balkan Power | 0.050 | Low liquidity, high volatility |

- $a$: The Physical Meridian — the gravitational center of the BSSZ.
- $P$: The projected price of the pending transaction (pre-execution).
- $EMA_P$: The Exponential Moving Average of the price — the Momentum Brake (defined below).

### The Momentum Brake ($EMA_P$)

$$EMA_P = (\alpha \cdot P) + (1 - \alpha) \cdot EMA_{prev}$$

Where:
- $\alpha$ **(Smoothing Factor):** A calibration constant ($0 < \alpha < 1$) that dictates the system's price memory:
  - **High $\alpha$** (e.g., 0.3): Reactive, shorter memory. Recommended for high-liquidity markets (TTF, EEX).
  - **Low $\alpha$** (e.g., 0.05): Heavy, stable, longer memory. Recommended for low-liquidity markets (Balkans, emerging EU markets).

**How the Circuit Breaker works:**

- **Proximity Detection:** As price approaches the BSSZ floor or ceiling, $\frac{|P - a|}{a}$ increases, collapsing $b_{adj}$ and dramatically slowing order execution.
- **Velocity Detection:** If a transaction attempts to push price significantly beyond the recent EMA trend, $|P - EMA_P|$ increases instantly, multiplying the denominator and further flattening $b_{adj}$.
- **The Viscosity Effect:** The faster and further a price move is attempted, the more "viscous" the matching engine becomes — creating a natural, mathematically enforced deceleration zone before BSSZ boundaries are reached.

---

## 6. Adaptive Margin: The Volatility Multiplier

The BSEI is the primary input for calculating real-time capital requirements. When the internal market price deviates rapidly from the BSEI, the protocol automatically increases required collateral:

$$Locked_{Value} = Volume \cdot I_t \cdot (Margin_{Base} + V_{Factor})$$

Where $V_{Factor}$ is the **Volatility Multiplier** — a dynamic penalty applied when $P_{RVWAP}$ diverges from $a$ (the Physical Meridian) at a rate exceeding normal market conditions. This ensures the Liquidity Vault is never under-collateralized during periods of elevated internal volatility.

---

## 7. The BSSZ Safety Constraint

The BSEI enforces the BlackSlon Settlement Zone. The protocol only validates and settles transactions if the execution price remains within the asymmetric corridor relative to the current Index value:

$$BSSZ_{Range} = [I_t - 10\%, I_t + 20\%]$$

This constraint is absolute and cannot be overridden by any market participant, governance vote, or external instruction.
