# The Collateral Model: Running Cash Account

---

The protocol operates on a **Running Cash Account** model. This choice is deliberate and reflects the nature of the participant base — energy buyers, corporate treasuries, and long-duration position holders, not speculative day traders.

---

## How It Works

### Position Opening

When a client opens a position, the required **Initial Margin** — determined by their €BSR/eEURO ratio in the Tiering Matrix — is locked in their Reserve Vault immediately. It cannot be withdrawn or redeployed while the position is open.

The client sees their floating P&L updated continuously, and this feeds their **Health Factor** calculation. But floating gains do not become available capital. They are informational, not operational.

---

### Position Closing

When a position closes — voluntarily or through the **Smart Incremental Liquidation Mechanism** — the realised outcome is credited or debited to the vault instantly:

- **A gain** increases the vault balance and becomes available for withdrawal or for opening a new position
- **A loss** reduces it, applied equally across eEURO and €BSR balances per the **50/50 Rule**

**The vault balance after settlement is the single source of truth.** No approximations, no mark-to-market interpretations, no floating margin calculations required to understand what the client can do next.

---

### Redeploying a Profitable Position

A client who wants to deploy a profitable position into new exposure:

1. Closes the current position
2. Receives the credit to vault
3. Opens the new position

Two transaction fees, a clean ledger entry, and a deliberate decision.

---

## Design Philosophy

This is not friction — it is clarity.

In a market where positions represent **real energy obligations extending over months or years**, clarity is the correct design choice. The Running Cash Account model ensures that every participant always knows exactly what they can do next, without approximation or interpretation.

---

*Document: Collateral Model · BlackSlon Protocol · Reserve Vault Architecture*
