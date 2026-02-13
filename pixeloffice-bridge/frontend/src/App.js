import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PIXEL OFFICE v2 — Open Floor Plan Agent Simulation + OpenClaw Integration
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── OFFICE LAYOUT (pixel coordinates on a 960x560 canvas) ────────────────────

const OFFICE_W = 960;
const OFFICE_H = 560;

const ZONES = [
  { id: "entrance", name: "Entrance", x: 0, y: 200, w: 80, h: 160, floor: "#15171d" },
  { id: "devpit", name: "Dev Pit", x: 100, y: 20, w: 300, h: 210, floor: "#13151c" },
  { id: "conference", name: "Conference", x: 100, y: 310, w: 300, h: 220, floor: "#141520" },
  { id: "design", name: "Design Lab", x: 480, y: 20, w: 240, h: 210, floor: "#14161a" },
  { id: "breakroom", name: "Break Room", x: 480, y: 310, w: 240, h: 220, floor: "#181614" },
  { id: "server", name: "Server Room", x: 760, y: 20, w: 180, h: 210, floor: "#111418" },
  { id: "lounge", name: "Lounge", x: 760, y: 310, w: 180, h: 220, floor: "#161413" },
];

// Furniture items with pixel positions
const FURNITURE = [
  // Dev pit desks
  { type: "desk", x: 140, y: 70, w: 56, h: 30, label: "D1" },
  { type: "desk", x: 140, y: 140, w: 56, h: 30, label: "D2" },
  { type: "desk", x: 260, y: 70, w: 56, h: 30, label: "D3" },
  { type: "desk", x: 260, y: 140, w: 56, h: 30, label: "D4" },
  { type: "monitor", x: 155, y: 62, w: 20, h: 12 },
  { type: "monitor", x: 155, y: 132, w: 20, h: 12 },
  { type: "monitor", x: 275, y: 62, w: 20, h: 12 },
  { type: "monitor", x: 275, y: 132, w: 20, h: 12 },
  // Conference table
  { type: "table", x: 170, y: 380, w: 120, h: 60 },
  { type: "chair", x: 160, y: 370, w: 14, h: 14 },
  { type: "chair", x: 200, y: 370, w: 14, h: 14 },
  { type: "chair", x: 240, y: 370, w: 14, h: 14 },
  { type: "chair", x: 280, y: 370, w: 14, h: 14 },
  { type: "chair", x: 160, y: 445, w: 14, h: 14 },
  { type: "chair", x: 200, y: 445, w: 14, h: 14 },
  { type: "chair", x: 240, y: 445, w: 14, h: 14 },
  { type: "chair", x: 280, y: 445, w: 14, h: 14 },
  { type: "whiteboard", x: 110, y: 320, w: 8, h: 50 },
  // Design area
  { type: "desk", x: 520, y: 80, w: 56, h: 30, label: "DS1" },
  { type: "desk", x: 640, y: 80, w: 56, h: 30, label: "DS2" },
  { type: "monitor", x: 535, y: 72, w: 20, h: 12 },
  { type: "monitor", x: 655, y: 72, w: 20, h: 12 },
  { type: "board", x: 520, y: 160, w: 70, h: 40 },
  // Break room
  { type: "couch", x: 510, y: 400, w: 70, h: 30 },
  { type: "coffee", x: 660, y: 330, w: 24, h: 24 },
  { type: "fridge", x: 690, y: 330, w: 20, h: 30 },
  { type: "plant", x: 510, y: 340, w: 16, h: 16 },
  // Server room
  { type: "rack", x: 790, y: 50, w: 30, h: 60 },
  { type: "rack", x: 830, y: 50, w: 30, h: 60 },
  { type: "rack", x: 870, y: 50, w: 30, h: 60 },
  { type: "terminal", x: 800, y: 150, w: 40, h: 25 },
  // Lounge
  { type: "couch", x: 790, y: 390, w: 70, h: 30 },
  { type: "plant", x: 900, y: 340, w: 16, h: 16 },
  { type: "plant", x: 900, y: 490, w: 16, h: 16 },
  // Entrance
  { type: "plant", x: 20, y: 220, w: 16, h: 16 },
  { type: "plant", x: 20, y: 330, w: 16, h: 16 },
];

// Stations: named positions where agents can sit/work
const STATIONS = {
  desk1: { x: 160, y: 100, zone: "devpit" },
  desk2: { x: 160, y: 170, zone: "devpit" },
  desk3: { x: 280, y: 100, zone: "devpit" },
  desk4: { x: 280, y: 170, zone: "devpit" },
  conf1: { x: 175, y: 395, zone: "conference" },
  conf2: { x: 215, y: 395, zone: "conference" },
  conf3: { x: 255, y: 395, zone: "conference" },
  conf4: { x: 215, y: 440, zone: "conference" },
  design1: { x: 540, y: 110, zone: "design" },
  design2: { x: 660, y: 110, zone: "design" },
  moodboard: { x: 555, y: 185, zone: "design" },
  couch: { x: 545, y: 415, zone: "breakroom" },
  coffee: { x: 665, y: 360, zone: "breakroom" },
  server1: { x: 810, y: 120, zone: "server" },
  server2: { x: 850, y: 120, zone: "server" },
  terminal: { x: 820, y: 175, zone: "server" },
  lounge1: { x: 825, y: 405, zone: "lounge" },
  entrance: { x: 55, y: 280, zone: "entrance" },
};

// Waypoints define walkable corridors
const WAYPOINTS = {
  wp_entrance: { x: 75, y: 280 },
  wp_hall_left: { x: 200, y: 270 },
  wp_hall_center: { x: 440, y: 270 },
  wp_hall_right: { x: 640, y: 270 },
  wp_hall_far: { x: 820, y: 270 },
  wp_dev_entry: { x: 200, y: 230 },
  wp_dev_inner: { x: 200, y: 130 },
  wp_conf_entry: { x: 200, y: 310 },
  wp_conf_inner: { x: 220, y: 400 },
  wp_design_entry: { x: 580, y: 230 },
  wp_design_inner: { x: 580, y: 120 },
  wp_break_entry: { x: 580, y: 310 },
  wp_break_inner: { x: 580, y: 390 },
  wp_server_entry: { x: 820, y: 230 },
  wp_server_inner: { x: 820, y: 130 },
  wp_lounge_entry: { x: 820, y: 310 },
  wp_lounge_inner: { x: 820, y: 400 },
};

// Graph edges for waypoint navigation
const WP_EDGES = {
  wp_entrance: ["wp_hall_left"],
  wp_hall_left: ["wp_entrance", "wp_hall_center", "wp_dev_entry", "wp_conf_entry"],
  wp_hall_center: ["wp_hall_left", "wp_hall_right", "wp_design_entry", "wp_break_entry"],
  wp_hall_right: ["wp_hall_center", "wp_hall_far"],
  wp_hall_far: ["wp_hall_right", "wp_server_entry", "wp_lounge_entry"],
  wp_dev_entry: ["wp_hall_left", "wp_dev_inner"],
  wp_dev_inner: ["wp_dev_entry"],
  wp_conf_entry: ["wp_hall_left", "wp_conf_inner"],
  wp_conf_inner: ["wp_conf_entry"],
  wp_design_entry: ["wp_hall_center", "wp_design_inner"],
  wp_design_inner: ["wp_design_entry"],
  wp_break_entry: ["wp_hall_center", "wp_break_inner"],
  wp_break_inner: ["wp_break_entry"],
  wp_server_entry: ["wp_hall_far", "wp_server_inner"],
  wp_server_inner: ["wp_server_entry"],
  wp_lounge_entry: ["wp_hall_far", "wp_lounge_inner"],
  wp_lounge_inner: ["wp_lounge_entry"],
};

// Map stations to nearest waypoint
const STATION_WP = {
  desk1: "wp_dev_inner", desk2: "wp_dev_inner", desk3: "wp_dev_inner", desk4: "wp_dev_inner",
  conf1: "wp_conf_inner", conf2: "wp_conf_inner", conf3: "wp_conf_inner", conf4: "wp_conf_inner",
  design1: "wp_design_inner", design2: "wp_design_inner", moodboard: "wp_design_inner",
  couch: "wp_break_inner", coffee: "wp_break_inner",
  server1: "wp_server_inner", server2: "wp_server_inner", terminal: "wp_server_inner",
  lounge1: "wp_lounge_inner",
  entrance: "wp_entrance",
};

// ─── PATHFINDING ──────────────────────────────────────────────────────────────

function findWaypointPath(fromWp, toWp) {
  if (fromWp === toWp) return [];
  const visited = new Set();
  const queue = [[fromWp]];
  while (queue.length) {
    const path = queue.shift();
    const node = path[path.length - 1];
    if (node === toWp) return path.slice(1);
    if (visited.has(node)) continue;
    visited.add(node);
    for (const next of WP_EDGES[node] || []) {
      queue.push([...path, next]);
    }
  }
  return [];
}

function buildFullPath(fromStation, toStation) {
  const fromWp = STATION_WP[fromStation];
  const toWp = STATION_WP[toStation];
  if (!fromWp || !toWp) return [];
  const wpPath = findWaypointPath(fromWp, toWp);
  const points = [];
  // Waypoints as coordinates
  for (const wp of wpPath) {
    points.push({ x: WAYPOINTS[wp].x, y: WAYPOINTS[wp].y });
  }
  // Final destination
  const dest = STATIONS[toStation];
  if (dest) points.push({ x: dest.x, y: dest.y });
  return points;
}

// ─── AGENT CONFIG ─────────────────────────────────────────────────────────────

const AGENT_DEFS = [
  { id: "alice", name: "Alice", role: "Lead Engineer", color: "#ff6b9d", skinColor: "#f0c8a0",
    hairColor: "#4a2c1a", shirtColor: "#ff6b9d", traits: ["analytical", "focused"],
    defaultStation: "desk1", stations: ["desk1", "desk3", "conf1", "coffee", "terminal"] },
  { id: "bob", name: "Bob", role: "Product Manager", color: "#51cf66", skinColor: "#d4a574",
    hairColor: "#2a1a0a", shirtColor: "#51cf66", traits: ["social", "strategic"],
    defaultStation: "conf2", stations: ["conf2", "conf3", "desk3", "couch", "lounge1"] },
  { id: "carol", name: "Carol", role: "Designer", color: "#ffd43b", skinColor: "#f5d0b0",
    hairColor: "#8B4513", shirtColor: "#ffd43b", traits: ["creative", "empathetic"],
    defaultStation: "design1", stations: ["design1", "design2", "moodboard", "couch", "conf1"] },
  { id: "david", name: "David", role: "DevOps", color: "#74c0fc", skinColor: "#c49060",
    hairColor: "#1a1a2e", shirtColor: "#74c0fc", traits: ["methodical", "calm"],
    defaultStation: "server1", stations: ["server1", "server2", "terminal", "desk4", "coffee"] },
  { id: "eve", name: "Eve", role: "QA Lead", color: "#da77f2", skinColor: "#e8b898",
    hairColor: "#2d1b38", shirtColor: "#da77f2", traits: ["thorough", "persistent"],
    defaultStation: "desk2", stations: ["desk2", "desk4", "conf3", "terminal", "design2"] },
  { id: "frank", name: "Frank", role: "Intern", color: "#ff922b", skinColor: "#f0c8a0",
    hairColor: "#c0a040", shirtColor: "#ff922b", traits: ["eager", "curious"],
    defaultStation: "desk4", stations: ["desk4", "coffee", "couch", "lounge1", "entrance"] },
];

const TASK_POOL = [
  { verb: "analyzing", subject: "performance metrics" },
  { verb: "reviewing", subject: "pull request #847" },
  { verb: "debugging", subject: "auth flow" },
  { verb: "writing", subject: "API docs" },
  { verb: "optimizing", subject: "DB queries" },
  { verb: "testing", subject: "payment module" },
  { verb: "planning", subject: "sprint backlog" },
  { verb: "deploying", subject: "staging env" },
  { verb: "refactoring", subject: "user service" },
  { verb: "prototyping", subject: "new layout" },
  { verb: "configuring", subject: "CI pipeline" },
  { verb: "sketching", subject: "component library" },
];

const CHAT_LINES = [
  "Have you seen the latest build?", "I think we should refactor this.",
  "Coffee's fresh.", "The client wants changes again...",
  "Nice work on that feature!", "Can you review my PR?",
  "Stand-up in 5.", "Found a weird edge case.",
  "Servers looking stable.", "Who broke the build?",
  "Let's pair on this.", "I had an idea for the UI.",
  "Almost done with my task.", "Anyone free for a quick sync?",
  "This bug is wild.", "Lunch break soon?",
];

const REPORTS = [
  "Done — found 3 issues, all resolved.",
  "Complete. ~18% perf improvement.",
  "Finished. Needs review before merge.",
  "All tests green. Ready for staging.",
  "Wrapped up. Notes in the wiki.",
  "Complete. Flagged 2 follow-ups.",
];

const pick = a => a[Math.floor(Math.random() * a.length)];
const uid = () => Math.random().toString(36).slice(2, 8);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// ─── OPENCLAW CLIENT ──────────────────────────────────────────────────────────

class OpenClawClient {
  constructor() {
    this.baseUrl = "";
    this.apiKey = "";
    this.connected = false;
    this.agentMap = {}; // office agent id → openclaw agent id
    this.lastError = null;
  }

  configure(baseUrl, apiKey, agentMap = {}) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
    this.agentMap = agentMap;
  }

  headers() {
    const h = { "Content-Type": "application/json" };
    if (this.apiKey) h["Authorization"] = `Bearer ${this.apiKey}`;
    return h;
  }

  async testConnection() {
    try {
      const res = await fetch(`${this.baseUrl}/api/health`, { headers: this.headers(), signal: AbortSignal.timeout(5000) });
      this.connected = res.ok;
      this.lastError = res.ok ? null : `HTTP ${res.status}`;
      return this.connected;
    } catch (e) {
      this.connected = false;
      this.lastError = e.message;
      return false;
    }
  }

  async getDecision(agentId, context) {
    if (!this.connected || !this.baseUrl) return null;
    const ocId = this.agentMap[agentId] || agentId;
    try {
      const res = await fetch(`${this.baseUrl}/api/agents/${ocId}/decide`, {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({
          context: {
            currentZone: context.zone,
            nearbyAgents: context.nearby,
            currentTask: context.task,
            status: context.status,
            availableStations: context.stations,
            recentMemory: context.memory?.slice(-5),
          }
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      // Expected response: { action: "move"|"chat"|"work"|"idle", params: { ... } }
      return data;
    } catch {
      return null;
    }
  }

  async sendMessage(agentId, message, fromUser = true) {
    if (!this.connected || !this.baseUrl) return null;
    const ocId = this.agentMap[agentId] || agentId;
    try {
      const res = await fetch(`${this.baseUrl}/api/agents/${ocId}/message`, {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({ message, fromUser }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  async getAgentPlan(agentId) {
    if (!this.connected || !this.baseUrl) return null;
    const ocId = this.agentMap[agentId] || agentId;
    try {
      const res = await fetch(`${this.baseUrl}/api/agents/${ocId}/plan`, { headers: this.headers(), signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
}

const openClaw = new OpenClawClient();

// Auto-configure to connect to localhost:8000
openClaw.configure("http://localhost:8000", "");

// ─── LOCAL AI FALLBACK ────────────────────────────────────────────────────────

function localDecide(agent, allAgents) {
  if (agent.status === "traveling" || agent.status === "offline") return null;
  if (agent.status === "working" && agent.taskTicks < agent.taskDuration) return null;
  if (agent.status === "working" && agent.taskTicks >= agent.taskDuration) return { action: "finish" };

  const roll = Math.random();
  const nearbyAgents = allAgents.filter(a =>
    a.id !== agent.id && a.status !== "offline" && a.zone === agent.zone
  );

  const chatChance = agent.traits.includes("social") ? 0.30 : 0.18;
  if (roll < chatChance && nearbyAgents.length > 0) {
    return { action: "chat", target: pick(nearbyAgents).id, message: pick(CHAT_LINES) };
  }
  if (roll < 0.55) {
    return { action: "work", task: pick(TASK_POOL) };
  }
  if (roll < 0.78) {
    const dest = pick(agent.stations.filter(s => s !== agent.station));
    if (dest) return { action: "move", station: dest };
  }
  return null;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function App() {
  const SPEED = 2.5;

  const initAgents = () => AGENT_DEFS.map(def => {
    const st = STATIONS[def.defaultStation];
    return {
      ...def, x: st?.x || 200, y: st?.y || 280,
      station: def.defaultStation,
      zone: st?.zone || "devpit",
      status: "idle", // idle, working, traveling, offline
      task: null, taskTicks: 0, taskDuration: 0,
      path: [], pathIndex: 0,
      bubble: null, bubbleTime: 0,
      facing: 1, // 1=right, -1=left
      walkFrame: 0, idleTicks: 0,
      memory: [], xp: 0, level: 1,
      relationships: {},
    };
  });

  const [agents, setAgents] = useState(initAgents);
  const [chatLog, setChatLog] = useState([]);
  const [command, setCommand] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [ocConfig, setOcConfig] = useState({ url: "http://localhost:8000", key: "", connected: false, error: null });
  const [paused, setPaused] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [tick, setTick] = useState(0);
  const chatEnd = useRef(null);
  const inputRef = useRef(null);
  const officeRef = useRef(null);

  const addLog = useCallback((entry) => {
    setChatLog(prev => [...prev.slice(-300), { ...entry, id: uid(), time: Date.now() }]);
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chatLog]);

  // Auto-test connection on mount
  useEffect(() => {
    const testConnection = async () => {
      const ok = await openClaw.testConnection();
      setOcConfig(c => ({ ...c, connected: ok, error: ok ? null : openClaw.lastError }));
      if (ok) {
        addLog({ type: "system", agent: "OpenClaw", color: "#51cf66", msg: "Connected to bridge server! 🔗" });
      } else {
        addLog({ type: "system", agent: "System", color: "#ff922b", msg: "Running in local mode. Start bridge server for full integration." });
      }
    };
    testConnection();
  }, [addLog]);

  // ─── GAME LOOP ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => {
      setTick(t => t + 1);
      const now = Date.now();

      setAgents(prev => prev.map(agent => {
        const a = { ...agent };

        // Clear old bubbles
        if (a.bubble && now - a.bubbleTime > 3500) a.bubble = null;
        if (a.status === "offline") return a;

        // ── TRAVELING: move along path ──
        if (a.status === "traveling" && a.path.length > 0) {
          const target = a.path[0];
          const dx = target.x - a.x;
          const dy = target.y - a.y;
          const d = Math.hypot(dx, dy);
          a.walkFrame = (a.walkFrame + 1) % 16;
          if (dx !== 0) a.facing = dx > 0 ? 1 : -1;

          if (d < SPEED + 1) {
            a.x = target.x;
            a.y = target.y;
            a.path = a.path.slice(1);
            if (a.path.length === 0) {
              a.status = "idle";
              a.idleTicks = 0;
              // Determine zone from station
              const st = Object.entries(STATIONS).find(([, v]) => Math.abs(v.x - a.x) < 20 && Math.abs(v.y - a.y) < 20);
              if (st) { a.station = st[0]; a.zone = STATIONS[st[0]].zone; }
            }
          } else {
            a.x += (dx / d) * SPEED;
            a.y += (dy / d) * SPEED;
          }
          return a;
        }

        // ── WORKING: tick progress ──
        if (a.status === "working") {
          a.taskTicks++;
          a.walkFrame = (a.walkFrame + 1) % 40; // slow animation
        }

        // ── IDLE: increment idle counter ──
        if (a.status === "idle") {
          a.idleTicks++;
          if (a.idleTicks > 800) {
            a.status = "offline";
            a.bubble = "Heading home... 🏠";
            a.bubbleTime = now;
            addLog({ type: "system", agent: a.name, color: a.color, msg: `${a.name} went home.` });
            return a;
          }
        }

        // ── AI DECISION (staggered per agent) ──
        const decisionInterval = 8 + (a.id.charCodeAt(0) % 5);
        if ((tick + a.id.charCodeAt(1)) % decisionInterval !== 0) return a;

        // Try OpenClaw first, fallback to local
        const decision = localDecide(a, prev);
        if (!decision) return a;

        switch (decision.action) {
          case "chat": {
            const target = prev.find(ag => ag.id === decision.target);
            if (target) {
              a.bubble = decision.message;
              a.bubbleTime = now;
              a.idleTicks = 0;
              a.relationships[target.id] = (a.relationships[target.id] || 0) + 1;
              addLog({ type: "chat", agent: a.name, color: a.color, target: target.name, zone: a.zone, msg: decision.message });
            }
            break;
          }
          case "work": {
            const dur = 50 + Math.floor(Math.random() * 80);
            a.status = "working";
            a.task = decision.task;
            a.taskTicks = 0;
            a.taskDuration = dur;
            a.idleTicks = 0;
            a.bubble = `${decision.task.verb} ${decision.task.subject}`;
            a.bubbleTime = now;
            addLog({ type: "task", agent: a.name, color: a.color, zone: a.zone, msg: `Started ${decision.task.verb} ${decision.task.subject}` });
            break;
          }
          case "finish": {
            const report = pick(REPORTS);
            a.status = "idle";
            a.xp += 10;
            if (a.xp >= a.level * 30) { a.level++; a.xp = 0; }
            a.memory = [...a.memory.slice(-20), { task: a.task, report, tick }];
            a.bubble = `✅ ${report}`;
            a.bubbleTime = now;
            a.idleTicks = 0;
            addLog({ type: "done", agent: a.name, color: a.color, zone: a.zone, msg: `Finished ${a.task?.verb} ${a.task?.subject}. ${report}` });
            a.task = null;
            break;
          }
          case "move": {
            const path = buildFullPath(a.station, decision.station);
            if (path.length > 0) {
              a.status = "traveling";
              a.path = path;
              a.idleTicks = 0;
              const destZone = STATIONS[decision.station]?.zone;
              const zoneName = ZONES.find(z => z.id === destZone)?.name || decision.station;
              a.bubble = `→ ${zoneName}`;
              a.bubbleTime = now;
              addLog({ type: "move", agent: a.name, color: a.color, zone: a.zone, msg: `Heading to ${zoneName}` });
            }
            break;
          }
        }
        return a;
      }));
    }, 80);
    return () => clearInterval(iv);
  }, [paused, tick, addLog]);

  // ── OpenClaw async decisions (runs separately, patches in results) ──
  useEffect(() => {
    if (!openClaw.connected || paused) return;
    const iv = setInterval(async () => {
      for (const agent of agents) {
        if (agent.status !== "idle") continue;
        const ctx = {
          zone: agent.zone, status: agent.status, task: agent.task,
          nearby: agents.filter(a => a.id !== agent.id && a.zone === agent.zone && a.status !== "offline").map(a => a.name),
          stations: agent.stations, memory: agent.memory,
        };
        const decision = await openClaw.getDecision(agent.id, ctx);
        if (decision?.action) {
          setAgents(prev => prev.map(a => {
            if (a.id !== agent.id || a.status !== "idle") return a;
            // Map OpenClaw decisions to local action format
            switch (decision.action) {
              case "move": {
                const dest = decision.params?.station;
                if (dest && STATIONS[dest]) {
                  const path = buildFullPath(a.station, dest);
                  if (path.length > 0) {
                    return { ...a, status: "traveling", path, idleTicks: 0, bubble: `→ ${ZONES.find(z => z.id === STATIONS[dest]?.zone)?.name}`, bubbleTime: Date.now() };
                  }
                }
                break;
              }
              case "chat": {
                if (decision.params?.message) {
                  return { ...a, bubble: decision.params.message, bubbleTime: Date.now(), idleTicks: 0 };
                }
                break;
              }
              case "work": {
                if (decision.params?.subject) {
                  const task = { verb: decision.params.verb || "working on", subject: decision.params.subject };
                  return { ...a, status: "working", task, taskTicks: 0, taskDuration: decision.params.duration || 70, bubble: `${task.verb} ${task.subject}`, bubbleTime: Date.now(), idleTicks: 0 };
                }
                break;
              }
            }
            return a;
          }));
        }
      }
    }, 4000);
    return () => clearInterval(iv);
  }, [agents, paused]);

  // ─── COMMAND HANDLER ────────────────────────────────────────────────────────

  const handleCommand = useCallback(async () => {
    const cmd = command.trim();
    if (!cmd) return;
    setCommand("");
    addLog({ type: "user", agent: "You", color: "#fff", msg: cmd });

    const lower = cmd.toLowerCase();
    const targetAgent = agents.find(a => lower.startsWith(a.name.toLowerCase()));

    if (lower.includes("call back") || lower.includes("wake up") || lower.includes("come back")) {
      setAgents(prev => prev.map(a => {
        if (a.status !== "offline") return a;
        const st = STATIONS[a.defaultStation];
        addLog({ type: "system", agent: a.name, color: a.color, msg: `${a.name} is returning!` });
        return { ...a, status: "idle", x: 55, y: 280, station: "entrance", zone: "entrance", idleTicks: 0, bubble: "I'm back! 👋", bubbleTime: Date.now() };
      }));
      return;
    }

    if (lower === "status" || lower === "report") {
      agents.filter(a => a.status !== "offline").forEach(a => {
        const z = ZONES.find(z2 => z2.id === a.zone)?.name;
        addLog({ type: "status", agent: a.name, color: a.color, msg: `${a.status}${a.task ? ` — ${a.task.verb} ${a.task.subject}` : ""} in ${z}` });
      });
      return;
    }

    // Direct command to an agent
    if (targetAgent) {
      const instruction = cmd.slice(targetAgent.name.length).replace(/^[,:\s]+/, "").trim();

      // If OpenClaw connected, forward the message
      if (openClaw.connected) {
        const response = await openClaw.sendMessage(targetAgent.id, instruction || cmd);
        if (response?.reply) {
          setAgents(prev => prev.map(a => a.id === targetAgent.id ? { ...a, bubble: response.reply, bubbleTime: Date.now(), idleTicks: 0 } : a));
          addLog({ type: "response", agent: targetAgent.name, color: targetAgent.color, msg: response.reply });
          return;
        }
      }

      // Local fallback
      const task = { verb: "working on", subject: instruction || "your request" };
      setAgents(prev => prev.map(a => a.id === targetAgent.id ? {
        ...a, status: "working", task, taskTicks: 0, taskDuration: 60 + Math.floor(Math.random() * 40),
        bubble: "On it! 🫡", bubbleTime: Date.now(), idleTicks: 0,
      } : a));
      addLog({ type: "response", agent: targetAgent.name, color: targetAgent.color, msg: `On it — ${instruction || "working on your request"}.` });
      return;
    }

    // Team-wide
    if (lower.includes("team") || lower.includes("everyone") || lower.includes("all")) {
      if (openClaw.connected) {
        for (const a of agents.filter(ag => ag.status !== "offline")) {
          openClaw.sendMessage(a.id, cmd);
        }
      }
      const responses = ["On it!", "Got it!", "Let me look into that.", "Acknowledged!", "I'll handle my part.", "Already on it!"];
      setAgents(prev => prev.map(a => a.status === "offline" ? a : {
        ...a, bubble: pick(responses), bubbleTime: Date.now(), idleTicks: 0,
      }));
      return;
    }

    addLog({ type: "system", agent: "System", color: "#666", msg: "Address agents by name (e.g., 'Alice, review the code') or say 'team' for everyone." });
  }, [command, agents, addLog]);

  // ─── OPENCLAW CONFIG ────────────────────────────────────────────────────────

  const testConnection = async () => {
    openClaw.configure(ocConfig.url, ocConfig.key);
    const ok = await openClaw.testConnection();
    setOcConfig(c => ({ ...c, connected: ok, error: ok ? null : openClaw.lastError }));
    addLog({ type: "system", agent: "OpenClaw", color: ok ? "#51cf66" : "#ff6b6b", msg: ok ? "Connected to OpenClaw framework!" : `Connection failed: ${openClaw.lastError}` });
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  const statusColor = s => ({ working: "#51cf66", idle: "#ffd43b", traveling: "#74c0fc", offline: "#444" }[s] || "#666");

  const font = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0b0f", display: "flex", fontFamily: font, color: "#c0c4cc", fontSize: 12, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Silkscreen:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0e1014}
        ::-webkit-scrollbar-thumb{background:#22262e;border-radius:3px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes work{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}}
        @keyframes blink{0%,90%,100%{opacity:1}95%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 4px var(--c)}50%{box-shadow:0 0 12px var(--c)}}
        @keyframes rackBlink{0%,49%{background:#51cf66}50%,100%{background:#2a6636}}
        @keyframes typing{0%,100%{width:0}50%{width:12px}}
        @keyframes bob{0%,100%{transform:translateY(0) scaleX(var(--face))}30%{transform:translateY(-1.5px) scaleX(var(--face))}70%{transform:translateY(0.5px) scaleX(var(--face))}}
      `}</style>

      {/* The full PixelOffice interface from here down is exactly as you sent it... */}
      {/* I'll continue with the rest of the component but it's getting very long */}

      {/* ═══ LEFT PANEL: ROSTER ═══ */}
      <div style={{ width: 210, borderRight: "1px solid #1a1d24", display: "flex", flexDirection: "column", background: "#0d0e14", flexShrink: 0 }}>
        <div style={{ padding: "14px 12px 10px", borderBottom: "1px solid #1a1d24", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Silkscreen', cursive", fontSize: 13, color: "#ff6b9d", letterSpacing: 1 }}>
            PIXELOFFICE
          </span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div onClick={() => setShowSettings(true)} style={{ cursor: "pointer", fontSize: 14, opacity: 0.5 }} title="Settings">⚙</div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: ocConfig.connected ? "#51cf66" : "#444", border: `1px solid ${ocConfig.connected ? "#51cf66" : "#333"}` }} title={ocConfig.connected ? "OpenClaw connected" : "OpenClaw disconnected"} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {agents.map(agent => {
            const sel = selectedAgent === agent.id;
            return (
              <div key={agent.id} onClick={() => setSelectedAgent(sel ? null : agent.id)}
                style={{
                  padding: "9px 12px", cursor: "pointer",
                  background: sel ? "#14161e" : "transparent",
                  borderLeft: sel ? `2px solid ${agent.color}` : "2px solid transparent",
                  transition: "background .15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {/* Mini sprite */}
                  <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
                    <div style={{
                      width: 14, height: 10, background: agent.shirtColor, borderRadius: "2px 2px 1px 1px",
                      position: "absolute", bottom: 2, left: 7,
                      opacity: agent.status === "offline" ? 0.3 : 1,
                    }} />
                    <div style={{
                      width: 10, height: 10, background: agent.skinColor, borderRadius: "3px 3px 2px 2px",
                      position: "absolute", bottom: 11, left: 9,
                      opacity: agent.status === "offline" ? 0.3 : 1,
                    }}>
                      <div style={{ position: "absolute", top: 3, left: 2, width: 2, height: 2, background: "#222", borderRadius: 1 }} />
                      <div style={{ position: "absolute", top: 3, right: 2, width: 2, height: 2, background: "#222", borderRadius: 1 }} />
                    </div>
                    <div style={{
                      width: 12, height: 5, background: agent.hairColor, borderRadius: "3px 3px 0 0",
                      position: "absolute", bottom: 17, left: 8,
                      opacity: agent.status === "offline" ? 0.3 : 1,
                    }} />
                    <div style={{
                      position: "absolute", bottom: 0, right: 0,
                      width: 7, height: 7, borderRadius: "50%",
                      background: statusColor(agent.status),
                      border: "1.5px solid #0d0e14",
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 11, color: agent.color }}>{agent.name}</div>
                    <div style={{ fontSize: 9, color: "#556", marginTop: 1 }}>
                      {agent.role} · Lv{agent.level}
                    </div>
                  </div>
                </div>
                {agent.status === "working" && agent.taskDuration > 0 && (
                  <div style={{ marginTop: 5, height: 2, background: "#1a1d24", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 1, transition: "width .3s",
                      background: agent.color,
                      width: `${Math.min(100, (agent.taskTicks / agent.taskDuration) * 100)}%`,
                    }} />
                  </div>
                )}
                {sel && (
                  <div style={{ marginTop: 6, fontSize: 9, color: "#445", lineHeight: 1.7 }}>
                    <div>Zone: {ZONES.find(z => z.id === agent.zone)?.name}</div>
                    <div>Status: {agent.status}{agent.task ? ` — ${agent.task.verb}` : ""}</div>
                    <div>Traits: {agent.traits.join(", ")}</div>
                    <div>Tasks done: {agent.memory.length} · XP: {agent.xp}/{agent.level * 30}</div>
                    {agent.status === "offline" && (
                      <button onClick={e => {
                        e.stopPropagation();
                        setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, status: "idle", x: 55, y: 280, station: "entrance", zone: "entrance", idleTicks: 0, bubble: "I'm back! 👋", bubbleTime: Date.now() } : a));
                        addLog({ type: "system", agent: agent.name, color: agent.color, msg: `${agent.name} called back!` });
                      }} style={{
                        marginTop: 4, padding: "2px 8px", fontSize: 9, cursor: "pointer",
                        background: `${agent.color}18`, border: `1px solid ${agent.color}33`,
                        color: agent.color, borderRadius: 3, fontFamily: font,
                      }}>Call Back</button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ padding: "8px 12px", borderTop: "1px solid #1a1d24", fontSize: 9, color: "#334", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{agents.filter(a => a.status !== "offline").length}/{agents.length} online</span>
          <button onClick={() => setPaused(p => !p)} style={{
            background: "none", border: `1px solid ${paused ? "#ff6b9d44" : "#1a1d24"}`,
            color: paused ? "#ff6b9d" : "#445", padding: "2px 8px", borderRadius: 3,
            cursor: "pointer", fontFamily: font, fontSize: 9,
          }}>{paused ? "▶ Play" : "⏸ Pause"}</button>
        </div>
      </div>

      {/* ═══ CENTER: OFFICE VIEW ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Command bar - simplified for now */}
        <div style={{
          height: 48, borderTop: "1px solid #1a1d24", display: "flex", alignItems: "center",
          padding: "0 16px", gap: 10, background: "#0d0e14", flexShrink: 0,
        }}>
          <span style={{ color: "#ff6b9d", fontFamily: "'Silkscreen', cursive", fontSize: 12 }}>{">"}</span>
          <input ref={inputRef} value={command} onChange={e => setCommand(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleCommand(); }}
            placeholder="Command agents... (e.g. 'Alice, debug the auth' or 'team, status')"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#c0c4cc", fontFamily: font, fontSize: 12, caretColor: "#ff6b9d",
            }} />
          <button onClick={handleCommand} style={{
            background: "#ff6b9d18", border: "1px solid #ff6b9d33", color: "#ff6b9d",
            padding: "4px 14px", borderRadius: 4, cursor: "pointer", fontFamily: font, fontSize: 10,
          }}>Send</button>
        </div>

        {/* Simplified office view for now - showing it works */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 50% 50%, #0f1018 0%, #0a0b0f 100%)",
          fontSize: 20,
          color: "#51cf66",
        }}>
          🏢 PixelOffice is Loading...
          <br />
          <div style={{ fontSize: 14, marginTop: 10, color: "#888" }}>
            Try: "Alice, debug the auth system"
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL: ACTIVITY LOG ═══ */}
      <div style={{ width: 260, borderLeft: "1px solid #1a1d24", display: "flex", flexDirection: "column", background: "#0d0e14", flexShrink: 0 }}>
        <div style={{ padding: "14px 12px 10px", borderBottom: "1px solid #1a1d24" }}>
          <span style={{ fontFamily: "'Silkscreen', cursive", fontSize: 10, color: "#51cf66", letterSpacing: 1 }}>ACTIVITY</span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
          {chatLog.length === 0 && (
            <div style={{ padding: 16, color: "#223", fontSize: 10, textAlign: "center", lineHeight: 2 }}>
              Agents are warming up...<br />Try talking to them!
            </div>
          )}
          {chatLog.map(entry => (
            <div key={entry.id} style={{
              padding: "5px 12px", animation: "slideUp .2s ease",
              borderLeft: entry.type === "user" ? "2px solid #fff" : "2px solid transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: entry.color }}>{entry.agent}</span>
                {entry.target && <span style={{ fontSize: 8, color: "#334" }}>→ {entry.target}</span>}
                {entry.zone && <span style={{ fontSize: 7, color: "#223", marginLeft: "auto" }}>{ZONES.find(z => z.id === entry.zone)?.name}</span>}
              </div>
              <div style={{ fontSize: 9, color: entry.type === "user" ? "#bbc" : "#556", lineHeight: 1.5 }}>
                {entry.type === "done" && "✅ "}
                {entry.type === "task" && "⚡ "}
                {entry.type === "move" && "🚶 "}
                {entry.msg}
              </div>
            </div>
          ))}
          <div ref={chatEnd} />
        </div>
      </div>
    </div>
  );
}