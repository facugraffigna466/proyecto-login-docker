import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());  // para parsear JSON
app.use(cors());          // habilita CORS

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ status: "success", message: "Login exitoso" });
    } else {
      res.json({ status: "error", message: "Usuario o contraseña inválidos" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Error en el servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en puerto ${PORT}, ENV=${process.env.ENVIRONMENT}`
  );
});