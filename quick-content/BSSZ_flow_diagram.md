# BSSZ Flow Diagram — Architecture & Node Definitions

> **BSSZ Settlement Model · BlackSlon Protocol**
> This document contains the architecture diagram and detailed descriptions of each node in the BSSZ token settlement flow.

---

## Diagram

<p align="center">
<svg width="100%" viewBox="0 0 680 620" xmlns="http://www.w3.org/2000/svg" style="font-family: Arial, sans-serif;">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect x="40" y="40" width="160" height="64" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
  <text x="120" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#085041">End customer</text>
  <text x="120" y="85" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#0F6E56">Household or business</text>
  <rect x="480" y="40" width="160" height="64" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
  <text x="560" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#085041">Energy retailer</text>
  <text x="560" y="85" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#0F6E56">Licenced supplier</text>
  <line x1="200" y1="65" x2="478" y2="65" stroke="#1D9E75" stroke-width="1.2" marker-end="url(#arrow)"/>
  <rect x="265" y="48" width="150" height="20" rx="4" fill="white"/>
  <text x="340" y="62" text-anchor="middle" font-size="11" fill="#085041">BSSZ tokens (monthly settlement)</text>
  <line x1="478" y1="88" x2="202" y2="88" stroke="#888780" stroke-width="1" marker-end="url(#arrow)" stroke-dasharray="4 3"/>
  <rect x="265" y="91" width="150" height="20" rx="4" fill="white"/>
  <text x="340" y="105" text-anchor="middle" font-size="11" fill="#5F5E5A">Energy delivery (physical)</text>
  <rect x="220" y="200" width="240" height="80" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="340" y="228" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#26215C">BlackSlon Protocol</text>
  <text x="340" y="248" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#534AB7">Issues tokens · holds reserves</text>
  <text x="340" y="264" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#534AB7">Redeems · maintains corridor</text>
  <path d="M120 104 L120 160 L280 160 L280 199" fill="none" stroke="#1D9E75" stroke-width="1.2" marker-end="url(#arrow)"/>
  <rect x="50" y="148" width="150" height="20" rx="4" fill="white"/>
  <text x="125" y="162" text-anchor="middle" font-size="11" fill="#085041">Buys BSSZ tokens at BSEI</text>
  <path d="M560 104 L560 160 L400 160 L400 199" fill="none" stroke="#534AB7" stroke-width="1.2" marker-end="url(#arrow)"/>
  <rect x="460" y="148" width="160" height="20" rx="4" fill="white"/>
  <text x="540" y="162" text-anchor="middle" font-size="11" fill="#3C3489">Redeems tokens → EUR T+2</text>
  <rect x="40" y="370" width="180" height="64" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
  <text x="130" y="395" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#412402">BSEI index</text>
  <text x="130" y="415" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#854F0B">TTF / EPEX Cal+2 feed</text>
  <rect x="460" y="370" width="180" height="64" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
  <text x="550" y="395" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#4A1B0C">Prime broker</text>
  <text x="550" y="415" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#993C1D">StoneX / delta hedge</text>
  <path d="M220 370 L280 350 L280 282" fill="none" stroke="#BA7517" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="148" y="338" width="148" height="20" rx="4" fill="white"/>
  <text x="222" y="352" text-anchor="middle" font-size="11" fill="#854F0B">Anchors pricing corridor</text>
  <path d="M460 370 L400 350 L400 282" fill="none" stroke="#993C1D" stroke-width="1" marker-end="url(#arrow)"/>
  <rect x="382" y="338" width="150" height="20" rx="4" fill="white"/>
  <text x="457" y="352" text-anchor="middle" font-size="11" fill="#712B13">Delta reported · hedged</text>
  <rect x="220" y="510" width="240" height="64" rx="8" fill="#F1EFE8" stroke="#5F5E5A" stroke-width="0.5"/>
  <text x="340" y="535" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="#2C2C2A">Proof of Reserve</text>
  <text x="340" y="555" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#5F5E5A">On-chain · real-time · public</text>
  <path d="M340 282 L340 510" fill="none" stroke="#888780" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arrow)"/>
  <rect x="254" y="385" width="170" height="20" rx="4" fill="white"/>
  <text x="340" y="399" text-anchor="middle" font-size="11" fill="#5F5E5A">100% collateral verified</text>
  <line x1="40" y1="598" x2="70" y2="598" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="78" y="602" font-size="11" fill="#444441">Token / fiat flow</text>
  <line x1="200" y1="598" x2="230" y2="598" stroke="#888780" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arrow)"/>
  <text x="238" y="602" font-size="11" fill="#444441">Physical / data flow</text>
  <line x1="380" y1="598" x2="410" y2="598" stroke="#888780" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arrow)"/>
  <text x="418" y="602" font-size="11" fill="#444441">Reserve verification</text>
</svg>
</p>

---

## Node Definitions

---

### 1. End Customer

The end customer has one role: they convert their energy payment obligation from fiat into tokens.

At the start of a two-year supply agreement with their retailer, they purchase BSSZ tokens at the price anchored to BSEI — the two-year forward rate at that moment. Because the market is typically in backwardation, this price is structurally below current spot. The customer locks it in for the full contract term.

Each month, instead of paying a fiat invoice, they transfer the agreed volume of tokens to the retailer. That transfer discharges their financial obligation for that month's energy delivery. They never interact with the protocol directly — they buy tokens once (or in tranches), hold them, and spend them monthly against their supply agreement.

Their incentive is straightforward: price certainty for two years, at a rate that reflects the market's expectation of lower future energy costs rather than today's elevated spot. If spot rises sharply — as it did in 2021–2022 — they are fully protected because their obligation is fixed in tokens at a price set two years prior.

What they do **not** do is equally important: they never touch the wholesale market, never interact with the protocol's redemption mechanism, and never receive or manage physical energy. Their relationship is entirely with the retailer, settled through tokens. **The protocol is invisible to them — which is exactly how infrastructure should work.**

---

### 2. Energy Retailer

The energy retailer occupies the most commercially interesting position in the model — it is the only participant who touches both the physical energy world and the token world simultaneously.

**On the physical side**, the retailer does exactly what it already does today: it procures energy wholesale, manages a supply portfolio, balances its position with the grid operator, and delivers power or gas to its customers' meters. None of this changes. The retailer retains its existing licences, its existing grid agreements, and its existing wholesale procurement relationships. BSSZ does not touch any of this.

**On the financial side**, something changes fundamentally. Instead of receiving monthly fiat invoices from customers, the retailer receives BSSZ tokens. It then presents those tokens to the BlackSlon Protocol for redemption, receiving euro settlement at the prevailing in-corridor rate within T+2 business days.

Where the retailer makes money is in the spread between two prices that are both visible at contract inception. It procures wholesale energy against the two-year forward curve — for example at 38 EUR/MWh on EPEX Cal+2. It prices its supply agreement with the customer against BSEI, which references the same forward curve but includes the protocol's tokenization premium — for example 40 EUR/MWh. The **2 EUR/MWh spread is the retailer's margin, locked in for the full two-year term**, protected from spot volatility by the fixed-price nature of the token settlement.

In a market in backwardation, the retailer's wholesale procurement cost converges toward spot over time. If spot falls — which backwardation predicts — the retailer's procurement cost falls but its revenue in token terms remains fixed. The backwardation carry becomes pure margin. If spot rises unexpectedly, the retailer's wholesale cost rises but its token revenue is still fixed at the inception price — which is why the collar structure and the prime broker hedge exist, protecting the protocol's ability to honour redemptions even in adverse market conditions.

What the retailer does **not** do is take any view on the token itself. It receives tokens and redeems them immediately or near-immediately. It holds no token inventory, carries no token price risk, and has no exposure to movements within the corridor. It is agnostic to whether the token trades at floor, cap, or anywhere between — because it redeems at the prevailing rate and that rate is always within the corridor by design.

**The model's commercial elegance:** the retailer gets a guaranteed margin on a two-year book, protected from spot volatility, without changing its core business or acquiring any new regulatory obligations.

---

### 3. BlackSlon Protocol

BlackSlon Protocol does five things. **Only five.** This narrowness is not a limitation — it is the source of its regulatory defensibility and its commercial credibility.

**One — It sets and publishes the corridor.**
The protocol takes the BSEI index — the two-year forward price of the relevant energy benchmark at a given moment — and defines a pricing corridor around it. Floor below, cap above, parameters set by the BSSZ Protocol Rulebook and identical for every participant. The corridor is published on-chain. Anyone can read it. No participant receives a different corridor. No negotiation takes place.

**Two — It issues tokens against fully collateralised reserves.**
When a participant purchases BSSZ tokens, the protocol mints exactly the number of tokens corresponding to the value received, at the prevailing in-corridor price. Before minting, the smart contract verifies through Proof of Reserve that the new issuance will not cause the total outstanding token value to exceed the total reserve value. If the check fails, minting is halted automatically. No human override is possible. **The protocol cannot issue tokens it cannot back.**

**Three — It holds and segregates reserves.**
Every euro received through token purchases sits in a segregated reserve — legally and operationally separated from BlackSlon's operating capital. The protocol cannot use reserve funds to pay staff, fund development, or meet any obligation other than token redemption. The reserve is held in cash or near-cash equivalents, with the portion corresponding to the delta hedge sitting at the prime broker as margin.

**Four — It redeems tokens on demand.**
Any holder — retailer, customer, secondary market participant — can present tokens to the protocol for redemption at any time. The protocol calculates the redemption value at the prevailing in-corridor rate, burns the tokens, and settles in euro or approved stablecoin equivalent within T+2 business days. No minimum size. No lock-up. No conditions beyond the corridor bounds. Redemption cannot be suspended, delayed, or refused except under a documented force majeure or a formal regulatory order.

**Five — It hedges its delta through the prime broker.**
Every token issued creates a net long exposure in the reserve. The protocol passes this exposure in real time to the prime broker, which offsets it through regulated energy futures and swaps. **The protocol itself carries no net directional position on energy prices at any moment.** The hedge is mechanical, continuous, and governed by a mandate defined in the prime brokerage agreement.

What the protocol does **not** do is as important as what it does. It does not supply energy. It does not hold energy. It does not enter into supply agreements with customers or retailers. It does not set retail energy prices. It does not have preferred participants. Every rule that governs its behaviour is written in the Rulebook and encoded in the smart contracts — public, immutable, and enforceable without reference to any human judgment inside BlackSlon.

---

### 4. BSEI Index

BSEI — the BlackSlon Settlement Energy Index — is the single number that anchors everything. How it is calculated determines whether the protocol is credible.

**What BSEI represents**

BSEI is not a spot price. It is not a weighted average of recent trades. It is the two-year forward price of a defined energy benchmark on a regulated European wholesale market, observed at a defined moment, from a defined source, with no discretion applied by BlackSlon at any stage of the calculation.

The choice of two-year forward is deliberate. It is the horizon at which supply agreements with end customers are structured. It is liquid enough to be reliably quoted on regulated exchanges. And it is the point on the forward curve where backwardation — the structural discount of future energy relative to spot — is most consistently observable in European markets.

**The source**

BSEI is derived from a single primary source per energy type: **EPEX SPOT Cal+2 baseload** for electricity, **TTF Cal+2** for natural gas. These are the benchmark forward contracts on Europe's two most liquid regulated energy exchanges. BlackSlon does not calculate a proprietary price — it reads a price that already exists in a regulated market and uses it as its anchor.

The data feed is delivered to the protocol through a decentralised oracle network — specifically **Chainlink's price feed infrastructure** — which aggregates quotes from multiple independent data providers, applies outlier detection, and publishes a single verified price on-chain at defined intervals. No single data provider can move the feed. BlackSlon cannot alter the feed once it is published.

**The calculation**

BSEI at any given moment is defined as the **volume-weighted average of the Cal+2 settlement price** on the relevant exchange over the five most recent trading days, converted to EUR/MWh where necessary, rounded to two decimal places.

The five-day averaging window prevents a single anomalous session from moving the corridor in a way that disadvantages participants who entered positions earlier in the week, and ensures BSEI moves smoothly rather than jumping.

**How the corridor is set from BSEI**

Once BSEI is established, the corridor parameters are applied mechanically:

```
Floor = BSEI − 10%
Cap   = BSEI + 20%
```

These percentages are set in the BSSZ Protocol Rulebook and cannot be changed by BlackSlon unilaterally. The asymmetry between floor and cap reflects the structure of backwardation — in a market pricing future energy below spot, the downside for token holders is more constrained than the upside.

**What BSEI is not responsible for**

BSEI does not determine the transaction price within the corridor — it simply defines the boundaries of that space. Transactions already settled are not retroactively affected when the corridor moves. **BSEI functions more like a central bank reference rate than a market price. It sets the frame. The market fills it in.**

---

### 5. Prime Broker

The prime broker is the component that makes BlackSlon financially honest.

Without it, the protocol would be making a promise it could not mechanically keep: that every token can be redeemed at any time, at a price within the corridor, regardless of where energy prices have moved since the token was issued. The prime broker absorbs the difference — not as a charity, but as a counterparty in a precisely defined hedging arrangement that transfers the protocol's market risk to a regulated entity equipped to hold and manage it.

**The specific risk being hedged**

Every time a token is issued, BlackSlon takes on a liability: it must redeem that token at some future point at the prevailing in-corridor rate. If energy prices rise between issuance and redemption, the redemption obligation is worth more in euro terms than the reserves originally collected. That gap is the **delta**. It is the only market risk the protocol carries, and it is the only risk the prime broker is engaged to neutralise.

The prime broker's mandate is to keep the protocol's net delta at or near zero at all times — not approximately, not directionally, but continuously and mechanically.

**How the hedge works operationally**

BlackSlon transmits its aggregate token position to the prime broker in real time through an API connection — total tokens outstanding, average issuance price, and current BSEI level. From this, the prime broker calculates the net delta and opens an offsetting position in regulated energy derivatives: futures or swaps on TTF, EPEX, or equivalent benchmarks, sized exactly to neutralise the protocol's exposure.

When new tokens are issued, the prime broker increases the hedge. When tokens are redeemed, the prime broker reduces it. When energy prices rise and a token holder redeems at a higher in-corridor rate, BlackSlon pays the difference from its reserves — simultaneously, the prime broker's offsetting long position has appreciated by the same amount, that gain flows back to BlackSlon as variation margin, replenishing the reserves just depleted. **The protocol's net position is zero.**

**What the prime broker is not doing**

The prime broker is not providing a guarantee or an insurance policy. It is a counterparty in a bilateral hedging arrangement — it takes the other side of a precisely defined position and is compensated through the bid-ask spread and prime brokerage fees. BlackSlon must maintain adequate margin at the prime broker at all times — typically 10–15% of the notional value of the hedged position as initial margin, plus daily variation margin.

**Why a regulated prime broker specifically**

The choice of a regulated entity — StoneX, Marex, Sucden, or equivalent — is a deliberate regulatory and commercial decision. Regulatorily, it means the hedge is executed on or through regulated markets, under surveillance, with mandatory reporting — strengthening BlackSlon's position under MiCA. Commercially, it means the hedge is credible to retailers, institutional buyers, and auditors who need to assess whether the protocol's collateralisation promise is real.

**The prime broker is the bridge between the on-chain world where tokens are issued and redeemed, and the regulated off-chain world where energy price risk is actually managed. Without that bridge, BlackSlon is a protocol with a promise. With it, BlackSlon is a protocol with a mechanism.**

---

### 6. Proof of Reserve — On-Chain Verification

**The problem it solves**

Every token issuer can claim 100% coverage. Without verification, that is a promise without enforcement. Proof of Reserve converts the promise into a mathematically verifiable fact — available to anyone, at any time, without asking BlackSlon for permission.

**Three layers of the mechanism**

**Layer 1 — Off-chain: real assets**

BlackSlon holds reserves in two places simultaneously: cash and equivalents in a Segregated Reserve Account at a bank, and a hedging position at the prime broker (StoneX). Both positions are verified by external auditors and custodians who issue cryptographically signed attestations — electronic confirmations that the assets exist and are at a specified level.

**Layer 2 — Oracle: the bridge between off-chain and on-chain**

The oracle (Chainlink) retrieves attestations from the custodian and broker at regular intervals (e.g. every hour or every block). It verifies the cryptographic signatures, aggregates data from multiple sources to eliminate a single point of failure, and writes the result on-chain as a single number: current reserve value in EUR.

**Layer 3 — On-chain: smart contract as guardian**

The BlackSlon Protocol smart contract stores two numbers at all times: the total value of issued and unredeemed tokens (calculated automatically at every issuance and redemption), and the reserve value delivered by the oracle. The contract compares them at every operation:

```solidity
if (reserves < outstanding_tokens_value) {
    halt_new_issuance();
    emit ReserveAlert(deficit);
}
```

If reserves fall below 100% of the value of tokens in circulation — new issuance is automatically blocked. No vote, no human intervention, no delay.

**What everyone can verify**

Every token holder, regulator, journalist, or competitor can query the public smart contract at any time and see three numbers: reserve value, value of tokens in circulation, and the coverage ratio. All historical values are immutably recorded on the blockchain — they cannot be reversed or modified.

This is a fundamental difference from the Revolut model where the customer had to trust that funds were sitting at Barclays. **With BlackSlon, everyone verifies for themselves, mathematically, without trusting any institution.**

**One risk to manage**

PoR is only as good as the oracle that feeds it. If the oracle delivers false data — the system is at risk. This is why BlackSlon uses a decentralised oracle network (**Chainlink DON — Decentralised Oracle Network**) where the result is aggregated from multiple independent nodes, and manipulation requires taking over a majority of them simultaneously. No single entity — including BlackSlon — can falsify the reserve reading.

---

*Document: BSSZ Flow Diagram & Node Definitions · BlackSlon Protocol*
