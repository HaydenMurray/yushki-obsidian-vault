const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ─── AGENT STATE ──────────────────────────────────────────────────────────────
// In-memory state for each agent. In production, wire these to your actual
// OpenClaw agents via the OpenClaw SDK/API.

const AGENTS = {
  alice: {
    name: "Alice",
    role: "Lead Engineer",
    personality: "Analytical, focused, perfectionist. Prefers working at her desk. Gravitates toward technical tasks. Speaks concisely.",
    memory: [],
    plan: [],
  },
  bob: {
    name: "Bob",
    role: "Product Manager",
    personality: "Social, strategic, decisive. Loves meetings and syncs. Moves between rooms to check on people. Speaks enthusiastically.",
    memory: [],
    plan: [],
  },
  carol: {
    name: "Carol",
    role: "Designer",
    personality: "Creative, empathetic, detail-oriented. Spends time in the design lab and break room. Collaborative. Uses visual metaphors.",
    memory: [],
    plan: [],
  },
  david: {
    name: "David",
    role: "DevOps Engineer",
    personality: "Methodical, calm, reliable. Lives in the server room. Monitors systems. Dry humor. Brief responses.",
    memory: [],
    plan: [],
  },
  eve: {
    name: "Eve",
    role: "QA Lead",
    personality: "Thorough, skeptical, persistent. Tests everything. Moves between dev pit and server room. Asks probing questions.",
    memory: [],
    plan: [],
  },
  frank: {
    name: "Frank",
    role: "Intern",
    personality: "Eager, curious, occasionally clumsy. Hangs out in the break room and lobby. Asks lots of questions. Enthusiastic.",
    memory: [],
    plan: [],
  },
};

// Station options per agent (must match PixelOffice AGENT_DEFS.stations)
const AGENT_STATIONS = {
  alice:  ["desk1", "desk3", "conf1", "coffee", "terminal"],
  bob:    ["conf2", "conf3", "desk3", "couch", "lounge1"],
  carol:  ["design1", "design2", "moodboard", "couch", "conf1"],
  david:  ["server1", "server2", "terminal", "desk4", "coffee"],
  eve:    ["desk2", "desk4", "conf3", "terminal", "design2"],
  frank:  ["desk4", "coffee", "couch", "lounge1", "entrance"],
};

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", agents: Object.keys(AGENTS).length, version: "1.0.0" });
});

// ─── DECIDE ───────────────────────────────────────────────────────────────────
// Called by PixelOffice when an agent is idle and needs to decide what to do.
//
// Option A (below): Simple rule-based decisions. Works immediately, no LLM needed.
// Option B (commented): Forward to OpenClaw for LLM-powered decisions.

app.post("/api/agents/:id/decide", async (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });

  const ctx = req.body.context || {};
  const stations = AGENT_STATIONS[req.params.id] || [];

  // ══════════════════════════════════════════════════════════════════════
  // OPTION A: Local rule-based decisions (works out of the box)
  // ══════════════════════════════════════════════════════════════════════

  const roll = Math.random();
  const hasNearby = (ctx.nearbyAgents || []).length > 0;

  // Chat with nearby agent
  if (roll < 0.25 && hasNearby) {
    const topics = [
      "Have you seen the latest build?",
      "Want to pair on this?",
      "Coffee's fresh in the break room.",
      "I found something interesting...",
      "Can you take a look at this?",
      "Almost done with my task.",
    ];
    return res.json({
      action: "chat",
      params: { message: topics[Math.floor(Math.random() * topics.length)] },
    });
  }

  // Start working
  if (roll < 0.6) {
    const tasks = [
      { verb: "analyzing", subject: "performance metrics" },
      { verb: "reviewing", subject: "pull request #847" },
      { verb: "debugging", subject: "auth flow" },
      { verb: "writing", subject: "API documentation" },
      { verb: "testing", subject: "payment integration" },
      { verb: "optimizing", subject: "database queries" },
    ];
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    return res.json({
      action: "work",
      params: { verb: task.verb, subject: task.subject, duration: 50 + Math.floor(Math.random() * 60) },
    });
  }

  // Move to a different station
  if (roll < 0.85 && stations.length > 0) {
    const available = stations.filter(s => s !== ctx.currentStation);
    if (available.length > 0) {
      return res.json({
        action: "move",
        params: { station: available[Math.floor(Math.random() * available.length)] },
      });
    }
  }

  // Idle
  return res.json({ action: "idle" });

  // ══════════════════════════════════════════════════════════════════════
  // OPTION B: OpenClaw LLM-powered decisions (uncomment to use)
  // Replace OPENCLAW_DECIDE with your actual OpenClaw SDK call.
  // ══════════════════════════════════════════════════════════════════════
  //
  // try {
  //   const prompt = buildDecisionPrompt(agent, ctx, stations);
  //   const result = await callOpenClaw(req.params.id, prompt);
  //   // Parse the JSON action from OpenClaw's response
  //   const decision = JSON.parse(result);
  //   return res.json(decision);
  // } catch (err) {
  //   console.error("OpenClaw decide error:", err);
  //   return res.json({ action: "idle" });
  // }
});

// ─── MESSAGE ──────────────────────────────────────────────────────────────────
// Called when the user sends a direct command to an agent.

app.post("/api/agents/:id/message", async (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });

  const { message } = req.body;
  agent.memory.push({ role: "user", content: message, time: Date.now() });

  // ══════════════════════════════════════════════════════════════════════
  // OPTION A: Simple canned responses (works out of the box)
  // ══════════════════════════════════════════════════════════════════════

  const responses = {
    alice: [
      "I'll get right on that. Give me a few minutes.",
      "Analyzing now. I'll have results shortly.",
      "On it. I'll ping you when it's done.",
    ],
    bob: [
      "Great idea! Let me loop in the team.",
      "Got it — I'll add this to our sprint.",
      "Acknowledged! I'll coordinate with everyone.",
    ],
    carol: [
      "Ooh, interesting! Let me sketch something up.",
      "I have some ideas for this. Give me a moment.",
      "On it! I'll have a mockup ready soon.",
    ],
    david: [
      "Checking the systems now.",
      "I'll look into it. Probably a config issue.",
      "Running diagnostics. Stand by.",
    ],
    eve: [
      "I'll test this thoroughly.",
      "Let me verify that. I have some edge cases in mind.",
      "On it — I'll write up a test plan.",
    ],
    frank: [
      "Oh cool! I'll try my best!",
      "On it! ...wait, how do I do that? Just kidding, I got it.",
      "Yes! Excited to help with this!",
    ],
  };

  const agentResponses = responses[req.params.id] || ["Got it!"];
  const reply = agentResponses[Math.floor(Math.random() * agentResponses.length)];
  agent.memory.push({ role: "agent", content: reply, time: Date.now() });

  return res.json({ reply });

  // ══════════════════════════════════════════════════════════════════════
  // OPTION B: OpenClaw LLM-powered responses (uncomment to use)
  // ══════════════════════════════════════════════════════════════════════
  //
  // try {
  //   const prompt = buildMessagePrompt(agent, message);
  //   const reply = await callOpenClaw(req.params.id, prompt);
  //   agent.memory.push({ role: "agent", content: reply, time: Date.now() });
  //   return res.json({ reply });
  // } catch (err) {
  //   console.error("OpenClaw message error:", err);
  //   return res.json({ reply: "Sorry, I'm having trouble thinking right now." });
  // }
});

// ─── PLAN ─────────────────────────────────────────────────────────────────────

app.get("/api/agents/:id/plan", (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });
  res.json({ plan: agent.plan, memory: agent.memory.slice(-10) });
});

// ─── OPENCLAW INTEGRATION HELPERS ─────────────────────────────────────────────
// Uncomment and adapt these when you're ready to wire up real OpenClaw agents.

/*
// Your OpenClaw connection config
const OPENCLAW_URL = "http://localhost:3000"; // or wherever OpenClaw runs
const OPENCLAW_API_KEY = "";

async function callOpenClaw(agentId, prompt) {
  // Replace this with your actual OpenClaw SDK call.
  // This is a generic example — adapt to your OpenClaw setup.
  //
  // If using the Team Lead pattern:
  //   const vera = openClaw.getAgent("vera");
  //   const response = await vera.delegate(agentId, prompt);
  //
  // If using direct agent calls:
  //   const agent = openClaw.getAgent(agentId);
  //   const response = await agent.run(prompt);

  const response = await fetch(`${OPENCLAW_URL}/api/agents/${agentId}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENCLAW_API_KEY}`,
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.output || data.response || data.text;
}

function buildDecisionPrompt(agent, context, stations) {
  return `You are ${agent.name}, a ${agent.role} in a virtual office.
Your personality: ${agent.personality}

Current situation:
- You are in zone: ${context.currentZone || "unknown"}
- Your status: ${context.status || "idle"}
- Nearby colleagues: ${(context.nearbyAgents || []).join(", ") || "none"}
- Current task: ${context.currentTask ? `${context.currentTask.verb} ${context.currentTask.subject}` : "none"}

Your available stations: ${stations.join(", ")}

Recent memory:
${(context.recentMemory || []).map(m => `- ${m.task?.verb} ${m.task?.subject}: ${m.report}`).join("\n") || "- Nothing recent"}

Decide your next action. Respond with ONLY a JSON object, no other text:

For moving: {"action":"move","params":{"station":"desk1"}}
For chatting: {"action":"chat","params":{"message":"your message"}}
For working: {"action":"work","params":{"verb":"debugging","subject":"auth flow","duration":70}}
For staying idle: {"action":"idle"}

Choose an action that fits your personality and the current situation.`;
}

function buildMessagePrompt(agent, userMessage) {
  return `You are ${agent.name}, a ${agent.role} in a virtual office.
Your personality: ${agent.personality}

The user just sent you this message: "${userMessage}"

Recent conversation:
${agent.memory.slice(-6).map(m => `${m.role}: ${m.content}`).join("\n")}

Respond in character as ${agent.name}. Keep it brief (1-2 sentences).
Be helpful but stay in character with your personality traits.`;
}
*/

// ─── START ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`
  PixelOffice Bridge Server running on http://localhost:${PORT}`);
  console.log(`  Agents: ${Object.keys(AGENTS).join(", ")}`);
  console.log(`
  Plug this URL into PixelOffice Settings → OpenClaw Integration
`);
});