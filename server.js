const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("✅ WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Hello! You are connected to the WebSocket server.");

  ws.on("message", (message) => {
    console.log(`📩 Received: ${message}`);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`📢 ${message}`);
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});
