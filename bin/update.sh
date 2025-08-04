#!/bin/bash
set -e

echo "[DEPLOY] Starting deployment..."

if [ -z "$REMOTE_PROJECT_DIR" ] || [ ! -d "$REMOTE_PROJECT_DIR" ]; then
  echo "Invalid or missing REMOTE_PROJECT_DIR: '$REMOTE_PROJECT_DIR'"
  exit 1
fi

cd "$REMOTE_PROJECT_DIR"

echo "[DEPLOY] Fetching clean state..."
git fetch origin main
git reset --hard origin/main
git clean -fd


echo "[DEPLOY] Installing dependencies..."
pnpm install --frozen-lockfile

echo "[DEPLOY] Running setup..."
NODE_ENV=production pnpm run setup

echo "[DEPLOY] Building apps..."
pnpm run build

echo "[DEPLOY] Waiting before reload..."
sleep 2

echo "[DEPLOY] Reloading PM2..."
pm2 reload ecosystem.config.js --update-env

echo "[DEPLOY] Done ✅"

