# BlackSlon Documentation - Consistency Review & Proposed Corrections

**Version:** 1.0
**Date:** April 2026
**Scope:** Cross-document audit of WP v18, Technical Specification v2.0, Regulatory Framework v1.1

---

## Documents Audited

1. `BlackSlon_Energy_WP_v18.md` - Public narrative white paper (~67 KB)
2. `BlackSlon_Technical_Specification_v2.0.md` - Technical reference (~27 KB)
3. `BlackSlon_Regulatory_Framework_v1.1.md` - Regulatory filing document

---

## 1. CRITICAL - Character Encoding Issues

**Problem:** During creation, several special characters were stripped or corrupted across all three documents. This is the most visible issue and should be fixed before publication.

### 1.1 Euro Symbol (€) Missing
**Current state:** All three documents use `BSR` instead of `€BSR`, and `eEURO` / `EUR` inconsistently.

**User source material uses:**
- `€BSR` (with euro prefix) for the Protocol Reserve Token
- `eEURO` for the settlement stablecoin
- `€` for all monetary values (e.g., `€250 billion`, `€3 million`, `€50,000`)

**Proposed fix:** Global find-and-replace in all three documents:
- `BSR` → `€BSR` (where referring to the token, NOT in formulas like `B_auto` or `S_BSR`)
- Monetary values: prefix with `€` (e.g., `250 billion` → `€250 billion`)
- Keep `BSEI`, `BSSZ`, `BS-P`, `BS-G`, `BSR-SR` as-is (these are acronyms, not the token itself)

### 1.2 Polish/European Diacritics Stripped
| Current (broken) | Correct |
|------------------|---------|
| `Wodowa` | `Włodawa` |
| `Pozna` | `Poznań` |
| `Puawy` | `Puławy` |
| `Urzd Regulacji Energetyki` | `Urząd Regulacji Energetyki` |
| `Energetick regulan ad` | `Energetický regulační úřad` |
| `Direction gnrale de l'nergie` | `Direction générale de l'énergie` |
| `Commission de Rgulation de l'nergie` | `Commission de Régulation de l'Énergie` |
| `Autorit di Regolazione` | `Autorità di Regolazione` |
| `5 EnWG` (in Germany section) | `§5 EnWG` (section symbol) |

**Proposed fix:** Single review pass through all three docs, replacing accented characters back to proper Unicode.

### 1.3 Arrow Characters
**Current:** `|` pipes used where source had `→` or `↓` arrows in the architecture diagrams.
**Proposed:** Restore arrows in the Ecosystem Architecture diagram (WP Section 4) and Tech Spec Section 1.3.

---

## 2. INCONSISTENCIES Between Documents

### 2.1 V2P Activation Timing
- **WP Section 3 (Physical Market Tether):** "In Phase 2, BS-P and BS-G tokens become redeemable..."
- **Regulatory Section 9 Roadmap:** BNetzA operational from Month 3, V2P in Germany from Month 3
- **Technical Spec Section 11.1:** Three conditions for V2P activation (licensed retailer, DSO agreements, smart metering) - no phase distinction

**Contradiction:** WP implies V2P is a future phase; Regulatory shows it starting Month 3.

**Proposed fix:** Remove "Phase 2" language from WP Section 3. Replace with:
> "BS-P and BS-G tokens are redeemable for physical energy delivery in any market where V2P activation conditions have been satisfied (licensed retailer operational, DSO/TSO agreements executed, smart metering integrated). Activation is market-by-market, not a protocol-wide phase."

### 2.2 Intelligence Paid Tier Pricing
- **WP Section 4 (Ecosystem Architecture):** `9.99/month`
- **Technical Spec Constants Reference:** `9.99/month`
- **User source material:** `€9.99/month`

**Proposed fix:** All occurrences → `€9.99/month`.

### 2.3 Audit Cost Disclosure
- **Technical Spec Section 14.3:** Explicit USD figures (`$100-150K` OpenZeppelin, `$80-120K` Trail of Bits, `$50-80K` Certora)
- **WP:** No cost figures (appropriate for public doc)
- **Regulatory:** No cost figures

**Observation:** Audit costs in Tech Spec v2.0 are fine for internal/due-diligence distribution but may be sensitive. Consider whether a public Tech Spec version should redact these.

**Proposed fix:** Create two-tier Tech Spec: `v2.0-public` (redacted costs) and `v2.0-confidential` (current version). Optional.

### 2.4 Block 07 (Composability Layer) vs WP Section 9
The user has a separate `BLOCKS/Block 07 - Composability Layer.md` file containing the detailed ONDO principle analogy text. WP Section 9 summarises this but does not reference Block 07.

**Proposed fix:** Add a cross-reference note at end of WP Section 9:
> "Full BS-P/G composability specification: see Block 07 - Composability Layer."

### 2.5 H_user Health Factor Formula - Display
- **WP Section 12:** Prose description only
- **Technical Spec Section 5.2:** `H_user = Equity_total / (Sum(IM_j) × 0.5)`
- **Regulatory:** Not included (correct - not a regulatory matter)

**Observation:** Consistent. No fix needed.

### 2.6 H_solv Tier V Governance Vote
- **WP Section 12:** Not mentioned
- **Technical Spec Section 6.3:** "Tier V ... Governance vote 24h"
- **User source material:** "Full stop. BSR-SR T3. ADS Lock if ΔP_BSR ≤ -10%. Governance vote 24h."

**Proposed fix:** Add 24h governance vote mention to WP Section 12 Tier V description for completeness.

---

## 3. MISSING CONTENT (vs user source)

### 3.1 Iran 2026 Validation Data (Technical Spec)
User source material includes a detailed "Iran 2026 Validation" block showing:
```
TTF Physical Meridian over 9 trading days:
Day 1 (Feb 27): 31.96 EUR/MWh
Day 9 (Mar 9):  68.63 EUR/MWh (peak)
Crash day:      55.30 EUR/MWh (-19.5% intraday)

BlackSlon Settlement Anchor:
Day 1:  31.96 EUR/MWh
Day 9:  58.90 EUR/MWh (+84.3% from Day 1)
Crash:  60.20 EUR/MWh (barely moves - filter absorbs)

Total trend captured: +88% (vs +114.8% raw TTF)
Maximum single-day Anchor move: +7.9%
Crash day transmission: near zero
```

**Status:** Missing from current Technical Spec v2.0 (Section 6 area).

**Proposed fix:** Add as Section 2.5 "Iran 2026 Validation" in Tech Spec, immediately after Settlement Anchor formula.

### 3.2 Corridor per-business-day Clause
User source: "Single corridor per business day (00:00-23:59 CET). No intraday updates. Market isolation: Each market has independent Physical Meridian, Settlement Anchor, and BSSZ. Corridors do not mechanically link across markets."

**Status:** Missing from Tech Spec.

**Proposed fix:** Add to Tech Spec Section 2.4 (BSSZ Calculator).

### 3.3 WP Part V (Sections 13-14) - AI Architecture Compression
Current WP Section 13 ("BlackSlon AI - Three Modules") is very compressed (3 paragraphs). Section 14 (ISA) is fuller.

**Observation:** This is intentional narrative compression and may be adequate for a public WP. Full AI architecture lives in `quick-content/The Complete AI Architecture.md` and Tech Spec Section 10.

**Proposed action:** None required, but consider adding one diagram to WP Section 13 showing the three-layer authority hierarchy.

### 3.4 Retailer Worked Example (WP Section 8)
WP Section 8 describes retailer economics in prose but doesn't include a structured per-portfolio calculation.

**Proposed fix (optional):** Add box showing:
```
RETAILER ECONOMICS PER CONTRACT:
Cal+2 hedge cost:     38.00 EUR/MWh
Token-settled price:  40.00 EUR/MWh
Structural margin:     2.00 EUR/MWh × 2,400 MWh = 4,800 EUR
Credit risk:          ZERO (collateralised on-chain)
Procurement change:    NONE
```

---

## 4. TERMINOLOGY STANDARDISATION

Recommend locking the following terms for all future documents:

| Term | Correct Form | Do NOT Use |
|------|--------------|------------|
| Protocol Reserve Token | `€BSR` | `BSR`, `eBSR`, `$BSR` |
| Settlement currency | `eEURO` | `EURe`, `eEuro`, `eEUR` |
| Energy tokens | `BS-P` and `BS-G` | `BSP`, `BSG`, `bs-p` |
| Market suffixes | `BS-G-NL`, `BS-P-DE` | `BS.G.NL`, `BSG-NL` |
| Settlement benchmark | `BSEI` | `BS-EI`, `BSE-Index` |
| Price corridor | `BSSZ` | `BSS-Z`, `BlackSlon Zone` |
| Stability Reserve | `BSR-SR` or `€BSR-SR` | `BSR Reserve`, `SR` |
| Risk engines | `H_user` and `H_solv` | `Husr`, `Huser`, `HSolv` |
| Settlement mechanism | `V2P` (Virtual-to-Physical) | `V-2-P`, `v2p` |
| Account standard | `ERC-4337` | `EIP-4337`, `ERC4337` |
| Blockchain | `Arbitrum One` | `Arbitrum`, `ArbitrumOne`, `Arb1` |
| Chain security | `Ethereum Layer 2` | `L2 Ethereum`, `Ethereum L2 rollup` |

---

## 5. PROPOSED DOCUMENT ADDITIONS (Future Work)

### 5.1 Investor Deck (Executive Summary)
- **Length:** 10-15 slides
- **Audience:** VCs, strategic investors, prime broker partnerships
- **Content:** Key metrics from WP compressed: market size, failure analysis, solution, roadmap, €BSR economics
- **File:** `BlackSlon_Investor_Deck_v1.0.md`

### 5.2 Risk Disclosure Statement
- **Length:** 5-8 pages
- **Audience:** Retail participants (MiCA Article 25 compliance)
- **Content:** Plain-language risk warnings, worst-case scenarios, liquidation mechanics explained
- **File:** `BlackSlon_Risk_Disclosure_v1.0.md`

### 5.3 Prime Brokerage Term Sheet Template
- **Audience:** JPMorgan, StoneX, Marex negotiations
- **Content:** Commercial terms skeleton, ISDA Schedule preview, CSA parameters
- **File:** `BlackSlon_PB_TermSheet_v1.0.md`

### 5.4 Retailer Integration Guide
- **Audience:** Licensed energy retailers integrating V2P API
- **Content:** API spec, onboarding process, fee-sharing, operational SLAs
- **File:** `BlackSlon_Retailer_Integration_v1.0.md`

---

## 6. PRIORITY ACTIONS

**Must fix before publication (Priority 1):**
1. Restore `€` symbol prefix on all €BSR token references and monetary values
2. Restore Polish/European diacritics (Włodawa, Poznań, Puławy, URE full name, etc.)
3. Fix V2P "Phase 2" contradiction in WP Section 3 vs Regulatory roadmap

**Should fix before external review (Priority 2):**
4. Add Iran 2026 Validation data to Tech Spec
5. Restore arrows (→, ↓) in architecture diagrams
6. Add 24h governance vote to WP Section 12 Tier V description

**Nice to have (Priority 3):**
7. Cross-reference Block 07 from WP Section 9
8. Add retailer worked example to WP Section 8
9. Consider two-tier Tech Spec (public/confidential) for audit costs

---

## 7. OVERALL ASSESSMENT

**Strengths:**
- Three documents form a coherent, layered documentation set (narrative → technical → legal)
- Numerical parameters are consistent across all three (token supply 100M, fee tiers, 1:4 leverage, SIL 10%, H_solv tiers)
- Formulas match exactly between WP prose descriptions and Tech Spec mathematical forms
- Regulatory positions are conservative, well-argued, and cite specific MiCA/REMIT articles

**Weaknesses:**
- Character encoding loss (€, diacritics) affects professionalism
- One genuine logical contradiction (V2P Phase 2 vs Month 3 roadmap)
- Iran 2026 validation data is a powerful proof point missing from Tech Spec
- No investor-facing one-pager or risk disclosure derivative document yet

**Overall:** Documentation is **publication-ready after Priority 1 fixes**. Priority 2 and 3 items can be addressed in v18.1 / v2.1 / v1.2 revisions respectively.

---

**BlackSlon Consistency Review v1.0 | April 2026**
**Internal document. Not for external distribution.**
