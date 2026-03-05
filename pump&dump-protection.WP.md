### 1. Progressive Friction (Logarithmic b) ###

Rozdzielenie Ceny Egzekucji od Ceny Indeksu (BSPI). Musimy wprowadzić żelazną zasadę: Progressive Friction (Logarithmic b) działa na poziomie pojedynczej transakcji, a nie natychmiastowo na globalny rynek.
- Co płaci bot (Slippage): Kiedy bot próbuje otworzyć potężne LVOP (Long), uderza w ścianę płynności. Formuła $P = a \cdot e^{b \cdot S}$ nalicza mu progresywnie rosnącą cenę za każdą kolejną jednostkę w tym konkretnym zleceniu. Bot płaci koszmarnie wysoką średnią cenę za swoje wejście.
- Co widzi reszta rynku (EMA Stabilizer): Globalna cena BlackSlon Power Index (BSPI) – czyli ta, po której inni mogą sprzedawać – nie skacze natychmiast do poziomu, który wykreował bot. Tutaj do gry wchodzi Twój Stabilizer 'b' (EMA). BSPI reaguje z opóźnieniem. Jeśli bot podbił swoją transakcją cenę o 10%, globalny indeks (dzięki wygładzaniu EMA) drgnie w tej sekundzie np. tylko o 0.5%.

Zanim globalna cena BSPI urosłaby na tyle, by inni traderzy mogli zyskownie zrzucić swoje tokeny i wydrenować protokół, bot zostanie zmuszony do zamknięcia pozycji (lub zniszczą go opłaty Funding Rates), a cena BSPI powoli wróci do normy. Inni traderzy po prostu nie zdążą sprzedać na sztucznej górce, bo dla nich ta górka technicznie jeszcze nie istnieje.

### 2. Stabilizer 'b' (EMA) ###

### 3. Funding Rates ###

### 4. Time-Weighted Sentiment ###

### 5. Early Exit Penalty: High-Frequency Trading (HFT) Shield. ###

To protect the protocol from algorithmic manipulation, MEV (Maximal Extractable Value) bots, and flash-loan attacks, the system introduces a temporal friction layer known as the High-Frequency Trading (HFT) Shield.

While the BlackSlon Trading Zone (BSSZ) and the BlackSlon Energy Index (BSEI) formulas accurately reflect organic supply and demand, algorithmic actors often exploit deterministic pricing curves by executing instantaneous "pump & dump" arbitrage within a single block or a few minutes. To neutralize this threat without compromising the experience for genuine traders, the protocol enforces a strict time-based penalty.

How the Mechanism Works:

- The 1-Hour Time Lock: Any Long (LVOP) or Short (SVOP) position closed within 1 hour of its opening is automatically classified as high-frequency trading.

- Early Exit Penalty: Positions flagged by the HFT Shield incur an absolute 5.00% penalty fee, stacked directly on top of the standard trading fee determined by the user's €BSR stake.

- Economic Deterrent: Arbitrage bots operate on micro-margins. By enforcing a 1-hour exposure window, the attacker is forced to take on genuine market risk. If they attempt an immediate exit to secure an artificially generated price spike, the combined standard fee (e.g., 1.00% at the lowest BSR tier) plus the 5.00% penalty guarantees a mathematical net loss, making the attack financially unviable.

Value Accrual & Liquidity Subsidy:
The HFT Shield does not simply burn these penalty fees. 100% of the capital collected from early exits is instantly routed to the Protocol Treasury pool. In the rare event that malicious actors attempt to stress-test the protocol's liquidity, their capital is seamlessly converted into yield and deeper liquidity for legitimate, long-term participants.

### 6. Slip-Based Fees ###