#!/bin/bash
set -e

TARGET_HOST=""
SSH_USER_DIR="$HOME/.ssh"
KNOWN_HOSTS_FILE="$SSH_USER_DIR/known_hosts"

echo "[CI] Setting up SSH agent..."

mkdir -p "$SSH_USER_DIR"
chmod 700 "$SSH_USER_DIR"
chmod 600 "$SSH_PRIVATE_KEY_FILE"

eval "$(ssh-agent -s)"
ssh-add "$SSH_PRIVATE_KEY_FILE"

touch "$KNOWN_HOSTS_FILE"
if ! ssh-keygen -F "$TARGET_HOST" > /dev/null; then
  ssh-keyscan "$TARGET_HOST" >> "$KNOWN_HOSTS_FILE"
fi

echo "[CI] SSH setup complete."