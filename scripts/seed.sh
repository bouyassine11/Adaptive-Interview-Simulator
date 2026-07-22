#!/bin/bash
set -e

echo "Seeding production database..."
npx tsx src/lib/db/seed.ts

echo "Seed complete."
