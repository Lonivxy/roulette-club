import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const state = sqliteTable('casino_state', { id: text('id').primaryKey(), snapshot: text('snapshot').notNull(), revision: integer('revision').notNull(), lastOp: text('last_op').notNull() });
export const operations = sqliteTable('casino_operations', { id: text('id').primaryKey(), actor: text('actor').notNull(), payload: text('payload').notNull(), response: text('response').notNull(), createdAt: integer('created_at').notNull() });
export const credential = sqliteTable('admin_credential', { id: text('id').primaryKey(), actor: text('actor').notNull(), credentialId: text('credential_id').notNull(), publicKey: text('public_key').notNull(), counter: integer('counter').notNull(), transports: text('transports').notNull() });
export const challenges = sqliteTable('admin_challenges', { id: text('id').primaryKey(), actor: text('actor').notNull(), kind: text('kind').notNull(), challenge: text('challenge').notNull(), expiresAt: integer('expires_at').notNull() });
export const sessions = sqliteTable('admin_sessions', { id: text('id').primaryKey(), actor: text('actor').notNull(), expiresAt: integer('expires_at').notNull() });

// V2 entities use JSON for versioned metadata and typed columns for constraints/read indexes.
export const v2Meta = sqliteTable('v2_meta', { id:text('id').primaryKey(), body:text('body').notNull() });
export const v2Profiles = sqliteTable('v2_profiles', { id:text('id').primaryKey(), body:text('body').notNull() });
export const v2Accounts = sqliteTable('v2_accounts', { id:text('id').primaryKey(), playerId:text('player_id').unique().references(()=>v2Profiles.id), role:text('role').notNull(), status:text('status').notNull(), body:text('body').notNull() });
export const v2Progress = sqliteTable('v2_progress', { id:text('id').primaryKey().references(()=>v2Profiles.id), xp:integer('xp').notNull(), games:integer('games').notNull(), body:text('body').notNull() });
export const v2Items = sqliteTable('v2_items', { id:text('id').primaryKey(), body:text('body').notNull() });
export const v2Definitions = sqliteTable('v2_definitions', { id:text('id').primaryKey(), kind:text('kind').notNull(), version:integer('version').notNull(), body:text('body').notNull() });
export const v2DefinitionVersions = sqliteTable('v2_definition_versions', { id:text('id').primaryKey(), body:text('body').notNull() });
export const v2Inventory = sqliteTable('v2_inventory', { id:text('id').primaryKey(), playerId:text('player_id').notNull().references(()=>v2Profiles.id), itemId:text('item_id').notNull().references(()=>v2Items.id), body:text('body').notNull() });
export const v2Claims = sqliteTable('v2_claims', { id:text('id').primaryKey(), playerId:text('player_id').notNull().references(()=>v2Profiles.id), kind:text('kind').notNull(), createdAt:integer('created_at').notNull(), body:text('body').notNull() });
export const v2Events = sqliteTable('v2_events', { id:text('id').primaryKey(), playerId:text('player_id').references(()=>v2Profiles.id), kind:text('kind').notNull(), createdAt:integer('created_at').notNull(), body:text('body').notNull() });
export const v2Journal = sqliteTable('v2_journal', { id:text('id').primaryKey(), playerId:text('player_id').notNull(), operationId:text('operation_id').notNull(), actor:text('actor').notNull(), kind:text('kind').notNull(), before:text('before').notNull(), after:text('after').notNull(), createdAt:integer('created_at').notNull(), body:text('body').notNull() });
export const v2Clubs = sqliteTable('v2_clubs', { id:text('id').primaryKey(), ownerId:text('owner_id').notNull().references(()=>v2Profiles.id), body:text('body').notNull() });
export const v2Memberships = sqliteTable('v2_memberships', { id:text('id').primaryKey().references(()=>v2Profiles.id), clubId:text('club_id').notNull().references(()=>v2Clubs.id), body:text('body').notNull() });
export const v2Invitations = sqliteTable('v2_invitations', { id:text('id').primaryKey(), clubId:text('club_id').notNull().references(()=>v2Clubs.id), targetId:text('target_id').notNull().references(()=>v2Profiles.id), body:text('body').notNull() });
export const v2Contributions = sqliteTable('v2_contributions', { id:text('id').primaryKey(), clubId:text('club_id').notNull().references(()=>v2Clubs.id), playerId:text('player_id').notNull().references(()=>v2Profiles.id), body:text('body').notNull() });
export const v2PeriodStats = sqliteTable('v2_period_stats', { id:text('id').primaryKey(), playerId:text('player_id').notNull().references(()=>v2Profiles.id), period:text('period').notNull(), xp:integer('xp').notNull(), games:integer('games').notNull(), body:text('body').notNull() });
export const v2WalletIndex = sqliteTable('v2_wallet_index', { id:text('id').primaryKey(), visible:integer('visible').notNull(), sign:integer('sign').notNull(), magnitude:integer('magnitude').notNull(), digits:text('digits').notNull(), body:text('body').notNull() });
export const v2Sandbox = sqliteTable('v2_sandbox', { id:text('id').primaryKey(), body:text('body').notNull() });
export const v2Backups = sqliteTable('v2_backups', { id:text('id').primaryKey(), createdAt:integer('created_at').notNull(), body:text('body').notNull() });
