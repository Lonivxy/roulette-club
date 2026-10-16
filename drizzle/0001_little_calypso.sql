CREATE TABLE `v2_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text,
	`role` text NOT NULL,
	`status` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `v2_accounts_player_id_unique` ON `v2_accounts` (`player_id`);--> statement-breakpoint
CREATE TABLE `v2_backups` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`kind` text NOT NULL,
	`created_at` integer NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_clubs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_contributions` (
	`id` text PRIMARY KEY NOT NULL,
	`club_id` text NOT NULL,
	`player_id` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`club_id`) REFERENCES `v2_clubs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_definition_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_definitions` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`version` integer NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_events` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text,
	`kind` text NOT NULL,
	`created_at` integer NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`item_id` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `v2_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_invitations` (
	`id` text PRIMARY KEY NOT NULL,
	`club_id` text NOT NULL,
	`target_id` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`club_id`) REFERENCES `v2_clubs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_items` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_journal` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`actor` text NOT NULL,
	`kind` text NOT NULL,
	`before` text NOT NULL,
	`after` text NOT NULL,
	`created_at` integer NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_memberships` (
	`id` text PRIMARY KEY NOT NULL,
	`club_id` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`club_id`) REFERENCES `v2_clubs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_meta` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_period_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`period` text NOT NULL,
	`xp` integer NOT NULL,
	`games` integer NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_progress` (
	`id` text PRIMARY KEY NOT NULL,
	`xp` integer NOT NULL,
	`games` integer NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `v2_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `v2_sandbox` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `v2_wallet_index` (
	`id` text PRIMARY KEY NOT NULL,
	`visible` integer NOT NULL,
	`sign` integer NOT NULL,
	`magnitude` integer NOT NULL,
	`digits` text NOT NULL,
	`body` text NOT NULL
);
