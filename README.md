# Blackjack Basic Strategy Trainer

A single-page Next.js (App Router) + TypeScript + Tailwind app to practice Blackjack Basic Strategy.

## Quick Start

```bash
# Install deps
npm install

# Run dev server
npm run dev

# Build
npm run build

# Start production server
npm start
```

Open http://localhost:3000

## Notes
- Strategy: Multi-deck, dealer stands on soft 17 (S17), doubling after split allowed (DAS).
- Deck reshuffles each hand to present independent scenarios.
- Split is only enabled on an initial pair. Double is only enabled on the initial two cards.

## Structure
- `app/` Next.js App Router pages and layout
- `components/` UI components
- `lib/blackjack.ts` core types, deck, evaluation, and strategy logic

## Tailwind
Tailwind is configured via `tailwind.config.js` and imported in `app/globals.css`.

## License
For educational use.