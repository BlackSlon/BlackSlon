# 🚀 Quick Start: Dodawanie nowego rynku BS-G-NL

## ✅ Co zostało zrobione

### 1. Struktura plików
```
src/data/markets/
├── BS-P-PL.json              ✅ Polski rynek energii
├── BS-G-NL.json              ✅ Holenderski rynek gazu (NOWY)
├── index.ts                  ✅ Loader danych
├── orderBookGenerator.ts     ✅ Generator Order Book
├── README.md                 ✅ Dokumentacja techniczna
└── QUICK_START.md           ✅ Ten plik
```

### 2. Typy TypeScript
```typescript
// src/store/types.ts
export type MarketId = 'BS-P-PL' | 'BS-G-NL' | 'BS-G-DE' | 'BS-W-FR'
```

### 3. Dane historyczne BS-G-NL
- ✅ 20 dni danych historycznych (2026-02-17 → 2026-03-08)
- ✅ Anchor: 8.95 EUR/100kWh
- ✅ BSSZ Floor: 8.06 EUR
- ✅ BSSZ Ceiling: 10.74 EUR

## 📋 Codzienna aktualizacja (5 minut)

### Krok 1: Pobierz dane z TTF
Źródło: https://www.theice.com/products/27996665/dutch-ttf-gas-futures

**Potrzebujesz:**
- Settlement Price (cena zamknięcia)
- Volume (wolumen)

### Krok 2: Edytuj BS-G-NL.json

Otwórz: `src/data/markets/BS-G-NL.json`

```json
{
  "lastUpdate": "2026-03-10T13:00:00Z",  ← ZMIEŃ datę
  "historicalData": [
    { "date": "2026-03-10", "price": 9.02, "volume": 96000 },  ← DODAJ
    { "date": "2026-03-09", "price": 8.97, "volume": 94000 },
    ...
    { "date": "2026-02-19", "price": 8.90, "volume": 88000 }
    // USUŃ ostatni wpis (2026-02-18)
  ]
}
```

### Krok 3: Przelicz BSSZ

**Excel/Kalkulator:**
```
1. Suma 20 cen = ?
2. Anchor = Suma / 20
3. Floor = Anchor × 0.90
4. Ceiling = Anchor × 1.20
```

**Przykład:**
```
Suma = 179.40
Anchor = 179.40 / 20 = 8.97
Floor = 8.97 × 0.90 = 8.07
Ceiling = 8.97 × 1.20 = 10.76
```

Zaktualizuj w pliku:
```json
"bsszCalculation": {
  "anchor": 8.97,
  "floor": 8.07,
  "ceiling": 10.76,
  ...
}
```

### Krok 4: Restart aplikacji
```bash
npm run dev
```

## 🔍 Weryfikacja

Po restarcie sprawdź:
1. Aplikacja uruchamia się bez błędów
2. Dane BS-G-NL są dostępne w systemie
3. BSSZ corridor jest poprawny

## 📊 Struktura danych BS-G-NL

```json
{
  "marketId": "BS-G-NL",
  "marketName": "Dutch Gas Market",
  "commodity": "Natural Gas",
  "country": "Netherlands",
  "currency": "EUR",
  "unit": "100kWh",
  "lastUpdate": "2026-03-09T13:00:00Z",
  "historicalData": [
    // 20 wpisów, najnowszy pierwszy
  ],
  "bsszCalculation": {
    "anchor": 8.95,
    "floor": 8.06,
    "ceiling": 10.74,
    "method": "20-day rolling average",
    "floorFormula": "anchor * 0.90",
    "ceilingFormula": "anchor * 1.20"
  }
}
```

## 🎯 Następne kroki

### Aby aktywować BS-G-NL w UI:

1. **Dodaj selektor rynku** w interfejsie
2. **Podłącz dane** do usePhysical/useVirtual stores
3. **Wygeneruj Order Book** dla BS-G-NL
4. **Przetestuj trading** na nowym rynku

### Przyszłe rynki:

- **BS-G-DE** - Niemiecki rynek gazu
- **BS-W-FR** - Francuski rynek wiatrowy
- **BS-P-DE** - Niemiecki rynek energii

## 💡 Tips

**Backup przed edycją:**
```bash
cp BS-G-NL.json BS-G-NL.json.backup
```

**Walidacja JSON:**
- Użyj VS Code (auto-format: Alt+Shift+F)
- Lub JSONLint.com

**Automatyzacja (przyszłość):**
- API integration z ICE/TTF
- Cron job (codziennie 00:00 UTC)
- Smart contract oracle

## 📞 Support

Problemy? Sprawdź:
1. `MARKET_UPDATE_GUIDE.md` - pełna dokumentacja
2. `README.md` - szczegóły techniczne
3. Zespół BlackSlon Protocol

---

**Utworzono:** 2026-03-09  
**Rynek:** BS-G-NL (Dutch Gas Market)  
**Status:** ✅ Gotowy do użycia
