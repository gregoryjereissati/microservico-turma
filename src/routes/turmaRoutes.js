import express from "express";
import cors from "cors";
import {
  listarTurmas,
  buscarTurma,
  criarNovaTurma,
  atualizarTurmaExistente,
  deletarTurmaExistente,
} from "../controllers/turmaController.js";

const router = express.Router();

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Middleware
router.use(cors(corsOptions));
router.use(express.json());

// Rotas
router.get("/", listarTurmas);
router.get("/:id", buscarTurma);
router.post("/", criarNovaTurma);
router.put("/:id", atualizarTurmaExistente);
router.delete("/:id", deletarTurmaExistente);

export default router;
