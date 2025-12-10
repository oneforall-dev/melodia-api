// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");   // <<--- CORREGIDO

const app = express();

// permitir peticiones desde tu frontend de Netlify
app.use(
  cors({
    origin: "https://melodia-charts.netlify.app"
  })
);

app.use(express.json());

// Ruta básica para comprobar que la API vive
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Melodia API funcionando" });
});

// Ruta /ping por si quieres probar otra
app.get("/ping", (req, res) => {
  res.send("pong 🥁");
});

// Test DB
app.get("/db-test", async (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    const result = await client.query("SELECT NOW()");
    await client.end();

    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

// Render pondrá el puerto en process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("API escuchando en puerto", PORT);
});
