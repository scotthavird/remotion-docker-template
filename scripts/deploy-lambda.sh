#!/usr/bin/env bash
# Deploy Remotion Lambda function and site, then render one composition.
#
# Usage: ./scripts/deploy-lambda.sh [composition-id]
#
# Reads AWS credentials from .env (REMOTION_AWS_ACCESS_KEY_ID,
# REMOTION_AWS_SECRET_ACCESS_KEY, REMOTION_AWS_REGION) or the current shell
# environment. See docs/LAMBDA_DEPLOY.md for IAM setup.
set -euo pipefail

COMPOSITION_ID="${1:-HelloWorld}"
SITE_NAME="${SITE_NAME:-remotion-docker-template}"

# Load .env if present
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

: "${REMOTION_AWS_ACCESS_KEY_ID:?Set REMOTION_AWS_ACCESS_KEY_ID in .env or env}"
: "${REMOTION_AWS_SECRET_ACCESS_KEY:?Set REMOTION_AWS_SECRET_ACCESS_KEY in .env or env}"
: "${REMOTION_AWS_REGION:?Set REMOTION_AWS_REGION in .env or env}"

echo "==> Validating IAM policies"
npx remotion lambda policies validate

echo "==> Deploying Lambda function (idempotent)"
npx remotion lambda functions deploy

echo "==> Deploying site '$SITE_NAME'"
npx remotion lambda sites create src/index.tsx --site-name="$SITE_NAME"

SERVE_URL="$(npx remotion lambda sites ls --quiet | grep -E "$SITE_NAME" | awk '{print $NF}' | head -n 1)"

if [[ -z "$SERVE_URL" ]]; then
  echo "Could not determine serve URL after upload. Run 'npx remotion lambda sites ls' to inspect."
  exit 1
fi

echo "==> Serve URL: $SERVE_URL"
echo "==> Rendering composition '$COMPOSITION_ID' on Lambda"
npx remotion lambda render "$SERVE_URL" "$COMPOSITION_ID"
