require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(
  cors({
    origin: "https://melodia-charts.netlify.app",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Melodia API funcionando" });
});

app.get("/ping", (req, res) => {
  res.send("pong 🥁");
});

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
    console.error("DB ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("API escuchando en puerto", PORT);
});
