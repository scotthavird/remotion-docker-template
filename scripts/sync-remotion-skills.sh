#!/usr/bin/env bash
# Re-vendors the upstream remotion-dev/skills `skills/remotion/` subtree
# into .claude/skills/remotion/. Records the upstream commit SHA in
# .claude/skills/remotion/SOURCE.md.
#
# Usage: ./scripts/sync-remotion-skills.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$REPO_ROOT/.claude/skills/remotion"

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

echo "Cloning remotion-dev/skills..."
git clone --depth=1 --quiet https://github.com/remotion-dev/skills.git "$TMPDIR/skills"

SHA="$(cd "$TMPDIR/skills" && git rev-parse --short HEAD)"
DATE="$(date -u +%Y-%m-%d)"

echo "Replacing $DEST with upstream skills/remotion @ $SHA..."
rm -rf "$DEST"
mkdir -p "$REPO_ROOT/.claude/skills"
cp -R "$TMPDIR/skills/skills/remotion" "$DEST"

printf "Vendored from remotion-dev/skills @ %s (synced %s)\n" "$SHA" "$DATE" > "$DEST/SOURCE.md"

echo "Synced skills @ $SHA"
