-- Drizzle's generator splits expression arguments at commas; preserve the SQL expression.
CREATE INDEX `v2_contributions_week` ON `v2_contributions` (json_extract(`body`, '$.week'), `club_id`);
