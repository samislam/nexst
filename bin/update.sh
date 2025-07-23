#!/bin/bash
set -e

echo "[DEPLOY] Starting deployment..."

PROJECT_DIR=""

cd "$PROJECT_DIR" || { echo "Project directory not found"; exit 1; }

echo "[DEPLOY] Resetting local Git state..."
git reset --hard
git clean -fd

echo "[DEPLOY] Pulling latest code..."
git pull origin main

echo "[DEPLOY] Installing dependencies..."
pnpm install

echo "[DEPLOY] Running setup..."
NODE_ENV=production pnpm run setup

echo "[DEPLOY] Building apps..."
pnpm run build

echo "[DEPLOY] Reloading PM2 app..."
pm2 reload ecosystem.config.js --update-env

echo "[DEPLOY] Done ✅"