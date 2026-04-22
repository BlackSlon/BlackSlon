# BlackSlon Protocol: The Energy Settlement Model

> The client arrives at the negotiating table holding their own energy — their own kWh, already purchased, already priced, sitting in their wallet as BS-P or BS-G tokens. Their intention is to redeem those tokens against physical delivery: exchanging on-chain instruments for real megawatt hours delivered to their meter. They are not a buyer seeking a seller. They are a holder seeking a delivery counterparty.

---

## How It Actually Works

### The Client Comes With Their Own Energy

The BlackSlon model inverts the conventional energy supply relationship.
In a standard contract, the client approaches a retailer and asks:
"What price will you charge me for energy over the next two years?"
The retailer quotes a price, the client accepts or walks away,
and the retailer then goes to the wholesale market to hedge its supply obligation.

In the BlackSlon model, the client approaches the retailer having already
secured their price. They have been accumulating BS-P or BS-G tokens on
the protocol's order book — weekly, monthly, at whatever cadence suits
their capital — averaging their entry price over time. By the time they
sit across from a retailer to negotiate a supply agreement, they already
hold the tokens that will settle that agreement. They are not asking the
retailer to quote them a price. They are presenting a price they have
already locked in through the market, and asking the retailer to deliver
the physical energy against it.

This is a structural shift in negotiating power. The client knows their
average acquisition cost. The retailer does not. The client's cost basis
is private, accumulated over months, and reflects a disciplined
dollar-cost averaging strategy that no spot or short-term forward
purchase can replicate. The retailer sees only the current market price
and must price its offer accordingly.

---

## The Two Participant Classes

### Class One — Price Seekers

Price Seekers acquire BS-P and BS-G tokens as financial instruments.
Their motivation is exposure to European energy prices — directional,
hedging, or speculative. They buy tokens on the order book, hold them,
and exit by selling on the secondary market. They never interact with
a retailer. They never take physical delivery of energy. Their collateral
returns to their Reserve Vault when they close their position.

Price Seekers are the participants who create liquidity. Their continuous
buying and selling activity produces the price discovery that makes the
corridor meaningful and gives Volume Seekers a real market price to
average into. Without Price Seekers, the protocol is a bilateral
settlement mechanism. With them, it is a market.

The full leverage matrix applies to Price Seekers. A participant holding
100% €BSR collateral operates at 1:4 leverage on long positions. The
Health Factor monitors their portfolio continuously. The Smart
Incremental Liquidation Mechanism protects them and the protocol if
positions deteriorate.

### Class Two — Volume Seekers

Volume Seekers accumulate BS-P or BS-G tokens over time with a specific
end use in mind: settling a physical energy supply agreement with a
retailer at a price they have locked in through patient accumulation.
Their motivation is operational certainty — knowing that in eighteen
months, when the supply agreement enters its final phase, their energy
cost is already determined.

Volume Seekers use the dollar-cost averaging strategy described above.
They are not trying to time the market. They are removing themselves
from the market's ability to surprise them. The perpetual nature of
BS-P and BS-G tokens — no expiry, no roll cost, no forced settlement —
makes this strategy viable in a way that futures contracts never could
support.

Leverage for Volume Seekers is minimal by design. A participant whose
objective is supply price certainty has no rational reason to amplify
their energy exposure. The Tiering Matrix applies to all participants,
but the product design for Volume Seekers steers toward 1:1 or near-1:1
positions. Their collateral should reflect their token commitment as
closely as possible.

---

## The Accumulation Strategy: Buy the Dip on Energy

Every trader knows why averaging down on futures is dangerous. The
contract expires. The margin call arrives. The broker changes the rules.
The table gets flipped at precisely the moment when the position is most
underwater and the conviction is highest.

BS-P and BS-G tokens eliminate every structural reason why averaging
down fails.

**No expiry.** There is no settlement date forcing exit at an
inopportune moment, no roll cost eroding returns, no calendar working
against conviction. If energy prices will be higher in three years —
as the structure of European energy markets, decarbonisation targets,
and ageing grid infrastructure strongly suggests — that belief can
be held in token form for three years. The protocol will still be there.

**Dual exit.** When the position is profitable, sell on the secondary
market. When physical consumption is preferred, transfer tokens to the
energy retailer and settle the supply obligation at the price locked in
months or years ago. No other financial instrument offers both options
simultaneously. Futures contracts do not permit consuming the
underlying. Physical procurement does not permit selling the position.
The BS token does both.

**Nobody changes the rules.** The corridor parameters are governed by
an immutable smart contract and a public rulebook. No broker can
reprice margin requirements overnight. No exchange can suspend trading.
No counterparty can unilaterally alter the terms of a holding. The
protocol is infrastructure — and infrastructure does not renegotiate.

**The sheikh model.** Every significant dip in energy prices is an
opportunity to double the position — not with the anxiety of a trader
watching a margin clock, but with the patience of an entity that
understands time is the only variable that matters. The sovereign wealth
funds of energy-producing states did not build generational wealth by
trading futures. They built it by accumulating physical exposure and
waiting. BS-P and BS-G make that strategy accessible to any participant
— without a drilling licence, without a pipeline, and without a broker
who can flip the table when the position is most valuable.

A small, regular allocation — the same euro amount each month regardless
of price — produces a cost basis that is structurally below the
time-weighted average market price over any multi-year horizon. In an
asset class where the long-run price direction is determined by
structural factors beyond any single participant's control, a
below-average cost basis is not a hope. It is a mathematical consequence
of the strategy applied consistently.

---

## The Retailer's Position

### What Changes for the Retailer

The retailer continues to do exactly what it does today: procure energy
wholesale, manage its supply portfolio, balance its position with the
grid operator, and deliver power or gas to its customers' meters. Its
wholesale hedging strategy — averaging into forward positions across
multiple quarters to smooth procurement cost — remains unchanged.

What changes is the settlement mechanism and the credit risk profile
of its client book.

Instead of issuing monthly fiat invoices and waiting for payment,
the retailer receives BS-P or BS-G tokens from the client each month
and presents them to the BlackSlon Protocol for redemption. The protocol
burns the tokens and credits the retailer's account in EUR or EURC
within T+2 business days. The client's collateral — held in the
protocol's Reserve Vault throughout the contract term — guarantees
every future payment. The retailer carries zero credit risk on the
client from the moment the supply agreement is signed.

### How the Retailer Prices the Contract

The retailer does not know the client's average token acquisition cost.
This information is private to the client and is not disclosed by the
protocol. The retailer prices the supply agreement against the current
market price — the order book price on the day the contract is signed —
and negotiates a fixed settlement rate in tokens per MWh for the
duration of the agreement.

The client, having accumulated tokens at an average cost below the
current market price through patient dollar-cost averaging, has
negotiating leverage. They can accept the retailer's quoted price
knowing their actual cost basis is lower, capturing the difference
as a private gain. Or they can negotiate more aggressively, knowing
the retailer has no visibility into their cost structure. Either way,
the information asymmetry works in the client's favour — a reversal
of the conventional energy supply relationship where the retailer holds
all pricing knowledge.

### The Retailer's Hedge

The retailer hedges its procurement obligation using standard forward
instruments — typically the nearest available quarterly contract (FQ)
or Q+2, depending on the lead time between contract signing and first
delivery. It does not touch the spot market. It does not interact with
the BS-P/G order book. Its hedging strategy is identical to what it
employs today for conventional fixed-price supply agreements.

By averaging its forward purchases across multiple quarters — buying
a portion of the required volume at each quarterly contract as it
becomes the front quarter — the retailer achieves a blended procurement
cost that reflects the forward curve structure at each point in time.
In a market in structural backwardation, this averaging strategy
systematically produces a procurement cost below the spot price
prevailing at the time of delivery. That difference is the retailer's
structural margin — predictable, lockable at contract inception, and
independent of short-term market movements.

### What the Retailer Earns

The retailer's margin is the spread between the fixed token settlement
rate agreed with the client and the blended procurement cost achieved
through its forward hedging programme. In addition, the protocol
shares a portion of the yield generated on the client's collateral
held in the Reserve Vault — compensating the retailer for the
client onboarding activity that brought that collateral into the
protocol ecosystem.

The elimination of credit risk is itself a form of economic value.
A conventional fixed-price supply agreement carries payment default
risk for its entire duration. Pricing that risk into the supply
agreement consumes margin. Under the BlackSlon model, that margin
is freed — the protocol's collateral mechanism provides the credit
support that the retailer would otherwise have to price into its offer
or absorb as unhedged exposure.

---

## The Collateral Matrix

The BlackSlon Protocol accepts two forms of collateral, which may be
combined in any ratio. The ratio chosen determines the participant's
margin requirements, maximum leverage, trading fee, and — critically
— their composability options within the DeFi ecosystem.

| Collateral Mix | Margin LONG | Margin SHORT | Max Leverage (L/S) | Trading Fee |
|:---|:---:|:---:|:---:|:---:|
| **10% €BSR** / 90% eEURO | 50% | 100% | 1:2.0 / 1:1.0 | 1.00% |
| **25% €BSR** / 75% eEURO | 45% | 90% | 1:2.2 / 1:1.1 | 0.85% |
| **50% €BSR** / 50% eEURO | 40% | 80% | 1:2.5 / 1:1.2 | 0.60% |
| **75% €BSR** / 25% eEURO | 30% | 60% | 1:3.3 / 1:1.6 | 0.35% |
| **100% €BSR** / 0% eEURO | **25%** | **50%** | **1:4.0 / 1:2.0** | **0.20%** |

**€BSR** is the BlackSlon Reserve Token — the protocol's native
utility token. Higher €BSR ratios reduce fees and increase leverage
within the protocol, reflecting the alignment between €BSR holders
and protocol sustainability.

**eEURO** is a euro-denominated stablecoin. It carries no price risk
relative to the euro and requires no mark-to-market adjustment in
the Reserve Vault. Its higher margin requirements reflect the
protocol's inability to deploy it as productively within the reserve
management framework.

Both collateral types are productive outside the protocol through
the composability layer described below.

---

## The Composability Layer

### What Composability Means

A BS-P or BS-G token held in a participant's wallet is not a
dormant asset. It is a composable instrument — it can be deposited
into any DeFi lending protocol that integrates BS tokens as
accepted collateral, unlocking liquidity without requiring the
participant to close their energy position.

This is the same principle demonstrated by ONDO Finance with
tokenised US Treasury bills. An ONDO token simultaneously earns
the underlying Treasury yield and serves as collateral on Aave
and MakerDAO. The capital works in two places at once. The holder
does not choose between yield and liquidity — they access both.

BS-P and BS-G tokens are designed with the same composability
principle. The energy price hedge and the DeFi liquidity function
are not mutually exclusive. They operate in parallel.

### How Composability Works in Practice

A participant deposits BS-P or BS-G tokens into a DeFi lending
protocol — Aave, Compound, MakerDAO, or any protocol that has
integrated BS tokens as accepted collateral. Against those tokens,
the participant borrows a crypto asset — EURC, USDC, DAI, or
another accepted stablecoin — at a Loan-to-Value ratio determined
by the lending protocol, typically 65-75% for energy-backed tokens.

The borrowed crypto asset is received directly in the participant's
wallet. They may use it for any purpose: working capital, other
investments, conversion to fiat through an exchange or
bank off-ramp, or further DeFi activity. The lending protocol
holds the BS tokens as collateral. The participant retains their
energy price exposure and their settlement obligation.

As the participant transfers tokens to the retailer each month,
they first release that month's allocation from the DeFi
collateral position by repaying the corresponding portion of
their loan. The token is freed, transferred to the retailer,
and the DeFi position reduces proportionally. Over 24 months,
both the token position and the DeFi loan unwind in synchrony.

To support this graduated release, BS-P and BS-G smart contracts
include a partial release function that DeFi lending protocols
can invoke to free a defined token quantity from the collateral
position in proportion to a loan repayment — without liquidating
the entire position. This mechanism mirrors the structured
amortisation logic used by MakerDAO for tokenised real-world
asset collateral.

### Composability by Collateral Type

Every collateral type in the protocol can independently access
the DeFi composability layer. The options are additive — a
participant with a mixed collateral position can deploy each
component separately.

**BS-P / BS-G tokens** deposited in DeFi lending protocols:
LTV typically 65-75%. The participant retains energy price
exposure while unlocking liquidity. Monthly partial release
supports graduated settlement with the retailer.

**€BSR** deposited in DeFi lending protocols: LTV typically
75-80%. The protocol's native token is increasingly accepted
as collateral across major DeFi platforms as liquidity deepens.
Higher LTV than energy tokens reflects €BSR's role as a
protocol-backed instrument with defined utility.

**eEURO** deposited in DeFi lending protocols: LTV typically
85-90%. Stablecoins command the highest LTV ratios because
they carry no price risk relative to the borrowed asset.
A participant posting eEURO as collateral in the BlackSlon
Protocol can simultaneously deposit that same eEURO in Aave
and borrow against it at 90% LTV — though the mechanics
require careful management to avoid double-counting the
same capital across two collateral positions.

The practical implication is that a participant with a mixed
€BSR / eEURO collateral position has access to multiple
independent DeFi borrowing facilities simultaneously, each
with different LTV ratios and different liquidity profiles.
Capital efficiency is maximised not by choosing a single
collateral type but by understanding the composability
characteristics of each and deploying them in combination.

### The Natural Trade-Off

The Tiering Matrix creates a fundamental trade-off between
protocol efficiency and DeFi composability:

A participant who maximises €BSR concentration (100% €BSR)
minimises their protocol trading fee (0.20%) and maximises
their protocol leverage (1:4 long). But €BSR commands a
lower DeFi LTV than eEURO, reducing the liquidity available
through the composability layer.

A participant who maximises eEURO concentration (100% eEURO)
pays the highest protocol trading fee (1.00%) and accesses
the lowest protocol leverage (1:2 long). But eEURO commands
a 90% DeFi LTV, maximising the liquidity available through
the composability layer.

Neither extreme is universally optimal. The correct balance
depends on the participant's primary objective: protocol
capital efficiency (favour €BSR) or DeFi liquidity extraction
(favour eEURO). Most participants will find their optimum
somewhere in the middle, adjusting their collateral ratio
per position based on their current priorities.

This is why the Tiering Matrix is enforced at the position
level — not globally. A participant can allocate 100% €BSR
to a long-duration Volume Seeker position where fee minimisation
matters, and 100% eEURO to a shorter position where they
need immediate DeFi liquidity. The protocol accommodates both
simultaneously within the same Reserve Vault.

---

## A Worked Example: The Volume Seeker with Full Composability

The following example illustrates how a corporate energy buyer
uses the BlackSlon Protocol to secure two years of gas supply
while maintaining full capital productivity throughout the
contract term.

**Participant:** Mid-sized manufacturing company.
Monthly gas consumption: 100 MWh. Contract horizon: 24 months.

**Accumulation phase (months −6 to 0):**

Over six months prior to signing the supply agreement, the
company purchases BS-G tokens on the order book. It allocates
a fixed euro amount each month regardless of price — a
systematic dollar-cost averaging approach. The purchases are
made in six equal tranches.

| Month | Tokens | Price | Cost |
|-------|--------|-------|------|
| −6 | 400 | 36 EUR | 14,400 EUR |
| −5 | 400 | 38 EUR | 15,200 EUR |
| −4 | 400 | 41 EUR | 16,400 EUR |
| −3 | 400 | 39 EUR | 15,600 EUR |
| −2 | 400 | 37 EUR | 14,800 EUR |
| −1 | 400 | 40 EUR | 16,000 EUR |
| **Total** | **2,400 tokens** | **avg 38.50 EUR** | **92,400 EUR** |

Market price on Day Zero (contract signing): 40 EUR/MWh.
The company's average cost is 1.50 EUR/MWh below market.

**Collateral posted:**

The company posts collateral in the BlackSlon Reserve Vault
to support its 2,400-token position. It chooses a 50/50
€BSR / eEURO mix — balancing protocol fee reduction with
DeFi composability.

| Item | Value |
|------|-------|
| Required collateral (40% margin, 50/50 mix) | 36,960 EUR |
| €BSR component | 18,480 EUR |
| eEURO component | 18,480 EUR |

**DeFi composability deployment:**

| Item | Value |
|------|-------|
| BS-G tokens in Aave at 70% LTV: 2,400 × 40 × 70% | 67,200 EUR EURC |
| eEURO in Aave at 90% LTV: 18,480 × 90% | 16,632 EUR EURC |
| **Total EURC accessed through composability** | **83,832 EUR** |

**Company's Day Zero position:**

| Item | Value |
|---|---|
| €BSR posted as protocol collateral | −18,480 EUR |
| eEURO posted as protocol collateral | −18,480 EUR |
| EURC borrowed against BS-G tokens | +67,200 EUR |
| EURC borrowed against eEURO collateral | +16,632 EUR |
| **Net liquidity position** | **+46,872 EUR** |
| Gas price secured for 24 months | 38.50 EUR/MWh avg |
| Current market price | 40.00 EUR/MWh |
| Immediate mark-to-market gain | +3,600 EUR |

The company has secured its gas price for two years,
posted 36,960 EUR in collateral, and holds 46,872 EUR
more in working capital than it started with. Its
effective cost of hedging two years of gas supply
is the Aave interest on 83,832 EUR — approximately
3,353 EUR per year at 4% — against a position that
is already 3,600 EUR in-the-money at inception.

**Monthly settlement cycle:**

Each month, the company:

1. Repays 1/24 of the BS-G Aave loan:
   100 tokens × 40 EUR × 70% = 2,800 EUR EURC repaid
2. Releases 100 BS-G tokens from Aave collateral
3. Transfers 100 tokens to the retailer as
   settlement for that month's gas delivery
4. Receives 1/24 release of €BSR collateral
   from the BlackSlon Reserve Vault: 770 EUR
5. Optionally repays 1/24 of the eEURO Aave loan
   and receives that eEURO back from the protocol vault

By month 24, all tokens have been transferred,
all Aave loans have been repaid, all protocol
collateral has been returned, and the company
has paid for 2,400 MWh of gas at an average
price of 38.50 EUR/MWh — 1.50 EUR/MWh below
the market price prevailing on the day it signed
the supply agreement.

**What the retailer receives:**

The retailer receives 100 BS-G tokens per month,
settled at the fixed rate agreed on Day Zero
(40 EUR/MWh — the market price on contract signing,
which the company accepts knowing its actual cost
basis is lower). The retailer presents these tokens
for redemption monthly and receives 4,000 EUR per
month in EUR or EURC. Its procurement cost — hedged
across multiple forward quarters at an average of
approximately 39 EUR/MWh — generates a 1 EUR/MWh
margin across the full contract, plus collateral
yield share from the protocol, with zero payment
default risk for the entire 24-month duration.

---

## What This Model Is Not

The BlackSlon Protocol is not a trading platform optimised
for speculative leverage. It is not a derivative exchange.
It is not a payment processor or an energy billing system.

It is the infrastructure layer that connects three things
that have never been connected before in a single composable
instrument: physical energy price certainty, on-chain
settlement, and DeFi capital efficiency.

The protocol sets the rules. Retailers deliver the energy.
Participants bring their own price. The composability layer
makes the capital work while it waits.

That is the model.

---

## UZUPELNIENIE: Ecosystem Composability & Asset Productivity

The BlackSlon architecture is built on the principle of **Financial Composability**, transforming energy-backed instruments into "Money Legos" within the broader DeFi landscape. Unlike traditional energy markets where capital is often trapped in rigid, siloed environments, the BlackSlon Settlement Zone (BSZ) operates as an **Open Book Model**, allowing participants to maximize the utility of their holdings through seamless integration with external protocols.

### 4.1. From Dormant to Productive Capital

A core innovation of the BlackSlon protocol is its handling of **time-segmented liquidity**. In the Cal Segment (The Dormant Year Model), assets allocated to the n+2 period remain "dormant" during Stage 1 (January - June).

Through composability, these **Dormant Assets** are not merely idle; they can be tokenized as future-yield components, allowing holders to:

- **Unlock Liquidity:** Use dormant positions as collateral in external lending markets
- **Optimize Yield:** Engage in cross-protocol strategies while waiting for the Asymptotic Daily Rebalancing (ADR) to activate the asset's weight within the BSZ

### 4.2. Tokenized Commodity Units: BS-P & BS-G

The protocol's primary energy tokens, **BS-P (Power)** and **BS-G (Gas)**, function as standardized, composable assets. Because they are anchored to the physical market via the BSSZ Corridor (-10 / +20), they serve as high-quality collateral.

- **Secondary Markets:** BS-P and BS-G can be paired in Automated Market Makers (AMMs) outside the native protocol, enhancing price discovery and exit liquidity
- **Hedging & Derivatives:** Third-party developers can build sophisticated hedging instruments (Options, Synthetic Futures) on top of BS-P/G tokens, utilizing the BlackSlon Energy Index as a transparent, transaction-weighted oracle

### 4.3. The BSR Reserve Layer

**BSR (BlackSlon Reserve)** acts as the liquidity backbone of the ecosystem. Its composable nature allows for:

- **Interoperability:** BSR can be utilized across various DeFi vaults to automate rebalancing or participate in governance-incentivized liquidity pools
- **Arbitrage Efficiency:** The open nature of the BSZ allows arbitrageurs to align the BSTZ (Physical Market Formula) with on-chain prices, ensuring that the Base demand directly influences the value of the ecosystem, creating a positive feedback loop for all participants

### 4.4. Atomic Settlement and Risk Mitigation

By leveraging the **Atomicity of blockchain transactions**, BlackSlon enables complex multi-step operations - such as purchasing gas tokens, swapping for power, and rebalancing a portfolio - to occur in a single, verifiable transaction. This eliminates counterparty risk and ensures that the **Stabilizer b** (combining Progressive Friction and EMA) maintains system integrity even during periods of high external volatility.

---

*Document: Energy Settlement Model · BlackSlon Protocol · Participant Classes, Collateral Matrix & Composability*
