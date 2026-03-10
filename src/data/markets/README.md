# BlackSlon Markets - Historical Data Management

## 📁 Struktura plików

Każdy rynek ma swój plik JSON z danymi historycznymi:
- `BS-P-PL.json` - Polski rynek energii (Polish Power)
- `BS-G-NL.json` - Holenderski rynek gazu (Dutch Gas)
- `BS-G-DE.json` - Niemiecki rynek gazu (German Gas)
- `BS-P-FR.json` - Francuski rynek energii (French Wind)

## 📊 Format pliku JSON

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
    { "date": "2026-03-08", "price": 8.92, "volume": 95000 },
    ...
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

## 🔄 Proces codziennej aktualizacji (ręczny)

### Krok 1: Pobranie danych
Źródła danych dla każdego rynku:
- **BS-P-PL**: TGE (Towarowa Giełda Energii) - https://tge.pl
- **BS-G-NL**: TTF (Title Transfer Facility) - https://www.theice.com/products/27996665/dutch-ttf-gas-futures
- **BS-G-DE**: THE (The European Energy Exchange) - https://www.eex.com
- **BS-W-FR**: EPEX SPOT - https://www.epexspot.com

### Krok 2: Dodanie nowego wpisu
1. Otwórz odpowiedni plik JSON (np. `BS-G-NL.json`)
2. Dodaj nowy wpis na **początku** tablicy `historicalData`:
   ```json
   { "date": "2026-03-09", "price": 8.97, "volume": 94000 }
   ```
3. Usuń **najstarszy** wpis z końca tablicy (zachowaj 20 dni historii)
4. Zaktualizuj pole `lastUpdate` na aktualną datę i czas

### Krok 3: Przeliczenie BSSZ
1. Oblicz nowy `anchor` jako średnią z ostatnich 20 dni:
   ```
   anchor = suma(price[0..19]) / 20
   ```
2. Zaktualizuj `floor` i `ceiling`:
   ```
   floor = anchor * 0.90
   ceiling = anchor * 1.20
   ```
3. Zapisz nowe wartości w sekcji `bsszCalculation`

### Krok 4: Weryfikacja
- Sprawdź czy JSON jest poprawny (użyj JSONLint lub VS Code)
- Upewnij się, że `historicalData` ma dokładnie 20 wpisów
- Sprawdź czy daty są w kolejności malejącej (najnowsza na początku)

## 🤖 Automatyzacja (przyszłość)

W przyszłości proces będzie zautomatyzowany przez:
1. **API Integration** - automatyczne pobieranie danych z giełd
2. **Cron Job** - codzienne uruchamianie o 00:00 UTC
3. **Smart Contract Oracle** - weryfikacja danych on-chain

## 📝 Przykład aktualizacji

**Przed (2026-03-08):**
```json
{
  "lastUpdate": "2026-03-08T13:00:00Z",
  "historicalData": [
    { "date": "2026-03-08", "price": 8.92, "volume": 95000 },
    { "date": "2026-03-07", "price": 8.85, "volume": 88000 },
    ...
    { "date": "2026-02-17", "price": 8.86, "volume": 90000 }
  ],
  "bsszCalculation": {
    "anchor": 8.95,
    "floor": 8.06,
    "ceiling": 10.74
  }
}
```

**Po (2026-03-09):**
```json
{
  "lastUpdate": "2026-03-09T13:00:00Z",
  "historicalData": [
    { "date": "2026-03-09", "price": 8.97, "volume": 94000 },  ← NOWY
    { "date": "2026-03-08", "price": 8.92, "volume": 95000 },
    { "date": "2026-03-07", "price": 8.85, "volume": 88000 },
    ...
    { "date": "2026-02-18", "price": 9.00, "volume": 96000 }
    // 2026-02-17 został usunięty
  ],
  "bsszCalculation": {
    "anchor": 8.96,  ← PRZELICZONE
    "floor": 8.06,   ← PRZELICZONE
    "ceiling": 10.75 ← PRZELICZONE
  }
}
```

## ⚠️ Ważne uwagi

1. **Zawsze zachowuj backup** przed edycją
2. **Nie zmieniaj struktury** pliku JSON
3. **Zachowaj dokładnie 20 wpisów** w `historicalData`
4. **Używaj formatu ISO 8601** dla dat (`YYYY-MM-DD`)
5. **Ceny w EUR** z dokładnością do 2 miejsc po przecinku
6. **Volume w kWh** (bez jednostki w liczbie)

## 🔗 Integracja z kodem

Dane są ładowane w:
- `src/store/blackslon.ts` - usePhysical store
- `src/store/blackslon.ts` - useVirtual store

Po aktualizacji pliku JSON, restart aplikacji załaduje nowe dane.
