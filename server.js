import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/config/database.js";
import turmaRoutes from "./src/routes/turmaRoutes.js";

dotenv.config();

const app = express();

(async () => {
  try {
    await connectToDatabase(process.env.CONNECTION_STRING);
    console.log("Conectado ao banco de dados!");

    app.use(express.json());
    app.use("/turmas", turmaRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
})();
