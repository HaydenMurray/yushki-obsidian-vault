#!/bin/bash

echo "🏢 Starting PixelOffice Bridge Server..."
echo "📍 Server will run on http://localhost:8000"
echo "🔌 Connect PixelOffice to this URL in the settings"
echo ""

cd "$(dirname "$0")"
node server.js