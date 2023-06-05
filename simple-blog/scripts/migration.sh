#!/usr/bin/env bash

PROJECT_DIR=$(cd "$(dirname $0)/../"; pwd)
WRANGLER_CONFIG_PATH="$PROJECT_DIR/wrangler.toml"

get_wrangler_config() {
  grep "$1" $WRANGLER_CONFIG_PATH | awk -F '"' '{print $2}'
}

DATABASE_NAME=$(get_wrangler_config "database_name")
DATABASE_ID=$(get_wrangler_config "database_id")
DATABASE_PATH="$PROJECT_DIR/.wrangler/state/v3/d1/$DATABASE_ID/db.sqlite"

MIGRATION_SQL=$(sqlite3def --dry-run "$DATABASE_PATH" < schema.sql)

echo -n 'Please input migration name: '
read migration_name

# 最終行が/migrations/<migration_name>のようになっているみたい
MIGRATION_FILE="${PROJECT_DIR}$(wrangler d1 migrations create "$DATABASE_NAME" "$migration_name" | tail -n 1)"
echo "$MIGRATION_SQL" > $MIGRATION_FILE
echo "✨ Migration file was created."

if [ "$1" != "--create-only" ]; then
  wrangler d1 migrations apply $DATABASE_NAME --local
  echo "✨ Migration was applied to the local database successfully."
fi
