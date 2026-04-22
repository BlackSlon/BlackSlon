# The Authority Hierarchy

```
LAYER ZERO - DETERMINISTIC (no AI, fully auditable)

Physical Meridian Engine          BSEI Engine
(oracle: TTF/EPEX data)           (order book transactions)
        |                                  |
        V                                  V
ADR Engine                        Mark-to-Market reference
(contract transition logic)       Input to H_user
        |
        V
Settlement Anchor Calculator
(A = 0.50×â[T-1] + 0.25×â[T-2] + 0.25×â[T-3])
        |
        V
BSSZ Calculator
(Floor = A×0.90 | Ceiling = A×1.20)
        |
        V
Matching Engine Corridor Enforcement
(hard constraint on all order submissions)

LAYER ONE - PROTOCOL AI MODELS

                 HIGHEST AUTHORITY
                 H_solv
                 Ecosystem Solvency
                 Tier I / II / III / IV
                 Global restrictions
                 |
                 | constrains all Layer One
         V
H_user, Prime Broker Mandate Manager, BSR/eEURO Ratio Manager (protocol), Market Integrity Monitor
                 |
                 | aggregate data only
                 | (no individual identities)
                 V
alerts only
read-only interface

LAYER TWO - PARTICIPANT INTELLIGENCE

                 ISA
                 Advisory
                 Automation rules
                 Custodial vault
                 Mode 3 execution
                 |
                 | same participant only
                 V
BSR/eEURO Ratio Manager (user level)

EXTERNAL PARTICIPANTS (outside protocol boundary)

Energy Retailers          Price Seekers
(physical delivery        (order book trading,
 in Phase 2,               secondary market,
 token settlement,         financial exposure)
 independent licences)

PRIME BROKER (regulated financial institution)

Layer 2 Market Making     Delta Hedge Book
(energy trading desk      (TTF futures ICE,
 quotes within BSSZ,       EPEX forwards,
 earns bid-ask spread)     variation margin
                           flows to Vault)
```

---

*Document: The Authority Hierarchy · BlackSlon Protocol · Three-Layer AI Architecture*
