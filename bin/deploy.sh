#!/bin/bash
set -e

# Run SSH setup in the current shell (so ssh-agent stays alive)
source bin/setup-ssh.sh

REMOTE_USER=""
REMOTE_HOST=""
REMOTE_PROJECT_DIR="/home/$REMOTE_USER/"
# * Write Your Gitlab variables for environment files here:
# & EXAMPLE: APP_NAME_ENV_PATH="$REMOTE_PROJECT_DIR/apps/"
# ...

echo "[DEPLOY] Uploading environment files..."

# Upload environment contents to the target server
# * Uncomment and replace <VARIABLE_NAME> and <APP_NAME_ENV_PATH>
# & EXAMPLE: ssh "$REMOTE_USER@$REMOTE_HOST" "cat > '$<APP_NAME_ENV_PATH>'" < "$<VARIABLE_NAME>"

echo "[DEPLOY] .env files uploaded successfully."

echo "[CI] Running remote deployment script..."
ssh "$REMOTE_USER@$REMOTE_HOST" 'bash -s' < bin/update.sh