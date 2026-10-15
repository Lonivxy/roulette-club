# Roulette Club

A standalone play-chip game extending the supplied 3D roulette page.

## Play

Open `dist/index.html`, or use the sibling `roulette.html` standalone copy. The 3D wheel, original utility styles, and fonts load from external CDNs and need an internet connection. The new club controls use embedded styles; players, bank, and slots remain available if the 3D library fails to load.

- **Roulette:** the supplied 24-pocket wheel, with each player's own balance, bets, rebet snapshot, and result history.
- **777 Slots:** three independent reels, selectable wagers, staged reel stops, visible payout table, and a shared wallet with roulette. Total payouts include the stake. Triple sevens return 100 times the wager.
- **Players & Bank:** three initial profiles (Alex, Jamie, Taylor), up to 12 profiles, direct chip transfers, borrowing, repayments, and a table activity log. Each player starts with 1,000 chips and has a 5,000-chip credit limit with no interest.

These are local profiles in the current browser, without sign-in or synchronization between devices. All balances represent play chips. Browser storage persists profiles, debts, pending bets, and the latest 100 activity entries. Clearing browser storage removes them. Transfers cannot spend chips already placed as roulette bets. Active spins lock account changes and financial operations. Interrupted roulette rounds refund their stake on reload; slot outcomes save before their animation completes.

## Develop

No dependency installation is needed. `npm run build` assembles the source into `dist/index.html` and the sibling `roulette.html`. `npm test` runs accounting, persistence, reel payout, and compiled-script checks with Node's built-in test runner.

The original supplied page is retained in `src/roulette.html`. The build applies focused integration changes and embeds `club-core.js`, `club-ui.js`, `club.css`, and `club.html` into the downloadable page. `.openai/hosting.json` retains this site's private hosting identity.
