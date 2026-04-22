# Block 06B - Protocol Infrastructure

**BlackSlon Protocol | Canonical Reference | April 2026**

---

## What This Block Covers

Block 06A described what the Protocol calculates - the mathematical engines of price formation. Block 06B describes how those calculations live on a blockchain, how participants interact with them without needing to understand blockchain, and how the entire system is secured, upgraded, and audited.

This is the engineering foundation that makes everything else real.

---

## The Blockchain - Why Arbitrum

Every operation in the BlackSlon Protocol is recorded on Arbitrum One - a Layer 2 blockchain built on top of Ethereum. Understanding why this matters requires understanding what a blockchain actually does.

A blockchain is a shared database that no single entity controls. Once something is written to it, it cannot be changed - not by BlackSlon, not by regulators, not by anyone - unless the rules encoded in the smart contracts explicitly allow a change through a defined governance process. This is what makes the Protocol's transparency promises credible: they are not policy statements, they are mathematical constraints.

Arbitrum inherits Ethereum's security - the most battle-tested blockchain in existence - while reducing transaction costs from 20-50 per operation on Ethereum mainnet to 0.01-0.10 per operation on Arbitrum. For a protocol where ISA executes monthly DCA rules, BSEI updates continuously, and thousands of participants interact daily, this cost difference is the difference between a viable product and an unusable one.

**ETHEREUM MAINNET:**
- Security: Maximum - $500B+ secured
- Cost: 20-50 per transaction
- Speed: 12 seconds per block
- Suitable for: Large institutional settlements, Final settlement of large positions

**ARBITRUM ONE:**
- Security: Ethereum-level (inherits via rollup)
- Cost: 0.01-0.10 per transaction
- Speed: 0.25 seconds per block
- Suitable for: All BlackSlon operations, Retail participants, High-frequency BSEI updates, ISA automation rules

**BRIDGE (Arbitrum Ethereum):**
Available for institutional participants requiring mainnet-level finality
7-day withdrawal period (Arbitrum standard)
Fast bridge available via third parties

---

## Smart Contract Architecture

A smart contract is a programme that lives on the blockchain. It executes automatically according to its coded rules. Nobody can change what it does - unless the code itself includes an upgrade mechanism with defined conditions. It has no boss, no employee, no office hours. It runs forever, exactly as written.

BlackSlon deploys a system of interconnected smart contracts. Each has a single, clearly defined responsibility. No contract does more than one thing. This separation makes auditing possible and failures containable.

### The Contract System

**CORE CONTRACTS (immutable after deployment):**

**ProtocolVault.sol**
- Holds all eEURO collateral
- Holds all BSR collateral
- Processes deposits and withdrawals
- Enforces margin requirements
- Executes SIL liquidations
- Cannot be upgraded - ever
- If it could be upgraded, it could be drained

**MatchingEngine.sol**
- Receives all buy and sell orders
- Validates BSSZ corridor compliance
- Matches orders by Price-Time Priority
- Records executions to BSEI feed
- Rejects out-of-corridor orders instantly

**BSToken.sol (one per market)**
- ERC-20 token contract for each market
- BS-G-NL, BS-P-DE, BS-G-UK etc.
- Handles token issuance and burning
- Enforces transfer restrictions
- Connects to V2P escrow

**BSRToken.sol**
- ERC-20 token contract for BSR
- Fixed supply: 100,000,000
- Short selling prohibition encoded
- Burn function (callable only by BurnEngine.sol under defined conditions)
- Wallet concentration limit (5%) enforced on every transfer

**GOVERNANCE CONTRACTS (upgradeable via governance):**

**OracleWriter.sol**
- Receives Physical Meridian data from oracle nodes
- Validates multi-source consensus
- Writes Settlement Anchor on-chain
- Writes BSSZ Floor and Ceiling
- Upgradeable: oracle sources may change as markets expand

**BSEICalculator.sol**
- Reads executed trades from MatchingEngine.sol
- Calculates 72h Segmented R-VWAP
- Publishes BSEI on-chain every 60s and after every trade
- Upgradeable: calculation methodology may be refined through governance

**HealthMonitor.sol**
- Monitors H_user for every account
- Triggers SIL when H_user 1.00
- Reports aggregate data to SolvencyMonitor.sol
- Upgradeable: zone thresholds adjustable through governance

**SolvencyMonitor.sol**
- Calculates H_solv_CORE and H_solv_SYSTEM
- Determines current Tier
- Triggers cascade responses
- Publishes Tier on-chain continuously
- Upgradeable: Tier thresholds adjustable through governance

**BurnEngine.sol**
- Calculates Vault surplus
- Executes BSR burn when conditions met (H_solv Tier I + surplus confirmed)
- Records every burn on-chain
- Upgradeable: burn rate adjustable through governance

**V2PEscrow.sol**
- Holds tokens locked under V2P contracts
- Executes monthly token release to retailer upon reconciliation
- Contains partialRelease() function for DeFi protocol liquidations
- Upgradeable: new retailer integrations

**GovernanceController.sol**
- Manages all governance votes
- Enforces voting thresholds (simple majority / 67% / 80%)
- Enforces notice periods (30/60 days)
- Executes approved upgrades through TimelockController.sol

**TimelockController.sol**
- All governance-approved changes wait in timelock before executing
- Immutable parameters: no timelock (cannot be changed at all)
- Governance parameters: 48h timelock
- Critical parameters: 7-day timelock
- Gives participants time to exit before major changes take effect

---

## What Cannot Be Changed - Ever

**IMMUTABLE (no upgrade path exists):**

**ProtocolVault.sol core logic**
- Nobody can drain the Vault
- Nobody can change how collateral is calculated or secured

**Short selling prohibition on BSR**
- Encoded in BSRToken.sol
- No governance path to remove it

**SIL step size (10%)**
- Always 10% - never more
- Protects participants from catastrophic single liquidation

**Stop-out constant (0.5)**
- H_user formula denominator
- Cannot be changed

**H_solv Tier V threshold (< 1.00)**
- Emergency stop always activates below 1.00 - no exceptions

**Wallet concentration limit (5% BSR)**
- Enforced on every transfer
- Cannot be governance-overridden

**Oracle minimum providers (3)**
- Always need at least 3 independent data sources for Physical Meridian

---

## Account Abstraction - ERC-4337

This is the technology that makes BlackSlon accessible to everyone - including participants who have never used a blockchain and never want to think about one.

### The Problem Account Abstraction Solves

Traditional blockchain interaction requires:

**TRADITIONAL CRYPTO UX:**
1. Download MetaMask or similar wallet
2. Write down 12-word seed phrase (if you lose it, you lose everything)
3. Buy ETH to pay for gas fees
4. Understand gas price and gas limit
5. Sign every transaction manually
6. Wait for confirmation
7. Hope you didn't make a mistake

For a household participant who wants to set up a monthly DCA for their energy bills: this is impossible.

**Account Abstraction (ERC-4337) replaces this with:**

**BLACKSLON UX (Account Abstraction):**
1. Enter email and password
2. Set up two-factor authentication
3. Done - ISA handles everything else

**Behind the scenes:**
- A Smart Account is created on Arbitrum (a smart contract that acts as a wallet)
- BlackSlon Paymaster pays gas in ETH and charges the participant in eEURO
- ISA submits transactions on behalf of the participant using pre-approved session keys
- Participant never sees ETH, ARB, gas fees, or blockchain complexity

### How It Works Technically

**TRADITIONAL ACCOUNT (EOA):**
Private key signs transaction broadcast
Problem: lose private key = lose everything
         must have ETH for gas
         must sign every transaction

**SMART ACCOUNT (ERC-4337):**
Smart contract wallet with programmable rules:
- "Allow ISA to execute DCA rule up to 500/month without signature"
- "Require 2FA for withdrawals > 1,000"
- "Block transactions to unknown addresses"
- "Recover account via email if key lost"

This is called a UserOperation - a transaction that follows custom rules defined by the account owner

### The Paymaster
**BlackSlon Paymaster Contract:**
- Pays gas fees in ETH on behalf of participants
- Charges participants in eEURO from their vault automatically
- Converts eEURO to ETH via on-chain DEX (Uniswap on Arbitrum) at current market rate
- Adds small conversion fee (estimated 0.1-0.3% of gas cost)
- Participant sees only: "Transaction fee: 0.03"
- Never sees ETH or gas

**Result:**
Household participant in Warsaw never buys ETH, never thinks about gas, never loses a seed phrase, ISA handles everything. They see only euros.

### Session Keys
When participant configures ISA automation:
- ISA is granted a Session Key
- Session Key allows ISA to execute specific pre-approved operations without participant signature each time

**Session Key parameters (set by participant):**
- Which operations are permitted (DCA purchase, collateral rebalance etc.)
- Maximum value per operation (X)
- Maximum total per month (Y)
- Expiry date
- Which markets are included

**Session Key cannot:**
- Withdraw to external addresses
- Execute operations beyond approved scope
- Override H_user or H_solv responses
- Extend its own permissions

Participant can revoke Session Key at any time - ISA automation stops immediately

### Account Recovery
Traditional crypto: lose seed phrase = lose everything
BlackSlon Smart Account: social recovery

**Recovery options (participant configures at setup):**
- Email + authenticator app (default)
- Trusted guardian address (another wallet the participant controls)
- BlackSlon custody recovery (KYC-verified identity recovery for Mode 3 participants)
- Multi-signature recovery (M of N guardians must approve)

This means:
Household participant who loses their phone can recover their account through email verification + KYC. No seed phrase required. No crypto knowledge required.

---

## ERC-20 Token Specification

All BlackSlon tokens are ERC-20 standard - the universal token interface that every DeFi protocol, every wallet, and every exchange understands. This is what makes composability with Aave, Morpho, and others possible without custom integration.

### BS-P and BS-G Tokens
**Standard:** ERC-20 with extensions
**Network:** Arbitrum One
**Decimals:** 18 (standard)

Each market has its own token contract:
- BS-G-NL: 0x[address] (TTF-based)
- BS-P-DE: 0x[address] (Phelix-based)
- BS-G-UK: 0x[address] (NBP-based)
- [expanding per market activation]

**Core ERC-20 functions:**
```
transfer(to, amount)
transferFrom(from, to, amount)
approve(spender, amount)
allowance(owner, spender)
balanceOf(account)
totalSupply()
```

**BlackSlon extensions:**
```
mint(to, amount)
  Only callable by ProtocolVault.sol
  Mints when participant opens position

burn(from, amount)
  Only callable by V2PEscrow.sol
  Burns when token transferred to retailer
  Burns when position closed at loss

partialRelease(amount, recipient)
  Callable by whitelisted DeFi protocols
  Releases tokens from V2P escrow
  Used by Aave/Morpho for liquidations

pause()
  Callable by GovernanceController.sol
  Only in H_solv Tier V emergency
  Halts all transfers temporarily
```

### BSR Token
**Standard:** ERC-20 with extensions
**Network:** Arbitrum One
**Decimals:** 18
**Total Supply:** 100,000,000 BSR (fixed forever)

**Core ERC-20 functions:** standard

**BlackSlon extensions:**
```
burn(amount)
  Only callable by BurnEngine.sol
  Permanently reduces supply
  Emits BurnEvent(amount, timestamp,
    supplyBefore, supplyAfter)

transfer() override:
  Checks wallet concentration limit
  IF recipient balance + amount
    > 5,000,000 (5% of 100M):
    REVERT "Concentration limit exceeded"
  Checks short selling prohibition
  IF transfer creates net short position
    in protocol: REVERT

Vesting:
  Team/founder allocation locked in
    VestingContract.sol
  12M cliff + 24M linear release
  Cannot be transferred during cliff
```

---

## Oracle Architecture

The oracle is the bridge between the real world (physical energy hub prices) and the blockchain (BSSZ corridor). It is the most critical security boundary in the entire Protocol - because if the oracle is wrong or manipulated, the entire price formation system is compromised.

### The Three-Layer Oracle System

**LAYER 1 - DATA SOURCES (off-chain):**
Multiple independent data providers each reading from primary sources:

- Provider A: reads ICE settlement prices
- Provider B: reads EEX settlement prices
- Provider C: reads exchange APIs directly
- Provider D: reads OTC broker composites
- [minimum 3 providers per market]

Each provider signs their price data with their private key before submission - Cryptographic proof of source

**LAYER 2 - ORACLE AGGREGATOR (off-chain):**
OracleWriter.sol receives signed prices from all providers

**Consensus mechanism:**
- Collect all provider submissions
- Remove outliers (>15% from median)
- Calculate median of remaining prices
- Require minimum 3 providers in consensus
- If consensus reached: proceed
- If not: carry forward last valid price and alert governance layer

**LAYER 3 - ON-CHAIN WRITE (Arbitrum):**
OracleWriter.sol writes to blockchain:
- Physical Meridian per market
- Settlement Anchor per market
- BSSZ Floor and Ceiling per market
- Timestamp and provider signatures
- Consensus participant list

All on-chain - anyone can verify:
- What price was written
- When it was written
- Which providers agreed
- Which providers were excluded

### Chainlink Integration
For DeFi composability (Aave/Morpho):
BSEI published as Chainlink Price Feed

**Chainlink Data Feed:** BS-G-NL/EUR
**Update conditions:**
- Deviation trigger: price moves >0.5%
- Heartbeat: minimum update every 3600s
- Source: BSEICalculator.sol on Arbitrum

**Chainlink Data Feed:** BS-P-DE/EUR
[same parameters]

[expanding per market activation]

**Why Chainlink specifically:**
- Aave governance requires Chainlink feeds
- Most widely trusted oracle in DeFi
- Decentralised node network
- Cryptographic price guarantees
- Historical track record across all major DeFi protocols

### Oracle Security

**ATTACK SCENARIO 1: Single provider manipulation**
Provider A submits fake price

**DEFENCE:**
- Outlier detection removes it
- Minimum 3 providers required
- Single provider cannot move price
- Their signature is logged on-chain
- Can be identified and removed from provider set

**ATTACK SCENARIO 2: Majority provider collusion**
3 of 4 providers submit coordinated fake price

**DEFENCE:**
- Providers are geographically distributed
- Providers are legally independent entities
- All submissions signed and logged
- 15% deviation limit caps damage
- Governance can replace providers through normal governance process

**ATTACK SCENARIO 3: Oracle goes offline**
All providers stop submitting

**DEFENCE:**
- Last valid price carries forward
- Protocol continues operating
- Alert sent to governance layer
- After 4 hours without update: new position openings suspended
- Existing positions unaffected

---

## BSR Burn - On-Chain Mechanics

Every burn event is a public, verifiable, on-chain transaction. There is no "trust us, we burned it" - the blockchain shows exactly what happened.

### The Burn Process

**STEP 1: BurnEngine.sol calculates surplus**
Every 24 hours (or triggered by governance):
```
Surplus = V_eEURO
        - (PnL_ITM + IM_total + Reserve_Op)

IF Surplus > 0 AND H_solv Tier I:
  Proceed to Step 2
ELSE:
  No burn - surplus retained in Vault
```

**STEP 2: Calculate burn amount**
```
B_auto = Surplus × burn_rate
         (default: 50% of surplus)
```

**STEP 3: Execute burn**
BurnEngine.sol calls BSRToken.burn(B_auto)

**BSRToken.sol:**
- Reduces totalSupply by B_auto
- Tokens permanently destroyed
- Cannot be recovered or re-minted
- Emits event:
  ```
  BurnExecuted(
    amount: B_auto,
    timestamp: block.timestamp,
    supplyBefore: S_before,
    supplyAfter: S_after,
    vaultBalance: V_eEURO,
    hSolvAtBurn: H_solv_value
  )
  ```

**STEP 4: Public verification**
Anyone can see on Arbitrum explorer:
- Transaction hash
- Amount burned
- New circulating supply
- Vault balance at time of burn
- H_solv value at time of burn
- Block timestamp

### Proof of Reserve
Published on-chain continuously:

**ProofOfReserve.sol publishes every block:**
- V_eEURO (Vault eEURO balance)
- Total outstanding token value (sum of all open positions at BSEI)
- Reserve ratio: V_eEURO / obligations
- H_solv_CORE current value
- H_solv_SYSTEM current value
- Current Tier

**Invariant enforced at smart contract level:**
```
V_eEURO PnL_ITM + Reserve_Op
```

**IF this invariant is violated:**
- New token issuance suspended immediately
- Smart contract enforces this automatically
- No human intervention required or possible

---

## Security Model

### Upgrade Philosophy

**THREE CATEGORIES OF CODE:**

**IMMUTABLE (never upgradeable):**
ProtocolVault.sol core
BSRToken.sol short sell prohibition
SIL mechanics
Stop-out constant
H_solv Tier V threshold

**Rationale:** these protect participant funds. If they could be upgraded, they could be exploited. No upgrade path = maximum security for participant capital.

**GOVERNANCE-UPGRADEABLE (with timelock):**
OracleWriter.sol (new markets/sources)
BSEICalculator.sol (methodology refinement)
HealthMonitor.sol (zone threshold tuning)
SolvencyMonitor.sol (Tier threshold tuning)
BurnEngine.sol (burn rate adjustments)
V2PEscrow.sol (new retailer integrations)

**Timelock periods:**
- Minor parameter changes: 48 hours
- Major parameter changes: 7 days
- During timelock: participants can see what is changing and exit if they disagree

**EMERGENCY-UPGRADEABLE (multisig):**
Pause functions (H_solv Tier V only)
Oracle emergency price carry-forward
Prime broker API circuit breakers

**Multisig:** 3 of 5 keyholders required
Keyholders: geographically distributed, legally independent, publicly disclosed

### Audit Requirements

**PRE-LAUNCH (mandatory):**

**OpenZeppelin - primary audit**
- Scope: all smart contracts
- Timeline: 6-8 weeks
- Cost: ~$100,000-150,000

**Trail of Bits - secondary audit**
- Scope: critical contracts (ProtocolVault, BSRToken, MatchingEngine)
- Timeline: 4-6 weeks
- Cost: ~$80,000-120,000

**Certora - formal verification**
- Scope: invariant verification (Proof of Reserve, SIL mechanics, short sell prohibition)
- Timeline: 4-6 weeks
- Cost: ~$50,000-80,000

**POST-LAUNCH (ongoing):**
Immunefi bug bounty programme
- Max bounty: $500,000 for critical bugs
- Ongoing - always active

Annual re-audit for any upgraded contracts
Chainlink oracle integration audit (required for Aave listing)

### Multisig and Key Management

**PROTOCOL MULTISIG (3 of 5):**
Controls: emergency pause, oracle emergency
**Keyholders:**
- Founder (hardware wallet, cold storage)
- Lead developer (hardware wallet)
- Legal counsel (hardware wallet)
- Independent board member 1
- Independent board member 2

**Geographic distribution:**
No two keyholders in same country
No two keyholders same legal jurisdiction

**Key storage:**
Hardware wallets only (Ledger/Trezor)
No software wallets for multisig keys
Keys never connected to internet except at moment of signing

**GOVERNANCE MULTISIG (for timelock execution):**
Same 3 of 5 structure
Executes governance-approved changes after timelock expires
Cannot override governance vote results
Can only execute what governance approved

---

## Development Roadmap - Technical

**MONTH 1-2 - Smart Contract Development:**
- Core contracts coded in Solidity
- Unit tests written (100% coverage target)
- Internal security review
- Audit firms engaged

**MONTH 2-3 - Testnet Deployment:**
- Deploy to Arbitrum Sepolia testnet
- Full integration testing
- Oracle node testing
- ISA integration testing
- Account Abstraction testing
- Paymaster testing

**MONTH 2-4 - Audit Process:**
- OpenZeppelin audit begins Month 2
- Trail of Bits audit begins Month 2
- Certora formal verification Month 3
- All findings remediated before launch

**MONTH 3 - Mainnet Launch:**
- Deploy to Arbitrum One mainnet
- Oracle nodes go live
- BS-G-NL + BS-P-DE contracts deployed
- BSEI begins calculating
- Immunefi bug bounty activated
- All audit reports published publicly

**MONTH 6 - Chainlink Integration:**
- BSEI published as Chainlink feeds (BS-G-NL/EUR, BS-P-DE/EUR)
- Required for Aave/Morpho governance proposals

**MONTH 9 - Ethereum Bridge:**
- Arbitrum Ethereum mainnet bridge
- For institutional participants requiring mainnet finality

**MONTH 12+ - Additional Markets:**
- New BSToken.sol per market activation
- New Chainlink feed per market
- Oracle sources expanded per market

---

## What This Means for BlackSlon

Understanding the technical infrastructure reveals why certain design decisions were made - and confirms that the Protocol's promises are mathematically enforced, not policy-dependent.

**"The Vault cannot be drained"**
TRUE: ProtocolVault.sol is immutable. Nobody - including BlackSlon - can change how it holds or releases funds.

**"BSR cannot be short sold"**
TRUE: BSRToken.sol transfer() reverts on any transaction creating net short. No governance path to remove this.

**"Every burn is verifiable"**
TRUE: BurnExecuted event on Arbitrum. Anyone can verify amount, timing, supply before and after.

**"H_solv is published in real time"**
TRUE: SolvencyMonitor.sol publishes every block - approximately every 0.25 seconds on Arbitrum.

**"Participants can verify reserves"**
TRUE: ProofOfReserve.sol publishes continuously - no trust required.

**"ISA cannot exceed pre-approved scope"**
TRUE: Session Keys have hard limits encoded in Smart Account. Cannot be extended by ISA autonomously.

The Protocol does not ask participants to trust BlackSlon. It asks them to verify - and makes verification possible for anyone, at any time, from anywhere.

---

## Protocol Constants - Infrastructure

| Constant | Value | Location |
|----------|-------|----------|
| Blockchain | Arbitrum One | - |
| Token standard | ERC-20 | All tokens |
| Account model | ERC-4337 (Account Abstraction) | All participants |
| Gas model | Paymaster (eEURO) | Mode 3 participants |
| Oracle minimum providers | 3 per market | OracleWriter.sol |
| Oracle outlier threshold | 15% from median | OracleWriter.sol |
| BSEI Chainlink deviation trigger | 0.5% | Chainlink feed |
| BSEI Chainlink heartbeat | 3600 seconds | Chainlink feed |
| Timelock minor changes | 48 hours | TimelockController.sol |
| Timelock major changes | 7 days | TimelockController.sol |
| Multisig threshold | 3 of 5 | GovernanceMultisig |
| Bug bounty maximum | $500,000 | Immunefi |
| BSR total supply | 100,000,000 | BSRToken.sol |
| BSR wallet concentration limit | 5% | BSRToken.sol |
| Proof of Reserve update | Every block (~0.25s) | ProofOfReserve.sol |

---

**Block 06B - Protocol Infrastructure | Canonical | April 2026**

**Blockchain:** Arbitrum One

**Dependencies:** Block 06A (Price Formation), Block 01 (Collateral), Block 05 (Risk Engine)

**Next:** Compose output documents from all blocks
