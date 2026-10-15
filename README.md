# Roulette Club

A private play-chip casino with roulette, Three.js Lucky 777, blackjack, players, bank and a black market. The hosted app uses a Worker and D1 database for authoritative balances, game outcomes, loans and administrator authorization. Three.js, utility styles and fonts load from CDNs.

## PLAYER and ADMIN

`/player` contains all games, gifts, player loans, the bank and the black market. `/admin` contains player creation/deletion and balance adjustments. Player profiles share the existing profile selector; they do not have separate individual sign-ins. Site access remains private.

On first use, open `/admin`, choose the Windows Hello setup button and approve the browser's native passkey prompt. The server stores a public credential, never the Windows PIN, fingerprint or face data. First enrollment is bound to the authenticated private Site owner's identity. Later visits require the registered passkey; administrator sessions expire after fifteen minutes. Creating/deleting players, adjusting balances and importing a save require server-verified administrator authorization.

If this browser has an older local save, authenticate in ADMIN and import it before playing. The import is allowed only before the shared server account has any activity, so it cannot overwrite an active server balance. The original browser save remains available as a backup. Other browsers use the shared server account rather than separate local balances.

Administrators can add or remove whole chips with an optional reason recorded in the account log. Adjustments cannot produce a negative balance or exceed the wallet cap. This is a play-chip app; balances have no cash redemption.

## Games

- Roulette: the supplied 24-pocket wheel; individual player stakes, history and rebet snapshots. Custom chips apply their exact amount to categories or numbers.
- Lucky 777: directly touch physical bet buttons, tap SPIN or pull the red lever. Panels start hidden; Show controls restores camera and sound controls. Custom bet remains available with panels hidden. Triples return 50× for 777, 25× for diamonds, 20× for BAR, 15× for bells, 10× for clovers, 5× for cherries. Double sevens return 5×; one or two cherries return 1× or 2×. Outcomes, card consumption and wallet changes save before the animation completes.
- Blackjack: six decks, dealer stands on all 17s, natural blackjack pays 3:2, ordinary wins pay 1:1 and pushes return the stake. Split equal-value cards once; double after split; split aces receive one card each. Odd natural wagers round half chips down. Pending hands and dealer turns resume after reload.
- All games support custom whole-chip wagers from 1 to 1,000,000, with wallet and payout caps. Empty wallets require gifts or borrowing; no automatic refill.

Left Shift + F is a hidden jackpot shortcut on game tabs. Roulette targets the highest combined payout among the current bets (or first places the selected chip on zero); 777 spins a paid jackpot without consuming an equipped merchant card; blackjack deals a paid natural or settles existing hands at the maximum standard return for their existing stakes. The shortcut ignores text fields, right Shift, extra modifiers, repeat keys and stale key state after blur. Slots and blackjack reject duplicate requests during animations.

## Players

The Players tab under PLAYER contains gifts and loans. ADMIN manages the profiles. Each new player receives 1,000 starter chips. There is no fixed player-count cap. Hosted profiles, balances and loans persist in the D1 database, and reloads and legacy imports support more than twelve players. Gifts transfer immediately. A lender proposes an amount, rate and period; the period defaults to ten minutes and the editable rate starts at 1%. Switch to the borrower to accept or decline. No chips move and no interest accrues before acceptance. Acceptance rechecks both wallets, then transfers once and starts the clock. The lender can cancel a pending offer. The borrower may make partial or full repayments directly into the lender's wallet.

Deletion requires two clicks and removes the selected player's wallet and cards. It cannot remove the last profile or a player with bank/shark debt, pending/active peer loans (as lender or borrower), outstanding roulette stakes or an unfinished blackjack hand. Completed loan receipts retain party names even after an account is deleted.

## Bank and real-time interest

The separate Bank tab belongs to the selected player:

| Loan | Borrowing ceiling | Compound interest |
| --- | --- | --- |
| Bank | 100,000 | 15% per complete ten minutes |
| Loan shark | 1,500,000 | 125% per complete three minutes |
| Player loan | 1,000,000 per agreement | Lender's agreed rate; ten-minute default period |

The bank adds 15% interest per period (debt multiplies by 1.15); the shark adds 125% (debt multiplies by 2.25). Existing debts first settle completed periods under their previous schedule when loaded by the updated server, then start a fresh timer under the new schedule. This conversion is saved once and does not apply the increased rates retroactively. Player-to-player loan terms remain those accepted by both parties.

Interest uses actual wall time, including offline time and time spent on other profiles. Every completed period rounds its interest up to a whole chip and adds it to the outstanding debt. Borrowing into an existing bank/shark balance preserves that account's current period; partial repayment also preserves its clock. Paying off the balance clears its clock. Reload settles elapsed periods once and persists the new boundary. Debt is capped at 1,000,000,000 per account/agreement. A backwards clock adjustment does not charge periods twice. Existing round-based saves retain their debts and begin the new timer when first opened after this update.

Loan-shark borrowing appears only when bank credit is exhausted, cash is zero or negative, and there are no unsettled roulette stakes or active games. Repayment remains available while a shark balance exists. Interest may push debt above its borrowing ceiling; repay to restore room.

## Black market

Cards remain guaranteed, single-use outcomes with a stake fixed at purchase. Prices exclude the spin stake:

| Card | Price | Return | Net after price and stake |
| --- | --- | --- | --- |
| 777 | 35× stake | 50× stake | +14× stake |
| Three diamonds | 18× stake | 25× stake | +6× stake |
| Three BARs | 14× stake | 20× stake | +5× stake |

Buying requires enough cash for price plus the bound stake. Each player has a fifteen-minute cooldown after any card purchase, saved across reloads, and can hold 50 cards. Equip from the inventory to use on the next successful 777 spin. Failed spins keep the card; unequip to change the wager. Old inventory retains its outcomes and stakes.

## Development and validation

Use Node 24 or newer for the test suite's SQLite adapter. Run `npm ci`, `npm run build`, then `npm test`. The build assembles the UI, embeds the passkey client and bundles the deployable Worker at `dist/server/index.js`. `.openai/hosting.json` declares the existing Site and its D1 binding `DB`. Schema changes belong in `db/schema.ts`; `npm run db:generate` produces versioned migrations in `drizzle/`. Published migrations must not be edited. Sites applies packaged migrations during deployment.

The sibling `roulette.html` is a standalone local game export; administrator authentication and shared balances require the hosted Worker. Do not use the standalone export as an administrator portal.

`npm test` covers accounting, interest boundaries and offline catch-up, mutual loan consent, repayments, deletion, merchant profit and cooldown, game rules, controls, storage migration and compiled scripts. Worker tests exercise real WebAuthn signature verification with generated credentials, single-use challenges, identity/origin checks, session expiry, unauthorized administrator rejection, concurrent transactions, duplicate request protection, UI integration and one-time legacy imports. These automated checks do not establish rendered browser appearance or actual Windows Hello device enrollment.

Original supplied artwork is retained in `src/roulette.html` and `src/lucky-reference.html`; integration remains in build helpers and the shared source modules. `.openai/hosting.json` preserves the existing private Site identity.
