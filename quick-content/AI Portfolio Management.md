# AI Portfolio Management

---

## Warstwa 2 — AI Portfolio Manager (zarządzanie)

Tu jest bardziej skomplikowanie — regulacyjnie wchodzisz w obszar **discretionary portfolio management**, który w UE wymaga licencji MiFID II.

Ale jest eleganckie wyjście:

### Model: Smart Contract Automation zamiast AI Discretion

Klient nie daje AI pełnomocnictwa do zarządzania — **klient ustawia reguły, które smart contract wykonuje automatycznie**. AI pomaga te reguły skonfigurować.

---

### Przykład: Klient → AI → Smart Contract

Klient mówi AI:

> *"Chcę kupować BS-G co miesiąc za 500 EUR,
> podwoić zakup jeśli cena spadnie o 10%,
> nie przekraczać 30% portfela w jednej pozycji"*

AI tłumaczy to na parametry smart contractu:

```
→ DCA rule:            500 EUR/miesiąc
→ Dip rule:            2× przy spadku ≥10% od ostatniego zakupu
→ Concentration limit: max 30%
```

**Smart contract wykonuje automatycznie — bez dalszego udziału AI ani klienta.**

---

### Kwalifikacja regulacyjna

To **nie jest** discretionary management.

- **Klient** podejmuje decyzje (definiuje reguły)
- **Smart contract** je wykonuje
- **AI** jest tylko interfejsem, który pomaga klientowi te reguły sformułować

Brak uznaniowości po stronie AI = brak wymogu licencji MiFID II na discretionary portfolio management.

---

*Document: AI Portfolio Management · BlackSlon Protocol · MiFID II Compliance Model*
