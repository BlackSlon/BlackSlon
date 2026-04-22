# BlackSlon Energy Protocol

**Regulatory Framework v1.1**
**April 2026**

**For:** Bank of Lithuania · ACER · National Competent Authorities · Legal Counsel

---

## Table of Contents

1. Executive Summary - Regulatory Position
2. MiCA Classification Analysis
3. REMIT Analysis - Perpetual Token Exemption
4. KYC/AML Framework
5. Energy Supply Licensing - Jurisdiction by Jurisdiction
6. Prime Broker Regulatory Interface
7. Governance and Consumer Protection
8. Proactive Regulatory Engagement Strategy
9. Licensing Roadmap and Timeline

---

## 1. Executive Summary - Regulatory Position

The BlackSlon Ecosystem operates at the intersection of two regulated domains: crypto-asset services (MiCA) and wholesale energy markets (REMIT). The regulatory position of each instrument and activity is defined with precision below.

**Core regulatory thesis:** BS-P and BS-G tokens are utility tokens under MiCA Title II. They are not asset-referenced tokens, not e-money tokens, and not financial instruments under MiFID II. They are not wholesale energy products under REMIT because they lack the defining characteristics of REMIT-regulated instruments: no delivery point, no delivery date, no delivery period. REMIT obligations arise only at the moment of V2P conversion into a physical supply contract - and then apply to the supply contract, not to the token.

**Blockchain:** Arbitrum One (Ethereum Layer 2). Smart contracts audited by OpenZeppelin, Trail of Bits, and Certora prior to Protocol launch. All Protocol constants and Vault mechanics publicly verifiable on-chain.

**Primary regulatory filing:** CASP licence application with the Bank of Lithuania under MiCA Article 59. Single EU licence provides passport to operate in all 27 EU member states for crypto-asset services. Energy supply licences obtained jurisdiction by jurisdiction as a separate regulatory track.

---

## 2. MiCA Classification Analysis

### 2.1 Applicable Framework
Regulation (EU) 2023/1114 (MiCA) entered into application for utility tokens and asset-referenced tokens on 30 December 2024. BlackSlon operates under MiCA as its primary regulatory framework for all crypto-asset activities.

### 2.2 BSR - Native Utility Token (MiCA Title II)
**Classification:** Utility Token pursuant to MiCA Article 3(1)(9).

**Basis:** BSR does not purport to maintain a stable value by reference to any fiat currency, commodity, or basket of assets. Its value is derived mathematically from the Protocol Vault's net asset value per the formula:
```
P_BSR = (V_eEURO - |ProfitLoss_ITM|) / (S_BSR × RR)
```
This is a real-time valuation formula that produces a floating price reflecting ecosystem performance - not a stability mechanism.

**Not ART:** MiCA Article 3(1)(6) defines an ART as a token that "purports to maintain a stable value." BSR makes no such purport. Its price fluctuates with Protocol Vault performance.

**Not EMT:** BSR is not pegged 1:1 to any official currency.

**Not a financial instrument:** BSR does not represent ownership in an entity, does not grant profit-sharing rights, and does not constitute a transferable security, money-market instrument, or derivative under MiFID II Annex I Section C.

**Function:** BSR serves as the native collateral instrument of the Protocol, provides trading fee discounts through the fee structure, and functions as the governance token through which Protocol commercial success accrues to long-term holders through the burn mechanism.

**Short selling prohibition:** The Protocol's immutable prohibition on BSR short selling is consistent with MiCA Article 23 obligations on issuers to maintain market integrity.

**Required action:** Notification to Bank of Lithuania (CASP) with White Paper published at least 20 working days before offer to the public, per MiCA Article 8.

### 2.3 eEURO - Electronic Money Token (MiCA Title IV)
**Classification:** Electronic Money Token pursuant to MiCA Article 3(1)(7).

The BlackSlon Protocol does not issue eEURO. It accepts and uses eEURO (EURe by Monerium AS, or EURC by Circle Internet Financial) as the settlement currency of the ecosystem. The issuer's MiCA Title IV authorisation governs the eEURO instrument. BlackSlon's use of eEURO as settlement currency does not create additional EMT obligations for the BlackSlon entity.

### 2.4 BS-P and BS-G - Utility Tokens (MiCA Title II)
**Classification:** Utility Tokens pursuant to MiCA Article 3(1)(9).

**Basis:** BS-P and BS-G tokens provide access to a specific service on the BlackSlon Protocol - the ability to hold, trade, and redeem the economic value of European power and natural gas market exposure within the BSSZ corridor. They are accepted by integrated licensed retailers as payment for energy supply, and redeemable through the V2P mechanism for physical energy delivery where V2P is activated.

**Not ART - Primary Legal Argument:** MiCA Article 3(1)(6) defines an ART as a token that "purports to maintain a stable value." BS-P and BS-G tokens move freely within the BSSZ corridor through supply and demand - they do not purport to maintain any stable value. The BSSZ corridor defines permissible price range - it does not peg the token to a fixed value.

**Not ART - Secondary Legal Argument:** Even if the BSSZ corridor were construed as a stability mechanism (which it is not), the reference would be the Settlement Anchor - a weighted basket of spot and forward hub prices that itself fluctuates with market conditions. This differs fundamentally from an ART referencing a fixed fiat value or static commodity price.

**Not ART - Precedent:** Energy Web Token (EWT) was registered in the ESMA MiCA register as a utility token in November 2025, establishing precedent for energy-related tokens under MiCA Title II.

**Not MiFID II financial instrument:** BS-P and BS-G tokens do not constitute transferable securities, money-market instruments, or derivatives under MiFID II Annex I Section C. They represent a right to access the BlackSlon Protocol's settlement mechanism - not a derivative claim on energy commodity price movements.

**Not commodity derivatives under EMIR:** BS-P and BS-G tokens are not OTC derivatives. They are perpetual utility tokens with no fixed settlement date, no notional amount denominated in a reference commodity, and no cash settlement formula based on commodity price differential.

**Physical delivery rights - conditional:** Physical redemption rights activate only upon V2P activation per market. Until activation, tokens do not constitute delivery obligations. Clearly disclosed in the White Paper: "No participant acquires a token under a representation of immediate physical redeemability in any market where activation conditions have not yet been satisfied."

**Required action:** White Paper notification to Bank of Lithuania at least 20 working days before offer to the public, per MiCA Article 8.

### 2.5 Significant Token Assessment
As BS-P, BS-G, and BSR are classified as utility tokens (not ARTs), the significant token regime under MiCA Articles 39-40 does not apply. The Protocol does not issue eEURO and is not subject to significant EMT assessment.

**Regulatory Adaptation Clause:** In the event of reclassification by ESMA or the relevant NCA, the Protocol Rulebook obligates all participants to renegotiate terms within 90 days of any official reclassification.

---

## 3. REMIT Analysis - Perpetual Token Exemption

### 3.1 Applicable Framework
Regulation (EU) 1227/2011 on Wholesale Energy Market Integrity and Transparency (REMIT), as amended by Regulation (EU) 2024/1106, applies to wholesale energy products traded in the EU.

### 3.2 Definition of Wholesale Energy Product
REMIT Article 2(4) defines a wholesale energy product as:
- (a) contracts for the supply of electricity or natural gas with delivery in the Union;
- (b) derivatives relating to electricity or natural gas produced, traded or delivered in the Union;
- (c) contracts for the supply and distribution of electricity or natural gas under which more than 600 GWh per year can be delivered to a final customer.

### 3.3 BS-P and BS-G - Analysis Against REMIT Definition

**Limb (a) - Supply contracts:** BS-P and BS-G tokens are not supply contracts. A supply contract under REMIT requires: identification of a delivery point, a specified delivery period (start and end date), and a specified volume profile. BS-P and BS-G tokens have none of these characteristics. They are perpetual instruments with no delivery point, no delivery date, and no delivery volume profile.

ACER TRUM mandatory reporting fields include: delivery point, delivery start date, delivery end date, delivery period type, load type, and capacity. A BS-P or BS-G token transaction cannot be mapped to any of these fields because the information does not exist for this instrument type. It is not that the information is unavailable - it structurally does not apply.

**Limb (b) - Derivatives:** BS-P and BS-G tokens are not derivatives. A derivative requires an underlying reference asset, a notional amount, and a settlement mechanism at a specified future date. BS-P and BS-G tokens have no specified settlement date - they are perpetual.

**Limb (c) - Large supply contracts:** Inapplicable. BS-P and BS-G tokens do not represent supply contracts to final customers capable of delivering 600 GWh per year.

### 3.4 The V2P Conversion Point - Where REMIT Applies
When a BS-P or BS-G token holder activates the Virtual-to-Physical Swap with a licensed retailer, a physical supply contract is created. That supply contract has: an identified delivery point (meter point), a specified delivery period, and a consumption profile.

**Final consumer exemption (REMIT Article 1(4)):** Supply contracts with final customers consuming less than 600 GWh per year are exempt from REMIT. Household and SME supply contracts activated through V2P are exempt.

**Industrial supply contracts:** Supply contracts with industrial customers above the 600 GWh threshold are reportable to ACER under REMIT. BlackSlon's licensed supply entities register with ACER CEREMP and report eligible supply contracts as required.

The token is not reported - the supply contract is. The BS-P or BS-G token remains a MiCA utility token throughout. REMIT obligations attach to the supply contract, not to the token.

### 3.5 Structural Analogy
The legal category closest to BS-P and BS-G tokens under existing EU law is prepaid energy credit vouchers - instruments providing the right to access energy value at an unspecified future date, at an unspecified delivery point, for an unspecified consumption profile. Prepaid electricity cards sold in EU retail markets are not REMIT-reportable. The structural similarity supports the non-REMIT classification.

### 3.6 Proactive ACER Engagement
Prior to Protocol launch, BlackSlon will submit an informal consultation request to ACER asking for confirmation that perpetual, delivery-point-free energy utility tokens do not constitute wholesale energy products under REMIT. The consultation will reference ACER's own guidance on REMIT transaction reporting fields and the structural distinction between BS-P/BS-G tokens and supply contracts or derivatives.

---

## 4. KYC/AML Framework

### 4.1 Applicable Framework
The BlackSlon entity is subject to EU Anti-Money Laundering Directives (AMLD5/AMLD6) as a CASP under MiCA. MiCA Article 72 obliges CASPs to apply customer due diligence measures consistent with AML obligations.

### 4.2 Three-Tier Verification Model

| Tier | Participant Type | KYC Requirements | AML Monitoring |
|------|------------------|------------------|----------------|
| 1 | Retail users | Identity verification (name, DOB, address, government ID) · Liveness check | Automated on-chain screening · Wallet clustering · Velocity monitoring |
| 2 | Institutional / corporate | Full UBO identification · Source of funds · Corporate registry · PEP screening | Real-time on-chain + off-chain monitoring · Enhanced surveillance |
| 3 | Prime Broker / OTC counterparties | Full institutional KYC · REMIT compliance verification · ISDA counterparty verification | Continuous monitoring · ACER CEREMP reporting |

### 4.3 MiCA Reporting Thresholds
Consistent with MiCA Article 72 and Regulation (EU) 2023/1113:
- Transfers above 1,000 EUR: sender and beneficiary information collected and transmitted
- Transfers above 10,000 EUR: enhanced due diligence triggered
- All transfers: screened against EU consolidated sanctions list, OFAC SDN list, and relevant national sanctions lists

### 4.4 Transaction Monitoring - Red Flags

**STRUCTURING:**
Multiple deposits/withdrawals just below reporting thresholds within 24 hours from same or linked accounts

**LAYERING:**
Rapid cycling between eEURO and BSR without apparent trading purpose

**VELOCITY ANOMALY:**
Sudden large position openings inconsistent with account history and stated occupation/business profile

**WALLET RISK SIGNALS:**
Transactions involving wallets flagged by Chainalysis, Elliptic, or equivalent providers as associated with sanctioned entities, ransomware, or dark-market activity

**CROSS-MARKET COORDINATION:**
Correlated position changes across multiple BlackSlon markets simultaneously - potential market manipulation

### 4.5 Data Retention
All KYC documentation and transaction records retained for minimum 5 years from later of: account closure date or last transaction date. Extended to 7 years where required by national AML law.

---

## 5. Energy Supply Licensing - Jurisdiction by Jurisdiction

### 5.1 Germany
- **Regulator:** Bundesnetzagentur (BNetzA)
- **Requirement:** Notification under 5 EnWG - statutory notification, not a licence. No regulatory approval required before operations begin.
- **Timeline:** 2-4 weeks from notification filing.
- **DSO guarantee:** Bank guarantee or cash deposit per DSO zone. Estimated: 50,000-500,000 EUR per zone.

### 5.2 United Kingdom
- **Regulator:** Office of Gas and Electricity Markets (Ofgem)
- **Requirement:** Gas Supplier Licence and/or Electricity Supplier Licence. Fastest route: acquisition of existing licensed entity (change of control).
- **Timeline:** 4-8 weeks from acquisition completion to Ofgem approval.
- **BSC/UNC credit cover:** 100,000-500,000 GBP per supply type.
- **Post-Brexit note:** UK operates under domestic retained EU law equivalent. MiCA does not apply in the UK. Separate FCA cryptoasset registration required for crypto-asset business in the UK.

### 5.3 Poland
- **Regulator:** Urzd Regulacji Energetyki (URE)
- **Requirement:** Koncesja for gas supply (OGD) and/or electricity supply (OEE). Separate licences per energy type.
- **Timeline:** 3-6 months from application to licence grant.
- **TGE membership:** Required for exchange-traded hedging and BS-G-PL/BS-P-PL market data.
- **DSO guarantees:** PLN 500,000-PLN 5,000,000 per network operator.

### 5.4 Netherlands
- **Regulator:** Autoriteit Consument en Markt (ACM)
- **Requirement:** Supplier licence (vergunning leverancier).
- **Timeline:** 3-6 months. Fee: approximately 1,199 EUR.

### 5.5 Austria
- **Regulator:** Energie-Control Austria (E-Control)
- **Requirement:** Registration as energy supplier (Lieferant).
- **Timeline:** 4-8 weeks.

### 5.6 Czech Republic
- **Regulator:** Energetick regulan ad (ERU)
- **Requirement:** Licence for gas trading and/or electricity trading.
- **Timeline:** 3-6 months.

### 5.7 France
- **Regulator:** Direction gnrale de l'nergie et du climat (DGEC) and Commission de Rgulation de l'nergie (CRE)
- **Requirement:** Authorisation from DGEC for gas supply. Declaration to CRE for electricity supply.
- **Timeline:** 10-13 months - longest in target markets. Filed from Month 1.

### 5.8 Italy
- **Regulator:** Autorit di Regolazione per Energia Reti e Ambiente (ARERA) and Gestore dei Mercati Energetici (GME)
- **Requirement:** ARERA authorisation for retail supply. GME membership for market access.
- **Timeline:** 4-8 months.

### 5.9 Ukraine
- **Regulator:** National Energy and Utilities Regulatory Commission (NEURC)
- **Requirement:** Local legal entity required. NEURC licence for gas and/or electricity trading.
- **Timeline:** 9-12 months from entity incorporation.
- **Specific risks:** Conflict-related FX controls, NEURC processing delays, banking access constraints. Enhanced credit provisions apply.

### 5.10 Licensing Summary

| Jurisdiction | Type | Regulator | Timeline | Notes |
|--------------|------|-----------|----------|-------|
| EU-wide (crypto) | CASP (MiCA Art. 59) | Bank of Lithuania | 3-6 months | 27-market passport |
| Germany | 5 EnWG notification | BNetzA | 2-4 weeks | No approval needed |
| Austria | Supplier registration | E-Control | 4-8 weeks | Fast track |
| UK | Supplier licence (acquisition) | Ofgem | 4-8 weeks | FCA registration separate |
| Netherlands | Supplier licence | ACM | 3-6 months | ~1,200 EUR fee |
| Czech Republic | Trading licence | ERU | 3-6 months | Standard process |
| Poland (gas) | OGD koncesja | URE | 3-6 months | TGE membership parallel |
| Poland (power) | OEE koncesja | URE | 3-6 months | TGE membership parallel |
| Italy | ARERA + GME | ARERA/GME | 4-8 months | Dual requirement |
| France | DGEC authorisation | DGEC/CRE | 10-13 months | Longest lead time |
| Ukraine | NEURC licence | NEURC | 9-12 months | Conflict-related risks |

---

## 6. Prime Broker Regulatory Interface

### 6.1 ISDA Master Agreement
The relationship between the BlackSlon Protocol entity and the prime broker is governed by an ISDA Master Agreement (2002 version) with a Schedule tailored to energy derivative instruments. The Credit Support Annex (CSA) defines eligible collateral, variation margin settlement frequency (daily, T+1), threshold amounts, and minimum transfer amounts.

### 6.2 EMIR Classification
The prime broker is a Financial Counterparty (FC) under EMIR. BlackSlon's EMIR classification (NFC or NFC+) depends on notional hedge volumes relative to clearing thresholds. Legal assessment required at time of ISDA execution.

### 6.3 MiFID II - Ancillary Activity
BlackSlon's hedging activities are directly related to its commercial energy token market-making activity. The ancillary activity exemption under MiFID II Article 2(1)(j) may apply. Assessment required based on notional volumes relative to overall European energy market volumes.

### 6.4 REMIT Reporting for Physical Hedges
Physical hedging transactions executed by the prime broker on ICE and EEX are auto-reported by the relevant exchanges under REMIT. BlackSlon's own OTC positions (if any) reported through a Registered Reporting Mechanism (RRM) within T+1 deadline.

---

## 7. Governance and Consumer Protection

### 7.1 MiCA Consumer Protection Obligations
**White Paper:** Published at least 20 working days before any offer to the public. Updated upon material changes per MiCA Article 25 within 20 working days.

**Marketing communications:** All marketing materials clearly distinguish between the three token types (BSR, eEURO, BS-P/BS-G) and their respective risk profiles. No marketing communication suggests guaranteed returns or implies capital protection.

**Complaints handling:** Dedicated complaints procedure per MiCA Article 71. Response within 15 business days. Escalation to Bank of Lithuania available.

**Conflicts of interest:** BlackSlon AI module separation (Protocol AI / Prime Broker Mandate Manager / ISA) documented and disclosed. Cryptographically verifiable on-chain that oracle module never influenced trading decisions.

### 7.2 V2P Consumer Protection
**Clear V2P activation disclosure:** All marketing materials and the BlackSlon application interface clearly display V2P activation status per market. Participants cannot acquire tokens under a representation of physical redeemability in markets where V2P is not yet activated.

**Energy supply contract terms:** Supply contracts comply with applicable national consumer energy supply regulations in each jurisdiction, including cooling-off periods, price transparency requirements, and switching rights.

**Smart metering data:** Accessed with explicit participant consent under GDPR Article 6(1)(b). Used solely for V2P reconciliation. Retention limited to supply contract duration plus applicable statutory periods.

### 7.3 GDPR Compliance
BlackSlon entity is a data controller under GDPR Regulation (EU) 2016/679. Data Protection Officer appointed. Lawful bases:
- Contract performance (Art. 6(1)(b)): KYC, account management, V2P reconciliation
- Legal obligation (Art. 6(1)(c)): AML/KYC, tax reporting
- Legitimate interests (Art. 6(1)(f)): Fraud prevention, security

Cross-border transfers to prime broker under Standard Contractual Clauses (SCCs) or equivalent adequacy mechanism.

### 7.4 ISA Regulatory Position
ISA operates as execution layer for client-defined rules - not as a discretionary portfolio manager. This is the architectural boundary that allows ISA to operate without a MiFID II portfolio management licence.

**PERMITTED (without MiFID II licence):**
- Executes rules explicitly configured and approved by participant
- Provides market information and data
- Explains protocol mechanics
- Surfaces options for participant decision

**NOT PERMITTED (would require licence):**
- Discretionary investment decisions
- Managing assets without explicit instruction
- Overriding participant-defined parameters

Every automation rule: explicitly defined by participant, explicitly approved at configuration time, executable only within set parameters, logged and notified every execution, revocable at any time.

---

## 8. Proactive Regulatory Engagement Strategy

### 8.1 Bank of Lithuania - Primary Engagement
**Timeline:** CASP application filed Month 1.

**Key discussion points:**
- Utility token classification of BS-P and BS-G (non-ART basis - price moves freely within BSSZ corridor, no stable peg)
- Perpetual token structure and absence of REMIT characteristics
- AI module separation as conflict-of-interest mitigation (cryptographically verifiable)
- Prime broker ISDA arrangement as financial guarantee mechanism
- Account Abstraction (ERC-4337) as participant protection mechanism

### 8.2 ACER - REMIT Consultation
**Timeline:** Informal consultation submitted prior to Protocol launch (Month 2).

**Consultation question:** "Does a perpetual, delivery-point-free energy utility token (as described in the attached White Paper) constitute a wholesale energy product under REMIT Article 2(4)? If so, please identify the applicable limb and the specific mandatory reporting fields that would apply to token transactions."

**Expected outcome:** Confirmation that BS-P/BS-G token transactions do not constitute reportable wholesale energy products under REMIT. If ACER responds otherwise, BlackSlon will engage to seek formal guidance on the applicable reporting framework before launch.

### 8.3 National Competent Authorities
Prior to activating licensed supply operations in each jurisdiction, BlackSlon will proactively brief the relevant NCA on: Protocol structure and token classification, V2P mechanism and its regulatory status at conversion, AI-operated mandate execution model and compliance safeguards.

### 8.4 Regulatory Sandbox Applications
Where available:
- **FCA Regulatory Sandbox (UK):** BS-P-UK and BS-G-UK operations
- **Bank of Lithuania Regulatory Sandbox (EU):** CASP-related activities

Sandbox participation is sought to enable early regulatory dialogue - not as a condition for operations.

---

## 9. Licensing Roadmap and Timeline

```
MONTH 1:
  - CASP application filed - Bank of Lithuania
  - White Paper published (20 working days notice begins)
  - BNetzA notification filed - Germany
  - E-Control registration filed - Austria
  - ACER informal consultation submitted
  - ISDA term sheet negotiated with prime broker
  - UK Ofgem vehicle acquisition initiated
  - France DGEC application filed (long lead time)
  - Smart contract audit firms engaged

MONTH 2:
  - 20 working days notice expires - Protocol launch permitted
  - Poland URE applications filed (OGD + OEE)
  - Netherlands ACM application filed
  - Czech ERU application filed
  - Ukraine LLC incorporated
  - ISDA Master Agreement and CSA executed
  - UK Ofgem change-of-control application submitted
  - Smart contracts on Arbitrum Sepolia testnet

MONTH 3:
  - PROTOCOL LIVE - Arbitrum One mainnet
  - BS-G-NL and BS-P-DE operational
  - BNetzA operational - Germany licensed supply begins
  - E-Control complete - Austria licensed supply begins
  - ACER REMIT consultation response received (expected)
  - Immunefi bug bounty activated

MONTH 4:
  - UK Ofgem approval - UK licensed supply begins

MONTH 5-6:
  - Poland URE licences - BS-G-PL, BS-P-PL operational
  - Czech ERU licence granted
  - Chainlink feeds live (BS-G-NL/EUR, BS-P-DE/EUR)

MONTH 6-8:
  - CASP licence granted - Bank of Lithuania
  - EU 27-market passport activated
  - Netherlands ACM licence granted

MONTH 8-10:
  - Italy ARERA + GME

MONTH 9:
  - Ukraine NEURC licence (target)
  - Morpho + Clearpool integration live

MONTH 10-13:
  - France DGEC authorisation (target)
  - Aave governance proposal submitted
```

### Regulatory Risk Mitigation

**Risk 1 - MiCA reclassification of BS-P/BS-G as ART:**
- **Probability:** Low
- **Mitigation:** Pre-submission opinion letter from independent MiCA legal counsel. Proactive Bank of Lithuania engagement. Regulatory Adaptation Clause in Protocol Rulebook.

**Risk 2 - ACER REMIT classification of token transactions:**
- **Probability:** Low
- **Mitigation:** Proactive ACER consultation before launch. Clear architectural separation between token transactions (MiCA) and V2P supply contracts (REMIT). Compliance framework ready for supply contract reporting from Day 1.

**Risk 3 - UK FCA non-registration:**
- **Probability:** Medium (regulatory environment evolving)
- **Mitigation:** Ofgem energy supply licence provides basis for supply operations. FCA cryptoasset registration pursued in parallel. UK crypto operations limited until FCA status resolved.

**Risk 4 - Licensing delays in key markets:**
- **Probability:** Medium for France (10-13 months)
- **Mitigation:** Correlation-based pricing available for all markets from Day 1 regardless of licensing status. Revenue model does not depend on any single jurisdiction's licensed supply operations.

---

**BlackSlon Energy Protocol - Regulatory Framework v1.1 | April 2026**

**Prepared for submission to regulatory authorities. Not for public distribution.**

This document does not constitute legal advice. Independent legal counsel should be engaged in each jurisdiction prior to operations.

**© BlackSlon Ecosystem. All rights reserved.**
