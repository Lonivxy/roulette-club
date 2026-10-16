CREATE TABLE `v2_rate_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`window` integer NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `v2_claims_player_kind` ON `v2_claims` (`player_id`,`kind`);--> statement-breakpoint
CREATE INDEX `v2_claims_created` ON `v2_claims` (`created_at`);--> statement-breakpoint
CREATE INDEX `v2_events_kind_created` ON `v2_events` (`kind`,`created_at`);--> statement-breakpoint
CREATE INDEX `v2_events_created` ON `v2_events` (`created_at`);--> statement-breakpoint
CREATE INDEX `v2_journal_player_created` ON `v2_journal` (`player_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `v2_journal_created` ON `v2_journal` (`created_at`);--> statement-breakpoint
CREATE INDEX `v2_stats_period_player` ON `v2_period_stats` (`period`,`player_id`);--> statement-breakpoint
CREATE INDEX `v2_wallet_order` ON `v2_wallet_index` (`visible`,`sign`,`magnitude`,`digits`);