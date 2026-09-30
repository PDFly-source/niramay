# Changelog

All notable changes to Niramay are documented here.
This project follows [Semantic Versioning](https://semver.org).

## [2.1.0] — 2026-09-30

### Added
- Safety-first red-flag detection in the AI engine: severe-symptom cues
  (intense pain, bleeding, breathing distress, symptoms persisting >3 days)
  are detected **before** any intent or entity matching and always take priority.
- Explicit confidence levels (high / medium / low / unknown) on every AI response.
- New symptom coverage: গলা / gola (throat) queries, digestion meta-queries,
  and a nausea & vomiting-urge category.
- New verified knowledge entities: Neem, Ghritakumari (Aloe Vera),
  Pudina (Field Mint), and Jeera (Cumin).
- "Search Niramay" action for unknown queries — hands off from the AI
  assistant to the universal command palette.
- Smart scroll in the AI assistant: auto-scroll when near the bottom,
  with a "New response ↓" pill when reading older messages.
- Voice-input graceful states: explicit permission-denied and
  unsupported-browser messages; text input always remains available.
- CHANGELOG.md, professional README, SECURITY.md, CI workflow, and
  real product screenshots.

### Improved
- Typo tolerance: repeated-character collapse ("gingerrr" → "ginger")
  and additional curated Roman Assamese variants (adaa, pett, bis, zor,
  tuloxi, golaw, golar).
- Command palette ranking is now tiered: title match → synonym/phonetic
  tier → description match, with 120 ms input debouncing.
- AI responses are structured into clear sections: Available Niramay
  content, Next steps, and follow-up suggestions — each chip runs a real query.
- Accessibility: chat stream announced via `aria-live`, Escape closes
  modals, focus is trapped inside dialogs, and initial focus lands on the input.
- Search index and README/social preview use the official brand artwork only.

### Fixed
- Honest fallback for out-of-domain questions: no invented remedies,
  with working Explore actions instead of dead links.
- Keyboard-scroll race condition when the assistant opens from a
  queued quick prompt.
- Two React 19 strict-mode lint violations in the command palette and
  search trigger (no behavior change).

### Quality
- TypeScript: PASS · Production build: PASS · 0 console errors
- AI engine test suite expanded to **115/115 passing**, including a
  full English / অসমীয়া / Roman Assamese / mixed / typo query matrix,
  red-flag precedence tests, and a route audit of every AI action link.

### Known Limitations
- Physical Android/iOS device QA (voice input, on-screen keyboard
  behavior) has **not** been performed — browser-simulated QA only.
- Search results are presented in one ranked list (with type filters)
  rather than visually grouped sections.
- No license has been chosen yet for the repository.

## [2.0.0] — 2026-09-30

### Added
- Local AI intent engine: navigation, plant/symptom/remedy intents, and
  natural-language queries in English, অসমীয়া, and Roman Assamese.
- Universal command palette (Ctrl+K) across remedies, symptoms, plants,
  and tools.
- Smart navigation layer with trilingual intent detection.

## [1.0.0] — 2026-09-29

### Added
- Initial public build: kitchen remedies, medicinal plant library,
  categories, symptoms, wellness tools (spice scanner, plant scanner,
  dosha assessment, Ritucharya, daily habits, fridge card),
  installable PWA, official Niramay branding, light/dark mode.
