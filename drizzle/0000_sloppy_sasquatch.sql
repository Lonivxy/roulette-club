CREATE TABLE `admin_challenges` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`kind` text NOT NULL,
	`challenge` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `admin_credential` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`credential_id` text NOT NULL,
	`public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`transports` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `casino_operations` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`payload` text NOT NULL,
	`response` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `admin_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `casino_state` (
	`id` text PRIMARY KEY NOT NULL,
	`snapshot` text NOT NULL,
	`revision` integer NOT NULL,
	`last_op` text NOT NULL
);
