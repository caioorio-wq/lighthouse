#!/bin/bash
set -euo pipefail
read -r -s -p 'Cloudflare API token (hidden): ' cf_token
printf '\n'
read -r -p 'Cloudflare Account ID: ' cf_account
printf '%s' "$cf_token" | gh secret set CLOUDFLARE_API_TOKEN --repo caioorio-wq/lighthouse
printf '%s' "$cf_account" | gh secret set CLOUDFLARE_ACCOUNT_ID --repo caioorio-wq/lighthouse
unset cf_token cf_account
printf 'Cloudflare secrets saved to your lighthouse repository.\n'
