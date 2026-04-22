# The BlackSlon Settlement Zone Token
## A Utility Token for Energy Settlement

---

> **Key Regulatory Position:** BSSZ qualifies as a utility token under MiCA, not an asset-referenced token (ART)
> **Core Function:** Provides settlement rights within a defined pricing corridor, not price exposure

---

## What BSSZ Is Not

The BSSZ token is **not** a price tracker. It does not:

- Mirror the spot price of electricity or natural gas
- Give its holder exposure to energy markets
- Make promises about the future price of power

What it does is far more specific and far more useful: **it gives its holder the right to settle an energy supply obligation within a defined pricing corridor**, anchored to the two-year forward price of European wholesale energy at the moment of issuance.

---

## Utility Token vs Asset-Referenced Token

This distinction **between a token that tracks a price and a token that settles an obligation** is the reason BSSZ qualifies as a utility token under MiCA rather than an asset-referenced token.

| Token Type | Value Source | Claims | Classification |
|------------|--------------|--------|----------------|
| **ART** | Reference assets pool | Claims on underlying assets | Asset-Referenced Token |
| **Utility Token** | Platform service/function | Access to specific protocol function | Utility Token |

**BSSZ provides access to one function:** the ability to discharge a two-year energy supply commitment at a price agreed at inception, within a corridor maintained by the protocol.

The BSSZ token is the instrument through which an end customer discharges its financial obligation under a two-year energy supply agreement. The physical energy flows from the retailer's supply portfolio to the customer's meter. The financial obligation that energy creates is extinguished by transferring tokens — not fiat — to the retailer, who redeems them through the protocol at the prevailing in-corridor rate.

*To jest precyzyjniejsze bo rozdziela dwa przepływy:
Fizyczny — energia płynie od retailera do klienta przez sieć.
Finansowy — zobowiązanie finansowe klienta wobec retailera jest gaszone tokenem, a retailer umarza token w protokole za gotówkę.
Token nie "settles energy" — token discharges a financial obligation która powstaje z dostawy energii. To ważne rozróżnienie regulacyjne, bo pokazuje że BS operuje wyłącznie w warstwie finansowej, nigdy w warstwie fizycznej*

---

## How the Retail Energy Settlement Model Works

### The Conventional Flow
```
Licensed Retailer <-> End Customer
- Monthly invoices in fiat currency
- Retailer bears price risk
- Customer exposed to spot volatility
```

### The BSSZ-Enabled Flow
```
Licensed Retailer <-> End Customer
- Customer acquires BSSZ tokens at contract outset
- Tokens used to discharge monthly settlement obligations
- Price anchored to BSEI forward curve
```

---

### Token Acquisition and Pricing

The customer purchases tokens at a price anchored to **BSEI** (BlackSlon Settlement Energy Index), derived from the two-year forward price of:

- **TTF** for natural gas
- **EPEX Cal+2** for power

The pricing corridor defines the settlement range:
```
Floor: BSEI minus 10%
Cap:   BSEI plus 20%
```

Because **backwardation is a structural feature** of European energy forward curves, this anchor price is typically below current spot. The customer locks in a price reflecting the market's expectation of lower future energy costs.

---

### Retailer's Position

The retailer accepts BSSZ tokens as settlement because:

1. **Token represents claim on protocol's reserve** - fully collateralised position
2. **Redeemable anytime** for fiat at prevailing corridor rate
3. **No meaningful token price risk** - receives tokens, redeems promptly
4. **Backwardation premium becomes structural margin** - difference between spot price paid for wholesale energy and forward-anchored price embedded in token

The retailer's margin is **locked in at contract inception** and protected from spot volatility for the full two-year term.

---

## BlackSlon Protocol's Role

BlackSlon's role is **narrow, specific, and infrastructure-like**:

### What BlackSlon Does:
- **Issues BSSZ tokens** against fully collateralised reserves
- **Maintains pricing corridor** by monitoring BSEI and adjusting floor/cap parameters
- **Redeems tokens** presented by retailers or any holder at prevailing in-corridor rate
- **Settles in euro or approved stablecoins** within T+2 business days
- **Hedges delta exposure continuously** through prime brokerage with regulated commodity dealer

### What BlackSlon Does NOT:
- Supply energy
- Hold energy
- Enter into bilateral supply agreements with end customers or retailers
- Speculate on energy prices
- Take directional positions
- Have preferred counterparties

---

## Reserve Architecture

Every token in circulation is **backed one-for-one** by reserve assets held in segregated accounts, verified in real time by on-chain **Proof of Reserve**.

The pricing corridor is maintained according to rules defined in the **BSSZ Protocol Rulebook** - a public, immutable document governing all participants equally.

---

## Why Backwardation Makes Both Parties Want to Participate

European wholesale energy markets have traded in **structural backwardation** for most of the past decade, with intermittent exceptions during supply shock events.

In backwardation:
- **Two-year forward price < Current spot price**

### Customer Benefits:
- Locks in price **below current spot**
- Pays less than rolling spot-linked tariff in expectation
- Protected from spot volatility

### Retailer Benefits:
- Prices supply agreement against two-year forward
- Hedges wholesale procurement accordingly
- Captures carry between forward and spot as margin
- Margin protected by fixed-price token settlement for full term

**Both parties benefit from the same structural feature of the market.** The token is simply the instrument through which that benefit is made transferable, liquid, and verifiable.

---

## Key Regulatory Defense Points

### 1. Clear Role Separation
- **BlackSlon:** Party to token agreement, holds MiCA licence
- **Retailer:** Party to energy agreement, holds energy supply licence
- **No scope overlap** between regulatory domains

### 2. Utility Token Defense by Function
Regulator asks: *"What does this token provide?"*

**Answer:** *"Right to settlement within corridor, not right to energy or participation in assets."*

Token provides access to **protocol settlement mechanism** - this is a service, not asset exposure.

### 3. Shared Backwardation Benefits
- **Customer:** Pays less than spot
- **Retailer:** Earns margin
- **BlackSlon:** Earns tokenization spread

**All parties sit on the same side of the market's term structure.**

---

## Architecture Summary

```
Energy flows through retailers
Value flows through tokens
Protocol maintains full reserve coverage
Protocol carries zero proprietary risk
```

This architecture makes the **utility token classification defensible**:

- Token provides access to settlement mechanism
- Mechanism operated by infrastructure protocol
- Protocol maintains full reserve coverage and zero proprietary risk
- Energy flows through licensed retailers
- Value flows through tokens

---

*Document: BSSZ Utility Token Analysis · BlackSlon Protocol · Regulatory Position*
