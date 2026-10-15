# Roulette Club

A standalone play-chip game extending the supplied 3D roulette page.

## Play

Open `dist/index.html`, or use the sibling `roulette.html` standalone copy. The 3D library, original utility styles, and fonts load from external CDNs and need an internet connection. Players and bank remain available if the 3D library fails to load; slots show a recovery message.

- **Roulette:** the supplied 24-pocket wheel, with each player's own balance, bets, rebet snapshot, and result history.
- **777 Slots:** the latest supplied Three.js cabinet with chrome and gold materials, curved drums, physical bet buttons, spring-return red lever, LED readouts, sound and coin effects. Panels start hidden: tap the cabinet's bet buttons or SPIN, or drag/tap the lever. Show controls restores keyboard-accessible controls, camera views, mute and Force 777. Bet tiers are 10, 50, 100, 500, 1,000 and All In; a tier larger than the wallet wagers the remaining balance. Triple sevens return 50 times the wager and double sevens return 5 times. Force 777 uses the wager and credits the active player's wallet. Empty wallets require transfer or bank borrowing; there are no automatic free refills. Open `#slots` directly. A cancelled touch never spins, and an active pull locks profile and game changes.
- **Blackjack:** an actual Three.js table with textured green felt, walnut and leather rail, warm lighting and shadows, physical card meshes, stacked chips, animated dealing and hole-card flips, player and overhead cameras, sound, and accessible card summaries. Hit, stand, double, and split share the player's casino wallet. A six-deck shoe is reshuffled below 52 remaining cards. Blackjack pays 3:2; other wins pay 1:1, pushes return the stake, and the dealer stands on all 17s. Split equal-value cards once, double after splitting, and draw one card to each split ace. No insurance or surrender. Wagers: 10–1,000 in steps of 10. Open `#blackjack` to enter this table directly.
- **Players & Bank:** three initial profiles (Alex, Jamie, Taylor), up to 12 profiles, direct chip transfers, borrowing, repayments, and a table activity log. Each player starts with 1,000 chips and has a 5,000-chip credit limit with no interest.

These are local profiles in the current browser, without sign-in or synchronization between devices. All balances represent play chips. Browser storage persists profiles, debts, pending bets, and the latest 100 activity entries. Clearing browser storage removes them. Transfers cannot spend chips already placed as roulette bets. Active rounds lock account changes and financial operations. Interrupted roulette rounds refund their stake on reload; slot outcomes save before their animation completes. Blackjack persists every move, the remaining shoe, ownership, and payouts, and resumes an unfinished player or dealer turn after reload. Its payouts are credited once. A browser without WebGL can play using the semantic card summaries and controls below the table.

## Develop

All three games accept custom whole-chip wagers from 1 to 1,000,000, subject to wallet balance and payout limits. Roulette's Custom bet form selects the exact chip amount for the next category or number placement. The 777 Custom bet button stays available when panels are hidden; applying an amount arms that exact wager for the lever. Blackjack's wager field accepts direct entry, including odd amounts; natural 3:2 payouts round half chips down so saved wallets remain whole numbers. Custom amounts never silently shrink to the available balance. Financial and wager controls lock during active rounds.

No dependency installation is needed. `npm run build` assembles the source into `dist/index.html` and the sibling `roulette.html`. `npm test` runs accounting, persistence, reel payout, and compiled-script checks with Node's built-in test runner.

The supplied pages are retained in `src/roulette.html` and `src/lucky-reference.html`. The build applies focused integration changes, scopes the cabinet's CSS to the slots view, wraps its script to avoid roulette name collisions, and embeds the club account controls into the downloadable page. `.openai/hosting.json` retains this site's private hosting identity.
