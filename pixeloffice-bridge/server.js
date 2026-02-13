const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// ─── SERVE STATIC FILES (for HTML test page) ──────────────────────────────────

app.use(express.static(path.join(__dirname)));

// ─── AGENT STATE ──────────────────────────────────────────────────────────────

const AGENTS = {
  alice: {
    name: "Alice", role: "Lead Engineer",
    personality: "Analytical, focused, perfectionist. Prefers working at her desk. Speaks concisely.",
    memory: [], plan: [],
  },
  bob: {
    name: "Bob", role: "Product Manager",
    personality: "Social, strategic, decisive. Loves meetings. Speaks enthusiastically.",
    memory: [], plan: [],
  },
  carol: {
    name: "Carol", role: "Designer",
    personality: "Creative, empathetic, detail-oriented. Collaborative. Uses visual metaphors.",
    memory: [], plan: [],
  },
  david: {
    name: "David", role: "DevOps Engineer",
    personality: "Methodical, calm, reliable. Dry humor. Brief responses.",
    memory: [], plan: [],
  },
  eve: {
    name: "Eve", role: "QA Lead",
    personality: "Thorough, skeptical, persistent. Asks probing questions.",
    memory: [], plan: [],
  },
  frank: {
    name: "Frank", role: "Intern",
    personality: "Eager, curious, occasionally clumsy. Asks lots of questions.",
    memory: [], plan: [],
  },
};

const AGENT_STATIONS = {
  alice:  ["desk1", "desk3", "conf1", "coffee", "terminal"],
  bob:    ["conf2", "conf3", "desk3", "couch", "lounge1"],
  carol:  ["design1", "design2", "moodboard", "couch", "conf1"],
  david:  ["server1", "server2", "terminal", "desk4", "coffee"],
  eve:    ["desk2", "desk4", "conf3", "terminal", "design2"],
  frank:  ["desk4", "coffee", "couch", "lounge1", "entrance"],
};

// ─── HEALTH ───────────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", agents: Object.keys(AGENTS).length, version: "1.0.0" });
});

// ─── DECIDE ───────────────────────────────────────────────────────────────────

app.post("/api/agents/:id/decide", async (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });

  const ctx = req.body.context || {};
  const stations = AGENT_STATIONS[req.params.id] || [];
  const roll = Math.random();
  const hasNearby = (ctx.nearbyAgents || []).length > 0;

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

  if (roll < 0.85 && stations.length > 0) {
    const available = stations.filter(s => s !== ctx.currentStation);
    if (available.length > 0) {
      return res.json({
        action: "move",
        params: { station: available[Math.floor(Math.random() * available.length)] },
      });
    }
  }

  return res.json({ action: "idle" });
});

// ─── MESSAGE ──────────────────────────────────────────────────────────────────

app.post("/api/agents/:id/message", async (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });

  const { message } = req.body;
  agent.memory.push({ role: "user", content: message, time: Date.now() });

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
});

// ─── PLAN ─────────────────────────────────────────────────────────────────────

app.get("/api/agents/:id/plan", (req, res) => {
  const agent = AGENTS[req.params.id];
  if (!agent) return res.status(404).json({ error: "Unknown agent" });
  res.json({ plan: agent.plan, memory: agent.memory.slice(-10) });
});

// ─── START ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`
  🏢 PixelOffice Bridge Server + Static Files`);
  console.log(`  ────────────────────────────────────────`);
  console.log(`  Running on http://localhost:${PORT}`);
  console.log(`  Agents: ${Object.keys(AGENTS).join(", ")}`);
  console.log(`
  URLs:
  • Test Interface: http://localhost:${PORT}/index.html
  • React App:      http://localhost:${PORT}/frontend (when built)
  • Health Check:   http://localhost:${PORT}/api/health
  
  For PixelOffice: Use http://localhost:${PORT} as API Base URL
  `);
});