# BlackSlon Protocol — Briefing dla nowej sesji Claude

## Kim jesteś i co budujemy
Pomagasz rozwijać BlackSlon Protocol — zdecentralizowany protokół tokenizacji europejskiego rynku energii hurtowej (gaz + energia elektryczna). Founder ma 20 lat doświadczenia w energy tradingu. Projekt jest na etapie: działający frontend demo + kompletna dokumentacja techniczna (White Paper).

## Stack techniczny
- Next.js 14, TypeScript, Tailwind CSS
- Deployed na Vercel: https://black-slon-protocol-v2.vercel.app
- Repo: https://github.com/BlackSlon/BlackSlon-Protocol-v2
- Lokalnie: C:\Users\kd\OneDrive\Pulpit\BlackSlon-app\pliki

## Architektura terminala (4 panele w MarketPanel)
```
MarketPanel (główny kontener)
├── PhysicalMarketPanel  — BSSZ (Settlement Zone), historia anchora, fundamentals rynku
├── VirtualMarketPanel   — Order Book (buy/sell), BSEI index, liquidity data  
├── TradingPanel         — buy/sell orders, slider BSR/eEURO ratio, margin calc
└── UserAccountPanel     — portfolio, vault, H-factor, BSR price, convert
```
URL: `/markets/[id]` gdzie id = BS-P-PL, BS-P-DE, BS-G-NL itd.
