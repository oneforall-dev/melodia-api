// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

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

// Render pondrá el puerto en process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("API escuchando en puerto", PORT);
});
