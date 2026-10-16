# Roulette Club V2 — approved implementation contract

Approved 2026-10-16, Asia/Shanghai. Baseline source: 5043a49faa4966a21fb696e7a0f99e35ee23f986.

## Product decisions

- Keep native HTML/CSS/JS, Three.js, Cloudflare Worker, D1, Drizzle, current purple/gold identity, /player, /admin and existing hash routes.
- No real money, cash-out, public discovery or new authentication provider. Sites login remains authoritative.
- One invited account owns one active player. Authorized administrators assign old profiles; no self-claim. Roles: owner/admin/member. Only owner grants administrator rights or changes account status. Privileged actions require server role AND Windows Hello step-up.
- Preserve ALL existing wallets, debts, loans, cards and histories. Money has no configured cap and uses CasinoMoney exact integers. casino_state remains the only writable formal wallet.
- Member responses contain self private data and separately filtered public directory data. Never return others' debts, cards, private game state or financial records. Wallet visibility is on by default but may be disabled server-side.
- All commands atomically commit snapshot CAS, operation receipt, event, journal and derived grants. Replays never duplicate effects. Journal is append-only; corrections are compensating transactions with reasons.
- Fix blackjack locking to current player. Forced prizes are permitted ONLY in a passkey-protected admin sandbox, separate balance, no formal rewards, stats or leaderboard effects.
- XP/stats start at V2 launch, no invented retroactive records. Normal settled rounds earn 5 XP, daily cap 100; wager and win do not affect XP. Level L threshold 100*(L-1)^2.
- Rewards only XP/cosmetics. Shanghai midnight resets daily; Monday midnight weekly; first day midnight monthly. Seven day XP [20,25,30,35,40,50,75], missed day resets, day seven awards a unique souvenir badge, cycles repeat.
- Daily quests: 3 completed rounds=>40 XP, 2 distinct games=>40 XP. Weekly: 15 rounds=>200 XP, 4 games=>150 XP. One-time profile/club objectives. Special events have server-defined schedules. Expired unclaimed quests expire. Versioned definitions; no repeat grants after edits.
- Inventory: frames, badges, titles, backgrounds and souvenirs; server-owned, validated equipment, at most 3 featured badges. Preset avatars; no uploads.
- Leaderboards: exact current wallet (includes old balances/admin grants; excludes recovery allowance), XP, games, achievements, weekly/monthly activity; stable competition ties 1,1,3. Wallet privacy opt-out removes wallet leaderboard rows and wallet amounts from member responses; other activity rankings remain available. SQL indexes/read models, no float money conversion.
- Clubs private, one active membership per player, owner/member roles, 7-day revocable invites, acceptance rechecks eligibility, transfer owner before leaving. Contributions after join, preserved history, no rejoin reward duplication. Weekly 50 team rounds, participating members can claim 100 XP once. No chat in V2.
- Grouped Games/Economy/Social/Rewards/Account navigation; accessible responsive UI and reduced motion. ADMIN supports members, roles, economy/reasons, versioned definitions, moderation, durable audit, analytics and health.
- Add schema-only bounded migrations; backfill outside migrations. Before cutover permit short read-only maintenance INCLUDING interest writes. Back up and verify IDs/exact finances/history. Never restore an old snapshot over post-launch transactions.

## Test seams agreed in the approved plan

Public Worker HTTP routes with SQLite/D1 adapter, public game/domain functions, UI controllers and generated page semantics. Cover access isolation, replay/concurrency, money, rewards/calendar/versioning, inventory and clubs, migrations and real responsive browser behavior. Existing baseline 186 tests. Do not claim visual QA when browser connection is broken.

## Progress discipline

One active implementer. Each issue file is status authority; TODO is generated. Done requires evidence and verified acceptance. Stage gate requires all children done and stage evidence. Preserve HANDOFF on every task/checkpoint. Never put credentials or production backups in repository, evidence or chat.
