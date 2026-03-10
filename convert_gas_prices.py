import json

# Read the file
with open('src/data/markets/BS-G-NL.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update unit
data['unit'] = 'EUR/100kWh'

# Convert all prices by dividing by 10
for position in data['bsszPositions']:
    # Convert adrData prices
    for adr in position['adrData']:
        if adr.get('dayAhead') is not None:
            adr['dayAhead'] = round(adr['dayAhead'] / 10, 4)
        if adr.get('frontMonth') is not None:
            adr['frontMonth'] = round(adr['frontMonth'] / 10, 4)
        if adr.get('frontQuarter') is not None:
            adr['frontQuarter'] = round(adr['frontQuarter'] / 10, 4)
        if adr.get('quarter2') is not None:
            adr['quarter2'] = round(adr['quarter2'] / 10, 4)
        if adr.get('cal') is not None:
            adr['cal'] = round(adr['cal'] / 10, 4)
        if adr.get('meridian') is not None:
            adr['meridian'] = round(adr['meridian'] / 10, 4)
    
    # Convert BSSZ values
    position['bssz']['anchor'] = round(position['bssz']['anchor'] / 10, 4)
    position['bssz']['floor'] = round(position['bssz']['floor'] / 10, 4)
    position['bssz']['ceiling'] = round(position['bssz']['ceiling'] / 10, 4)

# Write back
with open('src/data/markets/BS-G-NL.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Converted all prices from EUR/MWh to EUR/100kWh (÷10)")
