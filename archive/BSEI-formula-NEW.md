## **BlackSlon Energy Indexes (BSEI): The Rolling Valuation & Risk Benchmark**

### 1. The Nature of the BSEI

The BlackSlon Energy Indexes (BSEI) are autonomous, volume-weighted benchmarks derived exclusively from executed transactions within the BlackSlon Protocol. Unlike traditional energy settlements that rely on static daily fixings, the BSEI is a Dynamic Index that reflects the continuous flow of internal market settlements.

### 2. The Calculation Engine: R-VWAP

The BSEI is calculated using a Rolling Volume-Weighted Average Price (R-VWAP) over a moving 24-hour window ($T_{24}$). This ensures that the Index remains stable and resistant to short-term manipulation or "Closing Shocks."

**The Formula:**

$$BSEI_{t} = \frac{\sum_{i=1}^{n} (Price_i \cdot Volume_i \cdot w_i)}{\sum_{i=1}^{n} (Volume_i \cdot w_i)}$$

**Definitions:**
- $n$: All transactions validated within the last 24-hour rolling window.
- $Price_i \cdot Volume_i$: The total value of each individual execution.
- $w_i$ (Time-Decay Weight): A decay factor that gives higher relevance to the most recent transactions, ensuring the index reflects current market momentum while preserving historical inertia.

**Sub-Component:** 

The Exponential Decay Function ($w_i$)
The weight of each transaction $w_i$ is determined by its age relative to the current moment ($t_{now}$), governed by the following exponential decay formula:
$$w_i = e^{-\lambda \cdot (t_{now} - t_i)}$$
Where:
- $\Delta t$ ($t_{now} - t_i$): The time elapsed since the transaction was executed (measured in hours).
- $\lambda$ (Decay Constant): A calibration parameter defined by the Half-life ($t_{1/2}$) of the transaction's influence.
The Half-life Logic:
To ensure the BSEI reflects a 24-hour rolling window with a focus on recent velocity, the protocol sets a 6-hour Half-life. This means a transaction executed 6 hours ago carries 50% of its original weight, while a trade from 24 hours ago retains only 6.25% of its influence.

<br>

### 3. Systemic Role: Transparent and predictable Information & Risk Management

As an autonomous benchmark, the BSEI maintains its own calculation logic while remaining strictly governed by the systemic boundaries of the BSSZ and delivering two essential ecosystem services

**Informational Transparency**: It acts as the "BlackSlon Benchmark" for the Virtual Energy Markets, providing participants with a high-fidelity reference for real-time position and risk management. It enables precise monitoring and management of the whole portfolio — both BlackSlon Energy tokens (€BSR/BS-P/G) and eEURO.

**Dynamic Risk Guard**: It serves as the primary input for the H-Factor and Margin Requirements. By using a rolling average, the protocol eliminates artificial liquidation spikes, allowing the Risk Management system to respond to real market trends rather than temporary volatility.