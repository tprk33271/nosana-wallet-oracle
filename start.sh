#!/bin/sh
# Start the nothink proxy in background, then start ElizaOS
node /app/nothink-proxy.mjs &
exec pnpm start
