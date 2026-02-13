# PixelOffice Bridge Server

## Status: ✅ Ready to Use

Bridge server is set up and running on **http://localhost:8000**

## What's Working

- ✅ Express server with CORS
- ✅ 6 office agents (Alice, Bob, Carol, David, Eve, Frank) with distinct personalities  
- ✅ Rule-based decision making (chat, work, move, idle)
- ✅ In-character responses to user messages
- ✅ Health check endpoint
- ✅ All REST endpoints PixelOffice expects

## Agents

- **Alice** (Lead Engineer) - Analytical, desk-focused, technical
- **Bob** (Product Manager) - Social, strategic, meeting-lover
- **Carol** (Designer) - Creative, collaborative, visual thinker
- **David** (DevOps) - Methodical, server room dweller, dry humor
- **Eve** (QA Lead) - Thorough, skeptical, bug finder
- **Frank** (Intern) - Eager, curious, enthusiastic

## Usage

### Start the server:
```bash
cd pixeloffice-bridge
node server.js
```

### Test endpoints:
```bash
# Health check
curl http://localhost:8000/api/health

# Agent decision
curl -X POST http://localhost:8000/api/agents/alice/decide \
  -H "Content-Type: application/json" \
  -d '{"context":{"currentZone":"devpit","status":"idle"}}'

# Send message to agent
curl -X POST http://localhost:8000/api/agents/bob/message \
  -H "Content-Type: application/json" \
  -d '{"message":"Hey Bob, what are you working on?"}'
```

## Connect PixelOffice

1. Open PixelOffice in browser
2. Click ⚙ gear icon or "OpenClaw" button
3. Set **API Base URL** to: `http://localhost:8000`  
4. Leave API Key blank
5. Click **Test & Connect**
6. Look for green "Connected" dot

## Next Steps (Optional)

To wire up real OpenClaw LLM agents instead of rule-based responses:

1. Uncomment "Option B" sections in `server.js`
2. Adapt the `callOpenClaw()` function to your OpenClaw setup
3. Create OpenClaw agents with the personality prompts from the setup guide

Current setup works great for testing and demo purposes!