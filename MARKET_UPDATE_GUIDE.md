# 📊 Przewodnik aktualizacji danych rynkowych BlackSlon

## 🎯 Struktura rynków

Obecnie wspierane rynki:
- **BS-P-PL** - Polski rynek energii (Polish Power Market)
- **BS-G-NL** - Holenderski rynek gazu (Dutch Gas Market) ✨ NOWY

## 📁 Lokalizacja plików

```
src/data/markets/
├── BS-P-PL.json          ← Dane polskiego rynku energii
├── BS-G-NL.json          ← Dane holenderskiego rynku gazu
├── README.md             ← Szczegółowa dokumentacja
├── index.ts              ← Loader danych
└── loader.ts             ← Funkcje pomocnicze
```

## 🔄 Proces codziennej aktualizacji (RĘCZNY)

### Krok 1: Pobranie danych z giełdy

**Dla BS-G-NL (TTF - Dutch Gas):**
1. Wejdź na: https://www.theice.com/products/27996665/dutch-ttf-gas-futures
2. Pobierz cenę zamknięcia (settlement price) z poprzedniego dnia
3. Pobierz wolumen obrotu (volume)

**Dla BS-P-PL (TGE - Polish Power):**
1. Wejdź na: https://tge.pl
2. Pobierz cenę zamknięcia z Rynku Dnia Następnego (RDN)
3. Pobierz wolumen obrotu

### Krok 2: Edycja pliku JSON

Otwórz odpowiedni plik (np. `src/data/markets/BS-G-NL.json`):

```json
{
  "lastUpdate": "2026-03-10T13:00:00Z",  ← Zmień datę
  "historicalData": [
    { "date": "2026-03-10", "price": 9.02, "volume": 96000 },  ← DODAJ NOWY
    { "date": "2026-03-09", "price": 8.97, "volume": 94000 },
    { "date": "2026-03-08", "price": 8.92, "volume": 95000 },
    ...
    { "date": "2026-02-19", "price": 8.90, "volume": 88000 }
    // USUŃ najstarszy wpis (2026-02-18)
  ]
}
```

**WAŻNE:**
- Dodaj nowy wpis **na początku** tablicy
- Usuń **ostatni** (najstarszy) wpis
- Zachowaj **dokładnie 20 wpisów**
- Daty w formacie `YYYY-MM-DD`
- Ceny z dokładnością do 2 miejsc po przecinku

### Krok 3: Przeliczenie BSSZ (BlackSlon Settlement Zone)

**Formuła:**
```
anchor = średnia(ostatnie 20 dni)
floor = anchor × 0.90
ceiling = anchor × 1.20
```

**Przykład dla BS-G-NL:**
```javascript
// Suma cen z ostatnich 20 dni
suma = 8.92 + 8.85 + 8.98 + ... + 8.90 = 179.20

// Anchor (średnia)
anchor = 179.20 / 20 = 8.96

// BSSZ
floor = 8.96 × 0.90 = 8.06
ceiling = 8.96 × 1.20 = 10.75
```

Zaktualizuj sekcję `bsszCalculation`:
```json
"bsszCalculation": {
  "anchor": 8.96,
  "floor": 8.06,
  "ceiling": 10.75,
  "method": "20-day rolling average",
  "floorFormula": "anchor * 0.90",
  "ceilingFormula": "anchor * 1.20"
}
```

### Krok 4: Weryfikacja

✅ **Checklist:**
- [ ] Plik JSON jest poprawny (sprawdź w VS Code)
- [ ] `historicalData` ma dokładnie 20 wpisów
- [ ] Daty są w kolejności malejącej (najnowsza → najstarsza)
- [ ] `lastUpdate` jest aktualny
- [ ] BSSZ przeliczone poprawnie
- [ ] Ceny w EUR (2 miejsca po przecinku)
- [ ] Volume w kWh (liczba całkowita)

### Krok 5: Restart aplikacji

```bash
npm run dev
```

Aplikacja automatycznie załaduje nowe dane z plików JSON.

## 📊 Przykład kompletnej aktualizacji

**Data:** 2026-03-10  
**Rynek:** BS-G-NL (Dutch Gas)  
**Źródło:** ICE TTF Futures  

**Nowe dane:**
- Cena: 9.02 EUR/100kWh
- Volume: 96,000 kWh

**Przed aktualizacją:**
```json
{
  "lastUpdate": "2026-03-09T13:00:00Z",
  "historicalData": [
    { "date": "2026-03-09", "price": 8.97, "volume": 94000 },
    ...20 wpisów...
    { "date": "2026-02-18", "price": 9.00, "volume": 96000 }
  ],
  "bsszCalculation": {
    "anchor": 8.95,
    "floor": 8.06,
    "ceiling": 10.74
  }
}
```

**Po aktualizacji:**
```json
{
  "lastUpdate": "2026-03-10T13:00:00Z",
  "historicalData": [
    { "date": "2026-03-10", "price": 9.02, "volume": 96000 },  ← NOWY
    { "date": "2026-03-09", "price": 8.97, "volume": 94000 },
    ...19 wpisów...
    { "date": "2026-02-19", "price": 8.90, "volume": 88000 }
    // 2026-02-18 usunięty
  ],
  "bsszCalculation": {
    "anchor": 8.96,   ← Przeliczone
    "floor": 8.06,    ← Przeliczone
    "ceiling": 10.75  ← Przeliczone
  }
}
```

## 🤖 Przyszła automatyzacja

W roadmapie:
1. **API Integration** - automatyczne pobieranie z giełd
2. **Cron Job** - codzienne uruchamianie o 00:00 UTC
3. **Oracle Smart Contract** - weryfikacja on-chain
4. **Dashboard** - interfejs do zarządzania danymi

## ⚠️ Troubleshooting

**Problem:** JSON syntax error  
**Rozwiązanie:** Użyj JSONLint.com lub VS Code do walidacji

**Problem:** Aplikacja nie ładuje nowych danych  
**Rozwiązanie:** Restart dev server (`Ctrl+C` → `npm run dev`)

**Problem:** Błędne obliczenia BSSZ  
**Rozwiązanie:** Sprawdź czy wszystkie 20 cen jest uwzględnionych w średniej

## 📞 Kontakt

W razie problemów z aktualizacją danych, skontaktuj się z zespołem technicznym BlackSlon Protocol.

---

**Ostatnia aktualizacja:** 2026-03-09  
**Wersja:** 1.0.0
