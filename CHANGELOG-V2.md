# Roulette Club V2 — Changelog

All notable changes in the Roulette Club V2 Platform Expansion.

## [2.0.0] — 2026-10-16

### Architecture & Security
- **Platform Identity & Roles**: Bound Cloudflare Sites identity to individual player accounts with distinct roles (`owner`, `admin`, `member`).
- **WebAuthn Step-Up**: Required biometric / hardware passkey (ES256) verification for all administrative actions and sensitive endpoints.
- **Privacy & Data Isolation**: Filtered all API responses so members only receive their own financial records, private game states, cards, and debts. Public player directory and club feeds are sanitized to prevent data leaks.
- **Durable CAS Transactions**: Atomic single-CAS D1 commits guaranteeing wallet balance consistency, idempotent replay safety, and immutable journal entries.
- **Administrative Compensations**: Replaced destructive history edits with compensating transactions requiring detailed reasons, full pre/post state preservation, and conflict prevention.
- **Security & Rate Limiting**: Added D1-backed sliding-window rate limiters and private security audit event logging.

### Gameplay & Sandbox
- **Arcade & Blackjack Independence**: Scoped active blackjack locks strictly to individual players, eliminating cross-player table interference.
- **Administrator Sandbox**: Created an isolated sandbox mode allowing game simulation and forced dice/slot outcomes without altering formal balances, progression, or leaderboards.
- **Lottery & Arcade**: Preserved lottery fixed tiers, odds distribution, and precise multi-digit jackpot calculation.
- **Unlimited Money Precision**: Enforced `CasinoMoney` arbitrary-precision integer arithmetic across all bets, balances, loan debts, and shark interest.

### Progression & Quests
- **XP & Levels**: Introduced level curve formula \(1 + \lfloor\sqrt{\text{XP} / 100}\rfloor\) with normal rounds granting 5 XP (capped at 100 XP per Shanghai day).
- **Seven-Day Streak**: Implemented cycling daily XP rewards with automatic missed-day reset, awarding a unique souvenir badge on Day 7.
- **Versioned Quests**: Daily (rounds & distinct games) and weekly quests with atomic claim guards, midnight Shanghai resets, and version locking to prevent re-claims after definition changes.

### Collection & Customization
- **Cosmetics Engine**: Added inventory system for frames, badges, titles, backgrounds, and souvenirs.
- **Profile Showcase**: Supported equipped avatar cosmetics and up to three distinct featured badges with strict ownership verification.

### Social & Clubs
- **Exact-Money Leaderboards**: Enabled sorting of arbitrarily large balances with standard competition ranking (1, 1, 3) and privacy opt-out toggle.
- **Private Clubs**: Implemented invite-only clubs with single-membership rules, 7-day revocable invitations, and ownership transfer before leaving.
- **Team Challenges**: Added 50-round weekly club contribution challenges with one-time 100 XP claims for active participants.

### Operations & Maintenance
- **Maintenance Mode**: Enabled platform read-only maintenance that safely freezes time-based bank and shark interest calculations.
- **Transactional Backup & Restore**: Added standalone CLI tools (`scripts/backup-tools.cjs`) for deterministic database exports and clean SQLite restores with foreign key and digest validation.
- **Additive Migrations**: Maintained schema chain (`0000` through `0003`) with full backward compatibility for existing players and legacy game data.
