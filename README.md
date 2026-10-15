# Roulette Club

A standalone play-chip game extending the supplied 3D roulette page.

## Play

Open `dist/index.html`, or use the sibling `roulette.html` standalone copy. The 3D wheel, original utility styles, and fonts load from external CDNs and need an internet connection. The new club controls use embedded styles; players, bank, and slots remain available if the 3D library fails to load.

- **Roulette:** the supplied 24-pocket wheel, with each player's own balance, bets, rebet snapshot, and result history.
- **777 Slots:** the supplied red-and-gold 3D cabinet, three rotating 12-facet drums, a mechanical lever, mouse tilt/isometric/front camera modes, synthesized sound and coin effects. Wagers range from 10 to 100 chips in steps of 10. Triple sevens return 50 times the wager; double sevens return 5 times, with the remaining supplied payouts shown on the cabinet. The Force 777 button uses the selected wager and pays its jackpot into the active player's wallet. Insufficient funds require a transfer or bank borrowing.
- **Players & Bank:** three initial profiles (Alex, Jamie, Taylor), up to 12 profiles, direct chip transfers, borrowing, repayments, and a table activity log. Each player starts with 1,000 chips and has a 5,000-chip credit limit with no interest.

These are local profiles in the current browser, without sign-in or synchronization between devices. All balances represent play chips. Browser storage persists profiles, debts, pending bets, and the latest 100 activity entries. Clearing browser storage removes them. Transfers cannot spend chips already placed as roulette bets. Active spins lock account changes and financial operations. Interrupted roulette rounds refund their stake on reload; slot outcomes save before their animation completes.

## Develop

No dependency installation is needed. `npm run build` assembles the source into `dist/index.html` and the sibling `roulette.html`. `npm test` runs accounting, persistence, reel payout, and compiled-script checks with Node's built-in test runner.

The supplied pages are retained in `src/roulette.html` and `src/lucky-reference.html`. The build applies focused integration changes, scopes the cabinet's CSS to the slots view, wraps its script to avoid roulette name collisions, and embeds the club account controls into the downloadable page. `.openai/hosting.json` retains this site's private hosting identity.
