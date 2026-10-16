const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { createHash } = require('node:crypto');
require('../src/money.js');
require('../src/club-core.js');
const M = globalThis.CasinoMoney;
const migrationDirectory = path.resolve(__dirname, '../drizzle');
const migrations = require('../drizzle/meta/_journal.json').entries.map(entry => entry.tag);
const ephemeral = new Set(['admin_challenges', 'admin_sessions', 'v2_rate_limits']);
const quote = name => '"' + name.replaceAll('"', '""') + '"';

function createDatabase(filename = ':memory:') {
    if (filename !== ':memory:') fs.closeSync(fs.openSync(filename, 'wx'));
    const db = new DatabaseSync(filename);
    db.exec('PRAGMA foreign_keys=ON');
    for (const tag of migrations) db.exec(fs.readFileSync(path.join(migrationDirectory, tag + '.sql'), 'utf8'));
    return db;
}
function inspectBackup(backup) {
    if (backup?.format !== 2 || !backup.records || !Array.isArray(backup.migrations)
        || JSON.stringify(backup.migrations) !== JSON.stringify(migrations)) throw Error('Backup format/migration chain mismatch.');
    const state = backup.records.casino_state;
    if (!Array.isArray(state) || state.length !== 1 || state[0].id !== 'club') throw Error('Missing unique wallet snapshot.');
    const value = M.parseJSON(state[0].snapshot), meta = backup.records.v2_meta?.find(row => row.id === 'platform');
    if (!meta || !M.parseJSON(meta.body).maintenance || !Array.isArray(value.users) || new Set(value.users.map(u => u.id)).size !== value.users.length) throw Error('Backup was not captured in maintenance or has invalid players.');
    const validated = new globalThis.CasinoEngine({getItem:()=>state[0].snapshot,setItem(){}},undefined,()=>0,{recoverRoulette:false,freezeEconomy:true});
    if (validated.storageWarning) throw Error('Wallet validation failed; do not restore this backup.');
    const digest = createHash('sha256').update(state[0].snapshot).digest('hex');
    return { format:2, revision:state[0].revision, players:value.users.length, snapshotSHA256:digest, migrations:[...migrations] };
}
function importBackup(db, backup) {
    const summary = inspectBackup(backup);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(row => row.name).filter(name => !ephemeral.has(name));
    if (Object.keys(backup.records).length !== tables.length || tables.some(table => !Array.isArray(backup.records[table]))) throw Error('Incomplete or unexpected backup tables.');
    for (const table of tables) if (db.prepare('SELECT COUNT(*) AS count FROM ' + quote(table)).get().count) throw Error('Restore requires a new empty database; existing data cannot be overwritten.');
    db.exec('BEGIN IMMEDIATE');
    try {
        // Server exports parent tables first; foreign keys validate the complete restore.
        for (const [table, records] of Object.entries(backup.records)) {
            const columns = db.prepare('PRAGMA table_info(' + quote(table) + ')').all().map(column => column.name);
            const insert = db.prepare('INSERT INTO ' + quote(table) + ' (' + columns.map(quote).join(',') + ') VALUES (' + columns.map(() => '?').join(',') + ')');
            for (const record of records) {
                if (Object.keys(record).some(key => !columns.includes(key)) || columns.some(key => !Object.hasOwn(record,key))) throw Error('Unexpected backup columns.');
                insert.run(...columns.map(column => record[column]));
            }
        }
        if (db.prepare('PRAGMA foreign_key_check').all().length) throw Error('Foreign key validation failed.');
        const restored = db.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club');
        if (createHash('sha256').update(restored.snapshot).digest('hex') !== summary.snapshotSHA256) throw Error('Wallet digest mismatch.');
        db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    return summary;
}
module.exports = { createDatabase, inspectBackup, importBackup };
if (require.main === module) {
    try {
        const [command,input,output] = process.argv.slice(2), backup = JSON.parse(fs.readFileSync(input,'utf8'));
        if (command === 'inspect') console.log(JSON.stringify(inspectBackup(backup),null,2));
        else if (command === 'restore-new' && output) {
            inspectBackup(backup);
            const db = createDatabase(path.resolve(output));
            try { console.log(JSON.stringify(importBackup(db,backup),null,2)); } finally { db.close(); }
        } else throw Error('Use: node scripts/backup-tools.cjs inspect <private-backup.json> | restore-new <private-backup.json> <NEW.sqlite>');
    } catch (error) { console.error(error.message); process.exitCode=1; }
}
