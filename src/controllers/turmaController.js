import { ObjectId } from "mongodb";
import {
  getTodasTurmas,
  getTurma,
  criarTurma,
  atualizarTurma,
  deletarTurma,
} from "../models/turmaModels.js";

// Listar todas as turmas
export async function listarTurmas(req, res) {
  try {
    console.log("Listando todas as turmas...");
    const turmas = await getTodasTurmas();
    res.status(200).json(turmas);
  } catch (error) {
    console.error("Erro ao listar turmas:", error.message);
    res.status(500).json({ error: "Erro ao listar turmas" });
  }
}

// Buscar uma turma por ID
export async function buscarTurma(req, res) {
  const { id } = req.params;

  // Validar se o ID está no formato correto
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    console.log(`Buscando a turma com ID: ${id}`);
    const turma = await getTurma(id);

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }

    res.status(200).json(turma);
  } catch (error) {
    console.error("Erro ao buscar turma por ID:", error.message);
    res.status(500).json({ error: "Erro ao buscar turma por ID" });
  }
}

// Criar uma nova turma
export async function criarNovaTurma(req, res) {
  const novaTurma = req.body;

  // Validar os campos obrigatórios
  if (!novaTurma.nome || !novaTurma.descricao || !novaTurma.ano) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    console.log("Criando uma nova turma...");
    const turmaCriada = await criarTurma(novaTurma);
    res.status(201).json(turmaCriada);
  } catch (error) {
    console.error("Erro ao criar nova turma:", error.message);
    res.status(500).json({ error: "Erro ao criar nova turma" });
  }
}

// Atualizar uma turma existente
export async function atualizarTurmaExistente(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  // Validar se o ID está no formato correto
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    console.log(`Atualizando a turma com ID: ${id}`);
    const resultado = await atualizarTurma(id, dadosAtualizados);

    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ error: "Turma não encontrada ou dados não alterados" });
    }

    res.status(200).json({ message: "Turma atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar turma:", error.message);
    res.status(500).json({ error: "Erro ao atualizar turma" });
  }
}

// Deletar uma turma existente
export async function deletarTurmaExistente(req, res) {
  const { id } = req.params;

  // Validar se o ID está no formato correto
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    console.log(`Deletando a turma com ID: ${id}`);
    const resultado = await deletarTurma(id);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }

    res.status(200).json({ message: "Turma deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar turma:", error.message);
    res.status(500).json({ error: "Erro ao deletar turma" });
  }
}
