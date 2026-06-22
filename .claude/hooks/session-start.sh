#!/bin/bash
set -euo pipefail

# SessionStart hook for Claude Code on the web.
# Installs dependencies so the app can build/lint as soon as a session opens,
# making automated ("auto-coder") updates reliable.

# Only run in remote (Claude Code on the web) sessions.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# npm install (not ci) so the cached container layer is reused on later runs.
npm install
