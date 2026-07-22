#!/bin/bash
set -e

echo "Running production migrations..."
npx drizzle-kit migrate

echo "Migrations complete."
