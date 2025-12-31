# Familiespådommer 2026

En webapplikasjon for å registrere og sammenligne familiespådommer for 2026.

## Funksjoner

- 🔐 Enkel pålogging med delt kodeord
- 📝 Registrer dine spådommer (10 ja/nei spørsmål)
- 👥 Se alle familiemedlemmers spådommer
- 📊 Sammenlign resultater med statistikk
- 📥 Eksporter data til CSV
- 📱 Responsivt design for mobil og desktop
- 🌙 Støtte for mørk modus

## Teknologier

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore)
- **Deployment**: Netlify

## Oppsett for utvikling

1. Klon repositoriet:
```bash
git clone https://github.com/eivindhammers/famipred.git
cd famipred
```

2. Installer avhengigheter:
```bash
npm install
```

3. Opprett en `.env.local` fil basert på `.env.example`:
```bash
cp .env.example .env.local
```

4. Konfigurer Firebase:
   - Opprett et nytt Firebase-prosjekt på [Firebase Console](https://console.firebase.google.com/)
   - Aktiver Firestore Database
   - Kopier Firebase-konfigurasjon til `.env.local`
   - Oppdater `NEXT_PUBLIC_SHARED_CODE` med ditt egne kodeord

5. Start utviklingsserver:
```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Deployment til Netlify

1. Push koden til GitHub
2. Gå til [Netlify](https://www.netlify.com/)
3. Klikk "Add new site" → "Import an existing project"
4. Velg ditt GitHub-repository
5. Sett build-kommando: `npm run build`
6. Sett publish-directory: `.next`
7. Legg til environment variables fra `.env.local`
8. Deploy!

## Bruk

1. Besøk nettsiden
2. Logg inn med familiens kodeord
3. Skriv inn navnet ditt
4. Besvar de 10 spådommene
5. Lagre og se alle familiemedlemmers spådommer
6. Sammenlign resultater og eksporter data

## Spørsmål

Applikasjonen inneholder 10 spådommer om:
1. Vil noen i familien få barn i 2026?
2. Vil noen i familien bytte jobb i 2026?
3. Vil noen i familien flytte til en ny by i 2026?
4. Vil familien samles mer enn 5 ganger i 2026?
5. Vil noen i familien dra på en eksotisk ferie i 2026?
6. Vil noen i familien kjøpe bil eller bolig i 2026?
7. Vil familien ha et større arrangement/fest i 2026?
8. Vil noen i familien starte en ny hobby i 2026?
9. Vil noen i familien oppnå en stor karrieresuksess i 2026?
10. Vil 2026 bli et bedre år enn 2025 for familien?

## Lisens

Dette prosjektet er laget for privat bruk av familien Hammersmark Olsen.
