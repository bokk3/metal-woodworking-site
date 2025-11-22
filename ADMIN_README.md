# Admin Dashboard - Gebruikershandleiding

## Toegang tot het Admin Dashboard

Ga naar: **`/admin`** in uw browser (bijvoorbeeld: `https://uw-domein.be/admin`)

U wordt automatisch doorgestuurd naar de login pagina als u niet ingelogd bent.

## Eerste Setup

1. **Stel het admin wachtwoord in** in uw `.env.local` bestand:
   ```
   ADMIN_PASSWORD=uw-veilig-wachtwoord-hier
   ```

2. **Herstart de applicatie** zodat het wachtwoord wordt gehashed en opgeslagen in de database.

3. **Log in** met het wachtwoord dat u heeft ingesteld.

## Wat kunt u zien?

Het admin dashboard toont twee tabbladen:

### 1. Contact Formulieren
Alle inzendingen van het contactformulier met:
- Naam en contactgegevens (e-mail, telefoon)
- Projecttype
- Budget
- Voorkeur contactmethode
- Gewenste afspraakdatum
- Volledige bericht

### 2. Offertes
Alle offerte aanvragen met:
- Naam en contactgegevens (indien opgegeven)
- Projecttype en materiaal
- Afmetingen en aantal
- Geschatte prijs en prijsbereik
- Opmerkingen

## Functies

### CSV Export
- Klik op **"Exporteer naar CSV"** om alle inzendingen te downloaden
- De CSV kan worden geopend in Excel, Google Sheets of andere spreadsheet programma's
- Handig voor het bijhouden van leads en het maken van rapporten

### Directe Acties
- **E-mail**: Klik op een e-mailadres om direct een e-mail te sturen
- **Telefoon**: Klik op een telefoonnummer om direct te bellen (op mobiele apparaten)

## Tips

- De inzendingen worden automatisch gesorteerd op datum (nieuwste eerst)
- Gebruik de CSV export regelmatig om een backup te maken
- De data wordt opgeslagen in een SQLite database in de `data/` map

## Beveiliging

Het admin dashboard is nu beveiligd met:
- **Wachtwoord authenticatie**: Wachtwoord wordt gehashed opgeslagen in de database
- **Sessie management**: 7 dagen geldige sessie cookies
- **Automatische initialisatie**: Wachtwoord wordt automatisch uit `.env.local` gehaald bij eerste gebruik

**Belangrijk voor productie**:
- Gebruik een sterk wachtwoord in `.env.local`
- Zorg dat `.env.local` niet in git wordt gecommit
- Overweeg extra beveiliging zoals IP-whitelisting of VPN toegang

